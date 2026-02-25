using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule.CollectEffect
{
    public class EffectPoolBase : MonoBehaviour, IPoolingObject
    {
        public float timeLive = 0;

        public virtual void Setup()
        {
        }

        public virtual void OnCreateObj(params object[] args)
        {
            transform.localScale = Vector3.one;
            if (timeLive > 0 && gameObject.activeInHierarchy)
                SonatUtils.DelayCall(timeLive, ReturnToPool, this);
        }

        public virtual void OnReturnObj()
        {
        }

        protected virtual void ReturnToPool()
        {
            SonatSystem.GetService<PoolingServiceAsync>().ReturnObj(this);
        }
    }
}