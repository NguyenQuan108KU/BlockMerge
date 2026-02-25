using Cysharp.Threading.Tasks;
using Sonat.Enums;
using SonatFramework.Scripts.Feature.Shop.UI;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Templates.UI.ScriptBase;
using UnityEngine;

public class PopupBuyBooster : PopupBuyBoosterBase
{
    public override void OnBuyWithCoinClick()
    {
        if (boosterService.Instance.BuyBooster(boosterConfig.booster))
        {
            var inventory = SonatSystem.GetService<InventoryService>();
            var boosterKey = boosterConfig.booster.ToGameResourceKey();
            inventory.ClaimPendingResource("buy_booster", boosterKey);

            UpdateBoosterVisual();
            Close();
        }
        else
        {
            PanelManager.Instance.OpenPanelByNameAsync<ShopPanelBase>("ShopPanel").Forget();
        }
    }
}