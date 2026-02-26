using System.Collections.Generic;
using Newtonsoft.Json;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using UnityEngine;

public static class GameRemoteConfig
{
    // ── Banner ──
    public static int LevelStartShowBanner
        => SonatSDKAdapter.GetRemoteInt("level_start_show_banner", 1);

    // ── Interstitial ──
    public static int LevelStartShowInterstitial
        => SonatSDKAdapter.GetRemoteInt("level_start_show_interstitial", 5);

    public static int LevelShowInterLose
        => SonatSDKAdapter.GetRemoteInt("level_show_inter_lose", 5);

    public static int TimeGapInterstitialRewarded
        => SonatSDKAdapter.GetRemoteInt("time_gap_interstitial_rewarded", 30);

    // ── OnFocus ──
    public static int LevelStartShowOnfocus
        => SonatSDKAdapter.GetRemoteInt("level_start_show_onfocus", 15);

    public static int MinSecondsOutFocus
        => SonatSDKAdapter.GetRemoteInt("min_seconds_out_focus", 30);

    public static int TimeGapOnfocusInterstitial
        => SonatSDKAdapter.GetRemoteInt("time_gap_onfocus_interstitial", 30);

    // ── Native Banner (MREC) ──
    public static int LevelStartShowNativeBanner
        => SonatSDKAdapter.GetRemoteInt("level_start_show_native_banner", 5);

    // ── App Open ──
    public static int LevelStartShowAppopen
        => SonatSDKAdapter.GetRemoteInt("level_start_show_appopen", 15);

    // ── Internet ──
    public static bool InternetConnection
        => SonatSDKAdapter.GetRemoteBool("internet_connection", true);

    // ── Level Override ──
    public static string LevelId
        => SonatSDKAdapter.GetRemoteString("level_id", "");

    public static string RemoteLevelData
        => SonatSDKAdapter.GetRemoteString("remote_level_data", "");

    // ── Continue ──
    public static int ContinueExtraTime
        => SonatSDKAdapter.GetRemoteInt("continue_extra_time", 30);

    public static int ContinueUndoSteps
        => SonatSDKAdapter.GetRemoteInt("continue_undo_steps", 5);

    // ── Time Gap by Level ──
    private static Dictionary<int, int> _cachedTimeGap;
    private static string _cachedTimeGapRaw;

    public static int GetTimeGapForLevel(int level, int defaultGap = 0)
    {
        string raw = SonatSDKAdapter.GetRemoteString("by_level_time_gap_interstitial", "");
        if (string.IsNullOrEmpty(raw)) return defaultGap;

        if (raw != _cachedTimeGapRaw)
        {
            _cachedTimeGapRaw = raw;
            _cachedTimeGap = ParseTimeGapJson(raw);
        }

        if (_cachedTimeGap == null || _cachedTimeGap.Count == 0) return defaultGap;

        int result = defaultGap;
        foreach (var kvp in _cachedTimeGap)
        {
            if (kvp.Key <= level)
                result = kvp.Value;
            else
                break;
        }

        return result;
    }

    private static Dictionary<int, int> ParseTimeGapJson(string json)
    {
        try
        {
            var wrapper = JsonConvert.DeserializeObject<TimeGapWrapper>(json);
            if (wrapper?.data == null) return null;
            //var sorted = new SortedDictionary<int, int>(wrapper.data);
            //return new Dictionary<int, int>(sorted);
            return null;
        }
        catch (System.Exception e)
        {
            Debug.LogWarning($"[GameRemoteConfig] Failed to parse by_level_time_gap_interstitial: {e.Message}");
            return null;
        }
    }

    private class TimeGapWrapper
    {
        public Dictionary<int, int> data;
    }
}