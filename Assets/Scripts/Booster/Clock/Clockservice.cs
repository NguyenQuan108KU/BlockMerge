using UnityEngine;

namespace Booster
{

    public class ClockService
    {
        private readonly float _duration;

        public ClockService(float duration)
        {
            _duration = duration;
        }

        #region Public API


        public bool CanFreeze()
        {
            var timer = TimeManager.Instance;
            if (timer == null) return false;

            // Timer phải đang chạy mới freeze được
            return timer.IsRunning;
        }


        public bool ExecuteFreeze()
        {
            var timer = TimeManager.Instance;
            if (timer == null) return false;

            if (!timer.IsRunning) return false;

            // FreezeTimer đã handle logic reset nếu đang frozen
            timer.FreezeTimer(_duration);

            // VFX / Sound có thể thêm ở đây
            SpawnFreezeEffect();

            return true;
        }


        public float GetRemainingFreezeTime()
        {
            var timer = TimeManager.Instance;
            if (timer == null || !timer.IsTimerFrozen) return 0f;
            return timer.FreezeTimeRemaining;
        }

        #endregion

        #region Internal

        private void SpawnFreezeEffect()
        {
            // TODO: Spawn VFX đóng băng, play sound
            // Ví dụ:
            // if (ObjectPoolManager.Instance != null)
            // {
            //     ObjectPoolManager.Instance.SpawnSync("VFX_TimerFreeze", ...);
            // }
        }

        #endregion
    }
}