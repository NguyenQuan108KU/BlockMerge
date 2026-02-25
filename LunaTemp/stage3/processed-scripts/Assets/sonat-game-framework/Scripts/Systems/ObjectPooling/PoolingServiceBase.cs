using System;
using System.Collections;
using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using SonatFramework.Systems;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

public class PoolingServiceBase : SonatServiceSo, IServiceInitialize
{
    protected static readonly Dictionary<string, Queue<IPoolingObject>> Pool = new System.Collections.Generic.Dictionary<string, System.Collections.Generic.Queue<SonatFramework.Systems.ObjectPooling.IPoolingObject>>(StringComparer.Ordinal);

    protected static readonly Dictionary<string, GameObject> ObjPrefs = new System.Collections.Generic.Dictionary<string, UnityEngine.GameObject>(StringComparer.Ordinal);

    protected readonly Dictionary<string, UniTask<GameObject>> loadingPrefabTasks = new System.Collections.Generic.Dictionary<string, UniTask<UnityEngine.GameObject>>(StringComparer.Ordinal);
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