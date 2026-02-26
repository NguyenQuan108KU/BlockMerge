using DG.Tweening;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.UI;

public class TransitionOverlay : MonoBehaviour
{
    public static TransitionOverlay Instance { get; private set; }

    #region Serialized Fields

    [Header("References")]
    [SerializeField] private Image overlayImage;

    [Header("Settings")]
    [SerializeField] private float revealDuration = 0.8f;
    [SerializeField] private Ease revealEase = Ease.OutCubic;

    #endregion

    #region Private Fields

    private Material _material;
    private static readonly int ProgressID = Shader.PropertyToID("_Progress");

    #endregion

    #region Unity Lifecycle

    private void Awake()
    {
        Instance = this;

        if (overlayImage != null)
            _material = overlayImage.material;
    }

    private void OnDestroy()
    {
        Instance = null;
    }

    #endregion

    #region Public Methods


    public void Show()
    {
        gameObject.SetActive(true);

        if (_material != null)
            _material.SetFloat(ProgressID, 0f);

        if (overlayImage != null)
            overlayImage.raycastTarget = true;
    }

    public void FadeOut()
    {
        FadeOutAsync();
    }

    public async Task FadeOutAsync()
    {
        if (_material == null) return;

        _material.SetFloat(ProgressID, 0f);
        gameObject.SetActive(true);

        if (overlayImage != null)
            overlayImage.raycastTarget = true;

        DOTween.To(
            () => _material.GetFloat(ProgressID),
            x => _material.SetFloat(ProgressID, x),
            1f,
            revealDuration
        )
        .SetEase(revealEase)
        .SetUpdate(true);

        if (overlayImage != null)
            overlayImage.raycastTarget = false;

        gameObject.SetActive(false);
    }

    #endregion
}