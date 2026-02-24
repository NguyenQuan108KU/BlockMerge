using UnityEngine;
using Base.Singleton;
using Cysharp.Threading.Tasks;
using Sonat.Enums;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems.EventBus;

public class TimeManager : SingletonSimple<TimeManager>
{
    [Header("Warning Settings")]
    [SerializeField] private float warningThreshold = 30f;
    [SerializeField] private float urgentThreshold = 10f;

    private float currentTime;
    private float maxTime;
    private bool isTimerRunning;
    private bool isTimerFrozen;
    private float freezeTimeRemaining;
    private bool _waitingForFirstTouch;
    private bool _isWarningActive;

    public float CurrentTime => currentTime;
    public float MaxTime => maxTime;
    public bool IsTimerFrozen => isTimerFrozen;
    public bool IsRunning => isTimerRunning;
    public float FreezeTimeRemaining => freezeTimeRemaining;
    public bool IsWaitingForFirstTouch => _waitingForFirstTouch;
    public float WarningThreshold => warningThreshold;
    public float UrgentThreshold => urgentThreshold;

    private EventBinding<GameStateChangeEvent> _stateBinding;

    protected override void OnAwake() { }

    private void OnEnable()
    {
        _stateBinding = new EventBinding<GameStateChangeEvent>(OnGameStateChanged);
    }

    private void OnDisable()
    {
        _stateBinding?.Dispose();
    }

    private void Update()
    {
        if (!isTimerRunning || isTimerFrozen) return;

        currentTime -= Time.deltaTime;

        EventBus<TimerUpdatedEvent>.Raise(new TimerUpdatedEvent { TimeRemaining = currentTime });

        CheckWarningState();

        if (currentTime <= 0)
        {
            currentTime = 0;
            isTimerRunning = false;
            StopWarning();
            OnTimerExpired();
        }
    }

    private void CheckWarningState()
    {
        bool shouldWarn = currentTime <= warningThreshold && currentTime > 0;

        if (shouldWarn && !_isWarningActive)
        {
            _isWarningActive = true;

            EventBus<TimerWarningEvent>.Raise(new TimerWarningEvent
            {
                IsWarning = true,
                TimeRemaining = currentTime
            });

            PanelManager.Instance?.OpenForget<PopupTimerWarning>();
        }
        else if (!shouldWarn && _isWarningActive)
        {
            StopWarning();
        }
    }

    private void StopWarning()
    {
        if (!_isWarningActive) return;
        _isWarningActive = false;

        EventBus<TimerWarningEvent>.Raise(new TimerWarningEvent
        {
            IsWarning = false,
            TimeRemaining = currentTime
        });
    }

    public void StartTimer(float duration, bool waitForTouch = false)
    {
        maxTime = duration;
        currentTime = duration;
        isTimerFrozen = false;
        _waitingForFirstTouch = waitForTouch;
        _isWarningActive = false;
        isTimerRunning = !waitForTouch;

        EventBus<TimerUpdatedEvent>.Raise(new TimerUpdatedEvent { TimeRemaining = currentTime });
    }

    public void ResumeOnFirstTouch()
    {
        if (!_waitingForFirstTouch) return;
        _waitingForFirstTouch = false;
        isTimerRunning = true;
    }

    public void StopTimer()
    {
        isTimerRunning = false;
        isTimerFrozen = false;
        StopWarning();
    }

    public void AddTime(float seconds)
    {
        currentTime += seconds;
        if (currentTime > maxTime) maxTime = currentTime;
        isTimerRunning = true;

        CheckWarningState();

        EventBus<TimerUpdatedEvent>.Raise(new TimerUpdatedEvent { TimeRemaining = currentTime });
    }

    public void FreezeTimer(float duration)
    {
        if (!isTimerRunning || isTimerFrozen) return;

        isTimerFrozen = true;
        freezeTimeRemaining = duration;

        EventBus<TimerFreezeEvent>.Raise(new TimerFreezeEvent { Duration = duration, IsStarted = true });

        FreezeTimerAsync(duration).Forget();
    }

    public void UnfreezeTimer()
    {
        if (!isTimerFrozen) return;

        isTimerFrozen = false;
        freezeTimeRemaining = 0f;

        EventBus<TimerFreezeEvent>.Raise(new TimerFreezeEvent { IsStarted = false, Duration = 0f });
    }

    private void OnGameStateChanged(GameStateChangeEvent e)
    {
        switch (e.gameState)
        {
            case GameState.Playing:
                ResumeTimer();
                break;
            case GameState.Paused:
                PauseTimer();
                break;
            case GameState.GameOver:
            case GameState.LevelComplete:
            case GameState.Menu:
                StopTimer();
                break;
        }
    }

    private void PauseTimer()
    {
        isTimerRunning = false;
    }

    private void ResumeTimer()
    {
        if (_waitingForFirstTouch) return;
        if (currentTime > 0)
            isTimerRunning = true;
    }

    private void OnTimerExpired()
    {
        if (GameManager.Instance != null && GameManager.Instance.CurrentState == GameState.Playing)
            GameManager.Instance.HandleTimeUp();
    }

    private async UniTaskVoid FreezeTimerAsync(float duration)
    {
        freezeTimeRemaining = duration;

        while (freezeTimeRemaining > 0 && isTimerFrozen)
        {
            await UniTask.Yield();
            freezeTimeRemaining -= Time.deltaTime;
        }

        if (isTimerFrozen) UnfreezeTimer();
    }
}