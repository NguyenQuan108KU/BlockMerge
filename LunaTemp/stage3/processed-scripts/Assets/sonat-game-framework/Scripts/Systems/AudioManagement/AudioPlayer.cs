using System;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Scripts.Utils;
using UnityEngine;

namespace SonatFramework.Systems.AudioManagement
{
    public class AudioPlayer : MonoBehaviour
    {
        [EnumToggleButtons] [SerializeField] private AudioTracks audioTracks = AudioTracks.Sound;

        [SerializeField] protected AudioId audioId;

        [ShowIf("@audioId == AudioId.None")] [SerializeField]
        protected string audioName;

        [SerializeField] protected bool playOnAwake;
        [SerializeField] protected float delay;

        [Range(0f, 1f)] [SerializeField] private float volume = 1;

        [SerializeField] private Service<AudioService> audioService = new SonatFramework.Systems.Service<SonatFramework.Systems.AudioManagement.AudioService>();

        protected virtual void OnEnable()
        {
            if (playOnAwake)
            {
                PlayAudio();
            }
        }

        public virtual void PlayAudio()
        {
            if (delay == 0) Play();
            else
            {
                SonatUtils.DelayCall(delay, Play, this);
            }
        }

        protected virtual void Play()
        {
            switch (audioTracks)
            {
                case AudioTracks.Sound:
                    if (audioId != AudioId.None)
                    {
                        audioService.Instance.PlaySound(audioId, volume);
                    }
                    else
                    {
                        audioService.Instance.PlaySound(audioName, volume);
                    }

                    break;
                case AudioTracks.Music:
                    if (audioId != AudioId.None)
                    {
                        audioService.Instance.PlayMusic(audioId, true, volume);
                    }
                    else
                    {
                        audioService.Instance.PlayMusic(audioName, true, volume);
                    }

                    break;
            }
        }
    }
}