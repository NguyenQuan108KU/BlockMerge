// Không cần using Base.Singleton vì SingletonSimple nằm ở global namespace
using SonatFramework.Systems.EventBus;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

public class GridManager : SingletonSimple<GridManager>
{
    public GameConfig config;
    [Header("VFX")]
    public DualDirectionEffect breakEffectPrefab;
    [Header("Resources")]
    public CellMeshLibrary meshLibrary;

    #region Modules (Internal)
    public FloodGroupRegistry floodRegistry { get; private set; }
    public GridData gridData;
    public GridVisualizer visualizer;
    private GridRowClearer rowClearer;
    private GridLevelSpawner levelSpawner;
    private GridFloorSpawner floorSpawner;


    private static int _globalBlockID = 10000;
    private Transform _floorContainer;

    // [TIER2] Cache TowerController — tránh FindFirstObjectByType 3 lần
    private Transform _cachedTowerContainer;

    #endregion
    public GameObject vfx;

    #region Public Properties

    public int Perimeter => config.Perimeter;
    public int faceWidth => config.faceWidth;
    public float tileSize => config.tileSize;

    #endregion

    #region Unity Lifecycle

    protected override void OnAwake()
    {
        base.OnAwake();

        // Khởi tạo dummy data ngay lập tức để tránh NullReferenceException
        // nếu có script nào lỡ gọi GridManager trước khi Setup
        gridData = new GridData(0, 0, 0);
    }

    private void Start()
    {
        // [QUAN TRỌNG] Đã BỎ InitializeModules() ở đây.
        // GridManager sẽ ngồi im chờ GameManager gọi hàm Setup().

        // Chỉ preload effect (không ảnh hưởng logic)
        GridRowClearer.PreloadEffects();
    }

    #endregion

    #region Initialization & Setup (MỚI)

    public void Setup(LevelDataSO levelData)
    {
        // 1. Nhận Config từ LevelData
        if (levelData != null)
        {
            config.SyncFromLevelData(levelData);
        }
        else
        {
            config.ResetToDefault();
        }

        // 2. [TIER2] Tìm Tower 1 lần, cache lại — tránh FindFirstObjectByType mỗi lần gọi
        if (_cachedTowerContainer == null)
        {
            var tower = FindFirstObjectByType<TowerController>();
            _cachedTowerContainer = tower != null ? tower.towerContainer : transform;
        }
        Transform towerContainer = _cachedTowerContainer;

        // === FIX: Clear visualizer CŨ trước khi tạo mới ===
        if (visualizer != null)
        {
            visualizer.ClearAll();
        }
        // ===================================================

        // 3. Khởi tạo Modules (Tái sinh toàn bộ hệ thống Grid)
        floodRegistry = new FloodGroupRegistry();
        gridData = new GridData(config.Perimeter, config.height, config.faceWidth);
        visualizer = new GridVisualizer(config, towerContainer);
        rowClearer = new GridRowClearer(config, gridData, visualizer, vfx);
        levelSpawner = new GridLevelSpawner(config, gridData, visualizer, meshLibrary);

        if (floorSpawner == null) floorSpawner = new GridFloorSpawner();

        Debug.Log($"[GridManager] Setup Complete! W:{config.faceWidth} P:{config.Perimeter}");
    }

    public static int GetNextBlockID()
    {
        return ++_globalBlockID;
    }

    // Giữ lại hàm này để tương thích nếu code cũ có gọi (Wrapper cho Setup)
    public void SyncConfigFromLevel(LevelDataSO levelData)
    {
        Setup(levelData);
    }

    #endregion

    #region Floor Operations

    public void SpawnFloor(GameObject floorPrefab, Transform container)
    {
        if (floorSpawner == null)
        {
            floorSpawner = new GridFloorSpawner();
        }

        _floorContainer = container;
        floorSpawner.SpawnFloor(config.faceWidth, floorPrefab, container, config.tileSize);
    }

    public void SpawnFloorFromLevelData(LevelDataSO levelData, Transform container)
    {
        if (levelData == null || !levelData.HasFloorPrefab)
        {
            Debug.LogWarning("[GridManager] LevelData or FloorPrefab is null!");
            return;
        }

        SpawnFloor(levelData.floorPrefab, container);
    }

    public void ClearFloor()
    {
        if (floorSpawner != null)
        {
            if (_floorContainer != null)
            {
                floorSpawner.ClearFloorInContainer(_floorContainer);
            }
            else
            {
                floorSpawner.ClearFloor();
            }
        }
    }

    #endregion

    #region Cell Operations

    public int CountFullRows(HashSet<int> rowsToCheck)
    {
        int count = 0;
        foreach (int r in rowsToCheck)
            if (gridData.IsRowFull(r)) count++;
        return count;
    }

    public void RegisterCell(float logicX, int blockID, GameObject visualBlock, HashSet<int> affectedRows, int specificRow)
    {
        int col = gridData.GetWrappedX(Mathf.RoundToInt(logicX));

        ApplyLandingToColumn(col, blockID, visualBlock, specificRow);
        affectedRows.Add(specificRow);
    }

    private int ApplyLandingToColumn(int col, int blockID, GameObject visualBlock, int targetRow)
    {
        if (targetRow >= config.maxHeight)
            return -1;

        if (targetRow >= config.height) return -1;

        if (visualizer.IsVisualSlotOccupied(col, targetRow, visualBlock))
        {
            if (visualBlock != null)
            {
                if (BlockFactory.Instance != null)
                    BlockFactory.Instance.ReturnBlock(visualBlock);
                else
                    Destroy(visualBlock);
            }
            return targetRow;
        }

        gridData.SetCell(col, targetRow, blockID);
        visualizer.SetVisual(col, targetRow, visualBlock);

        return targetRow;
    }

    public void ForceClearCell(int logicX, int logicY)
    {
        int safeX = gridData.GetWrappedX(logicX);

        if (gridData.IsValid(safeX, logicY))
        {
            gridData.SetCell(safeX, logicY, -1);
            visualizer.ClearVisualReference(safeX, logicY);
        }
    }

    public bool IsCellOccupied(int x, int y)
    {
        int safeX = gridData.GetWrappedX(x);
        return gridData.HasBlock(safeX, y);
    }

    #endregion

    #region Landing Calculations

    public float GetLandingY(float logicX)
    {
        int colIndex = gridData.GetWrappedX(Mathf.RoundToInt(logicX));
        return gridData.GetColumnHeight(colIndex) * tileSize;
    }

    public float GetLandingYForShape(List<Vector2Int> offsets, float pivotX)
    {
        return GetLandingRowForShape(offsets, pivotX) * tileSize;
    }

    public int GetLandingRowForShape(List<Vector2Int> offsets, float pivotX)
    {
        return GetLandingRowForShapeSafe(offsets, pivotX);
    }

    private int GetLandingRowForShapeSafe(List<Vector2Int> offsets, float pivotX)
    {
        if (offsets == null || offsets.Count == 0) return 0;

        int pivotCol = Mathf.RoundToInt(pivotX);

        int maxHeight = 0;
        foreach (var offset in offsets)
        {
            int col = gridData.GetWrappedX(pivotCol + offset.x);
            int h = gridData.GetColumnHeight(col);
            if (h > maxHeight) maxHeight = h;
        }

        for (int testY = maxHeight + 5; testY >= 0; testY--)
        {
            bool canPlace = true;

            foreach (var offset in offsets)
            {
                int col = gridData.GetWrappedX(pivotCol + offset.x);
                int cellY = testY + offset.y;

                if (cellY >= 0 && cellY < config.height)
                {
                    if (gridData.HasBlock(col, cellY))
                    {
                        canPlace = false;
                        break;
                    }
                }
            }

            if (canPlace)
            {
                bool hasSupport = false;
                foreach (var offset in offsets)
                {
                    int col = gridData.GetWrappedX(pivotCol + offset.x);
                    int belowY = testY + offset.y - 1;

                    if (belowY < 0)
                    {
                        hasSupport = true;
                        break;
                    }

                    if (belowY < config.height)
                    {
                        if (gridData.HasBlock(col, belowY))
                        {
                            hasSupport = true;
                            break;
                        }
                    }
                }

                if (hasSupport)
                {
                    return testY;
                }
            }
        }

        return 0;
    }

    public int GetWrappedX(int rawX) => gridData.GetWrappedX(rawX);

    #endregion

    #region Row Operations

    public async Task CheckAndClearRowsAsync(HashSet<int> rowsToCheck)
    {
        await rowClearer.CheckAndClearRowsAsync(rowsToCheck);
    }

    public async Task ApplyGravityAsync()
    {
        await rowClearer.ApplyGravityPublic();
    }

    #endregion

    #region Level Operations

    public async Task SpawnLevelMap(List<PreplacedBlockData> mapData)
    {
        // [TIER2] Dùng cached reference thay vì FindFirstObjectByType
        await levelSpawner.SpawnLevelMap(mapData, _cachedTowerContainer ?? transform);
    }

    #endregion

    #region Map Operations

    public void ClearMap()
    {
        if (visualizer == null)
        {
            Setup(null);
        }

        if (visualizer != null) visualizer.ClearAll();

        ClearFloor();

        gridData = new GridData(Perimeter, config.height, config.faceWidth);
        floodRegistry = new FloodGroupRegistry();

        if (visualizer != null)
        {
            rowClearer = new GridRowClearer(config, gridData, visualizer, vfx);
            levelSpawner = new GridLevelSpawner(config, gridData, visualizer, meshLibrary);
        }
    }

    #endregion

    #region Position Helpers

    public Vector3 GetLocalPosition(float logicX, int logicY)
    {
        // Check null để tránh crash nếu gọi quá sớm
        if (visualizer == null) return Vector3.zero;
        return visualizer.GetLocalPosition(logicX, logicY);
    }

    #endregion

    #region Utility Helpers

    public void RecalculateHeightsPublic() => gridData.RecalculateHeights();
    public int GetMaxHeightCurrent() => gridData.GetMaxHeight();
    public int GetColumnHeightAt(int x) => gridData.GetColumnHeight(gridData.GetWrappedX(x));
    public int GetFaceMaxHeight(int faceIndex) => gridData.GetFaceMaxHeight(faceIndex);

    public void ValidateIntegrity()
    {
        bool dataOK = gridData.ValidateDataIntegrity();
        bool visualOK = visualizer.ValidateVisualIntegrity();

        if (dataOK && visualOK)
        {
            Debug.Log("[GridManager] All integrity checks passed!");
        }
    }

    public void DebugPrintAll()
    {
        gridData.DebugPrint();
    }

    #endregion

    #region Booster Support

    public async Task ForceClearRow(int row)
    {
        if (rowClearer == null) return;

        // Collect blockIDs trước khi xóa
        var affectedFloodIDs = new HashSet<int>();

        for (int x = 0; x < config.Perimeter; x++)
        {
            int blockID = gridData.GetCell(x, row);
            if (blockID == -1) continue;

            // Track flood blocks để break group sau
            if (floodRegistry != null && floodRegistry.IsFloodBlock(blockID))
                affectedFloodIDs.Add(blockID);

            GameObject visual = visualizer.GetVisual(x, row);
            if (visual != null)
            {
                BlockFactory.Instance?.ReturnBlock(visual);
                visualizer.ClearVisualReference(x, row);
            }

            gridData.SetCellWithoutHeightUpdate(x, row, -1);
        }

        // Break flood groups + revert remaining cells
        if (floodRegistry != null && meshLibrary?.full != null)
        {
            foreach (int blockID in affectedFloodIDs)
            {
                var othersToRevert = floodRegistry.BreakGroup(blockID);
                if (othersToRevert == null) continue;

                foreach (int otherID in othersToRevert)
                {
                    var otherCells = gridData.GetCellsByBlockID(otherID);
                    if (otherCells == null) continue;

                    foreach (var cell in otherCells)
                    {
                        GameObject vis = visualizer.GetVisual(cell.x, cell.y);
                        var bv = vis?.GetComponent<BlockVisual>();
                        bv?.ChangeMeshToFull(meshLibrary.full);
                    }
                }
            }
        }

        EventBus<RowsClearedEvent>.Raise(new RowsClearedEvent
        {
            RowCount = 1,
            ComboCount = 0,
            TotalScoreAdded = 0
        });

        await CheckAndClearRowsAsync(new HashSet<int> { row });
    }

    #endregion
}