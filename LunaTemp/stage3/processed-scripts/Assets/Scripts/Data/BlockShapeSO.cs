using UnityEngine;
using System.Collections.Generic;

[CreateAssetMenu(fileName = "NewBlockShape", menuName = "Game/Block Shape")]
public class BlockShapeSO : ScriptableObject
{
    [Header("Dimensions")]
    public int width = 1;
    public int height = 1;

    public int minX = 0;
    public int maxX = 0;
    public int maxY = 0;

    public int MaxY
    {
        get
        {
            if (maxY == 0 && structuralOffsets != null && structuralOffsets.Count > 0)
            {
                int max = int.MinValue;
                foreach (var p in structuralOffsets)
                {
                    if (p.y > max) max = p.y;
                }
                maxY = max;
            }
            return maxY;
        }
    }

    [Header("Structure")]
    public List<Vector2Int> structuralOffsets;

    [Header("UI & Visuals")]
    public Sprite uiIcon;
    public Material blockMaterial;
    public Material innerMaterial;


    [Header("Special Mechanics")]
    public Sprite specialIcon;
    public Vector2Int slideDirection = Vector2Int.zero;

    [Header("Multi-Layer Settings")]
    [Tooltip("Số layer của block (1 = normal, 2 = double layer)")]
    public int defaultLayers = 1;


    [Tooltip("Mesh liền khối cho inner (để trống nếu không dùng)")]
    public Mesh innerMesh;

    [Tooltip("Scale của inner mesh so với outer")]
    public Vector3 innerScale = new Vector3(0.5f, 0.5f, 1.2f);

    [Tooltip("Offset vị trí inner mesh (thường là Vector3.zero)")]
    public Vector3 innerOffset = Vector3.zero;

    private void OnValidate()
    {
        if (structuralOffsets != null && structuralOffsets.Count > 0)
        {
            minX = int.MaxValue;
            maxX = int.MinValue;
            int minY = int.MaxValue; // (Nếu cần tính height chuẩn)
            maxY = int.MinValue;


            foreach (var p in structuralOffsets)
            {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.y > maxY) maxY = p.y;
            }

            // Width thực tế = khoảng cách từ cực trái sang cực phải + 1
            width = maxX - minX + 1;
            height = maxY - minY + 1;
        }
    }
}