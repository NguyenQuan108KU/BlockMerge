using System.Collections.Generic;
using UnityEngine;
using SonatFramework.Systems.EventBus;

[System.Serializable]
public class MoveSnapshot
{
    public BlockShapeSO shapeData;
    public List<GameObject> visualObjects = new List<GameObject>();
    public List<Vector2Int> occupiedCells = new List<Vector2Int>();
}

/// <summary>
/// GameHistorySystem - Lưu lịch sử nước đi
/// 
/// [REFACTOR] Chuyển từ lưu 1 snapshot → stack tối đa MAX_SNAPSHOTS.
/// - Booster Undo: vẫn chỉ pop 1 cái cuối (PopLastSnapshot)
/// - Continue Overflow: pop nhiều cái (PopMultiple)
/// </summary>
public class GameHistorySystem : MonoBehaviour
{
    public static GameHistorySystem Instance { get; private set; }

    private const int MAX_SNAPSHOTS = 5;

    [Header("Debug")]
    [SerializeField] private int snapshotCount;

    private readonly List<MoveSnapshot> _snapshotStack = new List<MoveSnapshot>();
    private EventBinding<RegisterMoveEvent> moveBinding;

    private void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    private void OnEnable()
    {
        moveBinding = new EventBinding<RegisterMoveEvent>(RecordMove);
    }

    private void OnDisable()
    {
        moveBinding?.Dispose();
    }

    private void RecordMove(RegisterMoveEvent e)
    {
        var snapshot = new MoveSnapshot
        {
            shapeData = e.Shape,
            visualObjects = new List<GameObject>(e.Objs),
            occupiedCells = new List<Vector2Int>(e.Coords)
        };

        _snapshotStack.Add(snapshot);

        // Giữ tối đa MAX_SNAPSHOTS — xóa cái cũ nhất
        if (_snapshotStack.Count > MAX_SNAPSHOTS)
        {
            _snapshotStack.RemoveAt(0);
        }

        snapshotCount = _snapshotStack.Count;
    }


    public bool HasHistory()
    {
        return _snapshotStack.Count > 0;
    }

    public MoveSnapshot PopLastSnapshot()
    {
        if (_snapshotStack.Count == 0) return null;

        int lastIndex = _snapshotStack.Count - 1;
        var snapshot = _snapshotStack[lastIndex];
        _snapshotStack.RemoveAt(lastIndex);

        snapshotCount = _snapshotStack.Count;
        return snapshot;
    }

    public List<MoveSnapshot> PopMultiple(int count)
    {
        var result = new List<MoveSnapshot>();

        for (int i = 0; i < count; i++)
        {
            if (_snapshotStack.Count == 0) break;

            int lastIndex = _snapshotStack.Count - 1;
            result.Add(_snapshotStack[lastIndex]);
            _snapshotStack.RemoveAt(lastIndex);
        }

        snapshotCount = _snapshotStack.Count;
        return result;
    }


    public void ClearHistory()
    {
        _snapshotStack.Clear();
        snapshotCount = 0;
    }

    public static void RevertSnapshot(MoveSnapshot snapshot, GridManager grid)
    {
        if (snapshot == null || grid == null) return;

        // --- Clear flood cells nếu group còn intact ---
        var floodRegistry = grid.floodRegistry;
        if (floodRegistry != null && snapshot.occupiedCells.Count > 0)
        {
            var firstCell = snapshot.occupiedCells[0];
            int originBlockID = grid.gridData.GetCell(firstCell.x, firstCell.y);

            if (originBlockID != -1)
            {
                var groupIDs = floodRegistry.GetIntactGroupIDs(originBlockID);
                if (groupIDs != null)
                {
                    foreach (int floodID in groupIDs)
                    {
                        if (floodID == originBlockID) continue;

                        var floodCells = grid.gridData.GetCellsByBlockID(floodID);
                        if (floodCells == null) continue;

                        var cellsCopy = new System.Collections.Generic.List<Vector2Int>(floodCells);
                        foreach (var cell in cellsCopy)
                        {
                            GameObject visual = grid.visualizer.GetVisual(cell.x, cell.y);
                            if (visual != null) BlockFactory.Instance.ReturnBlock(visual);
                            grid.visualizer.ClearVisualReference(cell.x, cell.y);

                            int twin = grid.gridData.GetTwinColumn(cell.x);
                            if (twin != -1) grid.visualizer.ClearVisualReference(twin, cell.y);

                            grid.ForceClearCell(cell.x, cell.y);
                        }
                    }
                    floodRegistry.RemoveGroup(originBlockID);
                }
            }
        }

        // --- Clear occupied cells ---
        foreach (var cell in snapshot.occupiedCells)
        {
            grid.ForceClearCell(cell.x, cell.y);
        }

        // --- Return visuals to pool ---
        foreach (var obj in snapshot.visualObjects)
        {
            if (obj != null) BlockFactory.Instance.ReturnBlock(obj);
        }
    }





}