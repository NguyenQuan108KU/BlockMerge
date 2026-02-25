using System;
using System.Collections;
using System.Threading;
using System.Threading.Tasks;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.UserData;
using SonatFramework.Templates.UI.ScriptBase;
using UnityEngine;

namespace SonatFramework.Systems.AdsBreakManagement
{
    [CreateAssetMenu(fileName = "AdsBreakService", menuName = "Sonat Services/AdsBreak Service")]
    public class AdsBreakService : SonatServiceSo, IServiceInitialize
    {
        private int time;
        private int levelStartAdBreak;
        private int stateStartAdBreak;

        PopupAdsBreakBase _popupAdBreakBase;
        PopupWaitAdsBreakBase popupWaitAdBreak;
        private bool ready = true;
        private bool countDone;
        private MonoBehaviour adsBreakController;
        [SerializeField] [Required] private AdsBreakConfig config;
        private CancellationTokenSource cts;

        public void Initialize()
        {
            adsBreakController = new GameObject("AdsBreakController").AddComponent<DontDestroyOnLoadObject>();

            time = SonatSDKAdapter.GetRemoteInt("time_ad_break", config.timeGap);
            levelStartAdBreak = SonatSDKAdapter.GetRemoteInt("level_start_ad_break", config.levelStartAdBreak);

            new EventBinding<LevelStartedEvent>(OnStartLevel);
            new EventBinding<LevelStuckEvent>(OnLevelStuck);
            new EventBinding<LevelEndedEvent>(OnLevelEnd);
            new EventBinding<SwitchPlacementEvent>(OnSwitchPlacement);
        }

        public void OnStartLevel(LevelStartedEvent eventData)
        {
            if (eventData.level >= levelStartAdBreak)
            {
                StartWaitAdBreak();
            }
            else
            {
                StopWaitAdBreak();
            }
        }

        private void OnLevelEnd(LevelEndedEvent eventData)
        {
            StopWaitAdBreak();
        }

        private void OnLevelStuck(LevelStuckEvent eventData)
        {
            StopWaitAdBreak();
        }

        public void OnSwitchPlacement(SwitchPlacementEvent eventData)
        {
            if (eventData.to != GamePlacement.Gameplay)
            {
                StopWaitAdBreak();
            }
        }

        public void OnActionToShow()
        {
            if (countDone)
            {
                ready = true;
            }
        }


        public void StartWaitAdBreak()
        {
            if (SonatSDKAdapter.IsNoads()) return;
            StopWaitAdBreak();
            ready = true;
            countDone = false;
            cts = new CancellationTokenSource();
            WaitForAdsBreak();
        }

        public void StopWaitAdBreak()
        {
            if (cts != null)
            {
                cts.Cancel();
                cts.Dispose();
                if (popupWaitAdBreak)
                {
                    popupWaitAdBreak.Close();
                    popupWaitAdBreak = null;
                }
            }
        }

        private void OnShowAdsDone()
        {
            _popupAdBreakBase?.Close();
            _popupAdBreakBase = null;
            //GameManager.instance.ClaimAdBreakCoin("ad_break");

            //if (LoadingTransition.Instance != null)
            //LoadingTransition.Instance.showLoadingAds = true;

            StartWaitAdBreak();
        }

        protected virtual async Task WaitForAdsBreak()
        {
            await Task.Delay(TimeSpan.FromSeconds(time - 1), cancellationToken: cts.Token);
            if (!SonatSDKAdapter.CanShowInterAds())
            {
                StartWaitAdBreak();
                return;
            }

            popupWaitAdBreak = await PanelManager.Instance.OpenPanelByNameAsync<PopupWaitAdsBreakBase>("PopupWaitAdsBreak");
            await Task.Delay(TimeSpan.FromSeconds(5), cancellationToken: cts.Token);
            countDone = true;

            await Task.Delay(TimeSpan.FromSeconds(0.3f), cancellationToken: cts.Token);
            //await Task.WaitUntil(() => ready == true, cancellationToken: cts.Token);
            await Task.Delay(TimeSpan.FromSeconds(0.55f), cancellationToken: cts.Token);

            popupWaitAdBreak.Close();
            popupWaitAdBreak = null;


            _popupAdBreakBase = await PanelManager.Instance.OpenPanelByNameAsync<PopupAdsBreakBase>("PopupAdsBreak");

            await Task.Delay(TimeSpan.FromSeconds(1.5f), cancellationToken: cts.Token);

            SonatSDKAdapter.ShowInterAds("ad_break", OnShowAdsDone);
        }
    }
}