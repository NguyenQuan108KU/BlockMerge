using System.Threading;
using Cysharp.Threading.Tasks;
using DG.Tweening;
using Spine.Unity;
using UnityEngine;
using UnityEngine.UI;

namespace SonatFramework.Scripts.UIModule
{
    public static class UITween
    {
        public static async UniTask Play(TweenData tweenData, CancellationToken ctk)
        {
            tweenData.SetupData();
            if (tweenData.config == null) return;
            switch (tweenData.config.tweenType)
            {
                case UITweenType.Scale:
                    await PlayTweenScale(tweenData, ctk);
                    break;
                case UITweenType.Fade:
                    await PlayTweenFade(tweenData, ctk);
                    break;
                case UITweenType.Move:
                    await PlayTweenMove(tweenData, ctk);
                    break;
                case UITweenType.LocalMove:
                    await PlayTweenLocalMove(tweenData, ctk);
                    break;
                case UITweenType.RectLocalMove:
                    await PlayTweenRectLocalMove(tweenData, ctk);
                    break;
                case UITweenType.FadeGroup:
                    await PlayTweenFadeGroup(tweenData, ctk);
                    break;
                case UITweenType.Active:
                    await PlayTweenActive(tweenData, ctk);
                    break;
                case UITweenType.Inactive:
                    await PlayTweenInActive(tweenData, ctk);
                    break;
            }
        }

        private static async UniTask PlayTweenScale(TweenData tweenData, CancellationToken ctk)
        {
            var target = tweenData.target;
            target.localScale = Vector3.one * tweenData.config.from;
            await target.DOScale(tweenData.config.to, tweenData.config.duration).SetEase(tweenData.config.curve)
                .SetDelay(tweenData.config.delay).OnComplete(() => { tweenData.OnCompleted?.Invoke(); }).WithCancellation(ctk);
        }

        private static async UniTask PlayTweenFade(TweenData tweenData, CancellationToken ctk)
        {
            var target = tweenData.target.GetComponent<Graphic>();
            var color = target.color;
            color.a = tweenData.config.from;
            target.color = color;
            await target.DOFade(tweenData.config.to, tweenData.config.duration).SetEase(tweenData.config.curve)
                .SetDelay(tweenData.config.delay).OnComplete(() => { tweenData.OnCompleted?.Invoke(); }).WithCancellation(ctk);
        }

        private static async UniTask PlayTweenMove(TweenData tweenData, CancellationToken ctk)
        {
            var target = tweenData.target;
            target.position = tweenData.config.mFrom;
            await target.DOMove(tweenData.config.mTo, tweenData.config.duration).SetEase(tweenData.config.curve)
                .SetDelay(tweenData.config.delay).OnComplete(() => { tweenData.OnCompleted?.Invoke(); }).WithCancellation(ctk);
        }

        private static async UniTask PlayTweenLocalMove(TweenData tweenData, CancellationToken ctk)
        {
            var target = tweenData.target;
            target.localPosition = tweenData.config.mFrom;
            await target.DOLocalMove(tweenData.config.mTo, tweenData.config.duration).SetEase(tweenData.config.curve)
                .SetDelay(tweenData.config.delay).OnComplete(() => { tweenData.OnCompleted?.Invoke(); }).WithCancellation(ctk);
        }

        private static async UniTask PlayTweenRectLocalMove(TweenData tweenData, CancellationToken ctk)
        {
            var target = (RectTransform)tweenData.target;
            target.anchoredPosition = tweenData.config.mFrom;
            await target.DOAnchorPos(tweenData.config.mTo, tweenData.config.duration).SetEase(tweenData.config.curve)
                .SetDelay(tweenData.config.delay).OnComplete(() => { tweenData.OnCompleted?.Invoke(); }).WithCancellation(ctk);
        }


        private static async UniTask PlayTweenFadeGroup(TweenData tweenData, CancellationToken ctk)
        {
            var target = tweenData.target.GetComponent<CanvasGroup>();
            target.alpha = tweenData.config.from;
            var skeletonGraphics = target.GetComponentsInChildren<SkeletonGraphic>();
            Sequence sequence = DOTween.Sequence();
            sequence.Pause();
            sequence.Append(target.DOFade(tweenData.config.to, tweenData.config.duration).SetEase(tweenData.config.curve));
            foreach (var skeletonGraphic in skeletonGraphics)
            {
                sequence.Join(skeletonGraphic.DOFade(tweenData.config.to, tweenData.config.duration).SetEase(tweenData.config.curve));
            }

            sequence.SetDelay(tweenData.config.delay).OnComplete(() => { tweenData.OnCompleted?.Invoke(); });
            await sequence.Play().WithCancellation(ctk);
        }

        private static async UniTask PlayTweenActive(TweenData tweenData, CancellationToken ctk)
        {
            tweenData.target.gameObject.SetActive(false);
            await DOVirtual.DelayedCall(tweenData.config.delay, () => { tweenData.target.gameObject.SetActive(true); }).WithCancellation(ctk);
        }

        private static async UniTask PlayTweenInActive(TweenData tweenData, CancellationToken ctk)
        {
            tweenData.target.gameObject.SetActive(true);
            await DOVirtual.DelayedCall(tweenData.config.delay, () => { tweenData.target.gameObject.SetActive(false); }).WithCancellation(ctk);
        }
    }


    public enum UITweenType
    {
        None,
        Scale,
        Fade,
        Move,
        LocalMove,
        RectLocalMove,
        FadeGroup,
        Active,
        Inactive,
    }
}