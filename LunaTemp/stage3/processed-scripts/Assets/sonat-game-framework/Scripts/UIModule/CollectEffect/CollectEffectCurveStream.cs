using System;
using System.Threading.Tasks;
using DG.Tweening;
using Sonat.Enums;
using SonatFramework.Scripts.Helper;
using SonatFramework.Scripts.UIModule.UIElements;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule.CollectEffect
{
    [CreateAssetMenu(menuName = "Sonat Anims/CollectEffectCurveStream")]
    public class CollectEffectCurveStream : CollectEffectControllerBase
    {
        [SerializeField] private float duration;
        [SerializeField] private float timeGap = 0.15f;
        [SerializeField] private AnimationCurve xCurve, yCurve;
        [SerializeField] private Service<PoolingServiceAsync> poolingService = new Service<PoolingServiceAsync>();
        [SerializeField] private string collectItemName = "UICollectCurveStreamItem";

        public async Task CreateEffect([Bridge.Ref] GameResourceKey resourceKey, [Bridge.Ref] Vector3 startPos, [Bridge.Ref] Vector3 endPos, int number, Action onFinishStep = null,
            Action callback = null)
        {
            for (var i = 0; i < number; i++)
            {
                var effectItem = await poolingService.Instance.CreateAsync<UICollectCurveStreamItem>(
                    collectItemName, startPos,
                    PanelManager.Instance.transform, resourceKey);

                effectItem.transform.DOMoveX(endPos.x, duration).SetEase(xCurve);
                effectItem.transform.DOMoveY(endPos.y, duration).SetEase(yCurve)
                        .onComplete =
                    () =>
                    {
                        onFinishStep?.Invoke();
                        poolingService.Instance.ReturnObj(effectItem);
                    };
                await Task.Delay(TimeSpan.FromSeconds(timeGap));
            }

            await Task.Delay(TimeSpan.FromSeconds(duration));
            //Service<InventoryService>.Get().NotiUpdateResource(gameResource);
            callback?.Invoke();
        }
    }
}