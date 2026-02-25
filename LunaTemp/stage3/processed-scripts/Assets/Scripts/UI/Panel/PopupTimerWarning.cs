using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems.EventBus;
using UnityEngine;
using UnityEngine.UI;

public class PopupTimerWarning : Panel
{
    [Header("UI References")]
    [SerializeField] private Image warningImage;

    [Header("Flash Settings")]
    [SerializeField] private float flashDuration = 0.4f;
    [SerializeField] private float slowMaxAlpha = 0.15f;
    [SerializeField] private float fastMaxAlpha = 0.35f;
    [SerializeField] private float urgentThreshold = 10f;

    private EventBinding<TimerWarningEvent> _warningBinding;
    private EventBinding<TimerUpdatedEvent> _timerBinding;

    private bool _isActive;
    private float _timeRemaining;
    private int _lastSecond = -1;
    private float _flashTimer;

    public override void Open(UIData uiData)
    {
        base.Open(uiData);
        _isActive = true;
        _lastSecond = -1;
        _flashTimer = 0f;
        _warningBinding = new EventBinding<TimerWarningEvent>(OnWarningChanged);
        _timerBinding = new EventBinding<TimerUpdatedEvent>(OnTimerUpdated);
    }

    private void Update()
    {
        if (!_isActive || warningImage == null) return;

        int currentSecond = Mathf.CeilToInt(_timeRemaining);

        if (currentSecond != _lastSecond && currentSecond > 0)
        {
            _lastSecond = currentSecond;

            bool shouldFlash;
            if (_timeRemaining <= urgentThreshold)
                shouldFlash = true;
            else
                shouldFlash = (currentSecond == 30 || currentSecond == 20);

            if (shouldFlash)
                _flashTimer = flashDuration;
        }

        float alpha = 0f;
        if (_flashTimer > 0)
        {
            _flashTimer -= Time.deltaTime;
            float t = Mathf.Sin((_flashTimer / flashDuration) * Mathf.PI);
            float maxAlpha = _timeRemaining <= urgentThreshold ? fastMaxAlpha : slowMaxAlpha;
            alpha = Mathf.Lerp(0f, maxAlpha, t);
        }

        Color c = warningImage.color;
        c.a = alpha;
        warningImage.color = c;
    }

    private void OnTimerUpdated([Bridge.Ref] TimerUpdatedEvent e)
    {
        _timeRemaining = e.TimeRemaining;
    }

    private void OnWarningChanged([Bridge.Ref] TimerWarningEvent e)
    {
        if (!e.IsWarning)
            Close();
    }

    public override void Close()
    {
        _isActive = false;
        _warningBinding?.Dispose();
        _warningBinding = null;
        _timerBinding?.Dispose();
        _timerBinding = null;

        if (warningImage != null)
        {
            Color c = warningImage.color;
            c.a = 0f;
            warningImage.color = c;
        }

        base.Close();
    }

    public override void OnFocus() { }
    public override void OnFocusLost() { }
}