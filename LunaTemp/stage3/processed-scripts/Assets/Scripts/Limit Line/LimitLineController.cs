using UnityEngine;
using DG.Tweening;
using Sonat.Enums;
using SonatFramework.Systems.EventBus;

public class LimitLineController : MonoBehaviour
{
    private Renderer _renderer;
    private GameConfig _config;
    private bool _isWarningActive;

    private EventBinding<GhostLandingUpdatedEvent> _ghostBinding;
    private EventBinding<GameLoseEvent> _loseBinding;
    private EventBinding<GameStateChangeEvent> _stateBinding;

    #region Initialization

    public void Initialize(GameConfig config)
    {
        _config = config;
        _renderer = GetComponent<Renderer>();

        transform.localPosition = new Vector3(0, config.maxHeight * config.tileSize, 0);

        if (_renderer != null)
            _renderer.enabled = false;

        gameObject.SetActive(true);
    }

    #endregion

    #region Unity Lifecycle

    private void OnEnable()
    {
        _ghostBinding = new EventBinding<GhostLandingUpdatedEvent>(OnGhostLandingUpdated);
        _loseBinding = new EventBinding<GameLoseEvent>(OnGameLose);
        _stateBinding = new EventBinding<GameStateChangeEvent>(OnGameStateChanged);
    }

    private void OnDisable()
    {
        _ghostBinding?.Dispose();
        _loseBinding?.Dispose();
        _stateBinding?.Dispose();
        KillTween();
    }

    #endregion

    #region Event Handlers

    private void OnGhostLandingUpdated([Bridge.Ref] GhostLandingUpdatedEvent e)
    {
        if (_config == null) return;

        if (e.TopRow >= _config.maxHeight)
            StartWarning();
        else
            StopWarning();
    }

    private void OnGameLose([Bridge.Ref] GameLoseEvent e)
    {
        if (e.reason == LoseReason.BlockOverflow)
            ShowGameOverState();
        else
            StopWarning();
    }

    private void OnGameStateChanged([Bridge.Ref] GameStateChangeEvent e)
    {
        if (e.gameState == GameState.Playing)
            ResetState();
    }

    #endregion

    #region Visuals

    private void StartWarning()
    {
        if (_isWarningActive) return;
        _isWarningActive = true;

        if (_renderer == null) return;
        _renderer.enabled = true;

        _renderer.material.DOKill();
        _renderer.material
            .DOFade(_config.warningColor.a, _config.pulseDuration * 0.5f)
            .SetLoops(-1, LoopType.Yoyo)
            .SetEase(Ease.InOutSine);
    }

    private void StopWarning()
    {
        if (!_isWarningActive) return;
        _isWarningActive = false;

        if (_renderer == null) return;
        _renderer.material.DOKill();
        _renderer.material.DOFade(0f, 0.2f)
            .OnComplete(() =>
            {
                if (_renderer != null) _renderer.enabled = false;
            });
    }

    private void ShowGameOverState()
    {
        if (_renderer == null) return;
        _isWarningActive = false;

        _renderer.material.DOKill();
        _renderer.enabled = true;
    }

    private void ResetState()
    {
        KillTween();
        _isWarningActive = false;

        if (_renderer != null)
            _renderer.enabled = false;
    }

    private void KillTween()
    {
        if (_renderer != null) _renderer.material.DOKill();
    }

    #endregion
}