using UnityEngine;
using UnityEngine.UI;

public class BottomNavigation : MonoBehaviour
{
    [Header("Buttons (Giữ nguyên reference cũ)")]
    [SerializeField] private Button btnHome;
    [SerializeField] private Button btnShop;

    [Header("Panels")]
    [SerializeField] private GameObject panelHome;
    [SerializeField] private GameObject panelShop;

    // --- BIẾN MỚI: Để lưu script TabButton ---
    private TabButton _tabHome;
    private TabButton _tabShop;

    private void Start()
    {
        // 1. Lấy script TabButton nằm ngay trên các nút (Tự động tìm)
        if (btnHome) _tabHome = btnHome.GetComponent<TabButton>();
        if (btnShop) _tabShop = btnShop.GetComponent<TabButton>();

        // 2. Gắn sự kiện Click (Logic cũ)
        if (btnHome) btnHome.onClick.AddListener(OnHomeClicked);
        if (btnShop) btnShop.onClick.AddListener(OnShopClicked);

        // 3. Mặc định vào Home
        OnHomeClicked();
    }

    private void OnHomeClicked()
    {
        ShowPanel("HOME");
        UpdateButtonVisuals(btnHome);
    }

    private void OnShopClicked()
    {
        ShowPanel("SHOP");
        UpdateButtonVisuals(btnShop);
    }

    private void ShowPanel(string id)
    {
        // Logic bật tắt Panel (Logic cũ của bạn)
        if (panelHome) panelHome.SetActive(false);
        if (panelShop) panelShop.SetActive(false);

        switch (id)
        {
            case "HOME":
                if (panelHome) panelHome.SetActive(true);
                break;
            case "SHOP":
                if (panelShop) panelShop.SetActive(true);
                break;
           
        }
    }

    private void UpdateButtonVisuals(Button activeButton)
    {
        // --- LOGIC MỚI: Gọi vào TabButton để chạy hiệu ứng ---

        // Kiểm tra xem nút Home có phải là nút đang active không?
        if (_tabHome != null)
            _tabHome.SetState(activeButton == btnHome);

        if (_tabShop != null)
            _tabShop.SetState(activeButton == btnShop);

    }
}