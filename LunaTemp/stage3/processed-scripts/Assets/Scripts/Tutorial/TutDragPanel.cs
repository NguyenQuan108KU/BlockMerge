using DG.Tweening;
using SonatFramework.Systems.EventBus;
using UnityEngine;
using UnityEngine.InputSystem;


public class TutDragPanel : TutorialPanelBase
{
    private enum Step { Idle, Dragging, Complete }

    [Header("=== References ===")]
    [SerializeField] private GameObject handImage;
    [SerializeField] private GameObject textDrag;
    [SerializeField] private GameObject textRelease;

    [Header("=== Hand Animation ===")]
    [SerializeField] private float handMoveDistance = 200f;
    [SerializeField] private float handMoveDuration = 1.0f;

    private Step _step;
    private Tween _handTween;
    private Vector3 _handOriginPos;
    private EventBinding<BlockLandedEvent> _landedBinding;

    protected override void OnTutorialStarted()
    {
        _step = Step.Idle;

        if (handImage != null) handImage.SetActive(true);
        if (textDrag != null) textDrag.SetActive(true);
        if (textRelease != null) textRelease.SetActive(false);

        StartHandAnim();

        _landedBinding = new EventBinding<BlockLandedEvent>(OnBlockLanded);
    }

    private void Update()
    {
        if (_step != Step.Idle) return;
        if (Pointer.current == null) return;

        if (Pointer.current.press.wasPressedThisFrame)
        {
            _step = Step.Dragging;

            StopHandAnim();
            if (handImage != null) handImage.SetActive(false);
            if (textDrag != null) textDrag.SetActive(false);
            if (textRelease != null) textRelease.SetActive(true);
        }
    }

    private void OnBlockLanded([Bridge.Ref] BlockLandedEvent e)
    {
        if (_step == Step.Complete) return;
        _step = Step.Complete;
        CompleteTutorial();
    }

    #region Hand Animation

    private void StartHandAnim()
    {
        if (handImage == null) return;
        _handOriginPos = handImage.transform.localPosition;

        _handTween = handImage.transform
            .DOLocalMoveX(_handOriginPos.x + handMoveDistance, handMoveDuration)
            .SetLoops(-1, LoopType.Yoyo)
            .SetEase(Ease.InOutSine);
    }

    private void StopHandAnim()
    {
        _handTween?.Kill();
        _handTween = null;

        if (handImage != null)
            handImage.transform.localPosition = _handOriginPos;
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