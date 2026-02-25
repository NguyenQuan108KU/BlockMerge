using System;
using System.Collections;
using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using SonatFramework.Systems;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

public class PoolingServiceBase : SonatServiceSo, IServiceInitialize
{
    protected static readonly Dictionary<string, Queue<IPoolingObject>> Pool =
        new Dictionary<string, Queue<IPoolingObject>>(StringComparer.Ordinal);

    protected static readonly Dictionary<string, GameObject> ObjPrefs =
        new Dictionary<string, GameObject>(StringComparer.Ordinal);

    protected readonly Dictionary<string, UniTask<GameObject>> loadingPrefabTasks =
        new Dictionary<string, UniTask<GameObject>>(StringComparer.Ordinal);
    protected static GameObject pool;

    public virtual void Initialize()
    {
        if (pool == null)
        {
            pool = new GameObject("Pool");
            pool.AddComponent<DontDestroyOnLoadObject>();
            Pool.Clear();
            loadingPrefabTasks.Clear();
            ObjPrefs.Clear();
        }
    }
}