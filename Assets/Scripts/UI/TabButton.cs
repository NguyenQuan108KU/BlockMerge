using UnityEngine;
using UnityEngine.UI;
using TMPro;
using DG.Tweening; // Cần cài DOTween để code siêu gọn

public class TabButton : MonoBehaviour
{
    [Header("Components")]
    [SerializeField] private RectTransform iconRect;  // Kéo cái Shop Img vào
    [SerializeField] private TextMeshProUGUI textLabel; // Kéo cái Text TMP vào
    [SerializeField] private Image bgImage; // (Optional) Nếu muốn đổi màu nền

    [Header("Animation Config")]
    [SerializeField] private float moveUpDistance = 20f; // Bay lên bao nhiêu?
    [SerializeField] private float scaleAmount = 1.2f;   // Phóng to bao nhiêu?
    [SerializeField] private float duration = 0.3f;      // Thời gian diễn

    private Vector2 _originalPos;
    private Button _btnComp;

    private void Awake()
    {
        _btnComp = GetComponent<Button>();
        if (iconRect) _originalPos = iconRect.anchoredPosition;
    }

    // Hàm này để Manager gọi
    public void Setup(System.Action onClickAction)
    {
        if (_btnComp)
        {
            _btnComp.onClick.RemoveAllListeners();
            _btnComp.onClick.AddListener(() => onClickAction?.Invoke());
        }
    }

    // Đây là logic hiệu ứng chính
    public void SetState(bool isSelected)
    {
        // 1. Kill animation cũ để tránh bị giật nếu bấm liên tục
        iconRect.DOKill();
        if (textLabel) textLabel.DOKill();

        if (isSelected)
        {
            // --- TRẠNG THÁI ĐƯỢC CHỌN ---

            // Icon: Bay lên + Phóng to
            iconRect.DOAnchorPosY(_originalPos.y + moveUpDistance, duration).SetEase(Ease.OutBack);
            iconRect.DOScale(scaleAmount, duration).SetEase(Ease.OutBack);

            // Text: Hiện ra (Fade In hoặc bật GameObject)
            if (textLabel)
            {
                textLabel.gameObject.SetActive(true);
                textLabel.alpha = 0; // Reset về trong suốt
                textLabel.DOFade(1, duration); // Hiện dần lên
            }
        }
        else
        {
            // --- TRẠNG THÁI BÌNH THƯỜNG ---

            // Icon: Về vị trí cũ + Size cũ
            iconRect.DOAnchorPosY(_originalPos.y, duration).SetEase(Ease.OutQuad);
            iconRect.DOScale(1f, duration).SetEase(Ease.OutQuad);

            // Text: Ẩn đi
            if (textLabel)
            {
                textLabel.DOFade(0, duration / 2).OnComplete(() =>
                {
                    textLabel.gameObject.SetActive(false);
                });
            }
        }
    }
}