using Base.Singleton;
using DG.Tweening;
using Difficulty;
using Sonat.Enums;
using SonatFramework.Scripts.Gameplay;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.GameDataManagement;
using SonatFramework.Systems.LoadObject;
using SonatFramework.Systems.SceneManagement;
using SonatFramework.Systems.UserData;
using System.Threading.Tasks;
using UnityEngine;

public class GameManager : Singleton<GameManager>
{
    private const string LEVEL_KEY_PREFIX = "Level_";
    [Header("------ EC ------")]
    public GameObject ecWin;
    public GameObject ecLose;
    [Header("------ Check win game ------")]
    public bool isGameWin;

    #region Private Fields

    private readonly Service<LoadObjectServiceAsync> _loadService = new Service<LoadObjectServiceAsync>();
    private readonly Service<DataService> _dataService = new Service<DataService>();
    private readonly Service<SceneService> _sceneService = new Service<SceneService>();

    private bool _isGameActive;
    private bool _continueUsed;
    private FloodSpawnTracker _floodTracker;
    private Camera _mainCamera;

    private BlockSpawner _cachedSpawner;
    private ActiveBlockController _cachedActiveBlock;
    private TowerController _cachedTower;

    #endregion

    #region Properties

    public LevelDataSO CurrentLevelData;
    public LevelDataSO manualLevelData;
    public GameConfig gameConfig;
    public GameState CurrentState { get; private set; }

    public int CurrentLevelIndex;

    #endregion

    #region Unity Lifecycle

    protected override void OnAwake() { }

    private async void Start()
    {
        _mainCamera = Camera.main;

        // Chờ 1 frame để SonatSystem init xong
        await Task.Yield();

        if (manualLevelData != null)
        {
            CurrentLevelData = manualLevelData;
            await StartGame(CurrentLevelData);
        }
        else
        {
            PlayLevelByIndex(CurrentLevelIndex);
        }
    }

    #endregion

    #region State Management

    public void SetGameState(GameState newState)
    {
        var previousState = CurrentState;
        CurrentState = newState;

        EventBus<GameStateChangeEvent>.Raise(new GameStateChangeEvent
        {
            gameState = newState
        });

        if (newState == GameState.Paused)
            Time.timeScale = 0f;
        else if (previousState == GameState.Paused)
            Time.timeScale = 1f;
    }

    #endregion

    #region Game Flow

    public void PlayLevelByIndex(int levelIndex)
    {
        CurrentLevelIndex = levelIndex;
        _continueUsed = false;
        //LoadAndStartGame(RemoteLevelOverride.GetLevelKey(levelIndex)).Forget();
    }

    public void PlayCurrentSavedLevel() => PlayLevelByIndex(CurrentLevelIndex);

    public void RestartGame()
    {
        Time.timeScale = 1f;
        PlayCurrentSavedLevel();
    }

    public void ReloadScene()
    {
        Time.timeScale = 1f;
        DOTween.KillAll();

        SetCameraEnabled(false);
        _sceneService.Instance.SwitchScene(GamePlacement.Gameplay, force: true);
    }

    public void ClickPause() => SetGameState(GameState.Paused);

    #endregion

    #region Level Loading

    private async Task LoadAndStartGame(string levelKey)
    {
        // Camera OFF ngay — màn hình đen tuyệt đối
        SetCameraEnabled(false);

        var levelData = await _loadService.Instance.LoadAsync<LevelDataSO>(levelKey);

        if (levelData != null)
        {
            CurrentLevelData = RemoteLevelOverride.ApplyOverride(levelData, CurrentLevelIndex);
            await StartGame(CurrentLevelData);
        }
        else
        {
            Debug.LogError($"[GameManager] Level not found: {levelKey}");

            if (CurrentLevelIndex != 1)
            {
                Debug.LogWarning("[GameManager] Fallback to Level 1");
                PlayLevelByIndex(1);
            }
            else
            {
                // Fallback cũng fail — phải bật camera lại, tránh đen vĩnh viễn
                SetCameraEnabled(true);
            }
        }
    }

    private async Task StartGame(LevelDataSO data)
    {
        if (GridManager.Instance == null)
        {
            SetCameraEnabled(true);
            return;
        }

        // Setup ngầm — camera vẫn OFF, user không thấy gì
        SetupGrid(data);
        await SetupMap(data);
        SetupManagers(data);
        SetupGameplay(data);

        // Chuẩn bị overlay TRƯỚC khi bật camera
        TransitionOverlay.Instance?.Show();

        // Bật camera — frame đầu tiên render overlay đen (Progress=0) che phủ game
        SetCameraEnabled(true);

        // Chờ 1 frame đảm bảo camera + overlay đã render
        await Task.Yield();

        _isGameActive = true;
        SetGameState(GameState.Playing);

        // Circle reveal mở ra
        TransitionOverlay.Instance?.FadeOut();

        EventBus<LevelChangedEvent>.Raise(new LevelChangedEvent
        {
            LevelName = data.displayName,
            LevelIndex = CurrentLevelIndex
        });

        EventBus<LevelStartedEvent>.Raise(new LevelStartedEvent
        {
            level = CurrentLevelIndex,
            gameMode = data.gameMode,
            phase = 0
        });
    }

    private void SetupGrid(LevelDataSO data)
    {
        if (data.levelWidth > 0)
            GridManager.Instance.SyncConfigFromLevel(data);

        GridManager.Instance.ClearMap();
        SetupEnvironment(data);
    }

    private async Task SetupMap(LevelDataSO data)
    {
        if (data.mapData != null && data.mapData.Count > 0)
            await GridManager.Instance.SpawnLevelMap(data.mapData);
    }

    private void SetupManagers(LevelDataSO data)
    {
        DifficultyManager.Instance?.ResetLevel();
        ScoreManager.Instance?.SetupForLevel(data.targetGoal);
        //TimeManager.Instance?.StartTimer(data.timeLimit, waitForTouch: true);

        DifficultyManager.Instance?.SetupForLevel(
            data.difficultyConfig,
            data.shapePool,
            data.fixedStartSequence,
            9
        );
    }

    private void SetupGameplay(LevelDataSO data)
    {
        _cachedSpawner = _cachedTower != null ? _cachedTower.spawner : null;
        _cachedActiveBlock = _cachedTower != null ? _cachedTower.activeBlock : null;

        _cachedSpawner?.Reset();

        if (_cachedActiveBlock != null)
        {
            _cachedActiveBlock.ManualSetup(GridManager.Instance);
            _cachedActiveBlock.Reset();
        }

        _floodTracker?.Dispose();
        _floodTracker = new FloodSpawnTracker(data.floodStartInterval, data.floodIntervalIncrease);
        _cachedSpawner?.SetFloodTracker(_floodTracker);

        if (_cachedSpawner != null)
        {
            _cachedSpawner.SetupSpawnerBag(data.GetSpawnableBag());
            _cachedSpawner.SpawnNextBlock();
        }
    }

    private void SetupEnvironment(LevelDataSO data)
    {
        if (_cachedTower == null)
            _cachedTower = FindFirstObjectByType<TowerController>();

        if (_cachedTower != null && _cachedTower.towerContainer != null)
            _cachedTower.towerContainer.localRotation = Quaternion.identity;

        if (_cachedTower != null && data.floorPrefab != null)
        {
            var floorContainer = _cachedTower.towerContainer.Find("Tower")?.Find("Container")
                                 ?? _cachedTower.towerContainer;
            GridManager.Instance.SpawnFloor(data.floorPrefab, floorContainer);
        }
    }

    #endregion

    #region Win/Lose

    private void StopGameplay()
    {
        _isGameActive = false;
        _cachedSpawner?.Stop();
        //TimeManager.Instance?.StopTimer();
    }

    public void HandleScoreReached()
    {
        if (CurrentState == GameState.Playing && _isGameActive)
            HandleWin();
    }

    public void HandleTimeUp()
    {
        if (CurrentState == GameState.Playing && _isGameActive)
            HandleLose(LoseReason.TimeOut);
    }

    public void HandleBlockOverflow()
    {
        if (CurrentState != GameState.Playing || !_isGameActive) return;
        HandleLose(LoseReason.BlockOverflow);
    }

    public void CheckGameOverCondition(int row)
    {
        if (CurrentState != GameState.Playing || !_isGameActive) return;
        if (GridManager.Instance == null) return;
        if (row >= GridManager.Instance.config.maxHeight)
            HandleLose(LoseReason.BlockOverflow);
    }

    private async Task HandleWin()
    {
        StopGameplay();

        int nextLevel = CurrentLevelIndex + 1;

        EventBus<LevelUnlockedEvent>.Raise(new LevelUnlockedEvent
        {
            LevelIndex = nextLevel
        });

        EventBus<LevelEndedEvent>.Raise(new LevelEndedEvent
        {
            success = true,
            gameMode = CurrentLevelData?.gameMode ?? GameMode.Classic,
            level = CurrentLevelIndex,
            phase = 0
        });

        SetGameState(GameState.LevelComplete);

        //await Task.Delay(System.TimeSpan.FromSeconds(1.0f), ignoreTimeScale: true);

        var winData = new PopupWin.Data
        {
            level = CurrentLevelIndex,
            nextLevel = () => PlayNextLevel(nextLevel)
        };
        ecWin.SetActive(true);
        AudioManager.Instance.PlaySFX(AudioManager.Instance.gameWin);
        isGameWin = true;
        TimeManager.Instance.StopTimer();
        //PanelManager.Instance.OpenForget<PopupWin>(winData);
    }

    private void HandleLose(LoseReason reason)
    {
        StopGameplay();

        EventBus<GameLoseEvent>.Raise(new GameLoseEvent
        {
            reason = reason
        });

        EventBus<LevelEndedEvent>.Raise(new LevelEndedEvent
        {
            success = false,
            gameMode = CurrentLevelData?.gameMode ?? GameMode.Classic,
            level = CurrentLevelIndex,
            phase = 0
        });

        SetGameState(GameState.GameOver);

        var loseData = new PopupLose.Data
        {
            reason = reason,
            canContinue = !_continueUsed,
            onRetryClick = RestartGame,
            onContinueClick = () => ContinueGame(reason)
        };

        PanelManager.Instance.OpenForget<PopupLose>(loseData);
    }

    #endregion

    #region Continue

    private void ContinueGame(LoseReason reason)
    {
        _continueUsed = true;

        if (reason == LoseReason.TimeOut)
            ContinueFromTimeout();
        else
            ContinueFromOverflow();

        _isGameActive = true;
        SetGameState(GameState.Playing);
    }

    private void ContinueFromTimeout()
    {
        float extraTime = GameRemoteConfig.ContinueExtraTime;
        //TimeManager.Instance?.AddTime(extraTime);
    }

    private void ContinueFromOverflow()
    {
        int steps = GameRemoteConfig.ContinueUndoSteps;
        var snapshots = GameHistorySystem.Instance?.PopMultiple(steps);
        if (snapshots == null) return;

        foreach (var snapshot in snapshots)
            GameHistorySystem.RevertSnapshot(snapshot, GridManager.Instance);

        GridManager.Instance.RecalculateHeightsPublic();
        EventBus<RowsClearedEvent>.Raise(new RowsClearedEvent { RowCount = 0 });

        _cachedSpawner?.SpawnNextBlock();
    }

    #endregion

    #region Helpers

    private void PlayNextLevel(int levelIndex)
    {
        PlayLevelByIndex(levelIndex);
    }

    private void SetCameraEnabled(bool enabled)
    {
        if (_mainCamera == null)
            _mainCamera = Camera.main;

        if (_mainCamera != null)
            _mainCamera.enabled = enabled;
    }

    #endregion
}