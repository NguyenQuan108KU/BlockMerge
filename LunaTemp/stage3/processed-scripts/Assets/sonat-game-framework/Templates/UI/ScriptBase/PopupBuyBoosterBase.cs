//using SonatFramework.Scripts.Feature.Shop.UI;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Scripts.UIModule.SpriteService;
using SonatFramework.Scripts.UIModule.UIElements;
using SonatFramework.Scripts.UIModule.UIElements.UICollectItemEffect;
using SonatFramework.Systems;
using SonatFramework.Systems.BoosterManagement;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.TrackingModule;
using TMPro;
using UnityEngine;

namespace SonatFramework.Templates.UI.ScriptBase
{
    public class PopupBuyBoosterBase : Panel
    {
        [SerializeField] protected TMP_Text txtTile;
        [SerializeField] protected TMP_Text txtCoinPrice;
        [SerializeField] protected TMP_Text txtValue;
        [SerializeField] protected FixedImageRatio icon;
        [SerializeField] protected string iconNamePattern = "ico_{0}";
        protected UIBoosterBase uIBooster;
        protected BoosterConfig boosterConfig;
        protected readonly Service<BoosterService> boosterService = new Service<BoosterService>();
        protected readonly Service<SpriteAtlasService> spriteService = new Service<SpriteAtlasService>();
        [SerializeField] protected GameObject buyWithRwdButton;

        public override void Open(UIData uiData)
        {
            base.Open(uiData);
            boosterConfig = uiData.Get<BoosterConfig>("booster_config");
            txtCoinPrice.text = $"{boosterConfig.price.value}";
            txtValue.text = $"x{boosterConfig.packValue}";
            icon.SetSprite(spriteService.Instance.GetSprite(string.Format(iconNamePattern, boosterConfig.booster)));

            int maxBuyByRwd = SonatSDKAdapter.GetValueByLevel("by_level_show_rwd_booster", 9999);
            int buyWithRwdCount = SonatSystem.GetService<GameplayAnalyticsService>().levelPlayData.buyBoosterByRwd;
            buyWithRwdButton.SetActive(buyWithRwdCount < maxBuyByRwd);
        }

        public virtual void OnBuyWithCoinClick()
        {
            if (boosterService.Instance.BuyBooster(boosterConfig.booster))
            {
                UpdateBoosterVisual();
                Close();
            }
            else
            {
                PopupToast.Create("Not enough coin!");
                //PanelManager.Instance.OpenPanelByNameAsync<ShopPanelBase>("ShopPanel");
            }
        }

        public virtual void OnBuyWithAdsClick()
        {
            SonatSDKAdapter.ShowRewardAds(OnWatchedAds, "booster", boosterConfig.booster.ToString());
        }

        protected virtual void OnWatchedAds()
        {
            var logEarn = new EarnResourceLogData()
            {
                spendType = "rw_ads",
                spendId = "rw_ads",
                source = "non_iap"
            };
            
            SonatSystem.GetService<InventoryService>().AddPendingResource("buy_booster", new ResourceData(boosterConfig.booster, boosterConfig.packValue), logEarn);
            
            UpdateBoosterVisual();
            
            SonatSystem.GetService<GameplayAnalyticsService>().levelPlayData.buyBoosterByRwd++;
            Close();
        }

        protected virtual void UpdateBoosterVisual()
        {
            EventBus<AddResourceVisualEvent>.Raise(new AddResourceVisualEvent()
            {
                key = new GameResourceKey() { gameResource = boosterConfig.booster },
                position = icon.transform.position,
                collectEffect = new CollectEffectSingle()
            });
            
        }
    }
}