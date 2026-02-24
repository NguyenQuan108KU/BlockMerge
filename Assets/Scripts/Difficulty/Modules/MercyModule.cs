using System.Collections.Generic;
using UnityEngine;

namespace Difficulty
{
    /// <summary>
    /// TẦNG 3: Hidden Mercy Module
    /// "Vận may ẩn" - Cứu player khi thực sự đen đủi
    /// Tinh tế, không thể exploit
    /// </summary>
    public class MercyModule : IDifficultyModule
    {
        public string ModuleName => "HiddenMercy";

        #region State

        private DifficultyConfig config;
        private MercyState state;
        private List<BlockShapeSO> rescueShapes;

        // Rescue pool weights (cache)
        private int[] rescueWeights;
        private int totalRescueWeight;

        #endregion

        #region Properties

        /// <summary>
        /// Số tokens còn lại
        /// </summary>
        public int TokensRemaining => state?.tokensRemaining ?? 0;

        /// <summary>
        /// Có thể xét mercy không (còn token + hết cooldown)
        /// </summary>
        public bool CanConsiderMercy => state != null && state.CanConsiderMercy();

        /// <summary>
        /// Số lần đã cứu
        /// </summary>
        public int RescueCount => state?.rescueCount ?? 0;

        #endregion

        #region Initialization

        public void Initialize()
        {
            state = new MercyState();
        }

        /// <summary>
        /// Setup với config và rescue shapes
        /// </summary>
        public void Setup(DifficultyConfig difficultyConfig, List<BlockShapeSO> availableRescueShapes)
        {
            config = difficultyConfig;
            rescueShapes = availableRescueShapes ?? new List<BlockShapeSO>();

            // Cache rescue weights
            CacheRescueWeights();

            // Initialize tokens
            state.Initialize(config.mercyTokensMin, config.mercyTokensMax);

        }

        private void CacheRescueWeights()
        {
            if (config == null) return;

            // Giả sử rescue shapes theo thứ tự: 1x1, 1x2, 2x1
            // Nếu có ít hơn 3 shapes, điều chỉnh weights
            rescueWeights = new int[rescueShapes.Count];
            totalRescueWeight = 0;

            for (int i = 0; i < rescueShapes.Count; i++)
            {
                // Phân bổ weight dựa vào index và config
                int weight = i switch
                {
                    0 => config.rescueWeight_1x1,  // 1x1
                    1 => config.rescueWeight_1x2,  // 1x2
                    2 => config.rescueWeight_2x1,  // 2x1
                    _ => 10  // Default cho shapes khác
                };

                rescueWeights[i] = weight;
                totalRescueWeight += weight;
            }
        }

        public void Reset()
        {
            state?.Reset();
        }

        #endregion

        #region Core Logic

        /// <summary>
        /// Thử can thiệp mercy
        /// </summary>
        /// <param name="currentTension">Tension hiện tại (0-1)</param>
        /// <param name="hardBlockStreak">Số blocks khó liên tiếp</param>
        /// <returns>SpawnResult nếu mercy trigger, null nếu không</returns>
        public SpawnResult TryIntervene(float currentTension, int hardBlockStreak)
        {
            // Log để debug (có thể bỏ sau)

            // Điều kiện 1: Còn token và hết cooldown
            if (!CanConsiderMercy)
            {
                return null;
            }

            // Điều kiện 2: Tension đủ cao
            if (currentTension < config.mercyTensionThreshold)
            {
                return null;
            }

            // Điều kiện 3: Đủ streak blocks khó
            if (hardBlockStreak < config.mercyStreakRequired)
            {
                return null;
            }

            // Điều kiện 4: Roll chance (không phải 100%!)
            if (!config.RollMercyChance())
            {
                return null;
            }

            // TẤT CẢ điều kiện thỏa mãn → MERCY!
            return ExecuteMercy();
        }

        /// <summary>
        /// Thực hiện mercy rescue
        /// </summary>
        private SpawnResult ExecuteMercy()
        {
            if (rescueShapes.Count == 0)
            {
                return null;
            }

            // Pick rescue shape theo weight
            var rescueShape = PickWeightedRescueShape();

            // Sử dụng token và set cooldown
            int cooldown = config.GetRandomCooldown();
            state.UseToken(cooldown);


            return new SpawnResult(rescueShape, SpawnSource.MercyRescue);
        }

        /// <summary>
        /// Pick rescue shape theo weighted random
        /// </summary>
        private BlockShapeSO PickWeightedRescueShape()
        {
            if (rescueShapes.Count == 0) return null;
            if (totalRescueWeight <= 0) return rescueShapes[0];

            int roll = Random.Range(0, totalRescueWeight);
            int cumulative = 0;

            for (int i = 0; i < rescueShapes.Count; i++)
            {
                cumulative += rescueWeights[i];
                if (roll < cumulative)
                {
                    return rescueShapes[i];
                }
            }

            // Fallback
            return rescueShapes[rescueShapes.Count - 1];
        }

        /// <summary>
        /// Gọi sau mỗi block landed để giảm cooldown
        /// </summary>
        public void OnBlockLanded()
        {
            state?.DecrementCooldown();
        }

        #endregion
    }
}