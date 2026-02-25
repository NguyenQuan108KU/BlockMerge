using UnityEngine;
using SonatFramework.Systems.ConfigManagement;

namespace Difficulty
{
   
    [CreateAssetMenu(fileName = "DifficultyConfig", menuName = "TowerStack/Difficulty Config")]
    public class DifficultyConfig : ConfigSo
    {
        #region Mercy Token Settings

        [Header("═══ MERCY TOKEN SETTINGS ═══")]
        [Tooltip("Số tokens tối thiểu mỗi game")]
        [Range(1, 5)]
        public int mercyTokensMin = 2;

        [Tooltip("Số tokens tối đa mỗi game")]
        [Range(1, 5)]
        public int mercyTokensMax = 3;

        [Tooltip("Tension threshold để xét mercy (0.8 = 80%)")]
        [Range(0.5f, 0.95f)]
        public float mercyTensionThreshold = 0.8f;

        [Tooltip("Số blocks khó liên tiếp để trigger mercy")]
        [Range(2, 5)]
        public int mercyStreakRequired = 3;

        [Tooltip("Xác suất dùng token khi đủ điều kiện (0.65 = 65%)")]
        [Range(0.3f, 0.9f)]
        public float mercyChance = 0.65f;

        [Tooltip("Cooldown tối thiểu sau mercy (số blocks)")]
        [Range(3, 10)]
        public int mercyCooldownMin = 5;

        [Tooltip("Cooldown tối đa sau mercy (số blocks)")]
        [Range(3, 10)]
        public int mercyCooldownMax = 8;

        #endregion

        #region Rescue Pool Weights

        [Header("═══ RESCUE POOL WEIGHTS ═══")]
        [Tooltip("Tỷ trọng 1x1 trong rescue pool")]
        [Range(0, 100)]
        public int rescueWeight_1x1 = 40;

        [Tooltip("Tỷ trọng 1x2 trong rescue pool")]
        [Range(0, 100)]
        public int rescueWeight_1x2 = 35;

        [Tooltip("Tỷ trọng 2x1 trong rescue pool")]
        [Range(0, 100)]
        public int rescueWeight_2x1 = 25;

        #endregion

        #region Tension Thresholds

        [Header("═══ TENSION THRESHOLDS ═══")]
        [Tooltip("Ngưỡng cảnh báo (hiển thị UI)")]
        [Range(0.3f, 0.7f)]
        public float warningThreshold = 0.5f;

        [Tooltip("Ngưỡng nguy hiểm (hiển thị UI)")]
        [Range(0.5f, 0.85f)]
        public float dangerThreshold = 0.7f;

        [Tooltip("Ngưỡng critical (hiển thị UI)")]
        [Range(0.7f, 0.95f)]
        public float criticalThreshold = 0.85f;

        #endregion

        #region Bag Settings

        [Header("═══ WEIGHTED BAG SETTINGS ═══")]
        [Tooltip("Có refill bag ngay khi hết không")]
        public bool autoRefillBag = true;

        #endregion

        #region Helper Methods

        /// <summary>
        /// Random số tokens cho game mới
        /// </summary>
        public int GetRandomTokenCount()
        {
            return Random.Range(mercyTokensMin, mercyTokensMax + 1);
        }

        /// <summary>
        /// Random cooldown sau khi mercy
        /// </summary>
        public int GetRandomCooldown()
        {
            return Random.Range(mercyCooldownMin, mercyCooldownMax + 1);
        }

        /// <summary>
        /// Kiểm tra mercy có trigger không (dựa trên chance)
        /// </summary>
        public bool RollMercyChance()
        {
            return Random.value <= mercyChance;
        }

        /// <summary>
        /// Lấy tổng weight của rescue pool
        /// </summary>
        public int GetTotalRescueWeight()
        {
            return rescueWeight_1x1 + rescueWeight_1x2 + rescueWeight_2x1;
        }

        #endregion

        #region Validation

        private void OnValidate()
        {
            // Đảm bảo min <= max
            if (mercyTokensMin > mercyTokensMax)
                mercyTokensMin = mercyTokensMax;

            if (mercyCooldownMin > mercyCooldownMax)
                mercyCooldownMin = mercyCooldownMax;

            // Đảm bảo thresholds theo thứ tự
            if (warningThreshold > dangerThreshold)
                warningThreshold = dangerThreshold;

            if (dangerThreshold > criticalThreshold)
                dangerThreshold = criticalThreshold;
        }

        #endregion
    }
}