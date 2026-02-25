using Cysharp.Threading.Tasks;
using DG.Tweening;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.ObjectPooling;
using System.Collections.Generic;
using UnityEngine;

public class GridRowClearer
{
    private readonly GameConfig config;
    private readonly GridData gridData;
    private readonly GridVisualizer visualizer;

    private const string VFX_DUAL_KEY = "VFX_BlockBreak_Dual";
    private GameObject breakVfxPrefab;
    private bool isPlayingEffect = false;

    #region Settings

    [System.Serializable]
    public class ClearSettings
    {
        public float fallDuration = 0.25f;
        public Ease fallEase = Ease.InQuad;
    }

    private readonly ClearSettings settings;

    #endregion

    #region Cached Collections (Zero GC)

    private readonly List<int> _fullRowsCache = new System.Collections.Generic.List<int>();
    private readonly HashSet<int> _fullRowSetCache = new System.Collections.Generic.HashSet<int>();
    private readonly HashSet<int> _impactedBlockIDsCache = new System.Collections.Generic.HashSet<int>();
    private readonly List<GameObject> _visualsToDieCache = new System.Collections.Generic.List<UnityEngine.GameObject>();
    private readonly List<GameObject> _visualsToShakeCache = new System.Collections.Generic.List<UnityEngine.GameObject>();
    private readonly HashSet<int> _dieVisualIDsCache = new System.Collections.Generic.HashSet<int>();
    private readonly HashSet<int> _shakeVisualIDsCache = new System.Collections.Generic.HashSet<int>();
    private readonly HashSet<int> _strippingBlockIDsCache = new System.Collections.Generic.HashSet<int>();
    private readonly HashSet<int> _blocksLostCellsCache = new System.Collections.Generic.HashSet<int>();
    private readonly List<Vector2Int> _cellsToProcessCache = new System.Collections.Generic.List<UnityEngine.Vector2Int>();
    private readonly HashSet<int> _excludeRowSetCache = new System.Collections.Generic.HashSet<int>();
    private readonly HashSet<int> _destroyedVisualIDsCache = new System.Collections.Generic.HashSet<int>();

    private readonly HashSet<(int, int)> _seenCanonicalCache = new System.Collections.Generic.HashSet<(int, int)>();
    private readonly List<Vector2Int> _canonicalCellsCache = new System.Collections.Generic.List<UnityEngine.Vector2Int>();
    private readonly List<HashSet<Vector2Int>> _componentsCache = new System.Collections.Generic.List<System.Collections.Generic.HashSet<UnityEngine.Vector2Int>>();
    private readonly HashSet<Vector2Int> _visitedCache = new System.Collections.Generic.HashSet<UnityEngine.Vector2Int>();
    private readonly HashSet<Vector2Int> _cellSetCache = new System.Collections.Generic.HashSet<UnityEngine.Vector2Int>();
    private readonly Queue<Vector2Int> _bfsQueueCache = new System.Collections.Generic.Queue<UnityEngine.Vector2Int>();

    private int[,] _virtualGrid;
    private readonly Dictionary<int, List<Vector2Int>> _virtualRegistryCache = new System.Collections.Generic.Dictionary<int, System.Collections.Generic.List<UnityEngine.Vector2Int>>();
    private readonly Dictionary<int, int> _fallDistancesCache = new System.Collections.Generic.Dictionary<int, int>();
    private readonly Dictionary<int, int> _finalPositionsCache = new System.Collections.Generic.Dictionary<int, int>();
    private readonly List<(int x, int y, GameObject visual)> _pendingMovesCache = new System.Collections.Generic.List<(int x, int y, UnityEngine.GameObject visual)>();
    private readonly List<(int x, int y)> _cellsToClearCache = new System.Collections.Generic.List<(int x, int y)>();
    private readonly List<(int x, int y, int blockID)> _pendingWritesCache = new System.Collections.Generic.List<(int x, int y, int blockID)>();
    private readonly HashSet<int> _animatedVisualIDsCache = new System.Collections.Generic.HashSet<int>();
    private readonly List<(GameObject obj, Vector3 startPos, Vector3 endPos)> _animationsCache = new System.Collections.Generic.List<(UnityEngine.GameObject obj, UnityEngine.Vector3 startPos, UnityEngine.Vector3 endPos)>();
    private readonly List<int> _sortedBlocksCache = new System.Collections.Generic.List<int>();
    private readonly HashSet<int> _rowsToCheckCache = new System.Collections.Generic.HashSet<int>();

    #endregion

    #region Constructor

    public GridRowClearer(GameConfig config, GridData gridData, GridVisualizer visualizer, GameObject breakVfxPrefab, ClearSettings settings = null)
    {
        this.config = config;
        this.gridData = gridData;
        this.visualizer = visualizer;
        this.breakVfxPrefab = breakVfxPrefab;
        this.settings = settings ?? new ClearSettings();

        _virtualGrid = new int[config.Perimeter, config.height];
    }

    #endregion

    #region Main Logic

    public async UniTask CheckAndClearRowsAsync(HashSet<int> initialRowsToCheck)
    {
        int safetyCounter = 0;

        _rowsToCheckCache.Clear();
        foreach (int r in initialRowsToCheck)
            _rowsToCheckCache.Add(r);

        while (safetyCounter < 20)
        {
            if (_rowsToCheckCache.Count == 0) break;

            _fullRowsCache.Clear();
            foreach (int r in _rowsToCheckCache)
                if (gridData.IsRowFull(r))
                    _fullRowsCache.Add(r);

            if (_fullRowsCache.Count == 0) break;

            _fullRowsCache.Sort((a, b) => b.CompareTo(a));

            bool willWin = false;
            if (GameManager.Instance != null)
            {
                willWin = ScoreManager.Instance.WouldWinWithRows(_fullRowsCache.Count);
            }

            await ProcessRowClearing(_fullRowsCache, willWin);

            EventBus<RowsClearedEvent>.Raise(new RowsClearedEvent
            {
                RowCount = _fullRowsCache.Count
            });

            if (willWin) break;

            await ApplyGravityUntilStable();

            _rowsToCheckCache.Clear();
            int maxH = gridData.GetMaxHeight();
            for (int y = 0; y <= maxH + 1 && y < config.height; y++)
                _rowsToCheckCache.Add(y);

            safetyCounter++;

            await UniTask.Delay(System.TimeSpan.FromSeconds(0.1f));
        }

        EventBus<GridStableEvent>.Raise(new GridStableEvent());
    }

    #endregion

    #region Row Clearing Logic

    private async UniTask ProcessRowClearing(List<int> fullRows, bool willWin = false)
    {
        CellMeshLibrary meshLibrary = GridManager.Instance?.meshLibrary;

        _fullRowSetCache.Clear();
        foreach (int r in fullRows)
            _fullRowSetCache.Add(r);

        _impactedBlockIDsCache.Clear();
        foreach (int row in fullRows)
        {
            for (int x = 0; x < config.Perimeter; x++)
            {
                int id = gridData.GetCell(x, row);
                if (id != -1) _impactedBlockIDsCache.Add(id);
            }
        }

        _visualsToDieCache.Clear();
        _visualsToShakeCache.Clear();
        _dieVisualIDsCache.Clear();
        _shakeVisualIDsCache.Clear();
        _strippingBlockIDsCache.Clear();

        if (willWin)
        {
            CollectAllRemainingBlocks(fullRows);
        }
        else
        {
            foreach (int id in _impactedBlockIDsCache)
            {
                int currentLayer = gridData.GetBlockLayer(id);
                bool isArmorBreaking = currentLayer > 1;

                if (isArmorBreaking)
                {
                    _strippingBlockIDsCache.Add(id);
                }

                HashSet<Vector2Int> cells = gridData.GetCellsByBlockID(id);
                if (cells == null) continue;

                foreach (var cell in cells)
                {
                    GameObject visual = visualizer.GetVisual(cell.x, cell.y);
                    if (visual == null) continue;

                    int vid = visual.GetInstanceID();

                    if (isArmorBreaking)
                    {
                        if (_shakeVisualIDsCache.Add(vid))
                            _visualsToShakeCache.Add(visual);
                    }
                    else
                    {
                        if (_fullRowSetCache.Contains(cell.y))
                        {
                            if (_dieVisualIDsCache.Add(vid))
                                _visualsToDieCache.Add(visual);
                        }
                        else
                        {
                            if (_shakeVisualIDsCache.Add(vid))
                                _visualsToShakeCache.Add(visual);
                        }
                    }
                }
            }
        }

        await AnimatePreClear(_visualsToDieCache, _visualsToShakeCache);

        if (willWin)
        {
            _destroyedVisualIDsCache.Clear();
            ClearAllCollectedBlocks();
        }
        else
        {
            foreach (int id in _strippingBlockIDsCache)
            {
                gridData.DecreaseBlockLayer(id);
                StripBlockOuterLayer(id);
            }

            _blocksLostCellsCache.Clear();

            foreach (int id in _impactedBlockIDsCache)
            {
                if (_strippingBlockIDsCache.Contains(id)) continue;

                HashSet<Vector2Int> cells = gridData.GetCellsByBlockID(id);
                if (cells == null) continue;

                _cellsToProcessCache.Clear();
                foreach (var cell in cells)
                    _cellsToProcessCache.Add(cell);

                bool blockLostCells = false;

                foreach (var cell in _cellsToProcessCache)
                {
                    if (_fullRowSetCache.Contains(cell.y))
                    {
                        GameObject visual = visualizer.GetVisual(cell.x, cell.y);
                        if (visual != null)
                        {
                            SpawnBreakEffect(visual);
                            var blockVis = visual.GetComponent<BlockVisual>();
                            blockVis?.CleanupInnerMesh();
                            BlockFactory.Instance?.ReturnBlock(visual);
                            visualizer.ClearVisualReference(cell.x, cell.y);
                        }

                        gridData.SetCellWithoutHeightUpdate(cell.x, cell.y, -1);
                        blockLostCells = true;
                    }
                }

                if (blockLostCells)
                {
                    _blocksLostCellsCache.Add(id);

                    HashSet<Vector2Int> remainingCells = gridData.GetCellsByBlockID(id);
                    if (remainingCells != null && remainingCells.Count > 0 && meshLibrary?.full != null)
                    {
                        _seenCanonicalCache.Clear();
                        foreach (var cell in remainingCells)
                        {
                            int canonicalX = TwinColumnHelper.GetCanonicalColumn(cell.x, config);
                            if (_seenCanonicalCache.Add((canonicalX, cell.y)))
                            {
                                GameObject visual = visualizer.GetVisual(cell.x, cell.y);
                                if (visual != null)
                                {
                                    var blockVis = visual.GetComponent<BlockVisual>();
                                    blockVis?.ChangeMeshToFull(meshLibrary.full);
                                }
                            }
                        }
                    }
                }

                var floodRegistry = GridManager.Instance?.floodRegistry;
                if (floodRegistry != null && meshLibrary?.full != null)
                {
                    var othersToRevert = floodRegistry.BreakGroup(id);
                    if (othersToRevert != null)
                    {
                        _seenCanonicalCache.Clear();
                        foreach (int otherID in othersToRevert)
                        {
                            var otherCells = gridData.GetCellsByBlockID(otherID);
                            if (otherCells == null) continue;

                            foreach (var cell in otherCells)
                            {
                                int cx = TwinColumnHelper.GetCanonicalColumn(cell.x, config);
                                if (_seenCanonicalCache.Add((cx, cell.y)))
                                {
                                    GameObject visual = visualizer.GetVisual(cell.x, cell.y);
                                    var blockVis = visual?.GetComponent<BlockVisual>();
                                    blockVis?.ChangeMeshToFull(meshLibrary.full);
                                }
                            }
                        }
                    }
                }

                if (gridData.GetCellsByBlockID(id) == null)
                {
                    gridData.RemoveBlockLayer(id);
                }
            }

            SplitDisconnectedBlocks(_blocksLostCellsCache);
        }

        gridData.RecalculateHeights();

        await UniTask.Delay(System.TimeSpan.FromSeconds(0.2f));
    }

    private void StripBlockOuterLayer(int blockID)
    {
        HashSet<Vector2Int> cells = gridData.GetCellsByBlockID(blockID);
        if (cells == null) return;

        bool vfxSpawned = false;

        foreach (var cell in cells)
        {
            GameObject visual = visualizer.GetVisual(cell.x, cell.y);
            if (visual == null) continue;

            var blockVis = visual.GetComponent<BlockVisual>();
            if (blockVis != null)
            {
                blockVis.StripOuterLayer();

                if (blockVis.HasInnerMesh)
                {
                    blockVis.SetInnerVisible(false);
                }

                if (!vfxSpawned)
                {
                    SpawnBreakEffect(visual);
                    vfxSpawned = true;
                }
            }
        }
    }

    #endregion

    #region Split Disconnected Blocks

    private void SplitDisconnectedBlocks(HashSet<int> affectedBlockIDs)
    {
        foreach (int blockID in affectedBlockIDs)
        {
            HashSet<Vector2Int> remainingCells = gridData.GetCellsByBlockID(blockID);
            if (remainingCells == null || remainingCells.Count == 0) continue;

            GetCanonicalCellsCached(remainingCells);
            if (_canonicalCellsCache.Count <= 1) continue;

            FindConnectedComponentsCached();
            if (_componentsCache.Count <= 1) continue;

            _componentsCache.Sort((a, b) => GetMinY(a).CompareTo(GetMinY(b)));

            for (int i = 1; i < _componentsCache.Count; i++)
            {
                int newBlockID = GridManager.GetNextBlockID();

                foreach (Vector2Int cell in _componentsCache[i])
                {
                    gridData.SetCellWithoutHeightUpdate(cell.x, cell.y, newBlockID);
                }
            }
        }
    }

    private void GetCanonicalCellsCached(HashSet<Vector2Int> cells)
    {
        _seenCanonicalCache.Clear();
        _canonicalCellsCache.Clear();

        foreach (var cell in cells)
        {
            int canonicalX = TwinColumnHelper.GetCanonicalColumn(cell.x, config);

            if (_seenCanonicalCache.Add((canonicalX, cell.y)))
            {
                _canonicalCellsCache.Add(new Vector2Int(canonicalX, cell.y));
            }
        }
    }

    private void FindConnectedComponentsCached()
    {
        _componentsCache.Clear();
        _visitedCache.Clear();
        _cellSetCache.Clear();

        foreach (var cell in _canonicalCellsCache)
            _cellSetCache.Add(cell);

        int[] dx = { 0, 0, -1, 1 };
        int[] dy = { 1, -1, 0, 0 };

        foreach (var startCell in _canonicalCellsCache)
        {
            if (_visitedCache.Contains(startCell)) continue;

            HashSet<Vector2Int> component = new HashSet<Vector2Int>();
            _bfsQueueCache.Clear();

            _bfsQueueCache.Enqueue(startCell);
            _visitedCache.Add(startCell);

            while (_bfsQueueCache.Count > 0)
            {
                Vector2Int current = _bfsQueueCache.Dequeue();
                component.Add(current);

                for (int i = 0; i < 4; i++)
                {
                    int nx = current.x + dx[i];
                    int ny = current.y + dy[i];

                    nx = TwinColumnHelper.WrapX(nx, config);

                    int canonicalNX = TwinColumnHelper.GetCanonicalColumn(nx, config);
                    Vector2Int canonicalNeighbor = new Vector2Int(canonicalNX, ny);

                    if (!_visitedCache.Contains(canonicalNeighbor) && _cellSetCache.Contains(canonicalNeighbor))
                    {
                        _visitedCache.Add(canonicalNeighbor);
                        _bfsQueueCache.Enqueue(canonicalNeighbor);
                    }
                }
            }
            if (component.Count > 0) _componentsCache.Add(component);
        }
    }

    private int GetMinY(HashSet<Vector2Int> component)
    {
        int minY = int.MaxValue;
        foreach (var cell in component)
            if (cell.y < minY) minY = cell.y;
        return minY;
    }

    #endregion

    #region Win Explosion Helpers

    private void CollectAllRemainingBlocks(List<int> excludeRows)
    {
        _excludeRowSetCache.Clear();
        foreach (int r in excludeRows)
            _excludeRowSetCache.Add(r);

        int maxY = gridData.GetMaxHeight();

        for (int y = 0; y <= maxY; y++)
        {
            if (_excludeRowSetCache.Contains(y)) continue;

            for (int x = 0; x < config.Perimeter; x++)
            {
                int blockID = gridData.GetCell(x, y);
                if (blockID == -1) continue;

                _impactedBlockIDsCache.Add(blockID);

                GameObject visual = visualizer.GetVisual(x, y);
                if (visual == null) continue;

                int vid = visual.GetInstanceID();
                if (_dieVisualIDsCache.Add(vid))
                {
                    _visualsToDieCache.Add(visual);
                }
            }
        }
    }

    private void ClearAllCollectedBlocks()
    {
        int maxY = gridData.GetMaxHeight();

        for (int y = 0; y <= maxY; y++)
        {
            for (int x = 0; x < config.Perimeter; x++)
            {
                int blockID = gridData.GetCell(x, y);
                if (blockID == -1) continue;

                GameObject visual = visualizer.GetVisual(x, y);
                if (visual != null)
                {
                    int vid = visual.GetInstanceID();
                    if (_destroyedVisualIDsCache.Add(vid))
                    {
                        SpawnBreakEffect(visual);
                        var blockVis = visual.GetComponent<BlockVisual>();
                        blockVis?.CleanupInnerMesh();
                        BlockFactory.Instance?.ReturnBlock(visual);
                    }
                }

                visualizer.ClearVisualReference(x, y);
                gridData.SetCellWithoutHeightUpdate(x, y, -1);
            }
        }

        foreach (int blockID in _impactedBlockIDsCache)
        {
            gridData.RemoveBlockLayer(blockID);
        }
    }

    #endregion

    #region Gravity & Effects

    private async UniTask ApplyGravityUntilStable()
    {
        SimulateGravityToEnd();
        if (_finalPositionsCache.Count == 0) return;

        _fallDistancesCache.Clear();
        foreach (var kvp in _finalPositionsCache)
        {
            int blockID = kvp.Key;
            int finalLowestY = kvp.Value;
            int currentLowestY = GetLowestY(blockID);
            int fallDist = currentLowestY - finalLowestY;

            if (fallDist > 0)
            {
                _fallDistancesCache[blockID] = fallDist;
            }
        }

        if (_fallDistancesCache.Count == 0) return;

        UpdateVisualMappingBeforeMove();
        ApplyMovesToData();
        await AnimateMoves();

        EventBus<GravityLandedEvent>.Raise(new GravityLandedEvent());
    }

    private void UpdateVisualMappingBeforeMove()
    {
        _pendingMovesCache.Clear();
        _cellsToClearCache.Clear();

        foreach (var kvp in _fallDistancesCache)
        {
            int blockID = kvp.Key;
            int fallDist = kvp.Value;
            if (fallDist <= 0) continue;

            HashSet<Vector2Int> cells = gridData.GetCellsByBlockID(blockID);
            if (cells == null) continue;

            foreach (var cell in cells)
            {
                GameObject visual = visualizer.GetVisual(cell.x, cell.y);
                if (visual == null) continue;

                _cellsToClearCache.Add((cell.x, cell.y));
                int twinCol = TwinColumnHelper.GetTwinColumn(cell.x, config);
                if (twinCol != -1) _cellsToClearCache.Add((twinCol, cell.y));

                int newY = cell.y - fallDist;
                _pendingMovesCache.Add((cell.x, newY, visual));
            }
        }

        foreach (var clearPos in _cellsToClearCache)
            visualizer.ClearVisualReference(clearPos.x, clearPos.y);

        foreach (var move in _pendingMovesCache)
        {
            visualizer.SetVisual(move.x, move.y, move.visual);
            int twinCol = TwinColumnHelper.GetTwinColumn(move.x, config);
            if (twinCol != -1) visualizer.SetVisual(twinCol, move.y, move.visual);
        }
    }

    private void ApplyMovesToData()
    {
        _pendingWritesCache.Clear();
        _cellsToClearCache.Clear();

        foreach (var kvp in _fallDistancesCache)
        {
            int blockID = kvp.Key;
            int fallDist = kvp.Value;
            if (fallDist <= 0) continue;

            HashSet<Vector2Int> cells = gridData.GetCellsByBlockID(blockID);
            if (cells == null) continue;

            foreach (var cell in cells)
            {
                _cellsToClearCache.Add((cell.x, cell.y));
                int newY = cell.y - fallDist;
                _pendingWritesCache.Add((cell.x, newY, blockID));
            }
        }

        foreach (var cell in _cellsToClearCache)
            gridData.SetCellWithoutHeightUpdate(cell.x, cell.y, -1);

        foreach (var writeOp in _pendingWritesCache)
            gridData.SetCellWithoutHeightUpdate(writeOp.x, writeOp.y, writeOp.blockID);
    }

    private async UniTask AnimateMoves()
    {
        _animatedVisualIDsCache.Clear();
        _animationsCache.Clear();

        foreach (var kvp in _fallDistancesCache)
        {
            int blockID = kvp.Key;
            int fallDist = kvp.Value;
            if (fallDist <= 0) continue;

            HashSet<Vector2Int> newCells = gridData.GetCellsByBlockID(blockID);
            if (newCells == null) continue;

            foreach (var newCell in newCells)
            {
                GameObject visual = visualizer.GetVisual(newCell.x, newCell.y);
                if (visual == null) continue;

                int visualID = visual.GetInstanceID();
                if (_animatedVisualIDsCache.Contains(visualID)) continue;
                _animatedVisualIDsCache.Add(visualID);

                int oldY = newCell.y + fallDist;
                int canonicalX = TwinColumnHelper.GetCanonicalColumn(newCell.x, config);
                Vector3 startPos = visualizer.GetLocalPosition(canonicalX, oldY);
                Vector3 endPos = visualizer.GetLocalPosition(canonicalX, newCell.y);

                visual.transform.localPosition = startPos;
                _animationsCache.Add((visual, startPos, endPos));
            }
        }

        foreach (var anim in _animationsCache)
        {
            anim.obj.transform.DOKill();
            anim.obj.transform.DOLocalMove(anim.endPos, settings.fallDuration).SetEase(settings.fallEase);
        }

        if (_animationsCache.Count > 0)
            await UniTask.Delay(System.TimeSpan.FromSeconds(settings.fallDuration));
    }

    private void SimulateGravityToEnd()
    {
        int perimeter = config.Perimeter;
        int gridHeight = config.height;

        if (_virtualGrid == null || _virtualGrid.GetLength(0) != perimeter || _virtualGrid.GetLength(1) != gridHeight)
        {
            _virtualGrid = new int[perimeter, gridHeight];
        }

        _virtualRegistryCache.Clear();

        for (int x = 0; x < perimeter; x++)
        {
            for (int y = 0; y < gridHeight; y++)
            {
                int id = gridData.GetCell(x, y);
                _virtualGrid[x, y] = id;
                if (id != -1)
                {
                    if (!_virtualRegistryCache.TryGetValue(id, out var cells))
                    {
                        cells = new List<Vector2Int>();
                        _virtualRegistryCache[id] = cells;
                    }
                    cells.Add(new Vector2Int(x, y));
                }
            }
        }

        bool hasChanged = true;
        int safetyLoop = 0;

        while (hasChanged && safetyLoop < 20)
        {
            hasChanged = false;
            safetyLoop++;

            foreach (var kvp in _virtualRegistryCache)
            {
                int blockID = kvp.Key;
                List<Vector2Int> blockCells = kvp.Value;

                if (blockCells.Count == 0) continue;

                int fallDist = CalculateFallOnVirtualGrid(blockID, blockCells);
                if (fallDist > 0)
                {
                    foreach (var cell in blockCells)
                    {
                        _virtualGrid[cell.x, cell.y] = -1;
                        int twin = TwinColumnHelper.GetTwinColumn(cell.x, config);
                        if (twin != -1) _virtualGrid[twin, cell.y] = -1;
                    }

                    for (int i = 0; i < blockCells.Count; i++)
                    {
                        var cell = blockCells[i];
                        int newY = cell.y - fallDist;
                        _virtualGrid[cell.x, newY] = blockID;
                        int twin = TwinColumnHelper.GetTwinColumn(cell.x, config);
                        if (twin != -1) _virtualGrid[twin, newY] = blockID;

                        blockCells[i] = new Vector2Int(cell.x, newY);
                    }
                    hasChanged = true;
                }
            }
        }

        _finalPositionsCache.Clear();
        foreach (var kvp in _virtualRegistryCache)
        {
            int id = kvp.Key;
            List<Vector2Int> cells = kvp.Value;
            if (cells.Count == 0) continue;

            int minY = int.MaxValue;
            foreach (var cell in cells)
                if (cell.y < minY) minY = cell.y;
            _finalPositionsCache[id] = minY;
        }
    }

    private int CalculateFallOnVirtualGrid(int blockID, List<Vector2Int> blockCells)
    {
        int minFall = int.MaxValue;
        foreach (var cell in blockCells)
        {
            int fall = 0;
            for (int y = cell.y - 1; y >= 0; y--)
            {
                int idBelow = _virtualGrid[cell.x, y];
                if (idBelow == -1 || idBelow == blockID) fall++;
                else break;
            }
            if (fall < minFall) minFall = fall;
        }
        return minFall == int.MaxValue ? 0 : minFall;
    }

    #endregion

    #region Helpers & Effects

    private int GetLowestY(int blockID)
    {
        HashSet<Vector2Int> cells = gridData.GetCellsByBlockID(blockID);
        if (cells == null || cells.Count == 0) return 0;

        int minY = int.MaxValue;
        foreach (var cell in cells)
            if (cell.y < minY) minY = cell.y;
        return minY;
    }

    private async UniTask AnimatePreClear(List<GameObject> dyingVisuals, List<GameObject> affectedVisuals)
    {
        float swellDuration = 0.12f;
        float recoilDuration = 0.08f;
        float returnDuration = 0.15f;
        float maxScale = 1.2f;
        float recoilScale = 1.15f;

        List<UniTask> tasks = new List<UniTask>();

        foreach (var vis in dyingVisuals)
        {
            if (vis == null) continue;
            vis.transform.localScale = Vector3.one;
            vis.transform.DOKill();
            Sequence seq = DOTween.Sequence();
            seq.Append(vis.transform.DOScale(maxScale, swellDuration).SetEase(Ease.OutQuad));
            seq.Append(vis.transform.DOScale(recoilScale, recoilDuration).SetEase(Ease.InQuad));
            tasks.Add(seq.AsyncWaitForCompletion().AsUniTask());
        }

        foreach (var vis in affectedVisuals)
        {
            if (vis == null) continue;
            vis.transform.localScale = Vector3.one;
            vis.transform.DOKill();
            Sequence seq = DOTween.Sequence();
            seq.Append(vis.transform.DOScale(maxScale, swellDuration).SetEase(Ease.OutQuad));
            seq.Append(vis.transform.DOScale(recoilScale, recoilDuration).SetEase(Ease.InQuad));
            seq.Append(vis.transform.DOScale(1.0f, returnDuration).SetEase(Ease.OutBack));
            tasks.Add(seq.AsyncWaitForCompletion().AsUniTask());
        }

        if (tasks.Count > 0) await UniTask.WhenAll(tasks);
    }

    private static readonly Service<PoolingServiceAsync> _vfxPooling = new SonatFramework.Systems.Service<SonatFramework.Systems.ObjectPooling.PoolingServiceAsync>();

    private void SpawnBreakEffect(GameObject blockObj)
    {
        SpawnBreakEffectAsync(blockObj).Forget();
    }

    private async UniTaskVoid SpawnBreakEffectAsync(GameObject blockObj)
    {
        if (breakVfxPrefab == null)
        {
            Debug.LogError("Break VFX Prefab is NULL!");
            isPlayingEffect = false;
            return;
        }

        Vector3 pos = blockObj.transform.position;

        GameObject vfx = GameObject.Instantiate(breakVfxPrefab, pos, Quaternion.identity);
        if (!isPlayingEffect)
        {
            AudioManager.Instance.PlaySFX(AudioManager.Instance.merge);
            isPlayingEffect = true;
        }

        var effect = vfx.GetComponent<DualDirectionEffect>();
        if (effect != null)
        {
            var vis = blockObj.GetComponent<BlockVisual>();
            if (vis != null)
                effect.SetupAndPlay(vis.CurrentMaterial);
        }

        GameObject.Destroy(vfx, 2f);

        await UniTask.Delay(200); // delay nhỏ tránh spam
        isPlayingEffect = false;
    }

    public static async UniTask PreloadEffects()
    {
        if (ObjectPoolManager.Instance != null)
        {
            await ObjectPoolManager.Instance.PreloadAssetAsync(VFX_DUAL_KEY);
        }
    }

    #endregion

    #region Public Gravity API

    public async UniTask ApplyGravityPublic()
    {
        await ApplyGravityUntilStable();
    }

    #endregion
}