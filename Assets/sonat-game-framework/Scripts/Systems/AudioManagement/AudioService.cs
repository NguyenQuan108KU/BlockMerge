using Sonat.Enums;
using System;
using System.Threading.Tasks;
using UnityEngine;

namespace SonatFramework.Systems.AudioManagement
{
    public abstract class AudioService : SonatServiceSo
    {
        public Action<AudioTracks> onAudioUpdate;

        public abstract float GetVolume(AudioTracks audioTrack);

        public abstract void SetVolume(AudioTracks audioTrack, float volume);

        public abstract bool IsMuted(AudioTracks audioTracks);

        public abstract Task<AudioClip> LoadAudioAsync(string soundName);

        public abstract void PlayMusic(AudioId music, bool loop = true, float volume = 1);

        public abstract void PlaySound(AudioId soundName, float volume = 1);

        public abstract void PlayAudio(AudioId audioId, AudioClip audioClip, float volume = 1,
            AudioTracks audioTrack = AudioTracks.Sound);

        public abstract Task PlayMusic(string music, bool loop = true, float volume = 1);

        public abstract Task PlaySound(string soundName, float volume = 1);

        public abstract void PlayAudio(string audioId, AudioClip audioClip, float volume = 1,
            AudioTracks audioTrack = AudioTracks.Sound);

        public abstract string GetCurrentMusic();
        public abstract void StopMusic();
        public abstract void ResumeMusic();
    }

    public enum AudioTracks : byte
    {
        Music = 0,
        Sound = 1
    }
}