using System;
using System.Threading;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule
{
    public class UITweenElement : MonoBehaviour
    {
        public TweenData tweenData;
        public bool playOnAwake = true;
        private CancellationTokenSource cts;

        private void OnEnable()
        {
            if (tweenData.target == null) tweenData.target = transform;
            if (playOnAwake) Play();
        }


        private void OnDisable()
        {
            if (cts != null)
            {
                cts.Cancel();
                cts.Dispose();
            }
        }


        public void Play()
        {
            cts = new CancellationTokenSource();
            UITween.Play(tweenData, cts.Token);
        }
    }
}