using System.Collections;
using Sonat.Enums;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using UnityEngine;

namespace SonatFramework.Scripts.Feature.ChestRewardProgress
{
    [RequireComponent(typeof(RectTransform))]
    public class ChestDisplayUIController : MonoBehaviour
    {
        [SerializeField] private ChestAnimationInterface chestAnim;
        [SerializeField] private ChestState currentState = ChestState.Locked;
        [SerializeField] private AudioId chestAppearSound;
        [SerializeField] private float timeDelaySoundAppear = 1;

        private void Awake()
        {
            UpdateChestState(currentState);
            SonatUtils.DelayCall(timeDelaySoundAppear, () => SonatSystem.GetService<AudioService>().PlaySound(chestAppearSound), this);
        }

        private void OnDestroy()
        {
            chestAnim?.Cleanup();
        }

        public void UpdateChestState(ChestState newState)
        {
            currentState = newState;
            chestAnim?.SetChestState(newState);

            switch (newState)
            {
                case ChestState.Locked:
                    chestAnim?.PlayIdleAnimation();
                    break;
                case ChestState.Opening:
                    chestAnim?.PlayOpenAnimation();
                    break;
                case ChestState.Opened:
                    chestAnim?.PlayIdleOpenAnimation();
                    break;
            }
        }
    }
}