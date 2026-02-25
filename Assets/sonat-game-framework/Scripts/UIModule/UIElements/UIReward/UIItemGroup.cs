using System;
using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule.UIElements
{
    public class UIItemGroup : MonoBehaviour
    {
        [SerializeField] private Transform container;

        [SerializeField] private List<GameResource> resources;
        public int maxSlot = 1;
        public int order;
        private readonly Service<PoolingContainerService> poolingService = new Service<PoolingContainerService>();
        private readonly List<ResourceData> resourceDatas = new List<ResourceData>();

        public void CleanContainer()
        {
            poolingService.Instance.CleanContainer(container);
            resourceDatas.Clear();
        }

        public void AddResource(ResourceData resource)
        {
            resourceDatas.Add(resource);
            var item = poolingService.Instance.CreateObject<UIRewardItem>(container);
            item.SetData(resource);
        }

        public bool CanDisplay(GameResource resource)
        {
            if (resourceDatas.Count >= maxSlot) return false;
            return resources.Contains(GameResource.MAX) || resources.Contains(resource);
        }

        public UIRewardItem GetRewardItem(GameResourceKey resourceKey)
        {
            foreach (Transform child in container)
            {
                if (child.gameObject.activeSelf && child.TryGetComponent<UIRewardItem>(out var uIRewardItem))
                {
                    if (uIRewardItem.ResourceData.Key == resourceKey)
                    {
                        return uIRewardItem;
                    }
                }
            }

            return null;
        }
        
        public void CollectVisual(SonatCollectEffect collectEffect)
        {
            foreach (Transform child in container)
            {
                if (child.gameObject.activeInHierarchy && child.TryGetComponent<UIRewardItem>(out var uIRewardItem))
                {
                    uIRewardItem.CollectVisual(collectEffect);
                }
            }
        }
    }
}