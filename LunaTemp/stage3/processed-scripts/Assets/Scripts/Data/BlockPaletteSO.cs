using UnityEngine;

[CreateAssetMenu(fileName = "BlockPalette", menuName = "TowerStack/Block Palette")]
public class BlockPaletteSO : ScriptableObject
{
    [Header("Block Materials")]
    public Material[] blockMaterials;

    [Header("Ghost")]
    public Material ghostMaterial;

    [Header("Flood")]
    public Material floodMaterial;

    [Header("Preview Overlay")]
    public Material previewOverlayMaterial;

    #region Public API

    public int Count => blockMaterials != null ? blockMaterials.Length : 0;

    public Material GetByIndex(int index)
    {
        if (blockMaterials == null || index < 0 || index >= blockMaterials.Length)
            return null;
        return blockMaterials[index];
    }

    public Material GetRandom()
    {
        if (blockMaterials == null || blockMaterials.Length == 0) return null;
        return blockMaterials[Random.Range(0, blockMaterials.Length)];
    }

    public Material GetRandomExcept(Material exclude)
    {
        if (blockMaterials == null || blockMaterials.Length == 0) return null;
        if (blockMaterials.Length == 1) return blockMaterials[0];

        Material result;
        int safety = 10;

        do
        {
            result = blockMaterials[Random.Range(0, blockMaterials.Length)];
            safety--;
        }
        while (result == exclude && safety > 0);

        return result;
    }

    #endregion
}