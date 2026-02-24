using Sonat.Enums;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using SonatFramework.Systems.GameDataManagement;
using SonatFramework.Systems.SettingsManagement.Vibation;
using UnityEngine;
using UnityEngine.UI;

public class PopupSettings : Panel
{
    [Header("Toggle Visuals")]
    [SerializeField] private ToggleSwitchVisual toggleSoundVisual;
    [SerializeField] private ToggleSwitchVisual toggleMusicVisual;
    [SerializeField] private ToggleSwitchVisual toggleVibrationVisual;

    [Header("Buttons")]
    [SerializeField] private Button btnResume;
    [SerializeField] private Button btnClose;
    [SerializeField] private Button btnRestart;

    private readonly Service<AudioService> _audioService = new();
    private readonly Service<VibrationService> _vibrationService = new();
    private readonly Service<DataService> _dataService = new();

    private Toggle _toggleSound;
    private Toggle _toggleMusic;
    private Toggle _toggleVibration;
    private GameState _previousState;

    public override void OnSetup()
    {
        base.OnSetup();

        _toggleSound = toggleSoundVisual?.GetComponent<Toggle>();
        _toggleMusic = toggleMusicVisual?.GetComponent<Toggle>();
        _toggleVibration = toggleVibrationVisual?.GetComponent<Toggle>();

        btnResume?.onClick.AddListener(Close);
        btnClose?.onClick.AddListener(Close);
        btnRestart?.onClick.AddListener(OnRestart);
    }

    public override void Open(UIData uiData)
    {
        _previousState = GameManager.Instance.CurrentState;
        base.Open(uiData);
        // Sync ngay sau SetActive(true) + trước khi tween hiện — user không thấy toggle chuyển
        SyncToggles();
    }

    public override void OnOpenCompleted()
    {
        base.OnOpenCompleted();
        BindListeners();

        if (_previousState == GameState.Playing)
            GameManager.Instance.SetGameState(GameState.Paused);
    }

    protected override void OnCloseCompleted()
    {
        UnbindListeners();

        if (_previousState == GameState.Playing)
            GameManager.Instance.SetGameState(GameState.Playing);

        base.OnCloseCompleted();
    }

    private void OnSoundChanged(bool isOn)
    {
        _audioService.Instance?.SetVolume(AudioTracks.Sound, isOn ? 1f : 0f);
        SaveSettings();
    }

    private void OnMusicChanged(bool isOn)
    {
        var audio = _audioService.Instance;
        if (audio == null) return;

        audio.SetVolume(AudioTracks.Music, isOn ? 1f : 0f);

        if (isOn)
            audio.ResumeMusic();
        else
            audio.StopMusic();

        SaveSettings();
    }

    private void OnVibrationChanged(bool isOn)
    {
        _vibrationService.Instance?.SetVibrationState(isOn);
        SaveSettings();
    }

    private void SaveSettings()
    {
        _dataService.Instance?.SaveData();
    }

    private void OnRestart()
    {
        Close();
        GameManager.Instance.RestartGame();
    }

    private void SyncToggles()
    {
        var audio = _audioService.Instance;
        var vibration = _vibrationService.Instance;

        if (toggleSoundVisual != null && audio != null)
            toggleSoundVisual.SetupState(!audio.IsMuted(AudioTracks.Sound));

        if (toggleMusicVisual != null && audio != null)
            toggleMusicVisual.SetupState(!audio.IsMuted(AudioTracks.Music));

        if (toggleVibrationVisual != null && vibration != null)
            toggleVibrationVisual.SetupState(vibration.GetVibrationState());
    }

    private void BindListeners()
    {
        _toggleSound?.onValueChanged.AddListener(OnSoundChanged);
        _toggleMusic?.onValueChanged.AddListener(OnMusicChanged);
        _toggleVibration?.onValueChanged.AddListener(OnVibrationChanged);
    }

    private void UnbindListeners()
    {
        _toggleSound?.onValueChanged.RemoveListener(OnSoundChanged);
        _toggleMusic?.onValueChanged.RemoveListener(OnMusicChanged);
        _toggleVibration?.onValueChanged.RemoveListener(OnVibrationChanged);
    }
}