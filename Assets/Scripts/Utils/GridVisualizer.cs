using DG.Tweening;
using UnityEngine;
using System.Collections.Generic;


public class GridVisualizer
{
    private readonly GameConfig config;
    private readonly GameObject[,] visualMap;
    private readonly Transform container;

    // [PERF] Pre-computed face rotations — tránh Quaternion.Euler (sin/cos) mỗi call
    private static readonly Quaternion[] FaceRotations = new Quaternion[]
    {
        Quaternion.identity,                // Face 0
        Quaternion.Euler(0, -90, 0),        // Face 1
        Quaternion.Euler(0, 180, 0),        // Face 2
        Quaternion.Euler(0, 90, 0)          // Face 3
    };

    public int Perimeter => config.Perimeter;
    public int FaceWidth => config.faceWidth;
    public float TileSize => config.tileSize;

    #region Constructor

    public GridVisualizer(GameConfig config, Transform container)
    {
        this.config = config;
        this.container = container;
        this.visualMap = new GameObject[config.Perimeter, config.height];

        for (int x = 0; x < config.Perimeter; x++)
        {
            for (int y = 0; y < config.height; y++)
            {
                visualMap[x, y] = null;
            }
        }
    }

    #endregion


    #region Visual Map Access

    public GameObject GetVisual(int x, int y)
    {
        if (!IsValidPosition(x, y)) return null;
        return visualMap[x, y];
    }

    public void SetVisual(int x, int y, GameObject obj)
    {
        if (!IsValidPosition(x, y)) return;

        visualMap[x, y] = obj;

        if (obj != null)
        {
            obj.transform.SetParent(container, true);
            obj.name = $"Block_{x}_{y}";
        }

        int twin = TwinColumnHelper.GetTwinColumn(x, config);
        if (twin != -1 && IsValidPosition(twin, y))
        {
            visualMap[twin, y] = obj;

            if (obj != null)
            {
                obj.name = $"Block_{Mathf.Min(x, twin)}_{y}_Corner";
            }
        }

        if (obj != null)
        {
            var blockVis = obj.GetComponent<BlockVisual>();
            if (blockVis != null)
            {
                blockVis.SetGridPosition(x, y);
            }
        }
    }

    public void ClearVisual(int x, int y)
    {
        if (!IsValidPosition(x, y)) return;

        GameObject obj = visualMap[x, y];
        if (obj == null) return;

        visualMap[x, y] = null;

        int twin = TwinColumnHelper.GetTwinColumn(x, config);
        if (twin != -1 && IsValidPosition(twin, y))
        {
            visualMap[twin, y] = null;
        }

        BlockFactory.Instance?.ReturnBlock(obj);
    }

    public void ClearVisualReference(int x, int y)
    {
        if (!IsValidPosition(x, y)) return;

        visualMap[x, y] = null;

        int twin = TwinColumnHelper.GetTwinColumn(x, config);
        if (twin != -1 && IsValidPosition(twin, y))
        {
            visualMap[twin, y] = null;
        }
    }

    public bool HasVisual(int x, int y)
    {
        if (!IsValidPosition(x, y)) return false;
        return visualMap[x, y] != null;
    }

    private bool IsValidPosition(int x, int y)
    {
        return x >= 0 && x < config.Perimeter && y >= 0 && y < config.height;
    }

    public bool IsVisualSlotOccupied(int x, int y, GameObject blockToCheck)
    {
        if (!IsValidPosition(x, y)) return false;

        GameObject existing = visualMap[x, y];
        if (existing != null && existing != blockToCheck)
        {
            return true;
        }

        int twin = TwinColumnHelper.GetTwinColumn(x, config);
        if (twin != -1 && IsValidPosition(twin, y))
        {
            GameObject twinExisting = visualMap[twin, y];
            if (twinExisting != null && twinExisting != blockToCheck)
            {
                return true;
            }
        }

        return false;
    }

    #endregion

    #region Position Calculations

    public Vector3 GetLocalPosition(float logicX, int logicY)
    {
        int faceIndex = (int)(logicX / config.faceWidth);
        float localX = logicX % config.faceWidth;
        float offset = (config.faceWidth / 2f) - (config.tileSize / 2f);

        float posOnFace = (localX * config.tileSize) - offset;
        float heightPos = (logicY * config.tileSize) + (config.tileSize / 2f);

        Vector3 finalPos = new Vector3(posOnFace, heightPos, -config.GridRadius);

        // [PERF] Dùng pre-computed rotations thay vì Quaternion.Euler mỗi call
        if (faceIndex >= 1 && faceIndex <= 3)
            return FaceRotations[faceIndex] * finalPos;
        return finalPos;
    }

    public Quaternion GetRotationForFace(int faceIndex)
    {
        // [PERF] Dùng pre-computed rotations
        if (faceIndex >= 0 && faceIndex < FaceRotations.Length)
            return FaceRotations[faceIndex];
        return Quaternion.Euler(0, faceIndex * -90, 0);
    }

    public int GetFaceFromX(int globalX)
    {
        return globalX / config.faceWidth;
    }

    #endregion

    #region Bulk Operations

    public void ClearAll()
    {
        var returnedObjects = new HashSet<int>();

        // [FIX] Dùng visualMap.GetLength thay vì config
        // Vì config có thể đã SyncFromLevelData (size mới) trước khi ClearAll chạy
        int mapWidth = visualMap.GetLength(0);
        int mapHeight = visualMap.GetLength(1);

        for (int x = 0; x < mapWidth; x++)
        {
            for (int y = 0; y < mapHeight; y++)
            {
                GameObject obj = visualMap[x, y];
                if (obj != null)
                {
                    int instanceId = obj.GetInstanceID();

                    if (!returnedObjects.Contains(instanceId))
                    {
                        returnedObjects.Add(instanceId);
                        BlockFactory.Instance?.ReturnBlock(obj);
                    }

                    visualMap[x, y] = null;
                }
            }
        }
    }

    public void ShiftVisualsDown(int fromRow, int toRow)
    {
        for (int x = 0; x < config.Perimeter; x++)
        {
            visualMap[x, toRow] = visualMap[x, fromRow];
            visualMap[x, fromRow] = null;
        }
    }

    // [PERF] Reuse arrays/lists — tránh allocation mỗi lần clear row
    private GameObject[] _rowVisualsCache;
    private readonly List<GameObject> _uniqueRowCache = new List<GameObject>();
    private readonly HashSet<int> _uniqueRowIds = new HashSet<int>();

    public GameObject[] GetRowVisuals(int row)
    {
        if (row < 0 || row >= config.height) return System.Array.Empty<GameObject>();

        // [PERF] Reuse array — kích thước cố định = Perimeter
        if (_rowVisualsCache == null || _rowVisualsCache.Length != config.Perimeter)
            _rowVisualsCache = new GameObject[config.Perimeter];

        for (int x = 0; x < config.Perimeter; x++)
        {
            _rowVisualsCache[x] = visualMap[x, row];
        }
        return _rowVisualsCache;
    }

    public List<GameObject> GetUniqueRowVisuals(int row)
    {
        // [PERF] Reuse list + hashset
        _uniqueRowCache.Clear();
        _uniqueRowIds.Clear();

        if (row < 0 || row >= config.height) return _uniqueRowCache;

        for (int x = 0; x < config.Perimeter; x++)
        {
            GameObject obj = visualMap[x, row];
            if (obj != null && _uniqueRowIds.Add(obj.GetInstanceID()))
            {
                _uniqueRowCache.Add(obj);
            }
        }

        return _uniqueRowCache;
    }

    #endregion

    #region Animation Operations

    public void AnimateBlockMove(int oldX, int oldY, int newX, int newY, float duration, Ease easeType)
    {
        GameObject obj = GetVisual(oldX, oldY);
        if (obj == null) return;

        ClearVisualReference(oldX, oldY);
        SetVisual(newX, newY, obj);

        int canonicalNewX = newX;
        int twin = TwinColumnHelper.GetTwinColumn(newX, config);
        if (twin != -1)
        {
            canonicalNewX = Mathf.Min(newX, twin);
        }

        Vector3 targetLocalPos = GetLocalPosition(canonicalNewX, newY);

        obj.transform.DOKill();
        obj.transform
            .DOLocalMove(targetLocalPos, duration)
            .SetEase(easeType);
    }

    public void AnimateBlockFall(int x, int oldY, int newY, float duration, Ease easeType)
    {
        GameObject obj = GetVisual(x, newY);
        if (obj == null) return;

        int canonicalX = x;
        int twin = TwinColumnHelper.GetTwinColumn(x, config);
        if (twin != -1)
        {
            canonicalX = Mathf.Min(x, twin);
        }

        Vector3 startPos = GetLocalPosition(canonicalX, oldY);
        Vector3 endPos = GetLocalPosition(canonicalX, newY);

        obj.transform.localPosition = startPos;

        obj.transform.DOKill();
        obj.transform
            .DOLocalMove(endPos, duration)
            .SetEase(easeType);
    }

    public bool TryAnimateBlockMove(int oldX, int oldY, int newX, int newY, float duration, Ease easeType)
    {
        GameObject obj = GetVisual(oldX, oldY);
        if (obj == null) return false;

        AnimateBlockMove(oldX, oldY, newX, newY, duration, easeType);
        return true;
    }

    #endregion

    #region Debug

    public void DrawGizmos(GridData gridData)
    {
        if (config == null) return;

        Gizmos.color = new Color(1, 0, 0, 0.5f);

        for (int x = 0; x < Perimeter; x++)
        {
            int h = gridData.GetColumnHeight(x);
            if (h > 0)
            {
                Vector3 basePos = GetLocalPosition(x, 0);
                Vector3 topPos = GetLocalPosition(x, h);
                Gizmos.DrawLine(basePos, topPos);
                Gizmos.DrawSphere(topPos, 0.1f * TileSize);
            }
        }
    }

    /// <summary>
    /// Validate visual integrity - kiểm tra twin columns có cùng reference không
    /// </summary>
    public bool ValidateVisualIntegrity()
    {
        bool isValid = true;

        for (int x = 0; x < config.Perimeter; x++)
        {
            int twin = TwinColumnHelper.GetTwinColumn(x, config);
            if (twin == -1) continue;

            for (int y = 0; y < config.height; y++)
            {
                GameObject obj1 = visualMap[x, y];
                GameObject obj2 = visualMap[twin, y];

                if (obj1 != obj2)
                {
                    Debug.LogError($"[GridVisualizer] Visual mismatch at twin columns ({x},{y}) vs ({twin},{y})");
                    isValid = false;
                }
            }
        }

        if (isValid)
        {
            Debug.Log("[GridVisualizer] Visual integrity OK");
        }

        return isValid;
    }

    #endregion
}