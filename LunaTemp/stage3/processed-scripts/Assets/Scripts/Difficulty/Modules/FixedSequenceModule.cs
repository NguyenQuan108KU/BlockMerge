using System.Collections.Generic;
using UnityEngine;

namespace Difficulty
{
    /// <summary>
    /// TẦNG 1: Fixed Sequence Module
    /// Quản lý danh sách blocks cố định đầu game
    /// </summary>
    public class FixedSequenceModule : IDifficultyModule
    {
        public string ModuleName => "FixedSequence";

        #region State

        private List<BlockShapeSO> sequence;
        private int currentIndex;

        #endregion

        #region Properties

        /// <summary>
        /// Còn blocks trong sequence không
        /// </summary>
        public bool HasRemaining => sequence != null && currentIndex < sequence.Count;

        /// <summary>
        /// Số blocks còn lại
        /// </summary>
        public int RemainingCount => sequence != null ? Mathf.Max(0, sequence.Count - currentIndex) : 0;

        /// <summary>
        /// Tổng số blocks trong sequence
        /// </summary>
        public int TotalCount => sequence?.Count ?? 0;

        #endregion

        #region Initialization

        public void Initialize()
        {
            sequence = new List<BlockShapeSO>();
            currentIndex = 0;
        }

        /// <summary>
        /// Setup sequence từ level data
        /// </summary>
        public void Setup(List<BlockShapeSO> fixedSequence)
        {
            sequence = new List<BlockShapeSO>();

            if (fixedSequence != null)
            {
                foreach (var shape in fixedSequence)
                {
                    if (shape != null)  // Chỉ thêm shape không null
                    {
                        sequence.Add(shape);
                    }
                    else
                    {
                    }
                }
            }

            currentIndex = 0;
        }

        public void Reset()
        {
            currentIndex = 0;
        }

        #endregion

        #region Core Logic

        public void SyncIndex(int targetIndex)
        {
            if (sequence == null) return;

            // Đảm bảo index không bao giờ âm hoặc vượt quá số lượng
            currentIndex = Mathf.Clamp(targetIndex, 0, sequence.Count);

        }

        public SpawnResult TryGetNext()
        {
            if (!HasRemaining)
            {
                return null;
            }

            var shape = sequence[currentIndex];
            currentIndex++;


            return new SpawnResult(shape, SpawnSource.FixedSequence);
        }

        public BlockShapeSO PeekNext()
        {
            if (!HasRemaining) return null;
            return sequence[currentIndex];
        }
       
        public bool WasFromSequence(int spawnIndex)
        {
            return spawnIndex < TotalCount;
        }
        #endregion
    }
}