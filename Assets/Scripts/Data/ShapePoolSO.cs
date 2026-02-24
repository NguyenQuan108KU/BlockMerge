using System.Collections.Generic;
using UnityEngine;

namespace Difficulty
{
    /// <summary>
    /// Entry cho mỗi shape trong pool
    /// </summary>
    [System.Serializable]
    public class ShapeWeightEntry
    {
        [Tooltip("Reference đến BlockShapeSO")]
        public BlockShapeSO shape;

        [Tooltip("Trọng số (weight) - càng cao càng hay xuất hiện")]
        [Range(1, 20)]
        public int weight = 1;

        [Tooltip("Phân loại độ khó")]
        public ShapeCategory category = ShapeCategory.Medium;

        [Tooltip("Có thể dùng làm rescue block không")]
        public bool isRescueShape = false;
    }

    /// <summary>
    /// ScriptableObject chứa pool các shapes với weights
    /// Dùng cho Weighted Bag System
    /// </summary>
    [CreateAssetMenu(fileName = "ShapePool", menuName = "Game/Difficulty/Shape Pool")]
    public class ShapePoolSO : ScriptableObject
    {
        [Header("═══ SHAPE ENTRIES ═══")]
        [Tooltip("Danh sách shapes với weights")]
        public List<ShapeWeightEntry> entries = new List<ShapeWeightEntry>();

        #region Getters

        /// <summary>
        /// Tổng weight của tất cả shapes
        /// </summary>
        public int GetTotalWeight()
        {
            int total = 0;
            foreach (var entry in entries)
            {
                if (entry.shape != null)
                    total += entry.weight;
            }
            return total;
        }

        /// <summary>
        /// Lấy tất cả shapes theo category
        /// </summary>
        public List<BlockShapeSO> GetShapesByCategory(ShapeCategory category)
        {
            var result = new List<BlockShapeSO>();
            foreach (var entry in entries)
            {
                if (entry.shape != null && entry.category == category)
                    result.Add(entry.shape);
            }
            return result;
        }

        /// <summary>
        /// Lấy tất cả rescue shapes
        /// </summary>
        public List<BlockShapeSO> GetRescueShapes()
        {
            var result = new List<BlockShapeSO>();
            foreach (var entry in entries)
            {
                if (entry.shape != null && entry.isRescueShape)
                    result.Add(entry.shape);
            }
            return result;
        }

        /// <summary>
        /// Lấy entry theo shape
        /// </summary>
        public ShapeWeightEntry GetEntry(BlockShapeSO shape)
        {
            foreach (var entry in entries)
            {
                if (entry.shape == shape)
                    return entry;
            }
            return null;
        }

        /// <summary>
        /// Kiểm tra shape có phải loại Hard không
        /// </summary>
        public bool IsHardShape(BlockShapeSO shape)
        {
            var entry = GetEntry(shape);
            return entry != null && entry.category == ShapeCategory.Hard;
        }

        #endregion

        #region Bag Creation

        /// <summary>
        /// Tạo bag (danh sách) chứa shapes theo weight
        /// Mỗi shape xuất hiện số lần = weight của nó
        /// </summary>
        public List<BlockShapeSO> CreateWeightedBag()
        {
            var bag = new List<BlockShapeSO>();

            foreach (var entry in entries)
            {
                if (entry.shape != null)
                {
                    // Thêm shape vào bag số lần = weight
                    for (int i = 0; i < entry.weight; i++)
                    {
                        bag.Add(entry.shape);
                    }
                }
            }

            return bag;
        }

        /// <summary>
        /// Shuffle bag (Fisher-Yates algorithm)
        /// </summary>
        public void ShuffleBag(List<BlockShapeSO> bag)
        {
            for (int i = bag.Count - 1; i > 0; i--)
            {
                int j = Random.Range(0, i + 1);
                // Swap
                var temp = bag[i];
                bag[i] = bag[j];
                bag[j] = temp;
            }
        }

        #endregion

        #region Validation

        private void OnValidate()
        {
            // Đảm bảo không có entry null
            for (int i = entries.Count - 1; i >= 0; i--)
            {
                if (entries[i] == null)
                    entries.RemoveAt(i);
            }
        }

        #endregion

        #region Debug

        /// <summary>
        /// Log thông tin pool (debug)
        /// </summary>
        public void DebugLogPool()
        {
            Debug.Log($"[ShapePool] {name} - {entries.Count} entries, Total Weight: {GetTotalWeight()}");
            foreach (var entry in entries)
            {
                if (entry.shape != null)
                {
                    Debug.Log($"  - {entry.shape.name}: weight={entry.weight}, category={entry.category}, rescue={entry.isRescueShape}");
                }
            }
        }

        #endregion
    }
}