using System;
using System.Collections;
using Cysharp.Threading.Tasks;
using Sonat;
using Sonat.Enums;
using SonatFramework.Scripts.Feature.CheckInternet;
using SonatFramework.Scripts.Feature.Lives;
using SonatFramework.Scripts.Feature.Lives.UI;
using SonatFramework.Scripts.Feature.Shop.UI;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.NetworkManagement;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace SonatFramework.Templates.UI.ScriptBase
{
    public class PopupLivesBase : Panel
    {
        [SerializeField] protected TMP_Text refillTimer, unlimitedTimer;

        //public UILivesList uiLiveList;
        [SerializeField] protected UIResourceValue liveValue;
        [SerializeField] protected GameObject closeButton;
        public UICurrencyPrice uiRefillPrice;
        public GameObject fullLivesObj;
        public GameObject nonFullLivesObj;
        public GameObject unlimitedLivesObj;
        public GameObject noInternetObj;

        public Button refillFreeBtn;

        //public Button refillWithCoinBtn;
        public GameObject refillNonFree;
        public Button refillWithAdsBtn;
        public GameObject noInternetBuyLiveCoinBtn, noInternetFreeLiveBtn;
        public TMP_Text txtNoInternetCoinPrice;
        protected readonly Service<LivesService> liveService = new SonatFramework.Systems.Service<SonatFramework.Scripts.Feature.Lives.LivesService>();

        protected readonly Service<InventoryService> inventoryService = new SonatFramework.Systems.Service<SonatFramework.Systems.InventoryManagement.InventoryService>();

        //protected readonly Service<CheckInternetService> checkInternetService = new();
        protected ResourceData liveData;
        protected ResourceData unlimitedLiveData;

        public override void OnSetup()
        {
            base.OnSetup();
            liveData = inventoryService.Instance.GetResource(GameResource.Live.ToGameResourceKey());
            unlimitedLiveData = inventoryService.Instance.GetResource(GameResource.UnlimitedLive.ToGameResourceKey());
        }

        public override void Open(UIData uiData)
        {
            base.Open(uiData);
            CheckLive();
        }

        protected virtual void OnEnable()
        {
            liveService.Instance.onLivesUpdate += CheckLive;
        }

        protected virtual void OnDisable()
        {
            liveService.Instance.onLivesUpdate -= CheckLive;
        }

        public virtual void CheckLive()
        {
            if (gameObject == null) return;

            if (!liveService.Instance.IsUnlimitedLives())
            {
                StopCoroutine(nameof(IeCountdownUnlimited));

                unlimitedLivesObj.SetActive(false);
                //uiLiveList.gameObject.SetActive(true);
                liveValue.gameObject.SetActive(true);

                int live = inventoryService.Instance.GetResource(GameResource.Live.ToGameResourceKey()).quantity;

                if (live >= liveService.Instance.MaxLives())
                {
                    StopCoroutine(nameof(IeCountdownRefill));
                    fullLivesObj.SetActive(true);
                    nonFullLivesObj.SetActive(false);
                    noInternetObj.SetActive(false);
                }
                else
                {
                    noInternetObj.SetActive(false);
                    long timeRefillRemain = liveService.Instance.GetTimeRefillRemain();
                    if (timeRefillRemain <= 0)
                    {
                        fullLivesObj.SetActive(false);
                        nonFullLivesObj.SetActive(false);
                        Close();
                    }
                    else
                    {
                        fullLivesObj.SetActive(false);
                        nonFullLivesObj.SetActive(true);

                        StartCoroutine(nameof(IeCountdownRefill));

                        bool canRefillFree = liveService.Instance.CanRefillFree();
                        refillFreeBtn.gameObject.SetActive(canRefillFree);
                        refillNonFree.SetActive(!canRefillFree);
                        if (!canRefillFree)
                        {
                            uiRefillPrice.SetData(liveService.Instance.GetRefillPrice());
                        }
                    }
                }
            }
            else
            {
                StopCoroutine(nameof(IeCountdownRefill));
                nonFullLivesObj.SetActive(false);
                unlimitedLivesObj.SetActive(true);
                //uiLiveList.gameObject.SetActive(false);
                liveValue.gameObject.SetActive(false);
                fullLivesObj.SetActive(false);
                nonFullLivesObj.SetActive(false);
                StartCoroutine(nameof(IeCountdownUnlimited));
            }
        }

        protected virtual IEnumerator IeCountdownRefill()
        {
            long timeRemain = liveService.Instance.GetTimeRefillRemain();

            while (timeRemain > 0)
            {
                UpdateTimer(refillTimer, timeRemain);

                yield return new WaitForSecondsRealtime(1);

                timeRemain = liveService.Instance.GetTimeRefillRemain();
            }

            CheckLive();
        }

        protected virtual IEnumerator IeCountdownUnlimited()
        {
            long timeRemain = unlimitedLiveData.GetRemainingTime();
            while (timeRemain > 0)
            {
                UpdateTimer(unlimitedTimer, timeRemain);
                yield return new WaitForSecondsRealtime(1);
                timeRemain = unlimitedLiveData.GetRemainingTime();
            }

            CheckLive();
        }

        protected virtual void UpdateTimer(TMP_Text timer, long sec)
        {
            TimeSpan time = TimeSpan.FromSeconds(sec);

            if (time.Hours > 0)
            {
                timer.text = $"{(int)(time.TotalHours):D2}:{time.Minutes:D2}:{time.Seconds:D2}";
            }
            else
                timer.text = $"{(int)(time.TotalMinutes):D2}:{time.Seconds:D2}";
        }

        public virtual void RefillFree()
        {
            liveService.Instance.RefillFullLive(new EarnResourceLogData() { spendId = "free", spendType = "free" });
            liveService.Instance.refillFreeCount.Value++;
            CheckLive();
        }

        public virtual void RefillWithAds()
        {
            SonatSDKAdapter.ShowRewardAds(OnRefillWithAds, "live", "live");
        }

        protected virtual void OnRefillWithAds()
        {
            liveService.Instance.RefillLive(1, new EarnResourceLogData()
            {
                spendId = "rw_ads",
                spendType = "rw_ads",
            });
            CheckLive();
        }

        public virtual void RefillWithCoin()
        {
            CurrencyData price = liveService.Instance.GetRefillPrice();
            if (!inventoryService.Instance.CanReduce(price))
            {
                PopupToast.Create("Not enough coin!");
                PanelManager.Instance.OpenPanelByNameAsync<ShopPanelBase>("ShopPanel").Forget();
                return;
            }

            var logData = new SpendResourceLogData() { earnType = "currency", earnId = "live" };

            inventoryService.Instance.SpendCurrency(price, logData);

            liveService.Instance.RefillFullLive(new EarnResourceLogData()
            {
                spendId = price.currency.ToLogString(),
                spendType = GameResourceType.Currency.ToLogString(),
            });

            inventoryService.Instance.ClaimPendingResource("refill_live");
            CheckLive();
        }
    }
}