using UnityEngine;
using Base.Singleton;
using Sonat.Enums;
using SonatFramework.Systems.EventBus;

public class ScoreManager : SingletonSimple<ScoreManager>
{
    #region Private Fields

    private int _currentScore;
    private int _targetScore;

    private EventBinding<RowsClearedEvent> _rowsClearedBinding;
    private EventBinding<GameStateChangeEvent> _stateBinding;

    #endregion

    #region Properties

    public int CurrentScore => _currentScore;
    public int TargetScore => _targetScore;
    public bool HasReachedTarget => _currentScore >= _targetScore;

    #endregion

    #region Unity Lifecycle

    protected override void OnAwake() { }

    private void OnEnable()
    {
        _rowsClearedBinding = new EventBinding<RowsClearedEvent>(OnRowsCleared);
        _stateBinding = new EventBinding<GameStateChangeEvent>(OnGameStateChanged);
    }

    private void OnDisable()
    {
        _rowsClearedBinding?.Dispose();
        _stateBinding?.Dispose();
    }

    #endregion

    #region Public API

    public void SetupForLevel(int target)
    {
        _currentScore = 0;
        _targetScore = target;
        BroadcastScore(0);
    }

    public void ResetScore()
    {
        _currentScore = 0;
        BroadcastScore(0);
    }

    public bool WouldWinWithRows(int rowsCount)
    {
        if (GameManager.Instance == null) return false;
        if (GameManager.Instance.CurrentState != GameState.Playing) return false;

        return _currentScore + CalculatePoints(rowsCount) >= _targetScore;
    }

    public int CalculatePoints(int rowsCount)
    {
        if (rowsCount <= 0) return 0;

        var config = GameManager.Instance.gameConfig;
        if (!config.useMultiLineBonus) return rowsCount * config.pointsPerRow;

        switch (rowsCount)
        {
            case 1: return config.score1Line;
            case 2: return config.score2Lines;
            case 3: return config.score3Lines;
            case 4: return config.score4Lines;
            default:
                return Mathf.RoundToInt(rowsCount * config.score1Line * config.multiLineMultiplier);
        }
    }

    #endregion

    #region Event Handlers

    private void OnGameStateChanged(GameStateChangeEvent e)
    {
        if (e.gameState == GameState.Menu) ResetScore();
    }

    private void OnRowsCleared(RowsClearedEvent e)
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameState.Playing) return;

        int points = CalculatePoints(e.RowCount);
        _currentScore += points;
        BroadcastScore(points);
        CheckWinCondition();
    }

    #endregion

    #region Private Methods

    private void BroadcastScore(int addedAmount)
    {
        EventBus<ScoreUpdatedEvent>.Raise(new ScoreUpdatedEvent
        {
            CurrentScore = _currentScore,
            TargetScore = _targetScore,
            AddedAmount = addedAmount
        });
    }

    private void CheckWinCondition()
    {
        if (_currentScore >= _targetScore)
            GameManager.Instance?.HandleScoreReached();
    }

    #endregion
}