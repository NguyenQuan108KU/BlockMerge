using Sonat.Enums;
using System.Threading.Tasks;

namespace Booster
{
    /// <summary>
    /// ClockStrategy - Đóng băng timer trong một khoảng thời gian
    /// 
    /// Pattern giống HammerStrategy:
    /// - Strategy điều phối flow (implement IBoosterStrategy)
    /// - ClockService chứa logic nghiệp vụ
    /// - Không cần InputHandler (nhấn là chạy luôn)
    /// </summary>
    public class ClockStrategy : IBoosterStrategy
    {
       // public GameResource BoosterType => GameResource.Clock;

        private BoosterContext _context;
        private ClockService _service;
        private readonly float _duration;

        public ClockStrategy(float duration)
        {
            _duration = duration;
        }

        public void Initialize(BoosterContext context)
        {
            _context = context;
        }

        //public bool CanExecute()
        //{
        //    EnsureServiceInitialized();

        //    var gameManager = _context?.GameManager ?? GameManager.Instance;
        //    if (gameManager == null || gameManager.CurrentState != GameState.Playing)
        //        return false;

        //    return _service.CanFreeze();
        //}

        public async Task<bool> Execute()
        {
            EnsureServiceInitialized();

            bool result = _service.ExecuteFreeze();
            return await Task.FromResult(result);
        }

        public void Cleanup()
        {
            // Không cần cleanup
        }

        private void EnsureServiceInitialized()
        {
            if (_service != null) return;
            _service = new ClockService(_duration);
        }

        public bool CanExecute()
        {
            throw new System.NotImplementedException();
        }
    }
}