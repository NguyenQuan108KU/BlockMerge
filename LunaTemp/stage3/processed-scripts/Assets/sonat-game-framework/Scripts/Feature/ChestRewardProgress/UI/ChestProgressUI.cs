using System;
using System.Collections;
using DG.Tweening;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using UnityEngine;
using UnityEngine.UI;

namespace SonatFramework.Scripts.Feature.ChestRewardProgress
{
    public abstract class ChestProgressUI : MonoBehaviour
    {
        [Header("Progress Bar")] [SerializeField]
        private UIProgressBar uIProgressBar;

        [SerializeField] private ChestDisplayUIController chestDisplayUIController;
        [SerializeField] private Button btnClaim;

        [SerializeField] private bool playOnEnable = true;
        [SerializeField] private float delayToSlide = 0.5f;
        [SerializeField] private float slideDuration = 0.15f;

        [Header("Block")] [SerializeField] private GameObject objBlock;

        private readonly Service<ChestRewardService> chestRewardService = new SonatFramework.Systems.Service<ChestRewardService>();
        private ChestConfig chestClaimed;
        private ChestConfig chestConfig;
        private ChestRewardProgressData data;

        protected virtual void OnEnable()
        {
            LoadData();
            objBlock.gameObject.SetActive(false);
            if (playOnEnable) Play();
        }

        protected virtual void LoadData()
        {
            chestConfig = chestRewardService.Instance.GetChestConfig();
            chestClaimed = chestRewardService.Instance.GetChestClaimed();
            data = chestRewardService.Instance.data;
        }

        public void Play()
        {
            SetProgressValue();

            if (!chestRewardService.Instance.CanStartChest()) return;
            if (uIProgressBar.CheckPreFull())
            {
                objBlock.gameObject.SetActive(true);
            }

            DOVirtual.DelayedCall(delayToSlide, UpdateProgress);
        }

        protected virtual void SetProgressValue()
        {
            if (data.currentProgress == 0)
            {
                if (data.currentChestIndex == 0)
                {
                    uIProgressBar.SetData(0, chestConfig.levelRequired);
                }
                else
                {
                    uIProgressBar.SetData(chestClaimed.levelRequired - 1, chestClaimed.levelRequired);
                }
            }
            else
                uIProgressBar.SetData(data.currentProgress - 1, chestConfig.levelRequired);
        }

        protected virtual void UpdateProgress()
        {
            uIProgressBar.AddValue(1);
            if (uIProgressBar.IsFull)
            {
                objBlock.gameObject.SetActive(true);
                OpenChest();
            }
        }

        protected abstract void OpenChest();

       

        public virtual void OnChestClaimed()
        {
            chestDisplayUIController.UpdateChestState(ChestState.Opened);
            objBlock.gameObject.SetActive(false);
        }

#if UNITY_EDITOR
        [Button("Add Chest")]
        private void AddChest()
        {
            var chestRewardService = SonatSystem.GetService<ChestRewardService>();
            chestRewardService.UpdateProgress();
            LoadData();
            UpdateProgress();
        }
#endif
    }
}