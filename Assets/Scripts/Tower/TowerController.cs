using Difficulty;
using UnityEngine;
using SonatFramework.Systems.EventBus;
using Sonat.Enums;
using System.Threading.Tasks;

public class TowerController : MonoBehaviour
{
    [Header("Modules")]
    public BlockSpawner spawner;
    public TowerRotator rotator;

    [Header("References")]
    public Transform towerContainer;
    public ActiveBlockController activeBlock;
    public TowerHeightController heightController;
    public LimitLineController limitLine;

    private bool _isSystemReady;

    #region Event Bindings

    private EventBinding<BlockLandedEvent> _landedBinding;
    private EventBinding<GameStateChangeEvent> _stateBinding;
    private EventBinding<GridStableEvent> _gridStableBinding;

    #endregion

    #region Unity Lifecycle

    private void OnEnable()
    {
        _stateBinding = new EventBinding<GameStateChangeEvent>(OnGameStateChanged);
        _landedBinding = new EventBinding<BlockLandedEvent>(OnBlockLanded);
        _gridStableBinding = new EventBinding<GridStableEvent>(OnGridStable);
    }

    private void OnDisable()
    {
        _stateBinding?.Dispose();
        _landedBinding?.Dispose();
        _gridStableBinding?.Dispose();
    }

    private void Start()
    {
        _isSystemReady = false;
        InitializeSystemsAsync();
    }

    private void Update()
    {
        if (!_isSystemReady) return;
        if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing) return;
        rotator?.HandleRotationUpdate();
    }

    #endregion

    #region Initialization

    private async Task InitializeSystemsAsync()
    {
        //var token = this.GetCancellationTokenOnDestroy();
        //await Task.WaitUntil(() => GridManager.Instance != null && GridManager.Instance.config != null, cancellationToken: token);

        if (spawner != null) spawner.Initialize(activeBlock, towerContainer, rotator);
        if (rotator != null) rotator.Initialize(activeBlock, towerContainer);

        if (heightController != null)
            heightController.Initialize(towerContainer, GridManager.Instance.config);
        if (limitLine != null)
            limitLine.Initialize(GridManager.Instance.config);

        _isSystemReady = true;

        if (GameManager.Instance != null && GameManager.Instance.CurrentState == GameState.Playing)
            StartGameplay();
    }

    #endregion

    #region Game Flow

    private void StartGameplay() => spawner?.SpawnNextBlock();

    private void OnGameStateChanged(GameStateChangeEvent e)
    {
        if (!_isSystemReady) return;
        //if (e.gameState == GameState.GameOver || e.gameState == GameState.LevelComplete)
        //    rotator?.StopRotation();
    }

    #endregion

    #region Event Handlers

    private void OnBlockLanded(BlockLandedEvent e)
    {
        if (DifficultyManager.Instance != null)
            DifficultyManager.Instance.OnBlockLanded();
    }

    private void OnGridStable(GridStableEvent e)
    {
        if (!_isSystemReady) return;
        if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing) return;
        spawner?.SpawnNextBlock();
    }

    #endregion

    #region Public API

    public void RotateStep(int direction)
    {
        rotator?.RotateStep(direction);
    }

    public async Task SnapRotationAsync()
    {
        if (rotator != null) await rotator.SnapToNearestAsync();
    }

    #endregion
}