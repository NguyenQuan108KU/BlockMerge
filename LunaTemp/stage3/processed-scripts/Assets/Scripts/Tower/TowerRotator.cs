using DG.Tweening;
using UnityEngine;
using SonatFramework.Systems.EventBus;
using System.Threading.Tasks;

public class TowerRotator : MonoBehaviour
{
    #region Private Fields

    private Transform _towerContainer;
    private ActiveBlockController _activeBlock;

    private float _currentVelocity;
    private bool _isAnimatingStep;
    private bool _isDragging;

    private float _targetAngle;
    private float _animatedAngle;

    private Tween _rotateTween;
    private Tween _tiltTween;

    private GameConfig _cachedConfig;

    private EventBinding<InputDragStartedEvent> _dragStartBinding;
    private EventBinding<InputDragEndedEvent> _dragEndBinding;

    public int TargetFaceIndex
    {
        get
        {
            float angle = _isAnimatingStep ? _targetAngle : _towerContainer.localEulerAngles.y;
            int face = Mathf.RoundToInt(angle / 90f) % 4;
            return (face + 4) % 4;
        }
    }

    #endregion

    #region Unity Lifecycle

    private void OnEnable()
    {
        _dragStartBinding = new EventBinding<InputDragStartedEvent>(_ => _isDragging = true);
        _dragEndBinding = new EventBinding<InputDragEndedEvent>(_ => _isDragging = false);
    }

    private void OnDisable()
    {
        _dragStartBinding?.Dispose();
        _dragEndBinding?.Dispose();
        KillAllTweens();
    }

    #endregion

    #region Initialization

    public void Initialize(ActiveBlockController blockRef, Transform containerRef)
    {
        _activeBlock = blockRef;
        _towerContainer = containerRef;

        if (GridManager.Instance != null)
            _cachedConfig = GridManager.Instance.config;

        _targetAngle = containerRef != null ? containerRef.localEulerAngles.y : 0f;
        _animatedAngle = _targetAngle;
    }

    #endregion

    #region Drag-based Rotation

    public void HandleRotationUpdate()
    {
        if (_isAnimatingStep) return;
        if (_activeBlock == null || !_activeBlock.IsReady || _activeBlock.IsDropping) return;  // ← THÊM
        if (_cachedConfig == null || GridManager.Instance == null) return;

        float targetFaceAngle = _activeBlock.currentFaceIndex * 90f;
        float faceWidth = GridManager.Instance.faceWidth;
        float blockW = _activeBlock.CurrentShape.width;

        float idealLeftEdge = (faceWidth - blockW) / 2f;
        float currentRealLeftEdge = _activeBlock.localX + _activeBlock.CurrentShape.minX;
        float offset = currentRealLeftEdge - idealLeftEdge;
        float normalizedOffset = offset / (faceWidth / 2f);

        float finalTargetAngle = _isDragging
            ? targetFaceAngle + (normalizedOffset * _cachedConfig.deadzoneAngle)
            : targetFaceAngle;

        float currentAngle = _towerContainer.localEulerAngles.y;
        float deltaAngle = Mathf.DeltaAngle(currentAngle, finalTargetAngle);

        float adaptiveSmoothTime;
        if (!_isDragging)
            adaptiveSmoothTime = _cachedConfig.baseSmoothTime * 2f;
        else
            adaptiveSmoothTime = (Mathf.Abs(deltaAngle) > 45f) ? _cachedConfig.fastSmoothTime : _cachedConfig.baseSmoothTime;

        float newAngle = Mathf.SmoothDampAngle(currentAngle, finalTargetAngle, ref _currentVelocity, adaptiveSmoothTime);
        _towerContainer.localRotation = Quaternion.Euler(0, newAngle, 0);
    }

    #endregion

    #region Button Rotate (Kill & Retarget)

    public void RotateStep(int direction)
    {
        if (_cachedConfig == null || _towerContainer == null) return;

        if (!_isAnimatingStep)
        {
            float currentY = _towerContainer.localEulerAngles.y;
            _animatedAngle = currentY;
            _targetAngle = currentY;
        }

        _isAnimatingStep = true;
        _isDragging = false;
        _currentVelocity = 0f;

        KillAllTweens();

        _targetAngle += direction * 90f;

        if (_activeBlock != null && !_activeBlock.IsDropping)
        {
            _activeBlock.SetRotatingMode(true);
            _activeBlock.FlipFace(direction);
            _activeBlock.SetInertiaTilt(0);
        }

        int newFace = _activeBlock != null ? _activeBlock.currentFaceIndex : 0;
        int oldFace = (newFace - direction + 4) % 4;

        EventBus<FaceChangedEvent>.Raise(new FaceChangedEvent
        {
            NewFaceIndex = newFace,
            OldFaceIndex = oldFace
        });
        EventBus<BlockMovedEvent>.Raise(new BlockMovedEvent());

        if (_activeBlock != null && !_activeBlock.IsDropping)
        {
            float centerX = _activeBlock.GetCenteredLocalX();
            float impulse = direction * 4f;
            _activeBlock.StartAutoCenter(centerX, impulse);
        }
        float duration = _cachedConfig.buttonRotateDuration;

        _rotateTween = DOVirtual.Float(_animatedAngle, _targetAngle, duration,
                val =>
                {
                    _animatedAngle = val;
                    _towerContainer.localRotation = Quaternion.Euler(0, val, 0);
                })
            .SetEase((Ease)_cachedConfig.buttonRotateEase)
            .OnComplete(OnRotateComplete);

        if (_activeBlock != null)
        {
            float recoilAngle = -35f * direction;

            _tiltTween = DOTween.Sequence()
                .Append(DOVirtual.Float(0, recoilAngle, duration * 0.4f,
                        val => _activeBlock.SetInertiaTilt(val))
                    .SetEase(Ease.OutSine))
                .Append(DOVirtual.Float(recoilAngle, 0, duration * 0.6f,
                        val => _activeBlock.SetInertiaTilt(val))
                    .SetEase(Ease.OutQuad, 1.2f));
        }
    }

    private void OnRotateComplete()
    {
        if (_activeBlock != null)
        {
            _activeBlock.CheckFaceSwitch();
            _activeBlock.UpdateVisuals(false);
            _activeBlock.SetInertiaTilt(0);
            _activeBlock.SetRotatingMode(false);
        }

        _targetAngle = Mathf.Repeat(_targetAngle, 360f);
        _animatedAngle = _targetAngle;
        _isAnimatingStep = false;
    }

    #endregion

    #region Snap & Stop

    public void StopRotation()
    {
        KillAllTweens();
        _isAnimatingStep = false;
    }

    public async Task SnapToNearestAsync()
    {
        if (_cachedConfig == null || _towerContainer == null) return;

        if (_isAnimatingStep) return;

        _currentVelocity = 0f;
        KillAllTweens();

        float currentY = _towerContainer.localEulerAngles.y;
        float snapTarget = _isAnimatingStep
            ? _targetAngle
            : Mathf.Round(currentY / 90f) * 90f;

        _isAnimatingStep = true;

        float delta = Mathf.Abs(Mathf.DeltaAngle(currentY, snapTarget));
        if (delta < 0.5f)
        {
            _towerContainer.localRotation = Quaternion.Euler(0, snapTarget, 0);
            _targetAngle = snapTarget % 360f;
            _animatedAngle = _targetAngle;
            _isAnimatingStep = false;
            return;
        }

        _targetAngle = snapTarget;
        _animatedAngle = snapTarget;

         _towerContainer
            .DOLocalRotate(new Vector3(0, snapTarget, 0), _cachedConfig.towerSnapDuration)
            .SetEase((Ease)_cachedConfig.towerSnapEase);

        if (Mathf.Abs(Mathf.DeltaAngle(_targetAngle, snapTarget)) < 1f)
        {
            _isAnimatingStep = false;
        }
    }

    #endregion

    #region Helpers

    private void KillAllTweens()
    {
        _rotateTween?.Kill();
        _tiltTween?.Kill();
        _rotateTween = null;
        _tiltTween = null;
        //_towerContainer?.DOKill();
    }

    #endregion
}