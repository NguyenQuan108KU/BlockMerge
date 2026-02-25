using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AddressableAssets;
using Base.Singleton;
using Cysharp.Threading.Tasks;

public class ObjectPoolManager : SingletonSimple<ObjectPoolManager>
{
    public Dictionary<string, Queue<GameObject>> pools = new();
    public Dictionary<string, GameObject> loadedPrefabs = new();

    protected override void OnAwake() { }

    public async UniTask PreloadAssetAsync(string key)
    {
        if (loadedPrefabs.ContainsKey(key)) return;

        var handle = Addressables.LoadAssetAsync<GameObject>(key);
        GameObject prefab = await handle.ToUniTask();

        if (prefab != null)
        {
            loadedPrefabs[key] = prefab;
            if (!pools.ContainsKey(key)) pools[key] = new Queue<GameObject>();
        }
    }

    public GameObject SpawnSync(string key, Vector3 pos, Quaternion rot, Transform parent = null, bool useLocalSpace = false)
    {
        if (!loadedPrefabs.ContainsKey(key)) return null;

        GameObject originalPrefab = loadedPrefabs[key];
        GameObject obj;

        if (pools.ContainsKey(key) && pools[key].Count > 0)
        {
            obj = pools[key].Dequeue();
        }
        else
        {
            obj = Instantiate(originalPrefab);
        }

        obj.transform.SetParent(parent, false);

        if (useLocalSpace)
        {
            obj.transform.localPosition = pos;
            obj.transform.localRotation = rot;
        }
        else
        {
            obj.transform.position = pos;
            obj.transform.rotation = rot;
        }

        obj.transform.localScale = originalPrefab.transform.localScale;
        obj.SetActive(true);

        return obj;
    }

    public async UniTask<GameObject> SpawnAsync(string key, Vector3 pos, Quaternion rot, Transform parent = null, bool useLocalSpace = false)
    {
        if (!loadedPrefabs.ContainsKey(key))
        {
            await PreloadAssetAsync(key);
        }
        return SpawnSync(key, pos, rot, parent, useLocalSpace);
    }

    public void Despawn(string key, GameObject obj)
    {
        if (obj == null) return;

        obj.SetActive(false);
        obj.transform.SetParent(transform);

        if (!pools.ContainsKey(key)) pools[key] = new Queue<GameObject>();
        pools[key].Enqueue(obj);
    }
}