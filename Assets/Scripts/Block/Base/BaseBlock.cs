using UnityEngine;
using System.Collections.Generic;
using DG.Tweening;

public abstract class BaseBlock : MonoBehaviour
{
    [Header("References")]
    public BlockShapeSO CurrentShape;
    public GameObject cellPrefab;          // Smart_Cell_1x1
    public CellMeshLibrary meshLibrary;    // CellMeshLibrary.asset

    protected GridManager grid;
    public List<BlockVisual> blockVisuals = new List<BlockVisual>();

    protected virtual void Awake()
    {
        grid = GridManager.Instance;
    }

    public virtual void InitializeShape(BlockShapeSO shape)
    {
        CurrentShape = shape;
        if (grid == null) grid = GridManager.Instance;

        transform.DOKill();
        ClearChildren();

        if (shape == null) return;

        CreateCells(shape);
        ResolveAllMeshes();
    }

    private void ClearChildren()
    {
        blockVisuals.Clear();

        foreach (Transform child in transform)
        {
            child.DOKill();
            child.gameObject.SetActive(false);
        }
    }

    private void CreateCells(BlockShapeSO shape)
    {
        float tileSize = grid != null ? grid.tileSize : 1f;
        int need = shape.structuralOffsets.Count;

        for (int i = 0; i < need; i++)
        {
            Vector2Int offset = shape.structuralOffsets[i];
            Vector3 localPos = new Vector3(offset.x * tileSize, offset.y * tileSize, 0f);

            GameObject cell;

            if (i < transform.childCount)
            {
                cell = transform.GetChild(i).gameObject;
            }
            else
            {
                cell = Instantiate(cellPrefab, transform);
            }

            cell.SetActive(true);
            cell.transform.localPosition = localPos;
            cell.transform.localRotation = Quaternion.identity;

            BlockVisual visual = cell.GetComponent<BlockVisual>();
            if (visual != null)
            {
                if (shape.blockMaterial != null)
                    visual.SetMaterial(shape.blockMaterial);
                visual.SetAlpha(1f);
                blockVisuals.Add(visual);
            }
        }

        // Hide dư
        for (int i = need; i < transform.childCount; i++)
        {
            transform.GetChild(i).gameObject.SetActive(false);
        }
    }

    protected void ResolveAllMeshes()
    {
        if (CurrentShape == null || meshLibrary == null) return;

        HashSet<Vector2Int> offsetSet = new HashSet<Vector2Int>(CurrentShape.structuralOffsets);

        foreach (var visual in blockVisuals)
        {
            Vector2Int localCell = Vector2Int.RoundToInt(
                new Vector2(
                    visual.transform.localPosition.x / grid.tileSize,
                    visual.transform.localPosition.y / grid.tileSize
                )
            );

            visual.ResolveMesh(localCell, offsetSet, meshLibrary);
        }
    }

    public void SetAlpha(float alpha)
    {
        foreach (var v in blockVisuals)
            v.SetAlpha(alpha);
    }

    public void SetMaterial(Material mat)
    {
        foreach (var v in blockVisuals)
            v.SetMaterial(mat);
    }

    public virtual void CleanupAnimations()
    {
        transform.DOKill();
        foreach (Transform child in transform)
            child.DOKill();
    }

    public void ReleaseChildren()
    {
        // Chỉ xóa danh sách quản lý, để lại GameObject sống cho GridVisualizer nhận nuôi
        blockVisuals.Clear();
    }
}
