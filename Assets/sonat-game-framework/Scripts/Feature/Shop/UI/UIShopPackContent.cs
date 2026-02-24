using System;
using System.Collections.Generic;
using System.Linq;
using Sonat.Enums;
using SonatFramework.Scripts.Helper;
using SonatFramework.Systems;
using SonatFramework.Systems.SceneManagement;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.Serialization;
using UnityEngine.UIElements;
using Button = UnityEngine.UI.Button;

namespace SonatFramework.Scripts.Feature.Shop.UI
{
    public class UIShopPackContent : MonoBehaviour
    {
        [SerializeField] private ScrollView scrollView;
        [SerializeField] private Transform content;
        [SerializeField] private Button expandBtn;
        [SerializeField] private TMP_Text txtExpand;
        [SerializeField] private float bottomPadding = 50;
        [SerializeField] private int maxElementsShow = 10;
        private RectTransform rectTransform;
        private List<UIShopPackBase> uiShopPacks;
        private List<UIShopElement> shopElements;
        private int maxShopElementShow;
        private bool inited;
        private bool expanding;
        private readonly Service<ShopService> shopService = new Service<ShopService>();
        [SerializeField] private bool showFull;

        public UnityEvent<bool> onExpand;

        private void Start()
        {
            //expandBtn.onClick.RemoveAllListeners();
            expandBtn.onClick.AddListener(OnExpandClick);
        }

        private void OnEnable()
        {
            var placement = SonatSystem.GetService<SceneService>().GetCurrentGamePlacement();
            if (placement == GamePlacement.Gameplay)
            {
                showFull = false;
                maxElementsShow = 3;
            }
            else
            {
                showFull = true;
                maxElementsShow = 30;
            }

            if (!inited)
            {
                Init();
            }

            expanding = false;
            SetExpand(false);
            shopService.Instance.OnBuySuccess += OnBuySuccess;
        }

        private void OnDisable()
        {
            shopService.Instance.OnBuySuccess -= OnBuySuccess;
        }

        private void Init()
        {
            rectTransform = GetComponent<RectTransform>();
            uiShopPacks = new List<UIShopPackBase>();
            var packs = GetComponentsInChildren<UIShopPackBase>(true);
            foreach (var pack in packs)
            {
                if (pack.IsActive())
                {
                    uiShopPacks.Add(pack);
                }
                else
                {
                    pack.gameObject.SetActive(false);
                }
            }

            shopElements = new List<UIShopElement>();
            foreach (RectTransform element in content)
            {
                if (element.gameObject.activeSelf && element.gameObject != expandBtn.gameObject)
                {
                    UIShopElement uiElement = element.GetComponent<UIShopElement>();
                    if (uiElement != null)
                        shopElements.Add(uiElement);
                }
            }

            shopElements.Sort((a, b) => b.priority.CompareTo(a.priority));
            UpdateElements();

            for (int i = 0; i < shopElements.Count; i++)
            {
                if (!showFull && !IsPackInRect(shopElements[i].GetComponent<RectTransform>()))
                {
                    break;
                }

                maxShopElementShow = i + 1;
            }

            if (maxShopElementShow > maxElementsShow) maxShopElementShow = maxElementsShow;

            inited = true;
        }

        private void OnBuySuccess(ShopItemKey shopItemKey)
        {
            UpdateElements();
        }

        public void UpdateElements()
        {
            List<UIShopElement> elements = new List<UIShopElement>();
            foreach (var element in shopElements)
            {
                element.CheckContent();
                if (element.IsEmpty())
                {
                    element.gameObject.SetActive(false);
                }
                else
                {
                    elements.Add(element);
                }
            }

            shopElements = elements;

            expandBtn.gameObject.SetActive(maxShopElementShow < shopElements.Count && !showFull);
        }


        private void OnExpandClick()
        {
            expanding = !expanding;
            UpdateElements();
            SetExpand(expanding);
        }

        private void SetExpand(bool expand)
        {
            int activeIndex = 0;
            for (int i = 0; i < shopElements.Count; i++)
            {
                if (expand || i < maxShopElementShow)
                {
                    shopElements[i].SetIndex(activeIndex);
                    shopElements[i].gameObject.SetActive(true);
                    activeIndex++;
                }
                else
                {
                    shopElements[i].gameObject.SetActive(false);
                }
            }

            onExpand?.Invoke(expand);
            if (txtExpand != null)
            {
                string text = expand ? "Hide" : "More Offers!";
                txtExpand.SetLocalize(text);
            }
        }

        private bool IsPackInRect(RectTransform packRect)
        {
            float rectHeight = rectTransform.rect.height;
            return rectHeight - (-packRect.anchoredPosition.y + packRect.rect.height / 2) > bottomPadding;
        }
    }
}