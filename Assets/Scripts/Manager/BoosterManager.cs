using System.Collections.Generic;
using UnityEngine;
using Base.Singleton;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.BoosterManagement;
using System.Threading.Tasks;

namespace Booster
{
    public class BoosterManager : SingletonSimple<BoosterManager>
    {
        // Hardcode gameplay params
        private const float CLOCK_DURATION = 20f;

        private BoosterContext _context;
        private Dictionary<GameResource, IBoosterStrategy> _strategies = new Dictionary<GameResource, IBoosterStrategy>();
        private bool _isInitialized;

        public bool IsBoosterActive { get; private set; }

        protected override void OnAwake() { }

        private void Start() => InitializeWithDelay();

        private async Task InitializeWithDelay()
        {
            await Task.Yield();
            //await Task.WaitUntil(() => SonatSystem.Instance != null);
            //await Task.WaitUntil(() => FindFirstObjectByType<BlockSpawner>() != null);
            InitializeSystem();
        }

        private void InitializeSystem()
        {
            if (_isInitialized) return;

            _context = CreateContext();
            RegisterStrategies();
            _isInitialized = true;
        }

        private void RegisterStrategies()
        {
            //_strategies[GameResource.Undo] = new UndoStrategy();
            _strategies[GameResource.Hammer] = new HammerStrategy();
            _strategies[GameResource.Clock] = new ClockStrategy(CLOCK_DURATION);

            foreach (var s in _strategies.Values)
                s.Initialize(_context);
        }

        public async Task<bool> ExecuteBoosterLogic(GameResource type)
        {
            if (!_isInitialized || IsBoosterActive) return false;
            if (!_strategies.TryGetValue(type, out var strategy)) return false;
            if (!strategy.CanExecute()) return false;

            IsBoosterActive = true;
            try
            {
                return await strategy.Execute();
            }
            finally
            {
                IsBoosterActive = false;
            }
        }

        private BoosterContext CreateContext()
        {
            return new BoosterContext(
                GridManager.Instance,
                FindFirstObjectByType<BlockSpawner>(),
                FindFirstObjectByType<TowerController>()?.towerContainer
            );
        }

        private void OnDisable()
        {
            foreach (var s in _strategies.Values)
                s.Cleanup();
        }
    }
}