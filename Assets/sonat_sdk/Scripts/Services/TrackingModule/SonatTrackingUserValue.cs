using System.Collections.Generic;
using Sonat.Data;
using Sonat.FirebaseModule;
using Sonat.IapModule;
using UnityEngine;

namespace Sonat.TrackingModule
{
    public static class SonatTrackingUserValue
    {
        private static int levelThreshold;
        private static int eCPMThreshold;
        private static int logInterval;
        private static PlayerPrefInt countByLevel;
        private static PlayerPrefFloat accumulatedValueByLevel;
        private static PlayerPrefInt countByECPM;
        private static PlayerPrefFloat accumulatedValueByECPM;
        private const string nonCurrencyCode = "XXX";

        public static void Initialize()
        {
            levelThreshold = SonatFirebase.remote.GetRemoteInt("tracking_user_value_level_threshold", 36);
            eCPMThreshold = SonatFirebase.remote.GetRemoteInt("tracking_user_value_eCPM_threshold", 10);
            logInterval = SonatFirebase.remote.GetRemoteInt("tracking_user_value_log_interval", 10);
            countByLevel = new PlayerPrefInt("User_Value_Count_By_Level", 0);
            accumulatedValueByLevel = new PlayerPrefFloat("User_Value_AccumulatedValue_By_Level", 0);
            countByECPM = new PlayerPrefInt("User_Value_Count_By_Ecpm", 0);
            accumulatedValueByECPM = new PlayerPrefFloat("User_Value_AccumulatedValue_By_Ecpm", 0);

            SonatAnalyticTracker.OnLtvIaaAdded += OnLtvIaaAdded;
            SonatIap.OnLtvIapAdded += OnLtvIapAdded;
        }

        private static void OnLtvIapAdded(float value)
        {
            if (UserData.GetLevel() >= levelThreshold)
            {
                var log = new CustomSonatLog($"user_start_level_{levelThreshold}", new List<LogParameter>()
                {
                    new LogParameter("value", value),
                    new LogParameter("currency", nonCurrencyCode)
                });
                log.Post(true);
            }
            else
            {
                accumulatedValueByLevel.Value += value;
                countByLevel.Value += logInterval;
            }

            if (SonatLogRecursive.sn_max_eCPM_rewarded >= eCPMThreshold)
            {
                var log = new CustomSonatLog($"user_rwd_value_{eCPMThreshold}", new List<LogParameter>()
                {
                    new LogParameter("value", accumulatedValueByECPM.Value),
                    new LogParameter("currency", nonCurrencyCode)
                });
                log.Post(true);
            }
            else
            {
                accumulatedValueByECPM.Value += value;
                countByECPM.Value += logInterval;
            }
        }

        private static void OnLtvIaaAdded(float value)
        {
            Log(" iaa add ");
            CheckLogLevel(value);
            CheckLogECPM(value);
        }

        private static void CheckLogLevel(float value)
        {
            if (countByLevel.Value >= logInterval)
            {
                if (UserData.GetLevel() >= levelThreshold)
                {
                    var log = new CustomSonatLog($"user_start_level_{levelThreshold}", new List<LogParameter>()
                    {
                        new LogParameter("value", accumulatedValueByLevel.Value),
                        new LogParameter("currency", nonCurrencyCode)
                    });
                    log.Post(true);
                    accumulatedValueByLevel.Value = 0;
                    countByLevel.Value = 0;
                    Log(" level post ");
                    return;
                }
            }

            countByLevel.Value += 1;
            accumulatedValueByLevel.Value += value;
            Log(" level accumulated ");
        }

        private static void CheckLogECPM(float value)
        {
            if (countByECPM.Value >= logInterval)
            {
                if (SonatLogRecursive.sn_max_eCPM_rewarded >= eCPMThreshold)
                {
                    var log = new CustomSonatLog($"user_rwd_value_{eCPMThreshold}", new List<LogParameter>()
                    {
                        new LogParameter("value", accumulatedValueByECPM.Value),
                        new LogParameter("currency", nonCurrencyCode)
                    });
                    log.Post(true);
                    accumulatedValueByECPM.Value = 0;
                    countByECPM.Value = 0;
                    Log(" ecpm post ");
                    return;
                }
            }

            countByECPM.Value += 1;
            accumulatedValueByECPM.Value += value;
            Log(" ecpm accumulated ");
        }

        private static void Log(string message)
        {
            Debug.Log(
                $"[User Value]: {message}: level - {UserData.GetLevel()}, ecpm - {accumulatedValueByECPM.Value}, count level - {countByLevel.Value}, coutEcpm - {countByECPM.Value}" +
                $", accumulatedValueByECPM - {accumulatedValueByECPM.Value}, accumulatedValueByLevel - {accumulatedValueByLevel.Value}");
        }
    }
}