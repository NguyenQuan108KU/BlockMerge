using System.Collections.Generic;
using UnityEngine;
using Base.Singleton;

namespace Difficulty
{
    public class DifficultyManager : SingletonSimple<DifficultyManager>
    {
        private FixedSequenceModule fixedSequence;
        private WeightedBagModule weightedBag;
        private MercyModule mercy;
        private TensionTracker tensionTracker;
        private StreakTracker streakTracker;

        [Header("References")]
        [SerializeField] private DifficultyConfig defaultConfig;
        [SerializeField] private ShapePoolSO defaultShapePool;

        private DifficultyConfig currentConfig;
        private ShapePoolSO currentPool;
        private bool isInitialized;
        private int totalBlocksSpawned;

        public bool IsInitialized => isInitialized;
        public float CurrentTension => tensionTracker?.CurrentTension ?? 0f;
        public int HardBlockStreak => streakTracker?.HardBlockStreak ?? 0;
        public int MercyTokensRemaining => mercy?.TokensRemaining ?? 0;
        public int TotalBlocksSpawned => totalBlocksSpawned;

        protected override void OnAwake()
        {
            InitializeModules();
        }

        private void InitializeModules()
        {
            fixedSequence = new FixedSequenceModule();
            weightedBag = new WeightedBagModule();
            mercy = new MercyModule();
            tensionTracker = new TensionTracker();
            streakTracker = new StreakTracker();

            fixedSequence.Initialize();
            weightedBag.Initialize();
            mercy.Initialize();
            tensionTracker.Initialize();
            streakTracker.Initialize();
        }

        public void SetupForLevel(
            DifficultyConfig config = null,
            ShapePoolSO shapePool = null,
            List<BlockShapeSO> fixedStartSequence = null,
            int maxHeight = 15)
        {
            ResetLevel();

            currentConfig = config ?? defaultConfig ?? ConfigHelper.Difficulty;
            currentPool = shapePool ?? defaultShapePool;

            if (currentConfig == null || currentPool == null) return;

            fixedSequence.Setup(fixedStartSequence);
            weightedBag.Setup(currentPool, currentConfig.autoRefillBag);

            var rescueShapes = currentPool.GetRescueShapes();
            mercy.Setup(currentConfig, rescueShapes);

            tensionTracker.Setup(maxHeight);
            streakTracker.Setup(currentPool);

            totalBlocksSpawned = 0;
            isInitialized = true;
        }

        public void ResetLevel()
        {
            fixedSequence.Reset();
            weightedBag.Reset();
            mercy.Reset();
            tensionTracker.Reset();
            streakTracker.Reset();
            totalBlocksSpawned = 0;
        }

        public SpawnResult GetNextShape()
        {
            if (!isInitialized) return null;

            SpawnResult result = fixedSequence.TryGetNext();
            if (result?.Shape != null)
            {
                OnShapeSelected(result);
                return result;
            }

            result = TryMercyIntervention();
            if (result != null)
            {
                OnShapeSelected(result);
                return result;
            }

            result = weightedBag.Pick();
            if (result != null)
            {
                OnShapeSelected(result);
                return result;
            }

            return null;
        }

        private SpawnResult TryMercyIntervention()
        {
            tensionTracker.UpdateFromGrid();

            var result = mercy.TryIntervene(tensionTracker.CurrentTension, streakTracker.HardBlockStreak);

            if (result != null) streakTracker.ResetStreak();

            return result;
        }

        private void OnShapeSelected(SpawnResult result)
        {
            totalBlocksSpawned++;
            streakTracker.RecordShape(result.Shape);
        }

        public void OnBlockLanded()
        {
            tensionTracker.UpdateFromGrid();
            mercy.OnBlockLanded();
        }

        public void OnUndo()
        {
            int stepsToRollback = 2;
            totalBlocksSpawned = Mathf.Max(0, totalBlocksSpawned - stepsToRollback);

            fixedSequence?.SyncIndex(totalBlocksSpawned);
            streakTracker?.Reset();
        }
    }
}