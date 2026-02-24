using System;
using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

namespace SonatFramework.Scripts.Feature.Lives.UI
{
    public class UILivesList : MonoBehaviour
    {
        public Transform liveContainer;
        private readonly Service<InventoryService> inventoryService = new();
        private readonly Service<LivesService> livesService = new ();
        private readonly Service<PoolingContainerService> poolingService = new();
        private readonly GameResource resource = GameResource.Live;
        private List<Transform> liveItems;
        private ResourceData livesResource;

        private void Awake()
        {
            Setup();
        }

        private void OnDisable()
        {
            livesResource.onUpdate += OnResourceUpdate;
        }

        private void OnEnable()
        {
            OnResourceUpdate();
            livesResource.onUpdate += OnResourceUpdate;
        }

        public virtual void Setup()
        {
            livesResource = inventoryService.Instance.GetResource(resource.ToGameResourceKey());
            poolingService.Instance.CleanContainer(liveContainer);
            liveItems = new List<Transform>();
            for (var i = 0; i < livesService.Instance.MaxLives(); i++)
            {
                var item = poolingService.Instance.CreateObject<Transform>(liveContainer);
                liveItems.Add(item);
            }
        }

        protected virtual void OnResourceUpdate()
        {
            SetLive(livesResource.quantity);
        }

        private void SetLive(int count)
        {
            for (var i = 0; i < liveItems.Count; i++) liveItems[i].GetChild(0).gameObject.SetActive(i < count);
        }
    }
}