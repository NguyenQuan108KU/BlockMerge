using UnityEngine;
using DG.Tweening;
using SonatFramework.Systems.EventBus;
using Sonat.Enums;
using System;
using System.Threading.Tasks;

public class TowerHeightController : MonoBehaviour
{
    private const string TWEEN_ID_PREFIX = "TowerHeight_";
    private const float GRAVITY_SETTLE_DELAY = 0.35f;

    #region Private Fields

    private Transform _towerContainer;
    private GameConfig _config;
    private float _targetOffset;
    private string _tweenId;
    private int _currentFaceIndex;

    private EventBinding<BlockLandedEvent> _landedBinding;
    private EventBinding<RowsClearedEvent> _clearedBinding;
    private EventBinding<GameStateChangeEvent> _stateBinding;
    private EventBinding<FaceChangedEvent> _faceBinding;

    #endregion

    #region Properties

    public float TargetOffset => _targetOffset;

    #endregion

    #region Initialization

    public void Initialize(Transform towerContainer, GameConfig config)
    {
        _towerContainer = towerContainer;
        _config = config;
        _targetOffset = 0f;
        _tweenId = TWEEN_ID_PREFIX + GetInstanceID();
        _currentFaceIndex = 0;
    }

    #endregion

    #region Unity Lifecycle

    private void OnEnable()
    {
        _landedBinding = new EventBinding<BlockLandedEvent>(OnBlockLanded);
        _clearedBinding = new EventBinding<RowsClearedEvent>(OnRowsCleared);
        _stateBinding = new EventBinding<GameStateChangeEvent>(OnGameStateChanged);
        _faceBinding = new EventBinding<FaceChangedEvent>(OnFaceChanged);
    }

    private void OnDisable()
    {
        _landedBinding?.Dispose();
        _clearedBinding?.Dispose();
        _stateBinding?.Dispose();
        _faceBinding?.Dispose();
        KillTween();
    }

    #endregion

    #region Event Handlers

    private void OnFaceChanged(FaceChangedEvent e)
    {
        if (_config == null) return;
        _currentFaceIndex = e.NewFaceIndex;
        Recalculate(_config.towerHeightSmoothDuration);
    }

    private void OnBlockLanded(BlockLandedEvent e)
    {
        if (_config == null) return;
        Recalculate(_config.towerDropAdjustDuration);
    }

    private void OnRowsCleared(RowsClearedEvent e)
    {
        if (_config == null) return;
        RecalculateDelayed();
    }

    private void OnGameStateChanged(GameStateChangeEvent e)
    {
        if (_config == null) return;
        if (e.gameState == GameState.Playing)
            ResetImmediate();
    }

    #endregion

    #region Core Logic

    private float CalculateTargetOffset()
    {
        if (_config == null || GridManager.Instance == null) return 0f;

        int maxHeight = GridManager.Instance.GetFaceMaxHeight(_currentFaceIndex);
        if (maxHeight <= _config.towerHeightThreshold) return 0f;

        float rawOffset = -(maxHeight - _config.towerHeightThreshold) * _config.tileSize;
        return rawOffset * _config.towerHeightRatio;
    }

    private void Recalculate(float duration)
    {
        if (_towerContainer == null || _config == null) return;

        // =======================

        float newOffset = CalculateTargetOffset();
        if (Mathf.Approximately(newOffset, _targetOffset)) return;
        int maxH = GridManager.Instance.GetFaceMaxHeight(_currentFaceIndex);
        Debug.Log($"[TowerHeight] face={_currentFaceIndex} maxH={maxH} threshold={_config.towerHeightThreshold} newOffset={newOffset} oldOffset={_targetOffset}");

        _targetOffset = newOffset;
        AnimateToOffset(newOffset, duration);
    }

    private async Task RecalculateDelayed()
    {
        await Task.Delay(TimeSpan.FromSeconds(GRAVITY_SETTLE_DELAY));
        if (this == null || _config == null) return;
        Recalculate(_config.towerHeightSmoothDuration);
    }

    #endregion

    #region Animation

    private void AnimateToOffset(float targetY, float duration)
    {
        KillTween();
        _towerContainer
            .DOLocalMoveY(targetY, duration)
            .SetEase(_config.towerHeightEase)
            .SetId(_tweenId);
    }

    private void KillTween()
    {
        DOTween.Kill(_tweenId);
    }

    #endregion

    #region Public API

    public void ResetImmediate()
    {
        KillTween();
        _targetOffset = 0f;
        _currentFaceIndex = 0;

        if (_towerContainer != null)
        {
            Vector3 pos = _towerContainer.localPosition;
            pos.y = 0f;
            _towerContainer.localPosition = pos;
        }
    }

    #endregion
}