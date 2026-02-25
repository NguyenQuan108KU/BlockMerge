using DG.Tweening;
using UnityEngine;

public class TutorialManager : MonoBehaviour
{
    [Header("------ References ------")]
    public GameObject textTutorial;
    public GameObject handTutorial;
    public GameObject tut;

    [Header("------ Text ------")]
    public float scaleUp = 1.2f;
    public float duration = 0.5f;

    [Header("------ Hand ------")]
    public float moveDistance = 100f;
    public float moveDuration = 0.8f;

    private Vector3 handStartPos;
    private Tween delayTween;

    private void Start()
    {
        textTutorial.SetActive(false);
        handTutorial.SetActive(false);

        DOVirtual.DelayedCall(3f, () =>
        {
            textTutorial.SetActive(true);
            handTutorial.SetActive(true);

            TextScale();
            HandMove();
        });
    }

    private void Update()
    {
        // Khi nhấn chuột
        if (Input.GetMouseButtonDown(0))
        {
            HideTutorial();
        }

        // Khi nhả chuột
        if (Input.GetMouseButtonUp(0))
        {
            StartDelayShow();
        }
    }

    void ShowTutorial()
    {
        tut.SetActive(true);
    }

    void HideTutorial()
    {
        // Kill delay nếu đang đếm
        delayTween?.Kill();

        tut.SetActive(false);
    }

    void StartDelayShow()
    {
        // Reset timer nếu có
        delayTween?.Kill();

        delayTween = DOVirtual.DelayedCall(3f, () =>
        {
            ShowTutorial();
        });
    }

    public void TextScale()
    {
        textTutorial.transform
            .DOScale(scaleUp, duration)
            .SetLoops(-1, LoopType.Yoyo)
            .SetEase(Ease.InOutSine);
    }

    public void HandMove()
    {
        handStartPos = handTutorial.transform.localPosition;

        handTutorial.transform
            .DOLocalMoveX(handStartPos.x + moveDistance, moveDuration)
            .SetLoops(-1, LoopType.Yoyo)
            .SetEase(Ease.InOutSine);
    }
}