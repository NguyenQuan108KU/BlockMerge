using UnityEngine;
using UnityEngine.UI;
using SonatFramework.Systems.EventBus;

public class RotateLoadingIndicator : MonoBehaviour
{
    #region Serialized Fields

    [SerializeField] private int _direction;

    #endregion

    #region Private Fields

    private Image _fillImage;
    private EventBinding<EdgeRotateProgressEvent> _progressBinding;

    #endregion

    #region Unity Lifecycle

    private void Awake()
    {
        _fillImage = GetComponent<Image>();
        SetFill(0f);
    }

    private void OnEnable()
    {
        _progressBinding = new EventBinding<EdgeRotateProgressEvent>(OnEdgeRotateProgress);
    }

    private void OnDisable()
    {
        _progressBinding?.Dispose();
    }

    #endregion

    #region Event Handlers

    private void OnEdgeRotateProgress(EdgeRotateProgressEvent e)
    {
        if (_fillImage == null) return;

        if (!e.IsActive || e.Direction != _direction)
        {
            SetFill(0f);
            return;
        }

        SetFill(e.Progress);
    }

    #endregion

    #region Private Methods

    private void SetFill(float value)
    {
        if (_fillImage == null) return;
        _fillImage.fillAmount = value;
    }

    #endregion
}