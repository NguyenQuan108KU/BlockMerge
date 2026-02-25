using UnityEngine;

public class BlockFactory : SingletonSimple<BlockFactory>
{

    [Header("Prefab block")]
    public GameObject singleBlockPrefab;
    #region Block Creation

    public GameObject CreateStaticBlock([Bridge.Ref] Vector3 localPos, [Bridge.Ref] Quaternion localRot, Transform parent, Material mat)
    {
        if (singleBlockPrefab == null)
        {
            Debug.LogError("[BlockFactory] singleBlockPrefab is null!");
            return null;
        }

        GameObject obj = Instantiate(singleBlockPrefab, parent);
        obj.transform.localPosition = localPos;
        obj.transform.localRotation = localRot;

        var visual = obj.GetComponent<BlockVisual>();
        if (visual != null)
        {
            if (mat != null)
                visual.SetMaterial(mat);

            visual.SetAlpha(1f);
        }

        return obj;
    }

    #endregion

    #region Block Return

    public void ReturnBlock(GameObject obj)
    {
        if (obj != null)
            Destroy(obj);
    }

    public void ReturnBlock(BlockVisual visual)
    {
        if (visual != null)
            Destroy(visual.gameObject);
    }

    #endregion
}