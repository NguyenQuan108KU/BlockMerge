using System;
using Cysharp.Threading.Tasks;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule.UIElements.UICollectItemEffect
{
    public class CollectEffectSingle : SonatCollectEffect
    {
        public string collectEffectName = "CollectResourceSingleItem";

        public override async UniTask Collect([Bridge.Ref] GameResourceKey key, int quantity, [Bridge.Ref] Vector3 startPos, [Bridge.Ref] Vector3 endPos, Action<int> onFinishStep, Action callback)
        {
            var collectEffectItem = await SonatSystem.GetService<PoolingServiceAsync>().CreateAsync<UICollectEffectItem>(collectEffectName,
                PanelManager.Instance.transform);
            collectEffectItem.SetData(0, key, quantity, startPos, endPos, (index) =>
            {
                onFinishStep?.Invoke(0);
                callback?.Invoke();
            });
        }
    }
}