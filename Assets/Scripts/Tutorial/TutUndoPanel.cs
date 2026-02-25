using DG.Tweening;
using UnityEngine;

public class TutUndoPanel : TutorialPanelBase
{
    [SerializeField] private GameObject handImage;
    [SerializeField] private GameObject textUndo;

    private Tween _handTween;
    private Vector3 _handOriginScale;
    private bool _completed;

    protected override void OnTutorialStarted()
    {
        _completed = false;

        if (handImage != null) handImage.SetActive(true);
        if (textUndo != null) textUndo.SetActive(true);

        StartHandAnim();
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

    public override void Close()
    {
        StopHandAnim();
        base.Close();
    }

    protected override void OnDisable()
    {
        StopHandAnim();
        base.OnDisable();
    }
}