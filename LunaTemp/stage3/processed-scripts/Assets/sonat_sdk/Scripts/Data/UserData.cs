using System.Collections.Generic;

namespace Sonat.Data
{
    public class UserData
    {
        private static Dictionary<string, PlayerPrefInt> levels = new System.Collections.Generic.Dictionary<string, Sonat.PlayerPrefInt>();
        private static PlayerPrefString mode = new PlayerPrefString("userMode", "classic");
        
        public static PlayerPrefInt IsNoads = new PlayerPrefInt("IsNoAds", 0);
        public static PlayerPrefString FirebaseInstanceId = new Sonat.PlayerPrefString("FirebaseInstanceId", "");
        public static PlayerPrefString AnalyticsInstanceId = new Sonat.PlayerPrefString("AnalyticsInstanceId", "");
        public static PlayerPrefInt FirstPlay = new Sonat.PlayerPrefInt("FirstPlay", 1);
        public static PlayerPrefInt UserDay = new Sonat.PlayerPrefInt("userDay", 0);
        public static PlayerPrefString UserCampaignSegment = new Sonat.PlayerPrefString("SonatUserCampaignSegment", "Organic");
        public static PlayerPrefInt RewardedCount = new Sonat.PlayerPrefInt("RewardedCount", 0);
        public static PlayerPrefInt InterstitialCount = new Sonat.PlayerPrefInt("InterstitialCount", 0);

        public static int GetLevel(string mode)
        {
            if (!levels.TryGetValue(mode, out var result))
            {
                result = new PlayerPrefInt($"sonat_sdk_{mode}_level", 1);
            }

            return result.Value;
        }

        public static int GetLevel()
        {
            return GetLevel(mode.Value);
        }

        public static string GetMode()
        {
            return mode.Value;
        }

        public static void SetLevel(int level, string mode = "classic")
        {
            if (!levels.TryGetValue(mode, out var result))
            {
                result = new PlayerPrefInt($"sonat_sdk_{mode}_level", level);
                levels.Add(mode, result);
            }
            else
            {
                result.Value = level;
            }
        }

        public static void SetMode(string _mode)
        {
            mode.Value = _mode;
        }

    }
}
