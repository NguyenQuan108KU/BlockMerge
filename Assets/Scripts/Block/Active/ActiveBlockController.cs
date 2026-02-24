using Cysharp.Threading.Tasks;
using SonatFramework.Systems.EventBus;
using System;
using System.Collections.Generic;
using UnityEngine;

public class ActiveBlockController : BaseBlock
{
    [Header("Settings")]
    [SerializeField] private float faceSwitchThreshold = 0.4f;

    [Header("Special Icons")]
    [SerializeField] private Sprite floodIcon;

    public int LastLandingRow => data.lastLandingRow;
    public int LastLandingX => data.lastLandingX;
    public int LastLandingY => data.lastLandingY;

    #region Constants

    private const float ICON_Z_OFFSET = -0.51f;
    private const float ICON_SCALE = 0.3f;
    private const float COMPENSATION_LERP_TIME = 0.05f;

    #endregion

    #region Modules

    private ActiveBlockData data;
    private ActiveBlockMovement movement;
    private ActiveBlockVisuals visuals;
    private TowerHeightController _heightController;
    private LandingPipeline _landingPipeline;

    private float _inertiaTilt;
    private float _visualOffsetY;
    private bool _isRotatingMode;
    private bool _isFloodBlock;
    private bool _isCompensating;
    private bool _useAutoCenter;
    private float _autoCenterTarget;
    private float _localXVelocity;
    private float _autoCenterSmoothTime = 0.18f;
    private float _cachedGridRadius;
    private float _cachedTileSize;
    private float _cachedCenterOffset;

    // [FIX] Snapshot vị trí tại thời điểm drop.
    // Khi user xoay tháp lúc block đang rơi, FlipFace đổi currentFaceIndex
    // nhưng LandAt phải ghi data ở vị trí CŨ (nơi block thực sự rơi).
    private int _dropFaceIndex;
    private float _dropLocalX;

    private EventBinding<InputMoveEvent> moveInputBinding;
    private readonly List<GameObject> _specialIconObjects = new();

    #endregion

    #region Public Properties

    public bool IsCompensating
    {
        get => _isCompensating;
        set => _isCompensating = value;
    }

    public float VisualOffsetY
    {
        get => _visualOffsetY;
        set => _visualOffsetY = value;
    }

    public bool IsFloodBlock
    {
        get => _isFloodBlock;
        set
        {
            _isFloodBlock = value;
            if (_isFloodBlock && floodIcon != null)
            {
                SpawnFloodIcon(floodIcon);
            }
        }
    }

    public int currentFaceIndex
    {
        get => data.currentFaceIndex;
        set => data.currentFaceIndex = value;
    }

    public float localX
    {
        get => data.localX;
        set => data.localX = value;
    }

    public float LogicX => data.GetLogicX(GridManager.Instance?.faceWidth ?? 6);

    public int LogicY
    {
        get => data.logicY;
        set => data.logicY = value;
    }

    public int blockID
    {
        get => data.blockID;
        set => data.blockID = value;
    }

    public bool IsDropping => data.isDropping;
    public bool IsReady => data.isReady;

    public Material CurrentMaterial => data.currentMaterial;
    public event Action<Material> OnMaterialChanged
    {
        add => data.OnMaterialChanged += value;
        remove => data.OnMaterialChanged -= value;
    }

    #endregion

    #region Unity Lifecycle

    protected override void Awake()
    {
        base.Awake();
        InitializeModules();
    }

    private void OnEnable()
    {
        moveInputBinding = new EventBinding<InputMoveEvent>(OnInputMove);
    }

    private void OnDisable()
    {
        moveInputBinding?.Dispose();
    }

    private void Start() { }

    public void ManualSetup(GridManager gridRef)
    {
        this.grid = gridRef;
        if (this.grid == null) return;

        movement = new ActiveBlockMovement(grid) { FaceSwitchThreshold = faceSwitchThreshold };
        movement.OnFaceChanged = (oldFace, newFace) =>
        {
            EventBus<FaceChangedEvent>.Raise(new FaceChangedEvent
            {
                OldFaceIndex = oldFace,
                NewFaceIndex = newFace
            });
        };
        visuals = new ActiveBlockVisuals(transform, grid);

        _cachedTileSize = grid.tileSize;
        _cachedGridRadius = grid.config.GridRadius;
        float faceWidthUnits = grid.faceWidth * _cachedTileSize;
        _cachedCenterOffset = (faceWidthUnits / 2f) - (_cachedTileSize / 2f);
        _heightController = transform.parent?.GetComponent<TowerHeightController>();
        _landingPipeline = new LandingPipeline(grid);
    }

    public void Reset()
    {
        if (grid == null || visuals == null)
        {
            transform.localScale = Vector3.zero;
            return;
        }

        visuals.StopAllAnimations();
        visuals.UpdateVisuals(data, false);
        transform.localScale = Vector3.zero;
        data.ResetForNewBlock();
        DestroySpecialIcons();
        _isFloodBlock = false;
        _visualOffsetY = 0f;
        _useAutoCenter = false;
        _localXVelocity = 0f;
        _isCompensating = false;
        _isRotatingMode = false;
        _inertiaTilt = 0f;
        _dropFaceIndex = 0;
        _dropLocalX = 0f;
    }

    private void OnInputMove(InputMoveEvent e)
    {
        if (grid == null || IsDropping) return;
        MoveHorizontal(e.Direction);
    }

    public void SetRotatingMode(bool isRotating) => _isRotatingMode = isRotating;
    public void SetInertiaTilt(float angle) => _inertiaTilt = angle;

    private void LateUpdate()
    {
        if (data == null || !data.isReady || data.isDropping || grid == null) return;

        // ── Compensation Y offset ──
        if (_isCompensating && _heightController != null)
        {
            float targetOffset = -_heightController.TargetOffset;
            float lerpFactor = 1f - Mathf.Pow(0.01f, Time.deltaTime / COMPENSATION_LERP_TIME);
            _visualOffsetY = Mathf.Lerp(_visualOffsetY, targetOffset, lerpFactor);
        }

        // ── Auto center (sau button rotate) ──
        if (_useAutoCenter)
        {
            data.localX = Mathf.SmoothDamp(data.localX, _autoCenterTarget, ref _localXVelocity, _autoCenterSmoothTime);
        }

        if (_isRotatingMode)
        {
            // ── Button rotate mode: giữ nguyên flat positioning ──
            // Block đứng yên trước camera, tower xoay bên dưới.
            // Counter-rotation giữ block ổn định visual khi parent xoay.
            float visualLocalX = (data.localX * _cachedTileSize) - _cachedCenterOffset;
            float visualLocalY = (data.logicY * _cachedTileSize) + (_cachedTileSize / 2f);

            Vector3 towerPos = transform.parent != null ? transform.parent.position : Vector3.zero;
            transform.position = new Vector3(
                towerPos.x + visualLocalX,
                towerPos.y + visualLocalY + _visualOffsetY,
                towerPos.z - _cachedGridRadius
            );

            float parentAngle = transform.parent != null ? transform.parent.localEulerAngles.y : 0f;
            transform.localRotation = Quaternion.Euler(0, -parentAngle + _inertiaTilt, 0);
        }
        else
        {
            // ── Drag mode: on-cylinder positioning (giống ghost) ──
            // Block đặt trên bề mặt trụ tháp bằng LogicX liên tục.
            // Khi face switch, LogicX không nhảy → block trượt mượt trên tháp.
            // Y không bị ảnh hưởng bởi face rotation (xoay quanh trục Y)
            // → cộng _visualOffsetY sau GetLocalPosition là chính xác.
            float logicX = data.GetLogicX(grid.faceWidth);
            Vector3 localPos = grid.GetLocalPosition(logicX, data.logicY);
            localPos.y += _visualOffsetY;
            transform.localPosition = localPos;

            float targetAngleY = data.currentFaceIndex * -90f;
            Quaternion targetRot = Quaternion.Euler(0, targetAngleY, 0);
            float rotLerp = 1f - Mathf.Pow(0.01f, Time.deltaTime / 0.15f);
            transform.localRotation = Quaternion.Slerp(transform.localRotation, targetRot, rotLerp);
        }
    }

    #endregion

    #region Initialization

    private void InitializeModules()
    {
        data = new ActiveBlockData();
    }

    public void InitializeShape(BlockShapeSO shape, int startFaceIndex = 0)
    {
        data.ResetForNewBlock();
        base.InitializeShape(shape);

        if (grid != null && movement != null)
        {
            data.currentFaceIndex = startFaceIndex;
            data.localX = movement.CalculateCenteredLocalX(shape);
            visuals?.UpdateVisuals(data, false);
        }

        if (data.currentMaterial != null)
            SetMaterial(data.currentMaterial);

        SpawnSpecialIcons(shape);
        data.SetReady();
    }

    #endregion

    #region Movement

    public void HandleSlideInput(float inputDelta)
    {
        _useAutoCenter = false;
        if (movement == null) return;
        movement.HandleSlideInput(data, CurrentShape, inputDelta);
        EventBus<BlockMovedEvent>.Raise(new BlockMovedEvent());
    }

    public float GetCenteredLocalX()
    {
        return movement?.CalculateCenteredLocalX(CurrentShape) ?? localX;
    }

    public void MoveHorizontal(int direction)
    {
        if (movement == null) return;
        movement.MoveHorizontal(data, CurrentShape, direction);
        EventBus<BlockMovedEvent>.Raise(new BlockMovedEvent());
    }

    public void SetAbsolutePosition(float normalizedPos)
    {
        _useAutoCenter = false;
        if (movement == null) return;
        movement.SetAbsolutePosition(data, CurrentShape, normalizedPos);
        EventBus<BlockMovedEvent>.Raise(new BlockMovedEvent());
    }

    public void CheckFaceSwitch() => movement?.CheckFaceSwitch(data, CurrentShape);

    public void FlipFace(int direction)
    {
        data.currentFaceIndex = (data.currentFaceIndex + direction + 4) % 4;
    }

    /// <summary>
    /// Bắt đầu auto-center block về giữa face mới sau button rotate.
    /// Dùng SmoothDamp với initial velocity tạo hiệu ứng inertia.
    /// Gọi từ TowerRotator.RotateStep.
    /// </summary>
    public void StartAutoCenter(float centerX, float impulse)
    {
        _useAutoCenter = true;
        _autoCenterTarget = centerX;
        _localXVelocity = impulse;
    }

    #endregion

    #region Edge Detection

    public bool IsAtFaceEdge(int direction)
    {
        return movement?.IsAtFaceEdge(data, CurrentShape, direction) ?? false;
    }

    #endregion

    #region Visuals

    public void UpdateVisuals(bool isSmooth) => visuals?.UpdateVisuals(data, isSmooth);

    public new void SetMaterial(Material mat)
    {
        data.SetMaterial(mat);
        base.SetMaterial(mat);
    }

    #endregion

    #region Drop

    public async UniTask Drop()
    {
        if (!data.isReady || data.isDropping || grid == null || CurrentShape == null) return;

        data.StartDrop();
        visuals?.StopAllAnimations();
        movement?.SnapToGrid(data);
        visuals?.UpdateVisuals(data, false);

        // [FIX] Snapshot vị trí TRƯỚC animation.
        // Sau SnapToGrid, localX đã chính xác.
        // Nếu user xoay tháp trong lúc AnimateDrop, FlipFace đổi currentFaceIndex
        // nhưng LandAt sẽ dùng snapshot này → data ghi đúng mặt ban đầu.
        _dropFaceIndex = data.currentFaceIndex;
        _dropLocalX = data.localX;

        if (Mathf.Abs(_visualOffsetY) > 0.001f)
        {
            Vector3 pos = transform.localPosition;
            pos.y += _visualOffsetY;
            transform.localPosition = pos;
            _visualOffsetY = 0f;
        }

        float landingY = (movement?.GetLandingY(data, CurrentShape) ?? 0f) + (grid.tileSize / 2f);
        if (visuals != null) await visuals.AnimateDrop(landingY);
        LandAt(landingY);
    }

    public void LandAt(float yPos)
    {
        visuals?.SnapToLanding(yPos);
        DestroySpecialIcons();

        if (grid != null && CurrentShape != null)
        {
            foreach (Transform child in transform)
            {
                var childVis = child.GetComponent<BlockVisual>();
                if (childVis != null && CurrentMaterial != null)
                    childVis.SetMaterial(CurrentMaterial);
            }

            int landingRow = Mathf.FloorToInt(yPos / grid.tileSize);
            data.lastLandingRow = landingRow;

            // [FIX] Dùng snapshot thay vì data.GetLogicX().
            float pivotLogicX = (_dropFaceIndex * grid.faceWidth) + _dropLocalX;
            data.lastLandingX = grid.GetWrappedX(Mathf.RoundToInt(pivotLogicX));
            data.lastLandingY = landingRow;

            var ctx = new LandingContext
            {
                PivotLogicX = pivotLogicX,
                LandingRow = landingRow,
                BlockID = blockID,
                BlockMaterial = CurrentMaterial,
                Shape = CurrentShape,
                IsFloodBlock = _isFloodBlock,
                ChildBlocks = CollectChildBlocks(),
                TowerContainer = transform.parent
            };

            _landingPipeline.Execute(ctx);

            CheckGameOverAfterLanding(landingRow);
        }

        ReleaseChildren();
        data.EndDrop();

        EventBus<BlockLandedEvent>.Raise(new BlockLandedEvent
        {
            Block = this,
            GridX = data.lastLandingX,
            GridY = data.lastLandingY
        });
    }

    private void CheckGameOverAfterLanding(int landingRow)
    {
        if (grid == null) return;
        if (grid.GetMaxHeightCurrent() >= grid.config.maxHeight)
            GameManager.Instance?.HandleBlockOverflow();
    }

    #endregion

    #region Grid Registration

    private readonly List<GameObject> _childBlocksCache = new();

    private List<GameObject> CollectChildBlocks()
    {
        _childBlocksCache.Clear();
        foreach (Transform child in transform)
        {
            if (child.GetComponent<BlockVisual>() != null)
                _childBlocksCache.Add(child.gameObject);
        }
        return _childBlocksCache;
    }

    #endregion

    #region Special Icon

    private void SpawnSpecialIcons(BlockShapeSO shape)
    {
        DestroySpecialIcons();

        if (shape == null || shape.specialIcon == null) return;

        bool isSlide = shape.slideDirection != Vector2Int.zero;

        if (isSlide)
            SpawnSlideIcons(shape.specialIcon);
    }

    private void SpawnSlideIcons(Sprite icon)
    {
        foreach (Transform child in transform)
        {
            var iconObj = CreateIconObject(icon);
            iconObj.transform.SetParent(child, false);
            iconObj.transform.localPosition = new Vector3(0f, 0f, ICON_Z_OFFSET);
        }
    }

    private void SpawnFloodIcon(Sprite icon)
    {
        Vector3 center = CalculateShapeCenter();
        var iconObj = CreateIconObject(icon);
        iconObj.transform.SetParent(transform, false);
        iconObj.transform.localPosition = center + new Vector3(0f, 0f, ICON_Z_OFFSET);
    }

    private Vector3 CalculateShapeCenter()
    {
        if (CurrentShape == null || CurrentShape.structuralOffsets == null
            || CurrentShape.structuralOffsets.Count == 0)
            return Vector3.zero;

        var offsets = CurrentShape.structuralOffsets;
        int count = offsets.Count;

        float avgX = 0f;
        float avgY = 0f;
        foreach (var offset in offsets)
        {
            avgX += offset.x;
            avgY += offset.y;
        }
        avgX /= count;
        avgY /= count;

        float minDist = float.MaxValue;
        int tieCount = 0;
        Vector2Int closest = offsets[0];

        foreach (var offset in offsets)
        {
            float dist = (offset.x - avgX) * (offset.x - avgX)
                       + (offset.y - avgY) * (offset.y - avgY);

            if (dist < minDist - 0.001f)
            {
                minDist = dist;
                closest = offset;
                tieCount = 1;
            }
            else if (Mathf.Abs(dist - minDist) < 0.001f)
            {
                tieCount++;
            }
        }

        float tileSize = _cachedTileSize > 0 ? _cachedTileSize : 1f;

        if (tieCount == 1)
            return new Vector3(closest.x * tileSize, closest.y * tileSize, 0f);

        return new Vector3(avgX * tileSize, avgY * tileSize, 0f);
    }

    private GameObject CreateIconObject(Sprite icon)
    {
        var go = new GameObject("SpecialIcon");
        var sr = go.AddComponent<SpriteRenderer>();
        sr.sprite = icon;
        go.transform.localScale = Vector3.one * ICON_SCALE;
        _specialIconObjects.Add(go);
        return go;
    }

    private void DestroySpecialIcons()
    {
        foreach (var obj in _specialIconObjects)
        {
            if (obj != null)
            {
                obj.transform.SetParent(null);
                Destroy(obj);
            }
        }
        _specialIconObjects.Clear();
    }

    #endregion
}