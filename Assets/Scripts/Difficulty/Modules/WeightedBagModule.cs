using System.Collections.Generic;
using UnityEngine;

namespace Difficulty
{
    /// <summary>
    /// TẦNG 2: Weighted Bag Module
    /// Random công bằng với hệ thống "túi"
    /// Đảm bảo mỗi shape xuất hiện đều trong 1 cycle
    /// </summary>
    public class WeightedBagModule : IDifficultyModule
    {
        public string ModuleName => "WeightedBag";

        #region State

        private ShapePoolSO shapePool;
        private List<BlockShapeSO> currentBag;
        private bool autoRefill;

        #endregion

        #region Properties

        /// <summary>
        /// Số blocks còn trong bag
        /// </summary>
        public int RemainingInBag => currentBag?.Count ?? 0;

        /// <summary>
        /// Bag đã hết chưa
        /// </summary>
        public bool IsBagEmpty => currentBag == null || currentBag.Count == 0;

        #endregion

        #region Initialization

        public void Initialize()
        {
            currentBag = new List<BlockShapeSO>();
            autoRefill = true;
        }

        /// <summary>
        /// Setup với shape pool
        /// </summary>
        public void Setup(ShapePoolSO pool, bool autoRefillBag = true)
        {
            shapePool = pool;
            autoRefill = autoRefillBag;
            RefillBag();

            //Debug.Log($"[WeightedBag] Setup with pool '{pool?.name}', bag size: {RemainingInBag}");
        }

        public void Reset()
        {
            RefillBag();
            //Debug.Log($"[WeightedBag] Reset - bag refilled with {RemainingInBag} blocks");
        }

        #endregion

        #region Core Logic

        /// <summary>
        /// Lấy block tiếp theo từ bag
        /// </summary>
        public SpawnResult Pick()
        {
            // Auto refill nếu hết
            if (IsBagEmpty && autoRefill)
            {
                RefillBag();
            }

            if (IsBagEmpty)
            {
                return null;
            }

            // Random pick từ bag
            int index = Random.Range(0, currentBag.Count);
            var shape = currentBag[index];

            // Xóa khỏi bag
            currentBag.RemoveAt(index);


            return new SpawnResult(shape, SpawnSource.WeightedBag);
        }

        /// <summary>
        /// Refill bag từ pool
        /// </summary>
        public void RefillBag()
        {
            if (shapePool == null)
            {
                return;
            }

            currentBag = shapePool.CreateWeightedBag();
            shapePool.ShuffleBag(currentBag);

        }

        /// <summary>
        /// Kiểm tra shape có phải loại Hard không
        /// </summary>
        public bool IsHardShape(BlockShapeSO shape)
        {
            return shapePool != null && shapePool.IsHardShape(shape);
        }

        #endregion

    }
}