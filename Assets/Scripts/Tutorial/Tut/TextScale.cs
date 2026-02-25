using UnityEngine;
using DG.Tweening;

public class TextScale : MonoBehaviour
{
    public float scaleUp = 1.2f;
    public float duration = 0.5f;

    void Start()
    {
        transform.DOScale(scaleUp, duration)
                 .SetLoops(-1, LoopType.Yoyo)
                 .SetEase(Ease.InOutSine);
    }
}