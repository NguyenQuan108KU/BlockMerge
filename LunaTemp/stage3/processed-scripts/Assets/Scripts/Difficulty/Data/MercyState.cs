using UnityEngine;

namespace Difficulty
{
    [System.Serializable]
    public class MercyState
    {
        public int tokensRemaining;
        public int tokensInitial;
        public int cooldownRemaining;
        public int rescueCount;
        public void Initialize(int minTokens, int maxTokens)
        {
            tokensInitial = Random.Range(minTokens, maxTokens + 1);
            tokensRemaining = tokensInitial;
            cooldownRemaining = 0;
            rescueCount = 0;
        }

        /// <summary>
        /// Sử dụng 1 token và set cooldown
        /// </summary>
        public void UseToken(int cooldownBlocks)
        {
            if (tokensRemaining > 0)
            {
                tokensRemaining--;
                cooldownRemaining = cooldownBlocks;
                rescueCount++;
            }
        }

        /// <summary>
        /// Giảm cooldown sau mỗi block
        /// </summary>
        public void DecrementCooldown()
        {
            if (cooldownRemaining > 0)
            {
                cooldownRemaining--;
            }
        }

        /// <summary>
        /// Kiểm tra có thể xét mercy không
        /// </summary>
        public bool CanConsiderMercy()
        {
            return tokensRemaining > 0 && cooldownRemaining <= 0;
        }

        /// <summary>
        /// Reset state (khi restart level)
        /// </summary>
        public void Reset()
        {
            tokensRemaining = tokensInitial;
            cooldownRemaining = 0;
            rescueCount = 0;
        }

        public override string ToString()
        {
            return $"[MercyState] Tokens: {tokensRemaining}/{tokensInitial}, Cooldown: {cooldownRemaining}, Rescues: {rescueCount}";
        }
    }
}