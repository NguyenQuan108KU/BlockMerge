using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.UserData;
using UnityEngine;

public class GameAdsController : MonoBehaviour
{
    public static GameAdsController Instance { get; private set; }

    private int _currentLevel;
    private float _lostFocusTime;
    private float _lastInterTime = -9999f;

    private EventBinding<LevelStartedEvent> _levelStartedBinding;

    #region Lifecycle

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        _levelStartedBinding = new EventBinding<LevelStartedEvent>(OnLevelStarted);
    }

    private void OnDestroy()
    {
        _levelStartedBinding?.Dispose();
        if (Instance == this) Instance = null;
    }

    #endregion

    #region Banner

    private void OnLevelStarted(LevelStartedEvent eventData)
    {
        _currentLevel = eventData.level;
        SonatSDKAdapter.SetBanner(_currentLevel >= GameRemoteConfig.LevelStartShowBanner);
    }

    #endregion

    #region OnFocus — App Open → Fallback Interstitial

    private void OnApplicationFocus(bool hasFocus)
    {
        if (!hasFocus)
        {
            _lostFocusTime = Time.realtimeSinceStartup;
            return;
        }

        if (SonatSDKAdapter.IsNoads()) return;
        if (TryShowAppOpen()) return;
        if (CanShowOnfocusAds())
            SonatSDKAdapter.ShowInterAds("onfocus", OnInterShown);
    }

    #endregion

    #region App Open

    private bool TryShowAppOpen()
    {
        if (_currentLevel < GameRemoteConfig.LevelStartShowAppopen) return false;
        if (!SonatSDKAdapter.IsAppOpenAdsReady()) return false;

        float outDuration = Time.realtimeSinceStartup - _lostFocusTime;
        if (outDuration < GameRemoteConfig.MinSecondsOutFocus) return false;

        SonatSDKAdapter.ShowAppOpenAds();
        return true;
    }

    #endregion

    #region OnFocus Interstitial

    private bool CanShowOnfocusAds()
    {
        if (_currentLevel < GameRemoteConfig.LevelStartShowOnfocus) return false;

        float outDuration = Time.realtimeSinceStartup - _lostFocusTime;
        if (outDuration < GameRemoteConfig.MinSecondsOutFocus) return false;

        float sinceLastInter = Time.realtimeSinceStartup - _lastInterTime;
        if (sinceLastInter < GameRemoteConfig.TimeGapOnfocusInterstitial) return false;

        if (!SonatSDKAdapter.CanShowInterAds()) return false;
        return true;
    }

    private void OnInterShown()
    {
        _lastInterTime = Time.realtimeSinceStartup;
    }

    #endregion

    #region Static Helpers

    public static bool CanShowInterOnLose()
    {
        int level = GetCurrentLevel();
        return level >= GameRemoteConfig.LevelShowInterLose;
    }

    // Check time gap theo level trước khi show inter
    public static bool CanShowInterByTimeGap()
    {
        if (Instance == null) return true;

        int gap = GameRemoteConfig.GetTimeGapForLevel(GetCurrentLevel());
        if (gap <= 0) return true;

        float sinceLastInter = Time.realtimeSinceStartup - Instance._lastInterTime;
        return sinceLastInter >= gap;
    }

    public static void RecordInterShown()
    {
        if (Instance != null)
            Instance._lastInterTime = Time.realtimeSinceStartup;
    }

    private static int GetCurrentLevel()
    {
        return SonatSystem.GetService<UserDataService>()?.GetLevel() ?? 1;
    }

    #endregion
}