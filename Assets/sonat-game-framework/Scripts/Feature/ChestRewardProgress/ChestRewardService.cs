using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SonatFramework.Systems;
using SonatFramework.Scripts.Feature;
using SonatFramework.Systems.EventBus;
using System;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.GameDataManagement;
using Sonat.Enums;
using System.Threading.Tasks;

[CreateAssetMenu(fileName = "ChestRewardService", menuName = "Sonat Services/Chest Reward Service")]
public class ChestRewardService : SonatServiceSo, IServiceInitializeAsync
{
    public ChestRewardProgressConfig configs;
    public ChestRewardProgressData data;
    private readonly Service<InventoryService> inventory = new Service<InventoryService>();
    private readonly Service<DataService> dataService = new Service<DataService>();
    private string dataKey = "ChestRewardService_Data";
    private string configKey = "ChestRewardService_Config";

    #region SonatFeature

    private ChestConfig chestClaimed;
    private ChestConfig chestConfig;
    private bool canStartChest;

    public async Task InitializeAsync()
    {
        await LoadData();
        await LoadConfig();
        var onlevelEndEvent = new EventBinding<LevelEndedEvent>(OnLevelEnd);
    }

    protected Task LoadData()
    {
        data = dataService.Instance.GetData<ChestRewardProgressData>(dataKey);
        if (data == null)
        {
            data = new ChestRewardProgressData();
            data.currentChestIndex = 0;
            data.currentProgress = 0;
        }

        return Task.FromResult(0);
    }

    protected async Task LoadConfig()
    {
        //configs = await loadObjectServiceAsync.LoadAsync<ChestRewardProgressConfig>(configKey);
        chestConfig = configs.GetChestRewardData(data.currentChestIndex);
    }

    protected void SaveData()
    {
        dataService.Instance.SetData(dataKey, data);
    }

    #endregion

    private void OnLevelEnd(LevelEndedEvent eventData)
    {
        if (!IsValidForProgression(eventData.success, eventData.gameMode)) return;

        canStartChest = eventData.level >= configs.levelStart;
        if (!CanStartChest()) return;

        UpdateProgress();
    }

    public bool CanStartChest()
    {
        return canStartChest;
    }

    private bool IsValidForProgression(bool isWin, GameMode mode)
    {
        return isWin && mode == GameMode.Classic && chestConfig != null;
    }

    public void UpdateProgress()
    {
        data.currentProgress++;
        if (data.currentProgress >= chestConfig.levelRequired) ProcessCompletedChest();
        SaveData();
    }


    private void ProcessCompletedChest()
    {
        data.currentProgress = 0;
        data.currentChestIndex++;
        var log = new EarnResourceLogData
        {
            spendType = "feature",
            spendId = "chest_progress",
            source = "non_iap"
        };

        SonatSystem.GetService<InventoryService>().AddPendingReward("chest_progress", chestConfig.reward, log);
        chestClaimed = chestConfig;
        chestConfig = configs.GetChestRewardData(data.currentChestIndex);
    }

    public void OnUIClaimReward()
    {
        chestClaimed = null;
    }

    public ChestConfig GetChestClaimed()
    {
        return chestClaimed;
    }

    public ChestConfig GetChestConfig()
    {
        return chestConfig;
    }
}