using DG.Tweening;
using SonatFramework.Systems.EventBus;
using UnityEngine;

public class TutRotatePanel : TutorialPanelBase
{
    [Header("=== References ===")]
    [SerializeField] private GameObject handImage;
    [SerializeField] private GameObject textRotate;

    private Tween _handTween;
    private Vector3 _handOriginScale;
    private bool _completed;
    private EventBinding<BlockLandedEvent> _landedBinding;

    protected override void OnTutorialStarted()
    {
        _completed = false;

        if (handImage != null) handImage.SetActive(true);
        if (textRotate != null) textRotate.SetActive(true);

        StartHandAnim();

        _landedBinding = new EventBinding<BlockLandedEvent>(OnBlockLanded);
    }

    private void Update()
    {
        if (_completed) return;

        if (Input.GetMouseButtonDown(0))
        {
            _completed = true;
            CompleteTutorial();
        }
    }

    private void OnBlockLanded(BlockLandedEvent e)
    {
        if (_completed) return;
        _completed = true;
        CompleteTutorial();
    }

    #region Hand Animation

    private void StartHandAnim()
    {
        if (handImage == null) return;
        _handOriginScale = handImage.transform.localScale;

        _handTween = handImage.transform
            .DOScale(_handOriginScale * 0.8f, 0.5f)
            .SetLoops(-1, LoopType.Yoyo)
            .SetEase(Ease.InOutSine);
    }

    private void StopHandAnim()
    {
        _handTween?.Kill();
        _handTween = null;

        if (handImage != null)
            handImage.transform.localScale = _handOriginScale;
    }

    #endregion

    #region Cleanup

    public override void Close()
    {
        StopHandAnim();
        _landedBinding?.Dispose();
        _landedBinding = null;
        base.Close();
    }

    protected override void OnDisable()
    {
        StopHandAnim();
        _landedBinding?.Dispose();
        _landedBinding = null;
        base.OnDisable();
    }

    #endregion
}