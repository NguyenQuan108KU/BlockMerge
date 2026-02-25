using System;
using System.Threading.Tasks;
using Base.Singleton;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace SonatFramework.Scripts.UIModule
{
    [RequireComponent(typeof(Image))]
    public class DarkTransition : Singleton<DarkTransition>
    {
        public Image darkImage;
        public float fadeDuration = 0.3f;

        private void Reset()
        {
            darkImage = GetComponent<Image>();
            darkImage.color = new Color(0, 0, 0, 0);
        }

        protected override void OnAwake()
        {
            Hide();
        }

        private void Hide()
        {
            gameObject.SetActive(false);
            darkImage.Fade(0f);
        }

        private async Task FadeIn()
        {
            gameObject.SetActive(true);
            //await darkImage.DOFade(1f, fadeDuration).ToUniTask();
        }

        private async Task FadeOut()
        {
            //await darkImage.DOFade(0f, fadeDuration).OnComplete(Hide).ToUniTask();
        }

        public async void TransitionAsync(Func<Task> callBack)
        {
            await FadeIn();
            await callBack();
            await FadeOut();
        }

        public async void Transition(Action callBack)
        {
            await FadeIn();
            callBack?.Invoke();
            await FadeOut();
        }
    }
}