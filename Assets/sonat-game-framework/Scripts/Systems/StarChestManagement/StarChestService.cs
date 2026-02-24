using System;
using System.Collections;
using System.Collections.Generic;
using Sonat;
using Sonat.Enums;
using SonatFramework.Scripts.Helper;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using Unity.VisualScripting;
using UnityEngine;

[CreateAssetMenu(fileName = "StarChestService", menuName = "Sonat Services/Star Chest Service")]
public class StarChestService : SonatServiceSo, IServiceInitialize
{
    private ComboServiceTime comboServiceTime;
    private InventoryService inventoryService;
    private int combo;
    private int star;
    protected IntDataPref currentStarMilestone = new IntDataPref("CurrentStarMilestone");
    [SerializeField] protected StarChestConfig starChestConfig;
    public StarChest CurrentChest => starChestConfig.GetStarChest(currentStarMilestone.Value);
    [SerializeField] private List<int> starByCombo = new List<int>();

    public int Star => star;
    private int multiplier = 1;
    internal Action<int> onMultiplierChanged;
    public Action<Vector3, int> onCollectStarInGame;

    public void Initialize()
    {
        comboServiceTime = SonatSystem.GetService<ComboServiceTime>();
        inventoryService = SonatSystem.GetService<InventoryService>();
        comboServiceTime.OnComboChange += OnComboChange;
        new EventBinding<LevelStartedEvent>(OnLevelStarted);
        new EventBinding<LevelEndedEvent>(OnLevelEnded);
    }

    private void OnComboChange()
    {
        combo = comboServiceTime.Combo;
    }

    public int StarByCombo()
    {
        if (combo - 1 >= starByCombo.Count) return starByCombo[^1];
        return starByCombo[combo - 1];
    }

    public void CollectStarInGame(Vector3 position)
    {
        int starAdd = StarByCombo() * multiplier;
        star += starAdd;
        onCollectStarInGame?.Invoke(position, starAdd);
    }

    protected void OnLevelStarted(LevelStartedEvent levelStartedEvent)
    {
        star = 0;
        combo = comboServiceTime.Combo;
    }

    protected void OnLevelEnded(LevelEndedEvent eventData)
    {
        if (eventData.success)
        {
            var log = new EarnResourceLogData()
            {
                spendType = "win",
                spendId = "win"
            };
            
            inventoryService.AddPendingResource("win", new ResourceData(GameResource.Star, Star), log);
        }
    }

    public void NextStarChest()
    {
        currentStarMilestone.Value++;
    }

    public void SetMultiplier(int multiplier)
    {
        this.multiplier = multiplier;
        onMultiplierChanged?.Invoke(multiplier);
    }

    public RewardData GetCurrentReward()
    {
        return CurrentChest.reward;
    }
}