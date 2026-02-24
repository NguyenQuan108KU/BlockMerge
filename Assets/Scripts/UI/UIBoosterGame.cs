//using Cysharp.Threading.Tasks;
//using Sonat.Enums;
//using SonatFramework.Scripts.UIModule;
//using SonatFramework.Systems;
//using SonatFramework.Systems.BoosterManagement;
//using SonatFramework.Systems.EventBus;
//using SonatFramework.Systems.InventoryManagement.GameResources;
//using SonatFramework.Systems.UserData;

//namespace Booster.UI
//{
//    public class UIBoosterGame : UIBoosterBase
//    {
//        private EventBinding<LevelStartedEvent> _levelStartedBinding;

//        protected override void OnEnable()
//        {
//            base.OnEnable();
//            _levelStartedBinding = new EventBinding<LevelStartedEvent>(OnLevelStarted);
//            TryUnlockBooster();
//        }

//        protected override void OnDisable()
//        {
//            base.OnDisable();
//            _levelStartedBinding?.Dispose();
//        }

//        private void OnLevelStarted(LevelStartedEvent e)
//        {
//            TryUnlockBooster();
//        }

//        private void TryUnlockBooster()
//        {
//            if (boosterData == null || config == null) return;
//            if (boosterData.unlocked) return;

//            var userDataService = SonatSystem.GetService<UserDataService>();
//            int currentLevel = userDataService?.GetLevel(GameMode.Classic) ?? 1;

//            if (currentLevel < config.levelUnlock) return;

//            // Unlock data + tặng booster (pending)
//            boosterService.Instance.UnlockBooster(boosterType);

//            // Check tutorial đã xem chưa
//            if (!PopupBoosterTutorial.HasSeenTutorial(boosterType))
//            {
//                OpenTutorialPopup();
//            }
//            else
//            {
//                CompleteUnlock();
//            }
//        }

//        private void OpenTutorialPopup()
//        {
//            var uiData = new UIData();
//            uiData.Add("on_close", (System.Action)OnTutorialClosed);

//            switch (boosterType)
//            {
//                case GameResource.Clock:
//                    PanelManager.Instance.OpenForget<PopupUseFreeze>(uiData);
//                    break;
//                case GameResource.Undo:
//                    PanelManager.Instance.OpenForget<PopupUseUndo>(uiData);
//                    break;
//                case GameResource.Hammer:
//                    PanelManager.Instance.OpenForget<PopupUseHammer>(uiData);
//                    break;
//                case GameResource.Flood:
//                    PanelManager.Instance.OpenForget<PopupUseBlock>(uiData);
//                    break;
//            }
//        }

//        private void OnTutorialClosed()
//        {
//            PopupBoosterTutorial.SaveTutorialSeen(boosterType);
//            CompleteUnlock();
//        }

//        private void CompleteUnlock()
//        {
//            // Claim pending resource
//            boosterService.Instance.InventoryService.ClaimPendingResource(
//                "unlock_booster",
//                boosterType.ToGameResourceKey()
//            );

//            // Refresh data + UI
//            boosterData = boosterService.Instance.GetBoosterData(boosterType);
//            UpdateLockVisual(true);
//            UpdateData();
//        }

//        protected override void UpdateData()
//        {
//            boosterData = boosterService.Instance.GetBoosterData(boosterType);

//            if (txtQuantity != null)
//                txtQuantity.text = boosterData.resourceData.quantity.ToString();

//            if (priceObj != null)
//                priceObj.SetActive(boosterData.resourceData.quantity <= 0);
//        }

//        public override void UseBooster()
//        {
//            base.UseBooster();
//            ExecuteBooster().Forget();
//        }

//        private async UniTaskVoid ExecuteBooster()
//        {
//            bool success = await BoosterManager.Instance.ExecuteBoosterLogic(boosterType);

//            if (success)
//                OnUseBoosterSuccess();
//            else
//                usingBooster = false;
//        }
//    }
//}