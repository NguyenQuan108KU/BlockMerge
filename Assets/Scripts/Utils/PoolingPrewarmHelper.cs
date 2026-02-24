using Cysharp.Threading.Tasks;
using SonatFramework.Systems;
using SonatFramework.Systems.ObjectPooling;
using System.Collections.Generic;

public static class PoolingPrewarmHelper
{
    private static readonly Service<PoolingServiceAsync> _pooling = new();

    public static async UniTask PrewarmAsync<T>(string assetKey, int count, UnityEngine.Transform tempParent = null)
        where T : IPoolingObject
    {
        if (count <= 0) return;
        if (_pooling.Instance == null)
        {
            UnityEngine.Debug.LogError("[PrewarmHelper] PoolingServiceAsync not available!");
            return;
        }

        var prewarmed = new List<IPoolingObject>(count);

        // Tạo N objects
        for (int i = 0; i < count; i++)
        {
            var obj = await _pooling.Instance.CreateAsync<T>(assetKey, tempParent);
            if (obj != null)
            {
                prewarmed.Add(obj);
            }
        }

        // Return về pool ngay → pool có sẵn N instances inactive
        foreach (var obj in prewarmed)
        {
            _pooling.Instance.ReturnObj(obj);
        }

        UnityEngine.Debug.Log($"[PrewarmHelper] Prewarmed {prewarmed.Count} instances of '{assetKey}'");
    }

    public static async UniTask PreloadOnlyAsync<T>(string assetKey) where T : IPoolingObject
    {
        if (_pooling.Instance == null) return;

        // Tạo 1 instance rồi return ngay → prefab được cache
        var obj = await _pooling.Instance.CreateAsync<T>(assetKey);
        if (obj != null)
        {
            _pooling.Instance.ReturnObj(obj);
        }
    }
}