
using System.Threading.Tasks;
using UnityEngine;

namespace SonatFramework.Systems.ObjectPooling
{
    public abstract class PoolingServiceAsync: PoolingServiceBase
    {
        public abstract Task<T> CreateAsync<T>(string objectName, Vector3 position, Transform parent = null,
            params object[] args) where T : IPoolingObject;

        public abstract Task<T> CreateAsync<T>(string objectName, Transform parent = null, params object[] args)
            where T : IPoolingObject;

        public abstract void ReturnObj(IPoolingObject obj, bool keep = true);
    }
}