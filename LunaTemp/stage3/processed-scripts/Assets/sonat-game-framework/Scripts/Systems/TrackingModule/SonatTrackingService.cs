#if sonat_sdk
using Sonat;
#endif
using Sonat.Enums;
#if sonat_sdk_v2
using Sonat.TrackingModule;
#endif
using SonatFramework.Scripts.Helper;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems.EventBus;
using UnityEngine;

namespace SonatFramework.Systems.TrackingModule
{
    [CreateAssetMenu(fileName = "SonatTrackingService", menuName = "Sonat Services/Tracking Service")]
    public class SonatTrackingService : TrackingService, IServiceInitialize
    {
        [SerializeField] protected Service<GameplayAnalyticsService> gameplayAnalytics = new SonatFramework.Systems.Service<SonatFramework.Systems.TrackingModule.GameplayAnalyticsService>();

        public virtual void Initialize()
        {
            new EventBinding<LevelStartedEvent>(OnStartLevel);
            new EventBinding<LevelEndedEvent>(OnEndLevel);
            new EventBinding<LevelStuckEvent>(OnLevelStuck);
            new EventBinding<LevelContinueEvent>(OnPlayContinue);
            new EventBinding<PhaseStartedEvent>(OnStartPhase);
            new EventBinding<UseBoosterEvent>(OnUseBooster);
            new EventBinding<EarnResourceEvent>(LogEarnCurrency);
            new EventBinding<SpendResourceEvent>(LogSpendCurrency);

            new EventBinding<UpdatePlacementEvent>(OnUpdatePlacement);
            new EventBinding<UpdateScreenEvent>(OnUpdateScreen);
            new EventBinding<SwitchPlacementEvent>(OnSwitchPlacement);
            new EventBinding<ClickShortcutEvent>(OnClickShortcut);
            new EventBinding<LevelQuitEvent>(OnLevelQuit);
        }

        protected virtual void OnUpdatePlacement([Bridge.Ref] UpdatePlacementEvent eventData)
        {
            this.placement = eventData.placement;
        }

        protected virtual void OnUpdateScreen([Bridge.Ref] UpdateScreenEvent eventData)
        {
            this.screen = eventData.screen;
        }

        protected virtual void OnSwitchPlacement([Bridge.Ref] SwitchPlacementEvent eventData)
        {
            switch (eventData.to)
            {
                case GamePlacement.Gameplay:
                    this.location = "IG";
                    break;
                case GamePlacement.Home:
                    this.location = "OG";
                    break;
                default:
                    this.location = "IG";
                    break;
            }
        }

        public override void OnShowPopup(string uiName, string uiType, string uiClass, string openBy, string action = "open")
        {
#if sonat_sdk
            var log = new SonatLogShowUi()
            {
                level = GetLevelLog(),
                location = this.location,
                placement = this.placement,
                screen = this.screen,
                ui_name = uiName,
                ui_type = uiType,
                ui_class = uiClass,
                open_by = openBy,
                action = action,
            };
            log.Post();
#endif
        }

        public override void TrackingScreenView()
        {
#if sonat_sdk
            var log = new SonatLogScreenView()
            {
                screen_name = $"{location}:{screen}:{placement}",
                level = GetLevelLog()
            };

            log.AddExtendedParameter("location", this.location);
            log.AddExtendedParameter("placement", this.placement);
            log.AddExtendedParameter("screen", this.screen);
            log.Post();
#endif
        }


        protected virtual void OnStartLevel([Bridge.Ref] LevelStartedEvent eventData)
        {
            SonatUtils.ExecuteNextFrame(LogLevelStart);
        }

        protected virtual void OnStartPhase([Bridge.Ref] PhaseStartedEvent eventData)
        {
        }

        protected virtual void OnEndLevel([Bridge.Ref] LevelEndedEvent eventData)
        {
            if (eventData.success == false) return;

            SonatUtils.ExecuteNextFrame(() =>
            {
                LogLevelEnd();
#if !sonat_sdk_v2
                int level = eventData.level;
                if ((level <= 30 || (level <= 100 && level % 10 == 0)))
                {
                    LogLevelComplete(level);
                }
#endif
            });
        }


        protected virtual void OnLevelStuck([Bridge.Ref] LevelStuckEvent eventData)
        {
            SonatUtils.ExecuteNextFrame(LogLevelEnd);
        }

        protected virtual void OnLevelQuit([Bridge.Ref] LevelQuitEvent eventData)
        {
            SonatUtils.ExecuteNextFrame(LogLevelEnd);
        }

        protected virtual void OnPlayContinue([Bridge.Ref] LevelContinueEvent eventData)
        {
            SonatUtils.ExecuteNextFrame(LogLevelStart);
        }

        protected virtual void OnUseBooster([Bridge.Ref] UseBoosterEvent eventData)
        {
            SonatUtils.ExecuteNextFrame(() => { LogUseBooster(eventData.booster.ToString()); });
        }

        protected virtual void OnClickShortcut([Bridge.Ref] ClickShortcutEvent eventData)
        {
#if sonat_sdk
            new SonatLogClickIconShortcut()
            {
                shortcut = eventData.shortcut,
                location = location,
                screen = screen,
                placement = placement
            }.Post();
#endif
        }


        public override void LogShowAds()
        {
            IntDataPref showAdsCount = new IntDataPref("SHOW_ADS_COUNT");
            showAdsCount.Value++;

            if (showAdsCount.Value == 1)
            {
                //SendEventAF("paid_ad_impression");
                SonatSDKAdapter.SendEventFireBase("paid_ad_impression");
            }
            else if (showAdsCount.Value <= 50 && showAdsCount.Value % 5 == 0)
            {
                //SendEventAF($"paid_ad_{showVideoCount}_impression");
                SonatSDKAdapter.SendEventFireBase($"paid_ad_{showAdsCount.Value:D2}_impression");
            }
        }


        public override void LogShowRewardAds()
        {
#if !sonat_sdk_v2
            IntDataPref ShowRWCount = new IntDataPref("SHOW_REWARD_COUNT");
            ShowRWCount.Value++;
            if (ShowRWCount.Value == 1)
            {
                SonatSDKAdapter.SendEventFireBase("complete_rwd");
            }
            else if (ShowRWCount.Value <= 15)
            {
                SonatSDKAdapter.SendEventFireBase($"complete_rwd_{ShowRWCount:D2}");
            }

            LogShowAds();
#endif
        }

        public override void LogShowInterAds()
        {
#if !sonat_sdk_v2
            IntDataPref showRWCount = new IntDataPref("SHOW_In_COUNT");
            showRWCount.Value++;
            if (showRWCount.Value == 1)
            {
                SonatSDKAdapter.SendEventFireBase("complete_rwd");
            }
            else if (showRWCount.Value <= 15)
            {
                SonatSDKAdapter.SendEventFireBase($"complete_rwd_{showRWCount:D2}");
                //if (ShowRWCount.Value == 7 && GameManager.DayPlay() == 0)
                //{
                //	SendEventFireBase($"complete_rwd_07_D0");
                //}
            }
#endif
        }

        public override void LogLevelComplete(int level)
        {
            SonatSDKAdapter.SendEventFireBase($"complete_level_{level:D3}");
        }

        public override void LogLevelStart()
        {
#if sonat_sdk
            new SonatLogLevelStart()
            {
                mode = GetGameModeLog(),
                level = GetLevelLog(),
                is_first_play = gameplayAnalytics.Instance.levelPlayData.isFirstPlay,
                continue_with = gameplayAnalytics.Instance.levelPlayData.continueWith,
                start_count = gameplayAnalytics.Instance.levelPlayData.startCount
            }.Post(true);
#endif
        }

        public override void LogLevelEnd()
        {
#if sonat_sdk
            new SonatLogLevelEnd()
            {
                level = GetLevelLog(),
                mode = GetGameModeLog(),
                use_booster_count = gameplayAnalytics.Instance.levelPlayData.useBoosterCount,
                play_time = (int)gameplayAnalytics.Instance.levelPlayData.FullTimePlayLevel,
                move_count = gameplayAnalytics.Instance.levelPlayData.moveCount,
                is_first_play = gameplayAnalytics.Instance.levelPlayData.isFirstPlay,
                lose_cause = gameplayAnalytics.Instance.levelPlayData.loseCause,
                success = gameplayAnalytics.Instance.levelPlayData.isWin,
                continue_with = gameplayAnalytics.Instance.levelPlayData.continueWith,
                start_count = gameplayAnalytics.Instance.levelPlayData.startCount,
            }.Post();
#endif
        }

        public override void LogLevelUp()
        {
#if sonat_sdk
            new SonatLogLevelUp()
            {
                level = GetLevelLog(),
            }.Post(false);
#endif
        }

        public override void LogUseBooster(string boosterName)
        {
#if sonat_sdk
            new SonatLogUseBooster()
            {
                mode = GetGameModeLog(),
                level = GetLevelLog(),
                name = boosterName.ToLower()
            }.Post(true);
#endif
        }

        public override void LogShortcut(string shortcutName)
        {
#if sonat_sdk
            new SonatLogClickIconShortcut()
            {
                shortcut = shortcutName,
                placement = placement,
                location = location,
                screen = screen
            }.Post();
#endif
        }

        public override void LogEarnCurrency([Bridge.Ref] EarnResourceEvent eventData)
        {
#if sonat_sdk
            new SonatLogEarnVirtualCurrency()
            {
                virtual_currency_name = eventData.resource.gameResource.ToLogString(),
                value = eventData.value,
                virtual_currency_type = eventData.resource.ToLogString(),
                spend_item_type = eventData.spendType.ToLogString(),
                spend_item_id = eventData.spendId.ToLogString(),
                level = GetLevelLog(),
                source = eventData.source.ToLogString(),
                is_first_buy = eventData.isFirstBuy,
                mode = GetGameModeLog(),
                placement = placement,
                location = location,
                screen = screen
            }.Post();
#endif
        }

        public override void LogSpendCurrency([Bridge.Ref] SpendResourceEvent eventData)
        {
#if sonat_sdk
            new SonatLogSpendVirtualCurrency()
            {
                virtual_currency_name = eventData.resource.ToLogString(),
                virtual_currency_type = eventData.resource.gameResource.ResourceType().ToLogString(),
                value = eventData.value,
                earn_item_type = eventData.earnType.ToLogString(),
                earn_item_id = eventData.earnId.ToLogString(),
                level = GetLevelLog(),
                mode = GetGameModeLog(),
                placement = placement,
                location = location,
                screen = screen
            }.Post();
#endif
        }

        public void LogTutorialBegin(string placement, int step, int tutorialId)
        {
#if sonat_sdk
            var log = new SonatLogTutorialBegin(placement, step);
            log.AddExtendedParameter("tutorial_id", tutorialId.ToString());
            log.Post();
#endif
        }

        public void LogTutorialComplete(string placement, int step, int tutorialId)
        {
#if sonat_sdk
            var log = new SonatLogTutorialComplete(placement, step);
            log.AddExtendedParameter("tutorial_id", tutorialId.ToString());
            log.Post();
#endif
        }

        protected virtual int GetLevelLog()
        {
            int level = gameplayAnalytics.Instance.levelPlayData.level;
            return level;
        }

        protected virtual string GetGameModeLog()
        {
            GameMode gameMode = gameplayAnalytics.Instance.levelPlayData.gameMode;
            return SonatUtils.ConvertToLogParam(gameMode.ToString());
        }
    }
}