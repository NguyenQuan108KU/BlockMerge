using UnityEngine;
using TMPro;
using UnityEngine.UI;
using System;

public class LevelButton : MonoBehaviour
{
    [Header("UI Components")]
    // Bạn kéo chính component Image và Button của object cha vào đây
    [SerializeField] private Image btnImage;
    [SerializeField] private Button btnComp;
    [SerializeField] private TextMeshProUGUI txtLevel;

    private int _levelIndex;
    private Action<int> _onClickCallback;

    public void Setup(int level, bool isLocked, Action<int> onClick)
    {
        _levelIndex = level;
        _onClickCallback = onClick;

        // 1. Điền số
        if (txtLevel) txtLevel.text = level.ToString();

        // 2. Xử lý trạng thái KHÓA / MỞ
        if (isLocked)
        {
            // Bị khóa: Màu xám đậm, Tắt tương tác
            btnImage.color = new Color(0.3f, 0.3f, 0.3f, 1f);
            btnComp.interactable = false;
        }
        else
        {
            // Mở khóa: Màu mặc định (chưa chọn) là hơi xám
            btnImage.color = Color.gray;
            btnComp.interactable = true;
        }

        // 3. Gắn sự kiện click
        btnComp.onClick.RemoveAllListeners();
        btnComp.onClick.AddListener(() => {
            _onClickCallback?.Invoke(_levelIndex);
        });
    }

    // Hàm này được HomeView gọi để highlight nút đang chọn
    public void SetSelectedState(bool isSelected)
    {
        if (isSelected)
        {
            // ĐƯỢC CHỌN: Sáng trưng, Phóng to 1.2 lần
            btnImage.color = Color.white;
            transform.localScale = Vector3.one * 1.2f;
        }
        else
        {
            // KHÔNG CHỌN: Màu xám, Kích thước bình thường
            btnImage.color = Color.gray;
            transform.localScale = Vector3.one;
        }
    }
}