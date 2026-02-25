using System;
using DG.Tweening;
using Sonat.Enums;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Scripts.UIModule.UIElements;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using TMPro;
using UnityEngine;

namespace SonatFramework.Scripts.Feature.Lives.UI
{
    public class UILives : UICurrency
    {
        [SerializeField] private UITimeCounter timeCounter;
        [SerializeField] private UITimeCounter timeCounterRefill;
        [SerializeField] private TMP_Text txtFullLives;
        [SerializeField] private GameObject normalLives, unlimitedLives;

        private readonly Service<LivesService> liveService = new Service<LivesService>();
        private bool orgBlockClick;
        private ResourceData liveData;
        private ResourceData unlimitedLiveData;

        private void Awake()
        {
            orgBlockClick = blockClick;
            liveData = inventoryService.Instance.GetResource(GameResource.Live.ToGameResourceKey());
            unlimitedLiveData = inventoryService.Instance.GetResource(GameResource.UnlimitedLive.ToGameResourceKey());
        }

        protected override void OnAddCurrency([Bridge.Ref] AddResourceVisualEvent eventData)
        {
            if (eventData.key.gameResource != GameResource.Live && eventData.key.gameResource != GameResource.UnlimitedLive &&
                eventData.key.gameResource != GameResource.MAX) return;

            if (eventData.collectEffect != null && icon != null)
            {
                eventData.collectEffect.Collect(eventData.key, eventData.visualQuantity, eventData.position, icon.transform.position, OnCollectEffect);
            }
            else
            {
                inventoryService.Instance.ClaimPendingResource(null, resource.ToGameResourceKey());
            }
        }

        protected override void OnCollectEffect(int index)
        {
            if (index != 0) return;
            try
            {
                inventoryService.Instance.ClaimPendingResource(null, resource.ToGameResourceKey());
                inventoryService.Instance.ClaimPendingResource(null, GameResource.UnlimitedLive.ToGameResourceKey());
                if (blastEffect)
                {
                    blastEffect.gameObject.SetActive(true);
                    blastEffect.Play();
                }

                if (!string.IsNullOrEmpty(receiveSound))
                {
                    SonatSystem.GetService<AudioService>().PlaySound(receiveSound);
                }
            }
            catch (Exception e)
            {
            }
        }

        protected override void OnResourceUpdate([Bridge.Ref] GameResourceKey resourceKey)
        {
            if (resourceKey.gameResource != this.resource && resourceKey.gameResource != GameResource.UnlimitedLive &&
                resourceKey.gameResource != GameResource.MAX) return;
            UpdateValueView(true);
        }


        public override void UpdateValueView(bool doCounter = true)
        {
            if (unlimitedLiveData.IsExpired(true))
            {
                normalLives.SetActive(true);
                unlimitedLives.SetActive(false);
                base.UpdateValueView(doCounter);
                if (liveService.Instance.IsFullLives())
                {
                    timeCounterRefill.gameObject.SetActive(false);
                    txtFullLives.gameObject.SetActive(true);
                    blockClick = true;
                    plusObj.gameObject.SetActive(!blockClick);
                }
                else
                {
                    txtFullLives.gameObject.SetActive(false);
                    timeCounterRefill.gameObject.SetActive(true);
                    timeCounterRefill.SetData(liveService.Instance.GetTimeRefillRemain(),
                        () => { SonatUtils.DelayCall(1, () => UpdateValueView(true), this); });
                    blockClick = orgBlockClick;
                    plusObj.gameObject.SetActive(!blockClick);
                }
            }
            else
            {
                normalLives.SetActive(false);
                unlimitedLives.SetActive(true);
                timeCounter.SetData(unlimitedLiveData.GetRemainingTime(), OnFinishUnlimitedLives);
            }
        }

        private void OnFinishUnlimitedLives()
        {
            SonatUtils.DelayCall(1, () => UpdateValueView(), this);
        }
    }
}