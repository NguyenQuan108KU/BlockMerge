using System;
using System.Collections.Generic;
using Sirenix.OdinInspector;
#if sonat_sdk
using sonat_sdk.Scripts.Helper;
using Sonat.AdsModule;
using Sonat.Data;
#endif
using Sonat.Enums;
using Sonat.IapModule;
using SonatFramework.Scripts.Helper;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems;
using SonatFramework.Systems.ConfigManagement;
using SonatFramework.Systems.InventoryManagement;
using UnityEngine;

namespace SonatFramework.Scripts.Feature.Shop
{
    [CreateAssetMenu(fileName = "ShopService", menuName = "Sonat Services/Shop Service")]
    public class ShopService : SonatServiceSo, IServiceInitialize
    {
        [BoxGroup("SERVICES", true)] [Required] [SerializeField]
        private Service<InventoryService> inventory = new();

        [BoxGroup("CONFIG", true)] [Required] [SerializeField]
        private Config<ShopConfig> shopConfig;

        [SerializeField] private bool autoCheckPendingPack = true;

        private bool isFistBuyPack;

        private ShopItemKey packBuying = ShopItemKey.None;
        public Action<ShopItemKey> OnBuySuccess { get; set; }

        private bool subcribedSdk = false;

        public Func<ShopItemKey, bool> externalVerifyPack;

        public void Initialize()
        {
            packBuying = ShopItemKey.None;
            externalVerifyPack = null;
            if (autoCheckPendingPack)
            {
                CheckPendingPack();
#if sonat_sdk
                SonatIap.OnInAppPurchased += OnBuyComplete;
                subcribedSdk = true;
                SonatAds.externalNoAds += IsNoAdsAvailable;
#endif
            }
        }

        public void CheckPendingPack()
        {
            List<int> pendingPacks = SonatSDKAdapter.GetPacksPendingReward();
            if (pendingPacks is { Count: > 0 })
            {
                foreach (var pendingPack in pendingPacks)
                {
                    ClaimPack((ShopItemKey)pendingPack);
                }
            }
        }

        public void BuyPack(ShopItemKey key)
        {
            if (!subcribedSdk)
            {
#if sonat_sdk
                SonatIap.OnInAppPurchased += OnBuyComplete;
#endif
                subcribedSdk = true;
            }

            if (packBuying != ShopItemKey.None)
            {
                return;
            }

            packBuying = key;
            isFistBuyPack = !SonatSDKAdapter.CheckPackBought(key);
            SonatSDKAdapter.BuyPack(key, "pack");
        }

        public bool IsBuying()
        {
            return packBuying != ShopItemKey.None;
        }

        private void OnBuyComplete(int id, bool success)
        {
            if (success)
            {
                ClaimPack((ShopItemKey)id);
                OnBuySuccess?.Invoke((ShopItemKey)id);
            }

            packBuying = ShopItemKey.None;
        }


        public void RestorePurchase(Action<List<int>> onSuccess)
        {
            SonatSDKAdapter.Restore((List<int> itemBought) =>
            {
                foreach (var key in itemBought)
                {
                    var packData = GetPackData((ShopItemKey)key);
                    if (packData != null)
                    {
                        foreach (var resourceUnit in packData.packData.resourceUnits)
                        {
                            if (resourceUnit.nonConsumable)
                            {
                                inventory.Instance.AddResource(resourceUnit, new EarnResourceLogData("restore", packData.key.ToString(), "iap"));
                                return;
                            }
                        }

                        break;
                    }
                }

                onSuccess?.Invoke(itemBought);
            });
        }

        public void ClaimPack(ShopItemKey key)
        {
            var packData = GetPackData(key);
            if (packData == null) return;
            if (packData.packData is { resourceUnits: { Count: > 0 } })
            {
                var logData = new EarnResourceLogData
                {
                    spendType = "pack_iap",
                    spendId = SonatSDKAdapter.FindProductId(key),
                    isFirstBuy = isFistBuyPack,
                    source = "iap"
                };
                inventory.Instance.AddPendingReward(key.ToString(), packData.packData.GetRewardData(), logData);
            }
#if sonat_sdk
            SonatIap.OnPackRewarded((int)key);
#endif
        }

        public ShopPack GetPackData(ShopItemKey key)
        {
            return shopConfig.config.packs.Find(e => e.key == key);
        }

        public List<ShopPack> GetPacksData(int group)
        {
            return shopConfig.config.packs.FindAll(e => e.Group == group);
        }

        public string GetProductName(ShopItemKey key)
        {
#if UNITY_EDITOR
            return key.ToString().SplitByUppercase();
#elif sonat_sdk
            string productName = SonatSDKAdapter.GetProductName(key);
            return !string.IsNullOrEmpty(productName) ? productName : key.ToString().SplitByUppercase();
#endif
        }


        public bool VerifyPack(ShopItemKey shopItemKey)
        {
            if (externalVerifyPack != null && !externalVerifyPack.InvokeAnd(shopItemKey)) return false;
            var shopPack = GetPackData(shopItemKey);
            if (shopPack is not { active: true }) return false;
            if (shopPack.oneTimePurchase)
            {
                List<ShopPack> packsInGroup = GetPacksData(shopPack.Group);
                if (packsInGroup == null) return false;
                foreach (var pack in packsInGroup)
                {
                    if (SonatSDKAdapter.CheckPackBought(pack.key)) return false;
                }
            }

            foreach (var resourceUnit in shopPack.packData.resourceUnits)
            {
                if (resourceUnit.nonConsumable)
                {
                    var resource = inventory.Instance.GetResource(resourceUnit.Key);
                    if (resource.CanReduce()) return false;
                }
            }

            return true;
        }

        private bool IsNoAdsAvailable()
        {
            var noAdsItem = inventory.Instance.GetResource(GameResource.NoAds.ToGameResourceKey());
            if (noAdsItem is { quantity: > 0 })
            {
#if sonat_sdk
                UserData.IsNoads.BoolValue = true;
#endif
                return true;
            }

            var noAdsLimited = inventory.Instance.GetResource(GameResource.NoAdsLimited.ToGameResourceKey());
            if (noAdsLimited != null && noAdsLimited.CanReduce()) return true;
            return false;
        }
    }
}