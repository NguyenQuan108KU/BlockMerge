using SonatFramework.Systems.EventBus;

public class FloodSpawnTracker
{
    private int _countSinceLastFlood;
    private int _currentInterval;
    private bool _pendingFlood;

    private readonly int _startInterval;
    private readonly int _intervalIncrease;
    private readonly bool _isActive;

    private EventBinding<RowsClearedEvent> _rowsClearedBinding;

    public FloodSpawnTracker(int startInterval, int intervalIncrease)
    {
        _startInterval = startInterval;
        _intervalIncrease = intervalIncrease;
        _currentInterval = startInterval;
        _isActive = startInterval > 0;

        _rowsClearedBinding = new EventBinding<RowsClearedEvent>(OnRowsCleared);
    }

    private void OnRowsCleared(RowsClearedEvent e)
    {
        if (!_isActive || e.RowCount <= 0) return;

        _countSinceLastFlood += e.RowCount;
        RaiseProgress();

        if (_countSinceLastFlood >= _currentInterval)
        {
            _pendingFlood = true;

            EventBus<FloodProgressEvent>.Raise(new FloodProgressEvent
            {
                Progress = 1f,
                CurrentCount = _currentInterval,
                TargetCount = _currentInterval
            });

            _countSinceLastFlood = 0;
            _currentInterval += _intervalIncrease;
        }
    }

    public bool ConsumeFloodFlag()
    {
        if (!_pendingFlood) return false;
        _pendingFlood = false;
        return true;
    }

    private void RaiseProgress()
    {
        float progress = (_currentInterval > 0)
            ? (float)_countSinceLastFlood / _currentInterval
            : 0f;

        EventBus<FloodProgressEvent>.Raise(new FloodProgressEvent
        {
            Progress = progress,
            CurrentCount = _countSinceLastFlood,
            TargetCount = _currentInterval
        });
    }

    public void Reset()
    {
        _countSinceLastFlood = 0;
        _currentInterval = _startInterval;
        _pendingFlood = false;
    }

    public void Dispose()
    {
        _rowsClearedBinding?.Dispose();
        _rowsClearedBinding = null;
        _pendingFlood = false;
    }
}