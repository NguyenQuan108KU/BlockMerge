using UnityEngine;
using Sonat.Enums;
namespace Booster
{

    public class BoosterContext
    {
        #region Core References

        public GridManager Grid { get; }
        public BlockSpawner Spawner { get; }
        public Transform TowerContainer { get; }

        #endregion

        #region Optional References

        public GameManager GameManager { get; }
        public GameHistorySystem HistorySystem { get; }
        public HammerInputHandler HammerInput { get; }

        public CellMeshLibrary MeshLibrary { get; }

        #endregion

        #region Constructor

        public BoosterContext(
            GridManager grid,
            BlockSpawner spawner,
            Transform towerContainer,
            GameManager gameManager = null,
            GameHistorySystem historySystem = null,
            HammerInputHandler hammerInput = null)
        {
            Grid = grid;
            Spawner = spawner;
            TowerContainer = towerContainer;

            // Optional - fallback to singletons if not provided
            GameManager = gameManager ?? GameManager.Instance;
            HistorySystem = historySystem ?? GameHistorySystem.Instance;
            HammerInput = hammerInput ?? HammerInputHandler.Instance;

            // Derived from grid
            MeshLibrary = grid?.meshLibrary;
        }

        #endregion

        #region Validation
        public bool IsValid => Grid != null;

        public bool HasSpawner => Spawner != null;

        public bool HasHistory => HistorySystem != null && HistorySystem.HasHistory();

        public bool HasHammerInput => HammerInput != null;
        public bool IsGamePlaying => GameManager?.CurrentState == GameState.Playing;

        public bool HasBlocksInGrid => Grid?.gridData?.GetMaxHeight() > 0;

        #endregion

        #region Debug

        public override string ToString()
        {
            return $"[BoosterContext] Grid={Grid != null}, Spawner={Spawner != null}, " +
                   $"TowerContainer={TowerContainer != null}, GameManager={GameManager != null}, " +
                   $"HistorySystem={HistorySystem != null}, HammerInput={HammerInput != null}";
        }

        #endregion
    }
}