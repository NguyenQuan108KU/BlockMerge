using UnityEngine;

namespace Sonat.Debugger
{
    public static class SonatDebugger
    {
        public static void Log(this SonatDebugType debugType, object message, string color = "white")
        {
#if !ignore_log && !ignore_log_messages
            if (!CheckLogType(debugType)) return;
            Debug.Log($"<color={color}>[SONAT] {debugType}: {message}</color>");
#endif
        }

        public static void LogWarning(this SonatDebugType debugType, object message, string color = "yellow")
        {
#if !ignore_log && !ignore_log_warnings
            if (!CheckLogType(debugType)) return;
            Debug.LogWarning($"<color={color}>[SONAT] {debugType}: {message}</color>");
#endif
        }

        public static void LogError(this SonatDebugType debugType, object message, string color = "red")
        {
#if !ignore_log && !ignore_log_errors
            if (!CheckLogType(debugType)) return;
            Debug.LogError($"<color={color}>[SONAT] {debugType}: {message}</color>");
#endif
        }

        private static bool CheckLogType(SonatDebugType debugType)
        {
            var forceLog = PlayerPrefs.GetInt($"{nameof(SonatDebugger)}_{debugType}", 0) == 1 || PlayerPrefs.GetInt($"{nameof(SonatDebugger)}_{SonatDebugType.All}", 0) == 1;
#if UNITY_EDITOR
            var showLog = SonatSdkManager.Settings.logTypes.Contains(SonatDebugType.All) || SonatSdkManager.Settings.logTypes.Contains(debugType);
#else
            var showLog = false;
#endif
            return forceLog || showLog;
        }
    }

#if !CUSTOM_DEBUG_TYPE
    public enum SonatDebugType
    {
        Common = 0,
        Ads,
        Iap,
        Tracking,
        RemoteConfig,
        Editor,
        Firebase,
        Development,
        All
    }
#endif
}