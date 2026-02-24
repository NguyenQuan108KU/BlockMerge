using UnityEngine;
using Cysharp.Threading.Tasks;
using SonatFramework.Systems;
using SonatFramework.Systems.ObjectPooling;

public class BlockFactory : MonoBehaviour
{
    public static BlockFactory Instance { get; private set; }

    private const string BLOCK_KEY = "Block_1x1";

    [Header("Prefab cho Active/Ghost (không qua pool)")]
    public GameObject singleBlockPrefab;

    private readonly Service<PoolingServiceAsync> _pooling = new();

    private void Awake()
    {
        if (Instance == null) Instance = this;
    }

    #region Block Creation

    public GameObject CreateStaticBlock(Vector3 localPos, Quaternion localRot, Transform parent, Material mat)
    {
        return CreateStaticBlockInternal(localPos, localRot, parent, mat).GetAwaiter().GetResult();
    }

    public async UniTask<GameObject> CreateStaticBlockAsync(Vector3 localPos, Quaternion localRot, Transform parent, Material mat)
    {
        return await CreateStaticBlockInternal(localPos, localRot, parent, mat);
    }

    private async UniTask<GameObject> CreateStaticBlockInternal(Vector3 localPos, Quaternion localRot, Transform parent, Material mat)
    {
        if (_pooling.Instance == null)
        {
            Debug.LogError("[BlockFactory] PoolingServiceAsync not available!");
            return null;
        }

        var visual = await _pooling.Instance.CreateAsync<BlockVisual>(BLOCK_KEY, parent);

        if (visual == null)
        {
            Debug.LogError($"[BlockFactory] Failed to create block from pool: {BLOCK_KEY}");
            return null;
        }

        GameObject obj = visual.gameObject;

        obj.transform.localPosition = localPos;
        obj.transform.localRotation = localRot;

        if (mat != null)
            visual.SetMaterial(mat);

        visual.SetAlpha(1f);

        return obj;
    }

    #endregion

    #region Block Return

    public void ReturnBlock(GameObject obj)
    {
        if (obj == null) return;

        var visual = obj.GetComponent<BlockVisual>();
        if (visual != null && _pooling.Instance != null)
        {
            _pooling.Instance.ReturnObj(visual);
        }
        else
        {
            Destroy(obj);
        }
    }

    public void ReturnBlock(BlockVisual visual)
    {
        if (visual == null) return;

        if (_pooling.Instance != null)
        {
            _pooling.Instance.ReturnObj(visual);
        }
        else
        {
            Destroy(visual.gameObject);
        }
    }

    #endregion

    #region Utility

    public GameObject SpawnSingleBlock(Transform parent, Vector3 localPos)
    {
        return null;
    }

    #endregion
}