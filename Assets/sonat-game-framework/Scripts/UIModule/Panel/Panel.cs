using System;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule
{
    [RequireComponent(typeof(CanvasGroup))]
    public abstract class Panel : View
    {
        public TweenData[] openTween;
        public TweenData[] closeTween;
        protected CanvasGroup panelCanvasGroup;
        //private UniTaskCompletionSource closeTask;
        private CancellationTokenSource cts;


        protected virtual void Reset()
        {
            panelCanvasGroup = GetComponent<CanvasGroup>();
        }

        public override void OnSetup()
        {
            if (panelCanvasGroup == null) panelCanvasGroup = GetComponent<CanvasGroup>();
        }

        public override void Open(UIData uiData)
        {
            this.uiData = uiData;
            gameObject.SetActive(true);
            if (panelCanvasGroup != null)
                panelCanvasGroup.interactable = false;
            PlayTweens(openTween, OnOpenCompleted);
        }

        public override void OnOpenCompleted()
        {
            if (panelCanvasGroup != null)
                panelCanvasGroup.interactable = true;
        }

        //TODO: override this method must call OnCloseCompleted() at the end
        public override void Close()
        {
            if (gameObject == null || !gameObject.activeInHierarchy) return;
            if (panelCanvasGroup != null)
                panelCanvasGroup.interactable = false;
            PlayTweens(closeTween, OnCloseCompleted);
        }

        protected override void OnCloseCompleted()
        {
            base.OnCloseCompleted();
            if (uiData != null && uiData.TryGet<Action>(UIDataKey.CallBackOnClose, out var callback))
                callback?.Invoke();
            //if (closeTask != null)
            //{
            //    closeTask?.TrySetResult();
            //    closeTask = null;
            //}
        }

        public override void OnFocus()
        {
        }

        public override void OnFocusLost()
        {
        }

        private async Task PlayTweens(TweenData[] tweenDatas, Action callback)
        {
            if (tweenDatas == null)
            {
                callback?.Invoke();
                return;
            }

            cts = new CancellationTokenSource();
            float maxTime = 0;
            for (var i = 0; i < tweenDatas.Length; i++)
            {
                UITween.Play(tweenDatas[i], cts.Token);
                if (tweenDatas[i].config.delay + tweenDatas[i].config.duration > maxTime)
                    maxTime = tweenDatas[i].config.delay + tweenDatas[i].config.duration;
            }

            await Task.Delay(TimeSpan.FromSeconds(maxTime), cancellationToken: cts.Token);
            callback?.Invoke();
        }

        public Task WaitForClose()
        {
            //closeTask = new UniTaskCompletionSource();
            //return closeTask.Task;
            return null;
        }

        protected virtual void OnDisable()
        {
            if (cts != null)
            {
                cts?.Cancel();
                cts?.Dispose();
                cts = null;
            }
        }
    }
}