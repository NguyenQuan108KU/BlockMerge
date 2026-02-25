using Sirenix.OdinInspector;
using SonatFramework.Systems.AudioManagement;
using SonatFramework.Systems.SettingsManagement.Vibation;
using UnityEngine;
using UnityEngine.UI;

namespace SonatFramework.Systems.SettingsManagement
{
    public class SettingsElement : MonoBehaviour
    {
        [SerializeField] private Toggle musicToggle;
        [SerializeField] private Toggle soundToggle;
        [SerializeField] private Toggle vibrateToggle;

        [SerializeField] private Service<AudioService> audioService = new SonatFramework.Systems.Service<SonatFramework.Systems.AudioManagement.AudioService>();
        [SerializeField] private Service<VibrationService> vibrationService = new SonatFramework.Systems.Service<SonatFramework.Systems.SettingsManagement.Vibation.VibrationService>();
        

        public void Start()
        {
            Setup();
        }

        private void Setup()
        {
            musicToggle.isOn = audioService.Instance.GetVolume(AudioTracks.Music) != 0;
            soundToggle.isOn = audioService.Instance.GetVolume(AudioTracks.Sound) != 0;
            vibrateToggle.isOn = vibrationService.Instance.GetVibrationState();

            musicToggle.onValueChanged.AddListener(OnMusicChanged);
            soundToggle.onValueChanged.AddListener(isOn => audioService.Instance.SetVolume(AudioTracks.Sound, isOn ? 1 : 0));
            vibrateToggle.onValueChanged.AddListener(isOn => vibrationService.Instance.SetVibrationState(isOn));
        }

        private void OnMusicChanged(bool isOn)
        {
            audioService.Instance.SetVolume(AudioTracks.Music, isOn ? 1 : 0);
            if (!isOn)
            {
                audioService.Instance.StopMusic();
            }
            else
            {
                audioService.Instance.ResumeMusic();
            }
        }
    }
}