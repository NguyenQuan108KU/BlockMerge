using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;

[RequireComponent(typeof(Toggle))]
public class ToggleSwitchVisual : MonoBehaviour
{
    [Header("References")]
    [SerializeField] private RectTransform handleRect;
    [SerializeField] private Image backgroundImage;

    [Header("Sprites")]
    [SerializeField] private Sprite barOnSprite;
    [SerializeField] private Sprite barOffSprite;

    [Header("Settings")]
    [SerializeField] private float moveX = 40f;
    [SerializeField] private float animDuration = 0.1f;

    private Toggle _toggle;

    private void Awake()
    {
        _toggle = GetComponent<Toggle>();

        // Ngắt kết nối Graphic mặc định để Unity không tự tắt Handle
        if (_toggle.graphic == handleRect.GetComponent<Graphic>())
        {
            _toggle.graphic = null;
        }

        // Ép bật Handle phòng trường hợp bị tắt
        if (handleRect != null) handleRect.gameObject.SetActive(true);

        // Tắt Transition mặc định tránh xung đột
        _toggle.transition = Selectable.Transition.None;

        _toggle.onValueChanged.AddListener(OnToggleValueChanged);
        UpdateVisual(_toggle.isOn, false);
    }

    private void OnDestroy()
    {
        if (_toggle != null)
            _toggle.onValueChanged.RemoveListener(OnToggleValueChanged);
    }

    private void OnToggleValueChanged(bool isOn)
    {
        // Phòng trường hợp Unity tắt handle khi runtime
        if (handleRect != null && !handleRect.gameObject.activeSelf)
            handleRect.gameObject.SetActive(true);

        UpdateVisual(isOn, true);
    }

    private void UpdateVisual(bool isOn, bool animate)
    {
        float targetX = isOn ? Mathf.Abs(moveX) : -Mathf.Abs(moveX);

        // Swap sprite ngay lập tức — knob đang che vùng giữa nên không bị giật
        if (backgroundImage != null)
            backgroundImage.sprite = isOn ? barOnSprite : barOffSprite;

        if (animate)
        {
            handleRect.DOKill();
            handleRect.DOAnchorPosX(targetX, animDuration)
                .SetEase(Ease.OutCubic)
                .SetUpdate(true); // Chạy được khi Game Pause
        }
        else
        {
            handleRect.anchoredPosition = new Vector2(targetX, handleRect.anchoredPosition.y);
        }
    }


    public void SetupState(bool isOn)
    {
        if (_toggle == null) _toggle = GetComponent<Toggle>();

        _toggle.SetIsOnWithoutNotify(isOn);
        UpdateVisual(isOn, false);
    }
}