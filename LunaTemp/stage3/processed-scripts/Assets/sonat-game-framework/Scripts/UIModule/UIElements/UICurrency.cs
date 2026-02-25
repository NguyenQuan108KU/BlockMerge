using System;
using System.Collections;
using DG.Tweening;
using Sonat.Enums;
using SonatFramework.Scripts.Feature.Shop.UI;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Templates.UI.ScriptBase;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace SonatFramework.Scripts.UIModule.UIElements
{
    public class UICurrency : MonoBehaviour
    {
        public GameResource resource;
        public Image icon;
        public TMP_Text txtValue;
        protected int value = -1;
        private bool scaleUp;
        private Coroutine collectAnim;
        public float counterDuration = 0.5f;
        public float scaleSpeed = 3f;
        public float scaleMax = 1.15f;
        [SerializeField] protected bool blockClick;
        public GameObject plusObj;
        protected readonly Service<InventoryService> inventoryService = new Service<InventoryService>();
        [SerializeField] protected ParticleSystem blastEffect;
        //[SerializeField] private SonatCollectEffect collectEffect;

        protected EventBinding<AddResourceVisualEvent> addCurrencyEvent;
        [SerializeField] protected string openPanelName = "ShopPanel";
        [SerializeField] protected string receiveSound;

        protected virtual void Start()
        {
            if (plusObj)
                plusObj.SetActive(!blockClick);
            if (blastEffect)
                blastEffect.gameObject.SetActive(false);
        }

        public virtual void OnEnable()
        {
            UpdateValueView(false);
            addCurrencyEvent = new EventBinding<AddResourceVisualEvent>(OnAddCurrency);
            inventoryService.Instance.OnResourceUpdate += OnResourceUpdate;
        }

        protected virtual void OnDisable()
        {
            EventBus<AddResourceVisualEvent>.Deregister(addCurrencyEvent);
            inventoryService.Instance.OnResourceUpdate -= OnResourceUpdate;
            addCurrencyEvent = null;
            txtValue.DOKill();
        }


        protected virtual void OnAddCurrency([Bridge.Ref] AddResourceVisualEvent eventData)
        {
            if (eventData.key.gameResource != this.resource && eventData.key.gameResource != GameResource.MAX) return;

            if (eventData.collectEffect != null && icon != null)
            {
                eventData.collectEffect.Collect(eventData.key, eventData.visualQuantity, eventData.position, icon.transform.position, OnCollectEffect);
            }
            else
            {
                inventoryService.Instance.ClaimPendingResource(null, resource.ToGameResourceKey());
            }
        }

        protected virtual void OnCollectEffect(int index)
        {
            if (index != 0) return;
            try
            {
                inventoryService.Instance.ClaimPendingResource(null, resource.ToGameResourceKey());
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

        protected virtual void OnResourceUpdate([Bridge.Ref] GameResourceKey resourceKey)
        {
            if (resourceKey.gameResource != this.resource && resourceKey.gameResource != GameResource.MAX) return;
            UpdateValueView(true);
        }


        public virtual void UpdateValueView(bool doCounter = true)
        {
            int oldvalue = this.value;
            value = inventoryService.Instance.GetResource(resource.ToGameResourceKey()).quantity;

            if (value == oldvalue) return;
            if (gameObject.activeInHierarchy && doCounter)
                txtValue.DOCounter(oldvalue, value, counterDuration, addThousandsSeparator: false);
            else
                txtValue.text = value.ToString();
        }


        public void SetBlockClick(bool block)
        {
            this.blockClick = block;
            if (plusObj)
                plusObj.SetActive(!block);
        }

        public virtual void OnClickCurrency()
        {
            if (blockClick) return;
            var uidata = new UIData();
            uidata.Add("OpenBy", "UICurrency");
            PanelManager.Instance.OpenPanelByNameAsync<Panel>(openPanelName);
        }

        public void PlayCollectEffect()
        {
            if (!gameObject.activeInHierarchy) return;
            if (collectAnim != null)
            {
                //StopCoroutine(collectAnim);
                scaleUp = true;
                //blastEffect?.Play();
            }
            else
            {
                collectAnim = StartCoroutine(CollectEffect());
                //blastEffect?.gameObject.SetActive(true);
            }

            if (blastEffect)
            {
                var eff = Instantiate(blastEffect.gameObject, icon.transform);
                eff.gameObject.SetActive(true);
                Destroy(eff, 1.2f);
            }
        }

        IEnumerator CollectEffect()
        {
            scaleUp = true;
            while (icon.transform.localScale.x < scaleMax)
            {
                icon.transform.localScale += Vector3.one * Time.deltaTime * scaleSpeed;
                yield return null;
            }

            //SettingManager.Vibrations(100);
            yield return null;
            scaleUp = false;

            while (icon.transform.localScale.x > 1)
            {
                if (scaleUp)
                {
                    collectAnim = StartCoroutine(CollectEffect());
                    yield break;
                }

                icon.transform.localScale -= Vector3.one * Time.deltaTime * scaleSpeed;
                yield return null;
            }

            icon.transform.localScale = Vector3.one;
            collectAnim = null;
        }
    }
}