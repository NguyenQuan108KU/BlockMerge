using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.UIModule.UIElements;
using SonatFramework.Systems;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.Serialization;
using UnityEngine.UI;

namespace SonatFramework.Scripts.Feature.Shop.UI
{
    public class UIShopPackBase : MonoBehaviour
    {
        [OnValueChanged("OnPackageChanged")] [SerializeField]
        protected ShopItemKey key;

        [SerializeField] protected ShopItemKey fallbackKey = ShopItemKey.None;

        [FormerlySerializedAs("title")] [SerializeField]
        protected TMP_Text txtTitle;

        [SerializeField] protected TMP_Text textPrice;
        [SerializeField] protected Button buyButton;
        [SerializeField] protected UIRewardGroup uiRewardGroup;
        [SerializeField] protected UnityEvent<ShopItemKey> onBuySuccess;

        protected readonly Service<ShopService> shopService = new SonatFramework.Systems.Service<SonatFramework.Scripts.Feature.Shop.ShopService>();

        protected ShopPack shopPack;

        public ShopItemKey Key => key;

        protected virtual void Start()
        {
            UpdateView();
            SetPackData();
            buyButton.onClick.AddListener(OnBuyClick);
        }

#if UNITY_EDITOR

        private void OnPackageChanged()
        {
            gameObject.name = $"UIShopPack_{key}";
        }

#endif

        protected virtual void OnEnable()
        {
            if (!shopService.Instance.VerifyPack(key))
            {
                if (fallbackKey != ShopItemKey.None && shopService.Instance.VerifyPack(fallbackKey))
                {
                    key = fallbackKey;
                }
                else
                {
                    gameObject.SetActive(false);
                    return;
                }
            }

            shopService.Instance.OnBuySuccess += OnBuySuccess;
        }

        protected virtual void OnDisable()
        {
            shopService.Instance.OnBuySuccess -= OnBuySuccess;
        }

        protected virtual void UpdateView()
        {
            if (textPrice != null && key != ShopItemKey.None)
            {
                textPrice.text = $"{SonatSDKAdapter.GetProductPrice(key)}";
            }

            if (txtTitle != null && key != ShopItemKey.None)
            {
                txtTitle.text = shopService.Instance.GetProductName(key);
            }
        }

        public virtual void SetPackData()
        {
            LoadPackData();
            if (shopPack is not { active: true })
            {
                gameObject.SetActive(false);
                return;
            }

            uiRewardGroup?.SetData(shopPack.packData.GetRewardData());
        }

        public bool IsActive()
        {
            LoadPackData();
            return shopService.Instance.VerifyPack(key);
        }

        protected void LoadPackData()
        {
            shopPack = shopPack ?? shopService.Instance.GetPackData(key);
        }


        protected virtual void OnBuyClick()
        {
            shopService.Instance.BuyPack(key);
        }

        protected virtual void OnBuySuccess(ShopItemKey shopItemKey)
        {
            if (shopItemKey != key)
            {
                if (!shopService.Instance.VerifyPack(key))
                {
                    gameObject.SetActive(false);
                }

                return;
            }

            BuyComplete();
        }

        protected virtual void BuyComplete()
        {
            ResetLayout();
            onBuySuccess?.Invoke(key);
        }

        protected virtual void ResetLayout()
        {
            if (!shopService.Instance.VerifyPack(key))
            {
                gameObject.SetActive(false);
                return;
            }

            transform.GetComponentInParent<UIShopPackContent>()?.UpdateElements();
        }
        
    }
}