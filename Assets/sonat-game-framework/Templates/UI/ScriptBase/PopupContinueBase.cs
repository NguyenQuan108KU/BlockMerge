using System;
using Cysharp.Threading.Tasks;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Scripts.Feature.Shop.UI;
using SonatFramework.Scripts.Gameplay;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Scripts.UIModule.UIElements;
using SonatFramework.Systems;
using SonatFramework.Systems.ConfigManagement;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.TrackingModule;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class PopupContinueBase : Panel
{
    public class Data : UIData
    {
        public Action<string, object[]> onPlayOn;
        public Action onClose;
        public StuckType stuckType;
    }

    protected Data data;
    protected int maxReviveWithAds;
    public GameObject playOnWithAdsBtn;
    protected readonly Service<InventoryService> inventoryService = new();

    [SerializeField] protected bool showNative;
    [SerializeField] protected TMP_Text txtPlayonPrice;
    protected CurrencyData playOnPrice;
    [Required] [SerializeField] protected Config<GamePlayConfig> gameConfig;
    protected bool nativeHided;

    public override void OnSetup()
    {
        base.OnSetup();
        playOnPrice = gameConfig.config.playOnPrice;
        txtPlayonPrice.text = playOnPrice.value.ToString();
    }

    public override void Open(UIData uiData)
    {
        base.Open(uiData);
        data = (Data)uiData;

        maxReviveWithAds = SonatSDKAdapter.GetValueByLevel("by_level_show_rwd_revive", 9999);
        int reviveWithAds = SonatSystem.GetService<GameplayAnalyticsService>().levelPlayData.reviveByRwd;
        if (playOnWithAdsBtn != null)
            playOnWithAdsBtn.SetActive(reviveWithAds < maxReviveWithAds);

        SetLayout();

        if (showNative)
        {
            SonatSDKAdapter.ShowNativeAds();
        }
    }

    protected virtual void SetLayout()
    {
    }

    public override void Close()
    {
        base.Close();
        if (showNative)
        {
            SonatSDKAdapter.HideNavtiveAds();
        }
    }

    public override void OnFocus()
    {
        base.OnFocus();
        if (showNative && nativeHided)
        {
            SonatSDKAdapter.ShowNativeAds();
        }
    }

    public override void OnFocusLost()
    {
        base.OnFocusLost();
        if (!showNative) return;
        nativeHided = true;
        SonatSDKAdapter.HideNavtiveAds();
    }

    public virtual void PlayOnWithCoinClick()
    {
        if (inventoryService.Instance.CanReduce(playOnPrice))
        {
            var log = new SpendResourceLogData()
            {
                earnType = "booster",
                earnId = "revive",
            };
            
            inventoryService.Instance.SpendCurrency(playOnPrice, log);
            
            PlayOn("play_on_coin");
        }
        else
        {
            PopupToast.Create("Not enough coin!");
            PanelManager.Instance.OpenPanelByNameAsync<ShopPanelBase>("ShopPanel").Forget();
        }
    }

    public virtual void PlayOnWithAdsClick()
    {
        SonatSDKAdapter.ShowRewardAds(OnReviveWithAds, "booster", "revive");
    }

    protected virtual void OnReviveWithAds()
    {
        PlayOn("play_on_ads");
        SonatSystem.GetService<GameplayAnalyticsService>().levelPlayData.reviveByRwd++;
    }

    protected virtual void PlayOn(string by, object[] objectParams = null)
    {
        Close();
        data?.onPlayOn?.Invoke(by, objectParams);
    }

    public virtual void OnGiveUpClick()
    {
        Close();
        data?.onClose?.Invoke();
    }
}