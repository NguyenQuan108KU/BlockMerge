using System.Collections.Generic;
using UnityEngine;

namespace Difficulty
{
    /// <summary>
    /// Theo dõi streak (chuỗi) các blocks
    /// Đặc biệt: đếm số blocks khó liên tiếp
    /// </summary>
    public class StreakTracker : IDifficultyModule
    {
        public string ModuleName => "StreakTracker";

        #region State

        private List<BlockShapeSO> recentShapes;
        private int hardBlockStreak;
        private int maxHistorySize;

        // Reference để check hard shapes
        private ShapePoolSO shapePool;

        #endregion

        #region Properties

        /// <summary>
        /// Số blocks khó liên tiếp hiện tại
        /// </summary>
        public int HardBlockStreak => hardBlockStreak;

        /// <summary>
        /// Lịch sử các shapes gần đây
        /// </summary>
        public IReadOnlyList<BlockShapeSO> RecentShapes => recentShapes;

        #endregion

        #region Initialization

        public void Initialize()
        {
            maxHistorySize = 10;
            recentShapes = new List<BlockShapeSO>();
            hardBlockStreak = 0;
        }

        /// <summary>
        /// Setup với shape pool để check hard shapes
        /// </summary>
        public void Setup(ShapePoolSO pool, int historySize = 10)
        {
            shapePool = pool;
            maxHistorySize = historySize;
            recentShapes = new List<BlockShapeSO>();
            hardBlockStreak = 0;

        }

        public void Reset()
        {
            recentShapes.Clear();
            hardBlockStreak = 0;
        }

        #endregion

        #region Core Logic

        /// <summary>
        /// Ghi nhận shape mới được spawn
        /// </summary>
        public void RecordShape(BlockShapeSO shape)
        {
            if (shape == null) return;

            // Thêm vào history
            recentShapes.Add(shape);

            // Giới hạn history size
            while (recentShapes.Count > maxHistorySize)
            {
                recentShapes.RemoveAt(0);
            }

            // Cập nhật hard streak
            UpdateHardStreak(shape);

        }

        /// <summary>
        /// Cập nhật streak blocks khó
        /// </summary>
        private void UpdateHardStreak(BlockShapeSO shape)
        {
            bool isHard = IsHardShape(shape);

            if (isHard)
            {
                hardBlockStreak++;
            }
            else
            {
                hardBlockStreak = 0; // Reset streak
            }
        }

        /// <summary>
        /// Kiểm tra shape có phải loại Hard không
        /// </summary>
        private bool IsHardShape(BlockShapeSO shape)
        {
            if (shapePool != null)
            {
                return shapePool.IsHardShape(shape);
            }

            // Fallback: check tên shape (nếu không có pool)
            string name = shape?.name?.ToLower() ?? "";
            return name.Contains("l1") || name.Contains("l2") ||
                   name.Contains("l3") || name.Contains("l4") ||
                   name.Contains("3x1") || name.Contains("1x3");
        }

        /// <summary>
        /// Reset streak (gọi khi được mercy)
        /// </summary>
        public void ResetStreak()
        {
            hardBlockStreak = 0;
        }

        #endregion

        #region Query

        /// <summary>
        /// Lấy N shapes gần nhất
        /// </summary>
        public List<BlockShapeSO> GetLastNShapes(int n)
        {
            int start = Mathf.Max(0, recentShapes.Count - n);
            int count = Mathf.Min(n, recentShapes.Count);
            return recentShapes.GetRange(start, count);
        }

        /// <summary>
        /// Đếm số lần shape xuất hiện trong history
        /// </summary>
        public int CountShapeInHistory(BlockShapeSO shape)
        {
            int count = 0;
            foreach (var s in recentShapes)
            {
                if (s == shape) count++;
            }
            return count;
        }

        #endregion

    }
}