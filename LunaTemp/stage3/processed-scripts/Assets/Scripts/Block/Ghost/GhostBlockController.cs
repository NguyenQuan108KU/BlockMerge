using UnityEngine;
using System.Threading;
using System.Collections.Generic;
using SonatFramework.Systems.EventBus;
using System.Threading.Tasks;

[RequireComponent(typeof(MeshFilter))]
[RequireComponent(typeof(MeshRenderer))]
public class GhostBlockController : BaseBlock
{
    [Header("Ghost Visuals")]
    [SerializeField] private BlockPaletteSO palette;

    // Components
    private MeshFilter _meshFilter;
    private MeshRenderer _meshRenderer;
    private ActiveBlockController _targetBlock;

    private CancellationTokenSource _cts;
    private bool _isInitialized = false;
    private bool _isSystemEnabled = true;

    private List<BlockVisual> _activePreviews = new List<BlockVisual>();

    // [PERF] Dirty check — skip UpdateScorePreview khi ghost position không đổi
    private int _lastSnappedX = int.MinValue;
    private int _lastLandingRow = int.MinValue;
    private bool _previewDirty = true;

    // Bindings
    private EventBinding<BlockSpawnedEvent> spawnBinding;
    private EventBinding<BlockLandedEvent> landedBinding;
    private EventBinding<BlockMovedEvent> moveBinding;
    private EventBinding<InputDragEndedEvent> dragEndBinding;
    private EventBinding<GhostVisibilityEvent> visibilityBinding;
    private EventBinding<UndoPerformedEvent> undoBinding;

    public ActiveBlockController existingBlock;
    #region Unity Lifecycle

    protected override void Awake()
    {
        base.Awake();
        _meshFilter = GetComponent<MeshFilter>();
        _meshRenderer = GetComponent<MeshRenderer>();

        _meshRenderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
        _meshRenderer.receiveShadows = false;
        //_meshRenderer.allowOcclusionWhenDynamic = false;
        _meshRenderer.enabled = false;
    }

    private void OnEnable()
    {
        spawnBinding = new EventBinding<BlockSpawnedEvent>(e => HandleSpawn(e.BlockController));
        landedBinding = new EventBinding<BlockLandedEvent>(e => HandleLanded());
        moveBinding = new EventBinding<BlockMovedEvent>(e => HandleBlockMoving());
        dragEndBinding = new EventBinding<InputDragEndedEvent>(e => HandleInputEnded());
        visibilityBinding = new EventBinding<GhostVisibilityEvent>(e => SetSystemVisibility(e.IsVisible));
        undoBinding = new EventBinding<UndoPerformedEvent>(e => HandleUndo(e.RestoredShape));
    }

    private void OnDisable()
    {
        spawnBinding?.Dispose();
        landedBinding?.Dispose();
        moveBinding?.Dispose();
        dragEndBinding?.Dispose();
        visibilityBinding?.Dispose();
        undoBinding?.Dispose();

        RevertPreviewEffects();
        CancelCurrentTask();
    }

    private void Start()
    {
        if (existingBlock != null && existingBlock.IsReady)
        {
            HandleSpawn(existingBlock);
        }
    }

    #endregion

    #region Event Handlers

    private void HandleSpawn(ActiveBlockController activeBlock)
    {
        _targetBlock = activeBlock;
        _lastSnappedX = int.MinValue;
        _lastLandingRow = int.MinValue;
        _previewDirty = true;
        RefreshGhost(null);
    }

    private void HandleUndo(BlockShapeSO newShape)
    {
        if (_targetBlock != null) RefreshGhost(newShape);
    }

    private void HandleLanded()
    {
        EventBus<GhostLandingUpdatedEvent>.Raise(new GhostLandingUpdatedEvent { TopRow = -1 });
        SetGhostVisible(false);
        RevertPreviewEffects();


        _lastLandingRow = int.MinValue;
        _previewDirty = true;
    }

    private void HandleInputEnded()
    {
        EventBus<GhostLandingUpdatedEvent>.Raise(new GhostLandingUpdatedEvent { TopRow = -1 });
        SetGhostVisible(false);
        RevertPreviewEffects();
    }

    private void HandleBlockMoving()
    {
        if (!_isSystemEnabled || _targetBlock == null) return;

        if (!_isInitialized)
        {
            TryInitFromCurrentShape();
            if (!_isInitialized) return;
        }

        UpdateGhostPosition();

        if (!_meshRenderer.enabled)
        {
            SetGhostVisible(true);
            _previewDirty = true;
        }

        if (_previewDirty)
        {
            _previewDirty = false;
            UpdateScorePreview();
        }
    }


    private void SetSystemVisibility(bool isVisible)
    {
        _isSystemEnabled = isVisible;

        if (isVisible)
        {
            // [FIX] Ghost chỉ hiện khi active block thực sự sẵn sàng.
            // Sau khi drop, _targetBlock vẫn giữ reference (reuse object)
            // nhưng IsReady = false / IsDropping = true → ghost không nên hiện.
            if (_targetBlock != null && _targetBlock.IsReady && !_targetBlock.IsDropping)
            {
                // [FIX] Self-healing: retry init nếu chưa initialized
                if (!_isInitialized)
                    TryInitFromCurrentShape();

                if (_isInitialized)
                {
                    UpdateGhostPosition();
                    SetGhostVisible(true);
                    _previewDirty = true;
                    UpdateScorePreview();
                }
            }
        }
        else
        {
            SetGhostVisible(false);
            RevertPreviewEffects();
        }
    }

    #endregion

    #region Core Logic: Mesh Building

    /// <summary>
    /// [FIX] Self-healing helper — check shape sẵn sàng thì init ngay.
    /// Được gọi từ HandleBlockMoving và SetSystemVisibility khi _isInitialized = false.
    /// </summary>
    private void TryInitFromCurrentShape()
    {
        var shape = _targetBlock?.CurrentShape;
        if (shape != null && shape.structuralOffsets.Count > 0)
        {
            CancelCurrentTask();
            InitializeGhostImmediate(shape);
        }
    }

    private void RefreshGhost(BlockShapeSO overrideShape)
    {
        _isInitialized = false;
        SetGhostVisible(false);
        CancelCurrentTask();
        RevertPreviewEffects();

        BlockShapeSO shapeToUse = overrideShape ?? _targetBlock?.CurrentShape;
        if (shapeToUse != null && shapeToUse.structuralOffsets.Count > 0)
        {
            InitializeGhostImmediate(shapeToUse);
            return;
        }

        _cts = new CancellationTokenSource();
        InitializeGhostSafeAsync(_cts.Token, overrideShape);
    }

    /// <summary>
    /// [FIX] Không gọi base.InitializeShape nữa.
    /// Ghost chỉ cần CurrentShape reference + combined mesh riêng.
    /// base.InitializeShape tạo child cells (cần cellPrefab) → crash nếu cellPrefab null
    /// → rồi DestroyImmediate xoá hết children ngay sau → hoàn toàn vô nghĩa.
    /// </summary>
    private void InitializeGhostImmediate(BlockShapeSO shape)
    {
        // Chỉ lưu reference, KHÔNG gọi base.InitializeShape
        CurrentShape = shape;
        if (grid == null) grid = GridManager.Instance;

        // Clear children cũ (nếu có từ base.InitializeShape lần trước)
        int childCount = transform.childCount;
        for (int i = childCount - 1; i >= 0; i--)
            DestroyImmediate(transform.GetChild(i).gameObject);
        if (blockVisuals != null) blockVisuals.Clear();

        RebuildGhostMeshSmart(shape);

        if (palette != null && palette.ghostMaterial != null)
            _meshRenderer.material = palette.ghostMaterial;

        _isInitialized = true;

        if (_isSystemEnabled)
        {
            UpdateGhostPosition();
            SetGhostVisible(true);
        }
    }

    private async Task InitializeGhostSafeAsync(
[Bridge.Ref]         CancellationToken token,
        BlockShapeSO overrideShape = null)
    {
        float timeout = 2.0f;
        float timer = 0f;

        while (true)
        {
            if (token.IsCancellationRequested)
                return;

            BlockShapeSO targetShape = overrideShape ?? _targetBlock?.CurrentShape;

            if (targetShape != null &&
                targetShape.structuralOffsets != null &&
                targetShape.structuralOffsets.Count > 0)
                break;

            timer += Time.deltaTime;

            if (timer > timeout)
                return;
            await Task.Delay(16, token);
        }

        BlockShapeSO shapeToUse = overrideShape ?? _targetBlock?.CurrentShape;

        if (shapeToUse == null)
            return;

        InitializeGhostImmediate(shapeToUse);
    }

    private void RebuildGhostMeshSmart(BlockShapeSO shape)
    {
        if (_meshFilter.sharedMesh != null) DestroyImmediate(_meshFilter.sharedMesh);

        var gm = GridManager.Instance;
        if (gm == null || gm.meshLibrary == null)
        {
            RebuildGhostMeshFromLibrary(shape);
            return;
        }

        var offsets = shape.structuralOffsets;
        int count = offsets.Count;
        float tileSize = gm.tileSize;

        HashSet<Vector2Int> offsetSet = new HashSet<Vector2Int>(offsets);
        CombineInstance[] combine = new CombineInstance[count];

        for (int i = 0; i < count; i++)
        {
            Mesh resolved = SmartMeshResolver.Resolve(offsets[i], offsetSet, gm.meshLibrary);
            combine[i].mesh = resolved ?? gm.meshLibrary.full;
            combine[i].transform = Matrix4x4.TRS(
                new Vector3(offsets[i].x * tileSize, offsets[i].y * tileSize, 0),
                Quaternion.identity,
                Vector3.one
            );
        }

        UnityEngine.Mesh finalMesh = new UnityEngine.Mesh();
        finalMesh.name = "Ghost_Smart";
        finalMesh.CombineMeshes(combine, true, true);
        _meshFilter.mesh = finalMesh;
    }

    private void RebuildGhostMeshFromLibrary(BlockShapeSO shape)
    {
        if (GridManager.Instance == null || GridManager.Instance.meshLibrary == null) return;
        Mesh templateMesh = GridManager.Instance.meshLibrary.full;
        if (templateMesh == null) return;

        int count = shape.structuralOffsets.Count;
        CombineInstance[] combine = new CombineInstance[count];
        float tileSize = GridManager.Instance.tileSize;

        for (int i = 0; i < count; i++)
        {
            combine[i].mesh = templateMesh;
            Vector3 localPos = new Vector3(
                shape.structuralOffsets[i].x * tileSize,
                shape.structuralOffsets[i].y * tileSize,
                0
            );
            combine[i].transform = Matrix4x4.TRS(localPos, Quaternion.identity, Vector3.one);
        }

        UnityEngine.Mesh finalMesh = new UnityEngine.Mesh();
        finalMesh.name = "Ghost_Fallback";
        finalMesh.CombineMeshes(combine, true, true);
        _meshFilter.mesh = finalMesh;
    }

    #endregion

    #region Position & Logic

    private void UpdateGhostPosition()
    {
        if (_targetBlock == null || CurrentShape == null || grid == null) return;

        float rawLogicX = _targetBlock.LogicX;
        float snappedLogicX = Mathf.Round(rawLogicX);

        float landingY = grid.GetLandingYForShape(CurrentShape.structuralOffsets, snappedLogicX);
        landingY += grid.tileSize / 2f;

        int landingRow = Mathf.FloorToInt(landingY / grid.tileSize);
        int snappedX = Mathf.RoundToInt(snappedLogicX);

        if (snappedX != _lastSnappedX || landingRow != _lastLandingRow)
        {
            _lastSnappedX = snappedX;
            _lastLandingRow = landingRow;
            _previewDirty = true;

            int topRow = landingRow + CurrentShape.height;
            EventBus<GhostLandingUpdatedEvent>.Raise(new GhostLandingUpdatedEvent { TopRow = topRow });
        }

        Vector3 worldPos = grid.GetLocalPosition(snappedLogicX, landingRow);
        transform.localPosition = worldPos;
        transform.localRotation = _targetBlock.transform.localRotation;
    }

    private void SetGhostVisible(bool isVisible)
    {
        if (_meshRenderer != null)
        {
            _meshRenderer.enabled = isVisible;
        }
    }

    private void CancelCurrentTask()
    {
        if (_cts != null) { _cts.Cancel(); _cts.Dispose(); _cts = null; }
    }

    // [PERF] Reuse collections
    private readonly List<Vector2Int> _ghostCellsCache = new List<Vector2Int>();
    private readonly HashSet<int> _predictedRowSet = new HashSet<int>();
    private readonly HashSet<int> _affectedBlockIDs = new HashSet<int>();
    private readonly HashSet<int> _processedVisualIDs = new HashSet<int>();

    private void UpdateScorePreview()
    {
        RevertPreviewEffects();

        if (GridManager.Instance == null || CurrentShape == null || _targetBlock == null) return;

        GridData gridData = GridManager.Instance.gridData;
        if (gridData == null || GridManager.Instance.visualizer == null) return;

        GridManager gm = GridManager.Instance;
        float logicX = _targetBlock.LogicX;
        float landingY = gm.GetLandingYForShape(CurrentShape.structuralOffsets, logicX);
        int landingRow = Mathf.FloorToInt((landingY + gm.tileSize / 2f) / gm.tileSize);
        int wrappedX = gm.GetWrappedX(Mathf.RoundToInt(logicX));

        _ghostCellsCache.Clear();
        foreach (var offset in CurrentShape.structuralOffsets)
        {
            int cx = gm.GetWrappedX(wrappedX + offset.x);
            int cy = landingRow + offset.y;
            _ghostCellsCache.Add(new Vector2Int(cx, cy));

            int twinCol = gridData.GetTwinColumn(cx);
            if (twinCol != -1)
            {
                _ghostCellsCache.Add(new Vector2Int(twinCol, cy));
            }
        }

        List<int> predictedRows = gridData.GetPredictedFullRows(_ghostCellsCache);
        if (predictedRows.Count == 0) return;

        _predictedRowSet.Clear();
        foreach (int row in predictedRows) _predictedRowSet.Add(row);

        Mesh fullMesh = gm.meshLibrary != null ? gm.meshLibrary.full : null;

        _affectedBlockIDs.Clear();
        foreach (int row in predictedRows)
        {
            for (int x = 0; x < gm.Perimeter; x++)
            {
                int id = gridData.GetCell(x, row);
                if (id != -1) _affectedBlockIDs.Add(id);
            }
        }

        _processedVisualIDs.Clear();

        foreach (int id in _affectedBlockIDs)
        {
            var cells = gridData.GetCellsByBlockID(id);
            if (cells == null) continue;

            // Check: tất cả cells đều nằm trong predicted rows?
            bool allInPredicted = true;
            foreach (var cell in cells)
            {
                if (!_predictedRowSet.Contains(cell.y))
                {
                    allInPredicted = false;
                    break;
                }
            }

            foreach (var cell in cells)
            {
                if (!_predictedRowSet.Contains(cell.y)) continue;

                GameObject obj = gm.visualizer.GetVisual(cell.x, cell.y);
                if (obj == null) continue;

                int instanceID = obj.GetInstanceID();
                if (!_processedVisualIDs.Add(instanceID)) continue;

                if (obj.TryGetComponent<BlockVisual>(out var blockVis))
                {
                    Mesh meshToUse = allInPredicted ? fullMesh : null;
                    blockVis.SetPreviewState(true, meshToUse, palette.previewOverlayMaterial);
                    _activePreviews.Add(blockVis);
                }
            }
        }
    }

    private void RevertPreviewEffects()
    {
        if (_activePreviews.Count == 0) return;
        foreach (var vis in _activePreviews)
        {
            if (vis != null) vis.SetPreviewState(false);
        }
        _activePreviews.Clear();
    }

    #endregion
}