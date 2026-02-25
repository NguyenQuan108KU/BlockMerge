using Sonat.Enums;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems;
using SonatFramework.Scripts.Feature.Shop;
using UnityEngine;
using UnityEngine.UI;

public class BtnNoAds : MonoBehaviour
{
    private readonly Service<ShopService> shopService = new Service<ShopService>();
    private Button button;

    private void Awake()
    {
        button = GetComponent<Button>();
        button.onClick.AddListener(OnClick);
    }

    private void Start()
    {
        shopService.Instance.OnBuySuccess += OnBuySuccess;
        UpdateVisibility();
    }

    private void OnDestroy()
    {
        if (shopService.Instance != null)
            shopService.Instance.OnBuySuccess -= OnBuySuccess;
    }

    private void OnClick()
    {
        if (!shopService.Instance.VerifyPack(ShopItemKey.no_ads)) return;
        shopService.Instance.BuyPack(ShopItemKey.no_ads);
    }

    private void OnBuySuccess(ShopItemKey key)
    {
        if (key == ShopItemKey.no_ads)
            UpdateVisibility();
    }

    private void UpdateVisibility()
    {
        gameObject.SetActive(!SonatSDKAdapter.CheckPackBought(ShopItemKey.no_ads));
    }
}