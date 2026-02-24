using System.Collections.Generic;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.GameDataManagement;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.UserData;
using UnityEngine;

namespace SonatFramework.Systems.BoosterManagement
{
    [CreateAssetMenu(fileName = "SonatBoosterService", menuName = "Sonat Services/Booster Service")]
    public class SonatBoosterService : BoosterService, IServiceWaitingSDKInitialize
    {
        #region Services

        [BoxGroup("SERVICES")] [Required] [SerializeField]
        private Service<InventoryService> inventoryService = new();

        [BoxGroup("SERVICES")] [Required] [SerializeField]
        private Service<DataService> dataService = new();

        private Service<UserDataService> userDataService = new();

        #endregion

        [BoxGroup("CONFIGS", true)] [SerializeField]
        private BoostersConfig boostersConfig;

        private readonly Dictionary<GameResource, BoosterData> boostersData = new();

        private string configKey;
        private bool allBoosterUnlocked = false;

        private readonly Dictionary<GameResource, BoosterConfig> configs = new();


        public void OnSonatSDKInitialize()
        {
            int level = userDataService.Instance.GetLevel();
            allBoosterUnlocked = true;
            foreach (var boosterConfig in boostersConfig.configs)
            {
                GetBoosterConfig(boosterConfig.booster);
                boosterConfig.levelUnlock = SonatSDKAdapter.GetRemoteInt($"level_unlock_{boosterConfig.booster}", boosterConfig.levelUnlock);

                var boosterData = new BoosterData(boosterConfig.booster)
                {
                    unlocked = dataService.Instance.GetBool($"{boosterConfig.booster}_DATA", false),
                    //quantity = inventoryService.Instance.GetResource(boosterConfig.booster.ToGameResourceKey()).quantity
                };
                boostersData.Add(boosterConfig.booster, boosterData);
                if (!boosterData.unlocked)
                {
                    if (boosterConfig.levelUnlock < level)
                    {
                        UnlockBooster(boosterData.boosterType);
                        inventoryService.Instance.ClaimPendingResource("unlock_booster", boosterConfig.booster.ToGameResourceKey());
                    }
                    else
                    {
                        allBoosterUnlocked = false;
                    }
                }
            }

            new EventBinding<LevelStartedEvent>(OnLevelStarted);
        }

        #region EventHandle

        private void OnLevelStarted(LevelStartedEvent levelStartedEvent)
        {
            if (allBoosterUnlocked || levelStartedEvent.gameMode != GameMode.Classic) return;
            allBoosterUnlocked = true;
            foreach (var data in boostersData)
            {
                if (!data.Value.unlocked)
                {
                    if (configs[data.Key].levelUnlock == levelStartedEvent.level)
                    {
                        UnlockBooster(data.Value.boosterType);
                    }
                    else
                    {
                        allBoosterUnlocked = false;
                    }
                }
            }
        }

        #endregion

        public override BoosterConfig GetBoosterConfig(GameResource boosterType)
        {
            if (configs.TryGetValue(boosterType, out var config)) return config;
            var defaultConfig = boostersConfig.configs.Find(e => e.booster == boosterType);
            config = SonatSDKAdapter.GetRemoteConfig($"{boosterType}_config", defaultConfig);
            configs.Add(boosterType, config);
            return config;
        }

        public override bool BuyBooster(GameResource boosterType)
        {
            var config = GetBoosterConfig(boosterType);
            if (!inventoryService.Instance.CanReduce(config.price)) return false;
            var logSpend = new SpendResourceLogData
            {
                earnType = boosterType.ResourceType().ToLogString(),
                earnId = boosterType.ToLogString(),
                source = "non_iap"
            };

            inventoryService.Instance.SpendCurrency(config.price, logSpend);

            var logEarn = new EarnResourceLogData()
            {
                spendType = config.price.currency.ResourceType().ToLogString(),
                spendId = config.price.currency.ToLogString(),
                source = "non_iap"
            };

            inventoryService.Instance.AddPendingResource("buy_booster", new ResourceData(boosterType, config.packValue), logEarn);
            return true;
        }


        public override bool IsBoosterUnlock(GameResource booster)
        {
            return GetBoosterData(booster).unlocked;
        }

        public override void UnlockBooster(GameResource boosterType)
        {
            dataService.Instance.SetBool($"{boosterType}_DATA", true);
            boostersData[boosterType].unlocked = true;
            BoosterConfig config = GetBoosterConfig(boosterType);

            var logData = new EarnResourceLogData()
            {
                spendType = "unlock",
                spendId = "unlock",
            };

            if (config.levelUnlock == 0)
            {
                inventoryService.Instance.AddResource(new ResourceData(boosterType, config.defaultValue), logData);
            }
            else
            {
                inventoryService.Instance.AddPendingResource("unlock_booster", new ResourceData(boosterType, config.defaultValue), logData);
            }

            onUnlockBooster?.Invoke(boosterType);
        }


        public override BoosterData GetBoosterData(GameResource boosterType)
        {
            if (boostersData.TryGetValue(boosterType, out var data)) return data;
            data = new BoosterData(boosterType)
            {
                unlocked = dataService.Instance.GetBool($"{boosterType}_DATA", false),
            };
            boostersData.Add(boosterType, data);
            return data;
        }


        public override bool CanUseBooster(GameResource boosterType)
        {
            if (!IsBoosterUnlock(boosterType)) return false;
            return inventoryService.Instance.CanReduce(boosterType.ToGameResourceKey(), 1);
        }


        public override void UseBoosterSuccess(GameResource boosterType)
        {
            var logSpend = new SpendResourceLogData
            {
                earnType = "_",
                earnId = "_",
                source = "non_iap"
            };
            inventoryService.Instance.SpendResource(boosterType.ToGameResourceKey(), 1, logSpend);
            EventBus<UseBoosterEvent>.Raise(new UseBoosterEvent() { booster = boosterType });
        }

        public override InventoryService InventoryService => inventoryService.Instance;
    }


    public class BoosterData
    {
        public GameResource boosterType;
        public bool unlocked;
        public ResourceData resourceData;

        public BoosterData(GameResource boosterType)
        {
            this.boosterType = boosterType;
            resourceData = SonatSystem.GetService<InventoryService>().GetResource(boosterType.ToGameResourceKey());
        }
    }
}