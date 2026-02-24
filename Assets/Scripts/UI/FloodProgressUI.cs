using DG.Tweening;
using SonatFramework.Systems.EventBus;
using UnityEngine;
using UnityEngine.UI;

public class FloodProgressUI : MonoBehaviour
{
    [Header("UI References")]
    [SerializeField] private Image fillImage;
    [SerializeField] private CanvasGroup canvasGroup;

    [Header("Settings")]
    [SerializeField] private float fillDuration = 0.3f;
    [SerializeField] private float hideDelay = 0.8f;

    private EventBinding<FloodProgressEvent> _progressBinding;
    private EventBinding<LevelStartedEvent> _levelStartedBinding;
    private EventBinding<BlockLandedEvent> _blockLandedBinding;

    private float _hideTimer;
    private bool _isVisible;
    private bool _isFull;

    private void OnEnable()
    {
        _progressBinding = new EventBinding<FloodProgressEvent>(OnProgressUpdated);
        _levelStartedBinding = new EventBinding<LevelStartedEvent>(OnLevelStarted);
        _blockLandedBinding = new EventBinding<BlockLandedEvent>(OnBlockLanded);
        Hide(false);
    }

    private void OnDisable()
    {
        _progressBinding?.Dispose();
        _levelStartedBinding?.Dispose();
        _blockLandedBinding?.Dispose();
        fillImage?.DOKill();
        canvasGroup?.DOKill();
    }

    private void Update()
    {
        if (!_isVisible || _isFull) return;

        _hideTimer -= Time.deltaTime;
        if (_hideTimer <= 0f)
            Hide(true);
    }

    private void OnLevelStarted(LevelStartedEvent e)
    {
        _isFull = false;
        if (fillImage != null)
        {
            fillImage.DOKill();
            fillImage.fillAmount = 0f;
        }
        Hide(false);
    }

    private void OnProgressUpdated(FloodProgressEvent e)
    {
        if (fillImage == null) return;

        Show();

        _isFull = e.Progress >= 1f;
        if (!_isFull)
            _hideTimer = hideDelay;

        fillImage.DOKill();
        fillImage.DOFillAmount(e.Progress, fillDuration)
            .SetEase(Ease.OutCubic)
            .SetUpdate(true);
    }

    private void OnBlockLanded(BlockLandedEvent e)
    {
        if (!_isFull) return;

        _isFull = false;
        Hide(true);

        if (fillImage != null)
        {
            fillImage.DOKill();
            fillImage.fillAmount = 0f;
        }
    }

    private void Show()
    {
        if (_isVisible) return;
        _isVisible = true;

        if (canvasGroup != null)
        {
            canvasGroup.DOKill();
            canvasGroup.DOFade(1f, 0.2f).SetUpdate(true);
        }
    }

    private void Hide(bool animate)
    {
        _isVisible = false;

        if (canvasGroup != null)
        {
            canvasGroup.DOKill();
            if (animate)
                canvasGroup.DOFade(0f, 0.3f).SetUpdate(true);
            else
                canvasGroup.alpha = 0f;
        }
    }
}