using UnityEngine;

namespace Difficulty
{
    /// <summary>
    /// Theo dõi Tension Level (độ cao tháp so với max)
    /// Tension = CurrentHeight / MaxHeight
    /// </summary>
    public class TensionTracker : IDifficultyModule
    {
        public string ModuleName => "TensionTracker";

        #region State

        private int maxHeight;
        private int currentHeight;

        #endregion

        #region Properties

        /// <summary>
        /// Tension hiện tại (0.0 - 1.0)
        /// </summary>
        public float CurrentTension
        {
            get
            {
                if (maxHeight <= 0) return 0f;
                return Mathf.Clamp01((float)currentHeight / maxHeight);
            }
        }

        /// <summary>
        /// Chiều cao hiện tại
        /// </summary>
        public int CurrentHeight => currentHeight;

        /// <summary>
        /// Chiều cao tối đa
        /// </summary>
        public int MaxHeight => maxHeight;

        #endregion

        #region Initialization

        public void Initialize()
        {
            maxHeight = 15; // Default
            currentHeight = 0;
        }

        /// <summary>
        /// Setup với max height từ config
        /// </summary>
        public void Setup(int maxHeightValue)
        {
            maxHeight = maxHeightValue;
            currentHeight = 0;

        }

        public void Reset()
        {
            currentHeight = 0;
        }

        #endregion

        #region Update

        /// <summary>
        /// Cập nhật chiều cao hiện tại
        /// Gọi sau mỗi block landed
        /// </summary>
        public void UpdateHeight(int newHeight)
        {
            currentHeight = Mathf.Clamp(newHeight, 0, maxHeight);
        }

        /// <summary>
        /// Lấy height từ GridManager và cập nhật
        /// </summary>
        public void UpdateFromGrid()
        {
            if (GridManager.Instance != null)
            {
                currentHeight = GridManager.Instance.GetMaxHeightCurrent();
            }
        }

        #endregion

        #region Helpers

        /// <summary>
        /// Kiểm tra có đang ở vùng nguy hiểm không
        /// </summary>
        public bool IsInDanger(float dangerThreshold = 0.7f)
        {
            return CurrentTension >= dangerThreshold;
        }

        /// <summary>
        /// Kiểm tra có đang ở vùng critical không
        /// </summary>
        public bool IsInCritical(float criticalThreshold = 0.85f)
        {
            return CurrentTension >= criticalThreshold;
        }

        /// <summary>
        /// Lấy mô tả tension zone
        /// </summary>
        public string GetTensionZone(DifficultyConfig config = null)
        {
            float warning = config?.warningThreshold ?? 0.5f;
            float danger = config?.dangerThreshold ?? 0.7f;
            float critical = config?.criticalThreshold ?? 0.85f;

            if (CurrentTension >= critical) return "CRITICAL";
            if (CurrentTension >= danger) return "DANGER";
            if (CurrentTension >= warning) return "WARNING";
            return "SAFE";
        }

        #endregion

    }
}