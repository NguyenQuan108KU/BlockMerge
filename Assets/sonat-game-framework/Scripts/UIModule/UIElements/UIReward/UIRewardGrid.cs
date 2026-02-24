using System;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule.UIElements
{
    public class UIRewardGrid : MonoBehaviour
    {
        [SerializeField] private Transform container;
        private readonly Service<PoolingContainerService> poolingService = new();
        private RewardData rewardData;
        private UIItemGroup uiItemGroup;

        private void Awake()
        {
            if (container == null) container = transform;
        }

        public void SetReward(RewardData rewardData)
        {
            this.rewardData = rewardData;
            ShowReward();
        }

        private void ShowReward()
        {
            poolingService.Instance.CleanContainer(container);
            CreateUIItemGroup();
            foreach (var resourceData in rewardData.resourceUnits)
            {
                if (!uiItemGroup.CanDisplay(resourceData.gameResource)) CreateUIItemGroup();
                uiItemGroup.AddResource(resourceData);
            }
        }

        private void CreateUIItemGroup()
        {
            uiItemGroup = poolingService.Instance.CreateObject<UIItemGroup>(container);
            uiItemGroup.CleanContainer();
        }

        public UIRewardItem GetRewardItem(GameResourceKey resourceKey)
        {
            if (container == null) return null;
            foreach (Transform child in container)
            {
                if (child.gameObject.activeSelf && child.TryGetComponent<UIItemGroup>(out var uIItemGroup))
                {
                    if (uIItemGroup.GetRewardItem(resourceKey) != null)
                    {
                        return uIItemGroup.GetRewardItem(resourceKey);
                    }
                }
            }

            return null;
        }

        public void CollectVisual(SonatCollectEffect collectEffect)
        {
            foreach (Transform child in container)
            {
                if (child.gameObject.activeInHierarchy && child.TryGetComponent<UIItemGroup>(out var uIItemGroup))
                {
                    uIItemGroup.CollectVisual(collectEffect);
                }
            }
        }
    }
}