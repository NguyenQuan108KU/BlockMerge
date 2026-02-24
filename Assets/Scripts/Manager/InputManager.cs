using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using Base.Singleton;
using Cysharp.Threading.Tasks;
using Sonat.Enums;
using SonatFramework.Systems.EventBus;

public class InputManager : SingletonSimple<InputManager>
{
    #region Private Fields

    private bool _isProcessingDrop;
    private Vector2 _lastFramePos;
    private float _pressStartTime;
    private bool _isValidTouch;
    private bool _canInput;

    // Edge zone tracking
    private bool _isInEdgeZone;
    private float _edgeEnterTime;
    private int _edgeDirection;

    // Edge fill: face index tracking
    // Mỗi face chỉ fill đúng 1 lần. Face switch → currentFaceIndex đổi → cho phép fill tiếp.
    private bool _isEdgeFilling;
    private float _edgeFillStartTime;
    private int _lastFillFaceIndex;

    private enum InputMode { None, Game_Drag }
    private InputMode _currentInputMode = InputMode.None;

    private ActiveBlockController _activeBlock;
    private TowerController _tower;
    private BlockSpawner _spawner;

    private EventBinding<BlockSpawnedEvent> _blockSpawnBinding;
    private EventBinding<GameStateChangeEvent> _stateBinding;

    #endregion

    #region Unity Lifecycle

    protected override void OnAwake() { }

    private void Start()
    {
        _tower = FindFirstObjectByType<TowerController>();
        if (_tower != null)
        {
            _spawner = _tower.spawner;
            _activeBlock = _tower.activeBlock;
        }
    }

    private void OnEnable()
    {
        _stateBinding = new EventBinding<GameStateChangeEvent>(OnGameStateChanged);
        _blockSpawnBinding = new EventBinding<BlockSpawnedEvent>(OnBlockSpawned);
    }

    private void OnDisable()
    {
        _stateBinding?.Dispose();
        _blockSpawnBinding?.Dispose();
    }

    private void Update()
    {
        if (!_canInput || Pointer.current == null) return;
        HandleInput();
    }

    #endregion

    #region Event Handlers

    private void OnGameStateChanged(GameStateChangeEvent e)
    {
        _canInput = (e.gameState == GameState.Playing);
        if (!_canInput) ResetInputState();
    }

    private void OnBlockSpawned(BlockSpawnedEvent e)
    {
        _activeBlock = e.BlockController;

        if (!_isValidTouch)
            EventBus<GhostVisibilityEvent>.Raise(new GhostVisibilityEvent { IsVisible = false });
    }

    #endregion

    #region Input Processing

    private void HandleInput()
    {
        Vector2 currentPos = Pointer.current.position.ReadValue();
        var pointer = Pointer.current;

        if (pointer.press.wasPressedThisFrame) HandlePressStart(currentPos);
        if (pointer.press.isPressed && _isValidTouch) HandleDragging(currentPos);
        if (pointer.press.wasReleasedThisFrame) HandleRelease();
    }

    private void HandlePressStart(Vector2 currentPos)
    {
        _isValidTouch = true;
        _pressStartTime = Time.time;
        _lastFramePos = currentPos;

        GameObject hitObject = GetUIObjectUnderPointer();
        if (hitObject != null)
        {
            _currentInputMode = InputMode.None;
            _isValidTouch = false;
            return;
        }

        if (IsBoosterBlocking())
        {
            _currentInputMode = InputMode.None;
            _isValidTouch = false;
            return;
        }

        _currentInputMode = InputMode.Game_Drag;
        EventBus<InputDragStartedEvent>.Raise(new InputDragStartedEvent());
        EventBus<GhostVisibilityEvent>.Raise(new GhostVisibilityEvent { IsVisible = true });
        if (_activeBlock != null) _activeBlock.IsCompensating = true;
        TimeManager.Instance?.ResumeOnFirstTouch();
    }

    private void HandleDragging(Vector2 currentPos)
    {
        if (_spawner != null && _spawner.IsSpawning) return;
        if (IsBoosterBlocking()) return;

        if (_currentInputMode == InputMode.Game_Drag && _activeBlock != null && _activeBlock.IsReady)
        {
            ProcessGameDrag(currentPos);
        }
        _lastFramePos = currentPos;
    }

    private void ProcessGameDrag(Vector2 currentPos)
    {
        var config = ConfigHelper.Game;
        float screenW = Screen.width;
        float threshold = screenW * config.edgeScrollThreshold;

        // ── Track edge zone ──
        bool inEdge = currentPos.x < threshold || currentPos.x > (screenW - threshold);

        if (inEdge)
        {
            int dir = currentPos.x < threshold ? -1 : 1;

            if (!_isInEdgeZone || _edgeDirection != dir)
            {
                _isInEdgeZone = true;
                _edgeEnterTime = Time.time;
                _edgeDirection = dir;
                _isEdgeFilling = false;
                _lastFillFaceIndex = -1;
            }
        }
        else
        {
            if (_isInEdgeZone)
                EventBus<EdgeRotateProgressEvent>.Raise(new EdgeRotateProgressEvent { IsActive = false });

            _isInEdgeZone = false;
            _isEdgeFilling = false;
            _lastFillFaceIndex = -1;
        }

        // ── Edge delay (giữ nguyên gốc, im lặng — không hiện indicator) ──
        bool edgeReady = _isInEdgeZone && (Time.time - _edgeEnterTime >= config.edgeRotateDelay);

        // ── Fill indicator: chỉ khi CẢ HAI đk thỏa ──
        // dk1: edgeReady (tay ở edge đủ lâu)
        // dk2: ghost ở mép face cùng phía
        // + mỗi face chỉ fill 1 lần (track bằng _lastFillFaceIndex)
        bool ghostAtEdge = _activeBlock != null && _activeBlock.IsAtFaceEdge(_edgeDirection);
        int currentFace = _activeBlock != null ? _activeBlock.currentFaceIndex : -1;

        if (edgeReady && ghostAtEdge && currentFace != _lastFillFaceIndex && !_isEdgeFilling)
        {
            _isEdgeFilling = true;
            _edgeFillStartTime = Time.time;
        }

        if (_isEdgeFilling && (Time.time - _edgeFillStartTime >= config.edgeRotateDelay))
        {
            _lastFillFaceIndex = currentFace;
            _isEdgeFilling = false;
        }

        bool scrollBlocked = _isEdgeFilling;

        // ── Indicator progress ──
        if (_isEdgeFilling)
        {
            float progress = Mathf.Clamp01((Time.time - _edgeFillStartTime) / config.edgeRotateDelay);
            EventBus<EdgeRotateProgressEvent>.Raise(new EdgeRotateProgressEvent
            {
                IsActive = true,
                Progress = progress,
                Direction = _edgeDirection
            });
        }
        else
        {
            EventBus<EdgeRotateProgressEvent>.Raise(new EdgeRotateProgressEvent { IsActive = false });
        }

        // ── Di chuyển block ──
        if (currentPos.x < threshold && edgeReady && !scrollBlocked)
        {
            float delta = -1f * config.edgeScrollSpeed * Time.deltaTime * 60f;
            _activeBlock.HandleSlideInput(delta);
        }
        else if (currentPos.x > (screenW - threshold) && edgeReady && !scrollBlocked)
        {
            float delta = 1f * config.edgeScrollSpeed * Time.deltaTime * 60f;
            _activeBlock.HandleSlideInput(delta);
        }
        else if (!_isInEdgeZone)
        {
            if (config.useAbsolutePositioning)
            {
                float dragZoneStart = threshold;
                float dragZoneEnd = screenW - threshold;
                float dragZoneWidth = dragZoneEnd - dragZoneStart;

                float normalizedPos = (currentPos.x - dragZoneStart) / dragZoneWidth;
                normalizedPos = Mathf.Clamp01(normalizedPos);

                _activeBlock.SetAbsolutePosition(normalizedPos);
            }
            else
            {
                float delta = currentPos.x - _lastFramePos.x;
                _activeBlock.HandleSlideInput(delta);
            }
        }
        // !edgeReady → block giữ yên, chờ delay (im lặng)
        // scrollBlocked → block giữ yên ở mép, indicator đang fill
    }

    private void HandleRelease()
    {
        if (_activeBlock != null) _activeBlock.IsCompensating = false;

        if (!_isValidTouch)
        {
            ResetInputState();
            return;
        }

        if (_currentInputMode == InputMode.Game_Drag)
        {
            EventBus<InputDragEndedEvent>.Raise(new InputDragEndedEvent());

            if (IsBoosterBlocking())
            {
                ResetInputState();
                return;
            }

            var config = ConfigHelper.Game;
            if (Time.time - _pressStartTime >= config.dragHoldTime)
            {
                TryDrop();
            }
        }

        ResetInputState();
    }

    #endregion

    #region Drop

    private void TryDrop()
    {
        if (_isProcessingDrop) return;
        if (_spawner != null && _spawner.IsSpawning) return;
        if (_tower == null || _tower.activeBlock == null) return;
        if (!_tower.activeBlock.IsReady || _tower.activeBlock.IsDropping) return;
        if (IsBoosterBlocking()) return;

        HandleDropSequence().Forget();
    }

    private async UniTaskVoid HandleDropSequence()
    {
        if (_isProcessingDrop) return;
        if (_tower == null || _tower.activeBlock == null) return;
        if (!_tower.activeBlock.IsReady || _tower.activeBlock.IsDropping) return;
        if (_spawner != null && _spawner.IsSpawning) return;
        if (IsBoosterBlocking()) return;

        _isProcessingDrop = true;

        await _tower.activeBlock.Drop();
        await _tower.SnapRotationAsync();

        if (_spawner != null)
        {
            float waitTime = 0f;
            while (_spawner.IsSpawning && waitTime < 0.5f)
            {
                await UniTask.Yield();
                waitTime += Time.deltaTime;
            }
        }

        _isProcessingDrop = false;
    }

    #endregion

    #region Helpers

    private void ResetInputState()
    {
        _isValidTouch = false;
        _currentInputMode = InputMode.None;
        _isInEdgeZone = false;
        _isEdgeFilling = false;
        _lastFillFaceIndex = -1;

        EventBus<GhostVisibilityEvent>.Raise(new GhostVisibilityEvent { IsVisible = false });
        EventBus<EdgeRotateProgressEvent>.Raise(new EdgeRotateProgressEvent { IsActive = false });
    }

    private bool IsBoosterBlocking()
    {
        return Booster.BoosterManager.Instance != null && Booster.BoosterManager.Instance.IsBoosterActive;
    }

    private GameObject GetUIObjectUnderPointer()
    {
        if (EventSystem.current == null) return null;

        var pointerData = new PointerEventData(EventSystem.current)
        {
            position = Pointer.current.position.ReadValue()
        };
        var results = new List<RaycastResult>();
        EventSystem.current.RaycastAll(pointerData, results);

        return results.Count > 0 ? results[0].gameObject : null;
    }

    #endregion
}