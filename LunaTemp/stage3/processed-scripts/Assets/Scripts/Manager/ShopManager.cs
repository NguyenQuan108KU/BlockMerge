using UnityEngine;
using Base.Singleton;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.BoosterManagement;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;

public class ShopManager : SingletonSimple<ShopManager>
{
    protected override void OnAwake() { }

    public bool TryBuyBooster(GameResource boosterType)
    {
        var boosterService = SonatSystem.GetService<SonatBoosterService>();
        if (boosterService == null) return false;

        return boosterService.BuyBooster(boosterType);
    }

    public bool TryBuyHeart(int amount, int price)
    {
        var inventory = SonatSystem.GetService<InventoryService>();
        if (inventory == null) return false;

        var coinKey = GameResource.Coin.ToGameResourceKey();

        if (!inventory.CanReduce(coinKey, price)) return false;

        inventory.SpendResource(coinKey, price, new SpendResourceLogData("heart_refill", "shop"));
        inventory.AddResource(new ResourceData(GameResource.Live, amount), new EarnResourceLogData("heart", "shop"));

        return true;
    }

    public void OnIAPButtonClicked(string packName)
    {
        Debug.Log($"[IAP] User click: {packName}");
    }
}