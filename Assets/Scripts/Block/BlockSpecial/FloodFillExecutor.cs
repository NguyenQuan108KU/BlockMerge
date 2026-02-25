using DG.Tweening;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

public class FloodFillExecutor : IPostLandEffect
{
    public int Priority => 10;

    private readonly int _rangeBelow;
    private readonly Material _floodMaterial;
    private readonly GridManager _grid;
    private readonly Transform _towerContainer;

    private const float WAVE_DELAY_MS = 50f;
    private const float SCALE_DURATION = 0.15f;

    private static readonly int[] DX = { -1, 1, 0, 0 };
    private static readonly int[] DY = { 0, 0, 1, -1 };

    public FloodFillExecutor(GridManager grid, Transform towerContainer, Material floodMaterial, int rangeBelow = 2)
    {
        _grid = grid;
        _towerContainer = towerContainer;
        _floodMaterial = floodMaterial;
        _rangeBelow = rangeBelow;
    }

    public SlideResult Execute(PostLandContext ctx)
    {
        var result = new SlideResult
        {
            GridChanged = false,
            FinalCells = new List<Vector2Int>(ctx.BlockCells),
            AffectedRows = new HashSet<int>()
        };

        GetYRange(ctx.BlockCells, out int bottomY, out int topY);
        int minY = Mathf.Max(0, bottomY - _rangeBelow);
        int maxY = topY;

        int faceWidth = ctx.Config.faceWidth;
        int faceStartX = ctx.FaceIndex * faceWidth;
        int faceEndX = faceStartX + faceWidth;

        var cellsToFill = BFS(ctx.GridData, ctx.BlockCells, minY, maxY, faceStartX, faceEndX);
        if (cellsToFill.Count == 0) return result;

        var floodIDs = RegisterCells(cellsToFill);

        int originBlockID = ctx.GridData.GetCell(ctx.BlockCells[0].x, ctx.BlockCells[0].y);
        if (originBlockID != -1)
        {
            _grid.floodRegistry.Register(originBlockID, floodIDs);
        }

        for (int y = minY; y <= maxY; y++)
            result.AffectedRows.Add(y);

        result.GridChanged = true;

        SpawnVisualsAsync(cellsToFill, ctx.BlockCells);
        return result;
    }

    #region BFS

    private void GetYRange(List<Vector2Int> cells, out int bottom, out int top)
    {
        bottom = int.MaxValue;
        top = int.MinValue;
        foreach (var c in cells)
        {
            if (c.y < bottom) bottom = c.y;
            if (c.y > top) top = c.y;
        }
        if (bottom == int.MaxValue) { bottom = 0; top = 0; }
    }

    private List<Vector2Int> BFS(
        GridData gridData, List<Vector2Int> blockCells,
        int minY, int maxY, int faceStartX, int faceEndX)
    {
        var result = new List<Vector2Int>();
        var visited = new HashSet<Vector2Int>(blockCells);
        var queue = new Queue<Vector2Int>();

        foreach (var cell in blockCells)
            EnqueueNeighbors(cell, gridData, visited, queue, minY, maxY, faceStartX, faceEndX);

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            result.Add(current);
            EnqueueNeighbors(current, gridData, visited, queue, minY, maxY, faceStartX, faceEndX);
        }

        return result;
    }

    private void EnqueueNeighbors(
        Vector2Int cell, GridData gridData,
        HashSet<Vector2Int> visited, Queue<Vector2Int> queue,
        int minY, int maxY, int faceStartX, int faceEndX)
    {
        for (int i = 0; i < 4; i++)
        {
            int nx = cell.x + DX[i];
            int ny = cell.y + DY[i];

            if (ny < minY || ny > maxY) continue;
            if (nx < faceStartX || nx >= faceEndX) continue;

            var neighbor = new Vector2Int(nx, ny);
            if (!visited.Add(neighbor)) continue;
            if (gridData.HasBlock(nx, ny)) continue;

            queue.Enqueue(neighbor);
        }
    }

    #endregion

    #region Grid Registration

    private List<int> RegisterCells(List<Vector2Int> cells)
    {
        var floodIDs = new List<int>(cells.Count);
        foreach (var cell in cells)
        {
            int id = GridManager.GetNextBlockID();
            _grid.gridData.SetCell(cell.x, cell.y, id);
            floodIDs.Add(id);
        }
        return floodIDs;
    }

    #endregion

    #region Visual

    private async Task SpawnVisualsAsync(List<Vector2Int> cells, List<Vector2Int> blockCells)
    {
        if (cells.Count == 0) return;

        float centerX = 0f;
        foreach (var c in blockCells) centerX += c.x;
        centerX /= blockCells.Count;

        cells.Sort((a, b) =>
        {
            float da = Mathf.Abs(a.x - centerX);
            float db = Mathf.Abs(b.x - centerX);
            if (!Mathf.Approximately(da, db)) return da.CompareTo(db);
            return a.y.CompareTo(b.y);
        });

        int lastDist = -1;
        var waveTasks = new List<Task>();

        foreach (var cell in cells)
        {
            int dist = Mathf.RoundToInt(Mathf.Abs(cell.x - centerX));

            if (dist != lastDist && waveTasks.Count > 0)
            {
                await Task.WhenAll(waveTasks);
                waveTasks.Clear();
                await Task.Delay((int)WAVE_DELAY_MS);
            }

            lastDist = dist;
            waveTasks.Add(SpawnOneBlock(cell.x, cell.y));
        }

        if (waveTasks.Count > 0)
            await Task.WhenAll(waveTasks);

        ResolveFloodGroupMesh(blockCells, cells);
    }

    private void ResolveFloodGroupMesh(List<Vector2Int> blockCells, List<Vector2Int> floodCells)
    {
        CellMeshLibrary meshLibrary = _grid.meshLibrary;
        if (meshLibrary == null) return;

        // Build set tất cả positions trong group (absolute)
        var allCells = new HashSet<Vector2Int>(blockCells.Count + floodCells.Count);
        foreach (var cell in blockCells) allCells.Add(cell);
        foreach (var cell in floodCells) allCells.Add(cell);

        // Resolve mesh cho từng cell dựa trên neighbors trong group
        foreach (var cell in allCells)
        {
            GameObject visual = _grid.visualizer.GetVisual(cell.x, cell.y);
            if (visual == null) continue;

            var blockVis = visual.GetComponent<BlockVisual>();
            if (blockVis == null) continue;

            blockVis.ResolveMesh(cell, allCells, meshLibrary);
        }
    }

    private async Task SpawnOneBlock(int x, int y)
    {
        var visualizer = _grid.visualizer;

        Vector3 localPos = visualizer.GetLocalPosition(x, y);
        int face = visualizer.GetFaceFromX(x);
        Quaternion rotation = visualizer.GetRotationForFace(face);
        Transform parent = _towerContainer ?? _grid.transform.parent;

        GameObject obj =  BlockFactory.Instance.CreateStaticBlock(
            localPos, rotation, parent, _floodMaterial);

        if (obj == null) return;

        var blockVis = obj.GetComponent<BlockVisual>();
        if (blockVis != null && _grid.meshLibrary?.full != null)
            blockVis.ChangeMeshToFull(_grid.meshLibrary.full);

        obj.transform.localScale = Vector3.zero;
        obj.transform.DOScale(Vector3.one, SCALE_DURATION).SetEase(Ease.OutBack);

        visualizer.SetVisual(x, y, obj);
    }

    #endregion
}