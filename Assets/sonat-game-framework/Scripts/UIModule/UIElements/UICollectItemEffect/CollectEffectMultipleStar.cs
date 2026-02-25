using System;
using System.Threading.Tasks;
using Sonat.Enums;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;
using Random = UnityEngine.Random;

public class CollectEffectMultipleStar : SonatCollectEffect
{
    public string collectEffectName = "CollectResourceMultipleStar";
    public float radius = 0.65f;

    public override async Task Collect(GameResourceKey key, int quantity, Vector3 startPos, Vector3 endPos, Action<int> onFinishStep = null,
        Action callback = null)
    {
        await Spawn(key, quantity, startPos, endPos, onFinishStep, callback);
    }

    private async Task Spawn(GameResourceKey key, int quantity, Vector3 startPos, Vector3 endPos, Action<int> onFinishStep, Action callback)
    {
        for (int i = 0; i < quantity; i++)
        {
            Vector3 ran = Random.insideUnitCircle * radius;
            Vector3 pos = startPos + ran;
            var item = await SonatSystem.GetService<PoolingServiceAsync>().CreateAsync<UICollectEffectItemMultiple>(collectEffectName,
                PanelManager.Instance.transform);
            item.SetIntermediaryPos(pos);
            item.SetData(i, key, quantity, startPos, endPos, onFinishStep);
        }

        callback?.Invoke();
    }
}