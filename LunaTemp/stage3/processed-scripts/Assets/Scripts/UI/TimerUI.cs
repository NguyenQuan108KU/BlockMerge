using SonatFramework.Systems.EventBus;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class TimerUI : MonoBehaviour
{
    [Header("UI References")]
    [SerializeField] private TextMeshProUGUI timerText;
    [SerializeField] private Image containerImage;

    [Header("Flash Settings")]
    [SerializeField] private float flashDuration = 0.4f;
    [SerializeField] private float maxSaturation = 0.5f;
    [SerializeField] private float urgentThreshold = 10f;
    [SerializeField] private Color urgentTextColor = Color.red;

    private EventBinding<TimerUpdatedEvent> _timerBinding;
    private EventBinding<TimerWarningEvent> _warningBinding;

    private bool _isWarning;
    private float _timeRemaining;
    private int _lastSecond = -1;
    private float _flashTimer;
    private Color _originalColor;
    private Color _originalTextColor;

    private void Awake()
    {
        if (containerImage != null)
            _originalColor = containerImage.color;
        if (timerText != null)
            _originalTextColor = timerText.color;
    }

    private void OnEnable()
    {
        _timerBinding = new EventBinding<TimerUpdatedEvent>(OnTimerUpdated);
        _warningBinding = new EventBinding<TimerWarningEvent>(OnWarningChanged);
    }

    private void OnDisable()
    {
        _timerBinding?.Dispose();
        _warningBinding?.Dispose();
    }

    private void Update()
    {
        if (!_isWarning) return;

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

        if (_flashTimer > 0)
        {
            _flashTimer -= Time.deltaTime;
            float t = Mathf.Sin((_flashTimer / flashDuration) * Mathf.PI);

            if (containerImage != null)
            {
                float saturation = Mathf.Lerp(0f, maxSaturation, t);
                containerImage.color = Color.HSVToRGB(0f, saturation, 1f);
            }

            if (timerText != null && _timeRemaining <= urgentThreshold)
                timerText.color = Color.Lerp(_originalTextColor, urgentTextColor, t);
        }
        else
        {
            if (containerImage != null)
                containerImage.color = _originalColor;
            if (timerText != null)
                timerText.color = _originalTextColor;
        }
    }

    private void OnTimerUpdated([Bridge.Ref] TimerUpdatedEvent e)
    {
        _timeRemaining = e.TimeRemaining;

        if (timerText == null) return;
        int totalSeconds = Mathf.CeilToInt(e.TimeRemaining);
        int minutes = totalSeconds / 60;
        int seconds = totalSeconds % 60;
        timerText.text = $"{minutes:D2}:{seconds:D2}s";
    }

    private void OnWarningChanged([Bridge.Ref] TimerWarningEvent e)
    {
        _isWarning = e.IsWarning;
        _lastSecond = -1;
        _flashTimer = 0f;

        if (!_isWarning)
        {
            if (containerImage != null) containerImage.color = _originalColor;
            if (timerText != null) timerText.color = _originalTextColor;
        }
    }
}