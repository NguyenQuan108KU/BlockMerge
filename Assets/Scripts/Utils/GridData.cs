using System;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// GridData - Quản lý dữ liệu logic của Grid
/// 
/// Twin columns được xử lý tự động:
/// - Cột 5 và 6 là twin (góc Face0-Face1)
/// - Khi đặt block vào cột 5: cả cột 5 VÀ cột 6 đều lưu cùng Block ID
/// </summary>
[System.Serializable]
public class GridData
{
    #region Fields

    private readonly int[,] map;
    private readonly int[] columnHeights;
    private readonly int width;
    private readonly int height;
    private readonly int faceWidth;

    private Dictionary<int, HashSet<Vector2Int>> blockRegistry;
    // Multi-layer block tracking
    private Dictionary<int, int> blockLayers = new Dictionary<int, int>();

    #endregion

    #region Properties

    public int Width => width;
    public int Height => height;
    public int FaceWidth => faceWidth;

    #endregion

    #region Constructor

    public GridData(int width, int height, int faceWidth = 6)
    {
        this.width = width;
        this.height = height;
        this.faceWidth = faceWidth;
        this.map = new int[width, height];
        this.columnHeights = new int[width];
        this.blockRegistry = new Dictionary<int, HashSet<Vector2Int>>();

        for (int x = 0; x < width; x++)
        {
            columnHeights[x] = 0;
            for (int y = 0; y < height; y++)
            {
                map[x, y] = -1;
            }
        }
    }

    #endregion

    #region Twin Column Logic

    public int GetTwinColumn(int col)
    {
        return TwinColumnHelper.GetTwinColumn(col, faceWidth, width);
    }

    public bool IsCornerColumn(int col)
    {
        return TwinColumnHelper.IsCornerColumn(col, faceWidth, width);
    }

    public int GetCanonicalColumn(int col)
    {
        return TwinColumnHelper.GetCanonicalColumn(col, faceWidth, width);
    }

    public bool IsCanonicalColumn(int col)
    {
        return TwinColumnHelper.IsCanonicalColumn(col, faceWidth, width);
    }


    #endregion

    #region Registry Logic

    private void UpdateRegistry(int x, int y, int oldVal, int newVal)
    {
        Vector2Int pos = new Vector2Int(x, y);

        if (oldVal != -1)
        {
            if (blockRegistry.ContainsKey(oldVal))
            {
                blockRegistry[oldVal].Remove(pos);

                if (blockRegistry[oldVal].Count == 0)
                {
                    blockRegistry.Remove(oldVal);
                }
            }
        }

        if (newVal != -1)
        {
            if (!blockRegistry.ContainsKey(newVal))
            {
                blockRegistry[newVal] = new HashSet<Vector2Int>();
            }
            blockRegistry[newVal].Add(pos);
        }
    }

    public HashSet<Vector2Int> GetCellsByBlockID(int id)
    {
        if (blockRegistry.TryGetValue(id, out var cells))
        {
            return cells;
        }
        return null;
    }

    public int GetPhysicalCellCount(int blockID)
    {
        var cells = GetCellsByBlockID(blockID);
        if (cells == null) return 0;

        // [TIER1] ValueTuple thay string → zero GC allocation (struct, no boxing)
        HashSet<(int x, int y)> countedPositions = new HashSet<(int, int)>();
        int count = 0;

        foreach (var cell in cells)
        {
            int canonical = GetCanonicalColumn(cell.x);

            if (countedPositions.Add((canonical, cell.y)))
            {
                count++;
            }
        }

        return count;
    }

    #endregion

    #region Block Layer Methods

    public void SetBlockLayer(int blockID, int layer)
    {
        if (layer > 1)
            blockLayers[blockID] = layer;
        else
            blockLayers.Remove(blockID);
    }

    public int GetBlockLayer(int blockID)
    {
        return blockLayers.TryGetValue(blockID, out int layer) ? layer : 1;
    }

    public void DecreaseBlockLayer(int blockID)
    {
        int current = GetBlockLayer(blockID);
        if (current > 1)
            SetBlockLayer(blockID, current - 1);
    }

    public void RemoveBlockLayer(int blockID)
    {
        blockLayers.Remove(blockID);
    }

    public bool IsMultiLayerBlock(int blockID)
    {
        return blockLayers.ContainsKey(blockID) && blockLayers[blockID] > 1;
    }

    #endregion

    #region Cell Access

    public int GetCell(int x, int y)
    {
        if (!IsValid(x, y)) return -1;
        return map[x, y];
    }

    /// <summary>
    /// Kiểm tra cell có block không (bất kỳ ID nào != -1)
    /// </summary>
    public bool HasBlock(int x, int y)
    {
        if (!IsValid(x, y)) return false;
        return map[x, y] != -1;
    }

    /// <summary>
    /// Kiểm tra tọa độ có hợp lệ không
    /// </summary>
    public bool IsValid(int x, int y)
    {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    public void SetCell(int x, int y, int value)
    {
        SetCellInternal(x, y, value, updateHeight: true, propagateToTwin: true);
    }

    public void SetCellWithoutHeightUpdate(int x, int y, int value)
    {
        SetCellInternal(x, y, value, updateHeight: false, propagateToTwin: true);
    }

    private void SetCellDirect(int x, int y, int value, bool updateHeight)
    {
        SetCellInternal(x, y, value, updateHeight, propagateToTwin: false);
    }

    private void SetCellInternal(int x, int y, int value, bool updateHeight, bool propagateToTwin)
    {
        if (!IsValid(x, y)) return;

        int oldVal = map[x, y];

        if (oldVal == value) return;

        map[x, y] = value;

        UpdateRegistry(x, y, oldVal, value);

        if (updateHeight && value != -1)
        {
            UpdateColumnHeight(x, y);
        }

        if (propagateToTwin)
        {
            int twin = GetTwinColumn(x);
            if (twin != -1 && IsValid(twin, y))
            {
                SetCellDirect(twin, y, value, updateHeight);
            }
        }
    }

    #endregion

    #region Height Operations

    public int GetFaceMaxHeight(int faceIndex)
    {
        int startCol = faceIndex * faceWidth;
        int endCol = startCol + faceWidth;
        int maxH = 0;
        for (int x = startCol; x < endCol; x++)
        {
            if (columnHeights[x] > maxH)
                maxH = columnHeights[x];
        }
        return maxH;
    }

    public int GetColumnHeight(int col)
    {
        if (col < 0 || col >= width) return 0;
        return columnHeights[col];
    }

    private void UpdateColumnHeight(int col, int newY)
    {
        int newHeight = newY + 1;
        if (newHeight > columnHeights[col])
        {
            columnHeights[col] = newHeight;
        }

        int twin = GetTwinColumn(col);
        if (twin != -1 && newHeight > columnHeights[twin])
        {
            columnHeights[twin] = newHeight;
        }
    }

    public void RecalculateHeights()
    {
        for (int x = 0; x < width; x++)
        {
            columnHeights[x] = 0;
            for (int y = height - 1; y >= 0; y--)
            {
                if (map[x, y] != -1)
                {
                    columnHeights[x] = y + 1;
                    break;
                }
            }
        }

        for (int x = 0; x < width; x++)
        {
            int twin = GetTwinColumn(x);
            if (twin != -1 && twin > x)
            {
                int maxHeight = Math.Max(columnHeights[x], columnHeights[twin]);
                columnHeights[x] = maxHeight;
                columnHeights[twin] = maxHeight;
            }
        }
    }

    public int GetMaxHeight()
    {
        int max = 0;
        for (int x = 0; x < width; x++)
        {
            if (columnHeights[x] > max) max = columnHeights[x];
        }
        return max;
    }

    #endregion

    #region Row Operations

    public bool IsRowFull(int row)
    {
        if (row < 0 || row >= height) return false;

        for (int x = 0; x < width; x++)
        {
            if (map[x, row] == -1) return false;
        }
        return true;
    }

    public void ClearRow(int row)
    {
        if (row < 0 || row >= height) return;

        for (int x = 0; x < width; x++)
        {
            SetCellDirect(x, row, -1, updateHeight: false);
        }
    }

    public void ShiftDataDown(int clearedRow)
    {
        for (int y = clearedRow + 1; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                int valAbove = GetCell(x, y);

                SetCellDirect(x, y - 1, valAbove, updateHeight: false);
                SetCellDirect(x, y, -1, updateHeight: false);
            }
        }

        RecalculateHeights();
    }

    #endregion

    #region Prediction Logic

    public List<int> GetPredictedFullRows(List<Vector2Int> ghostCells)
    {
        List<int> fullRows = new List<int>();
        HashSet<int> rowsToCheck = new HashSet<int>();

        // [PERF] Build HashSet<(x,y)> 1 lần — bao gồm cả twin columns
        // Thay vì nested loop O(W × ghostCells), lookup O(1) per cell
        HashSet<(int x, int y)> ghostCellSet = new HashSet<(int, int)>();
        foreach (var cell in ghostCells)
        {
            if (IsValid(cell.x, cell.y))
            {
                rowsToCheck.Add(cell.y);
                ghostCellSet.Add((cell.x, cell.y));
                int twin = GetTwinColumn(cell.x);
                if (twin != -1) ghostCellSet.Add((twin, cell.y));
            }
        }

        foreach (int row in rowsToCheck)
        {
            bool isFull = true;
            for (int x = 0; x < width; x++)
            {
                if (map[x, row] == -1 && !ghostCellSet.Contains((x, row)))
                {
                    isFull = false;
                    break;
                }
            }
            if (isFull) fullRows.Add(row);
        }
        return fullRows;
    }

    #endregion

    #region Wrap Utilities

    public int GetWrappedX(int rawX)
    {
        return TwinColumnHelper.WrapX(rawX, width);
    }

    #endregion

    #region Backward Compatibility

    [Obsolete("Use GetTwinColumn() instead")]
    public int GetSharedCornerColumn(int col, int faceWidth)
    {
        return GetTwinColumn(col);
    }

    #endregion

    #region Debug

    public void DebugPrint()
    {
        string output = "=== GRID DATA ===\n";
        output += $"Size: {width}x{height}, FaceWidth: {faceWidth}\n\n";

        int maxY = Mathf.Min(GetMaxHeight() + 2, height);

        for (int y = maxY - 1; y >= 0; y--)
        {
            string row = $"Y{y,2}: ";
            for (int x = 0; x < width; x++)
            {
                int val = map[x, y];
                if (val == -1)
                {
                    row += "[  ] ";
                }
                else
                {
                    row += $"[{val % 100:D2}] ";
                }
            }
            output += row + "\n";
        }

        output += "\nColumn Heights: ";
        for (int x = 0; x < Mathf.Min(width, 12); x++)
        {
            output += $"[{x}]={columnHeights[x]} ";
        }
        if (width > 12) output += "...";

        output += "\n\nCorner Pairs: ";
        for (int x = 0; x < width; x++)
        {
            int twin = GetTwinColumn(x);
            if (twin != -1 && twin > x)
            {
                output += $"({x},{twin}) ";
            }
        }

        Debug.Log(output);
    }

    public bool ValidateDataIntegrity()
    {
        bool isValid = true;

        for (int x = 0; x < width; x++)
        {
            int twin = GetTwinColumn(x);
            if (twin == -1) continue;

            for (int y = 0; y < height; y++)
            {
                int val1 = map[x, y];
                int val2 = map[twin, y];

                if (val1 != val2)
                {
                    Debug.LogError($"[GridData] Data mismatch at twin columns ({x},{y}) = {val1}, ({twin},{y}) = {val2}");
                    isValid = false;
                }
            }
        }

        if (isValid)
        {
            Debug.Log("[GridData] Data integrity OK");
        }

        return isValid;
    }

    #endregion
}