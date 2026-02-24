﻿using DG.Tweening;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Scripts.UIModule.CollectEffect;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;

//public class WinPanel : WinPanelBase
//{
//    public override void OnClaimClick()
//    {
//        if (collected) return;
//        collected = true;

//        // 1. Add pending resource TRƯỚC
//        var log = new EarnResourceLogData()
//        {
//            spendType = "win",
//            spendId = "claim"
//        };
//        SonatSystem.GetService<InventoryService>().AddPendingResource("win", data.reward, log);

//        // 2. Gọi claim reward
//        OnClaimReward(claimBtn);
//    }

//    protected override void OnClaimReward(Transform btn)
//    {
//        // Raise event để UICurrency nhận và chạy hiệu ứng
//        EventBus<AddResourceVisualEvent>.Raise(new AddResourceVisualEvent()
//        {
//            source = "win",
//            key = data.reward.Key,
//            position = btn.position,
//            visualQuantity = data.reward.quantity,
//            collectEffect = new CollectEffectMultiple()
//        });

//        // SetUpdate(true) để chạy khi timeScale = 0
//        DOVirtual.DelayedCall(delayToCollect, NextLevel).SetUpdate(true);
//    }
//}


public class WinPanel : WinPanelBase
{
    public override void OnClaimClick()
    {
        if (collected) return;
        collected = true;

        // Cộng tiền TRỰC TIẾP (không qua pending/effect)
        var log = new EarnResourceLogData()
        {
            spendType = "win",
            spendId = "claim"
        };

        SonatSystem.GetService<InventoryService>().AddResource(data.reward, log);

        Debug.Log($"[WinPanel] Added {data.reward.quantity} {data.reward.Key.gameResource}");

        // Next level
        DOVirtual.DelayedCall(delayToCollect, NextLevel).SetUpdate(true);
    }
}
