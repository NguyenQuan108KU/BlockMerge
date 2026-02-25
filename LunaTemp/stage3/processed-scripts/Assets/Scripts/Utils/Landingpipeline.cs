using Cysharp.Threading.Tasks;
using SonatFramework.Systems.EventBus;
using System.Collections.Generic;
using UnityEngine;


public struct LandingContext
{
    public float PivotLogicX;
    public int LandingRow;
    public int BlockID;
    public Material BlockMaterial;
    public BlockShapeSO Shape;
    public bool IsFloodBlock;
    public List<GameObject> ChildBlocks;
    public Transform TowerContainer;
}

public struct LandingResult
{
    public int LandingRow;
}

public class LandingPipeline
{
    private readonly GridManager _grid;

    // [PERF] Reuse mỗi drop — không new mỗi lần
    private readonly List<GameObject> _objsCache = new System.Collections.Generic.List<UnityEngine.GameObject>();
    private readonly List<Vector2Int> _coordsCache = new System.Collections.Generic.List<UnityEngine.Vector2Int>();
    private readonly HashSet<int> _affectedRowsCache = new System.Collections.Generic.HashSet<int>();

    public LandingPipeline(GridManager grid)
    {
        _grid = grid;
    }

    public LandingResult Execute([Bridge.Ref] LandingContext ctx)
    {
        // 1. Clear caches
        _objsCache.Clear();
        _coordsCache.Clear();
        _affectedRowsCache.Clear();

        // 2. Register blocks to grid
        RegisterBlocksToGrid(ctx);

        // 3. Post-land: Slide
        if (ctx.Shape.slideDirection != Vector2Int.zero && _coordsCache.Count > 0)
        {
            var result = ExecuteSlide(ctx);
            if (result.GridChanged)
            {
                _coordsCache.Clear();
                foreach (var cell in result.FinalCells)
                    _coordsCache.Add(cell);
                foreach (int row in result.AffectedRows)
                    _affectedRowsCache.Add(row);
            }
        }

        // 4. Post-land: Flood fill
        if (ctx.IsFloodBlock && _coordsCache.Count > 0)
        {
            var result = ExecuteFloodFill(ctx);
            if (result.GridChanged)
            {
                foreach (int row in result.AffectedRows)
                    _affectedRowsCache.Add(row);
            }
        }

        // 5. Register undo
        if (_objsCache.Count > 0)
        {
            EventBus<RegisterMoveEvent>.Raise(new RegisterMoveEvent
            {
                Shape = ctx.Shape,
                Objs = _objsCache,
                Coords = _coordsCache
            });
        }

        // 6. Count + Clear rows
        bool hasFullRows = _grid.CountFullRows(_affectedRowsCache) > 0;

        if (hasFullRows)
        {
            _grid.CheckAndClearRowsAsync(_affectedRowsCache).Forget();
        }
        else
        {
            EventBus<GridStableEvent>.Raise(new GridStableEvent());
        }

        return new LandingResult
        {
            LandingRow = ctx.LandingRow
        };
    }

    #region Grid Registration

    private void RegisterBlocksToGrid([Bridge.Ref] LandingContext ctx)
    {
        int count = Mathf.Min(ctx.ChildBlocks.Count, ctx.Shape.structuralOffsets.Count);
        for (int i = 0; i < count; i++)
        {
            Vector2Int offset = ctx.Shape.structuralOffsets[i];
            GameObject smartCell = ctx.ChildBlocks[i];
            float cellLogicX = ctx.PivotLogicX + offset.x;
            int cellRow = ctx.LandingRow + offset.y;

            _grid.RegisterCell(cellLogicX, ctx.BlockID, smartCell, _affectedRowsCache, cellRow);
            int wrappedX = _grid.GetWrappedX(Mathf.RoundToInt(cellLogicX));

            _objsCache.Add(smartCell);
            _coordsCache.Add(new Vector2Int(wrappedX, cellRow));
        }
    }

    #endregion

    #region Post-Land Effects

    private PostLandContext BuildPostLandContext([Bridge.Ref] LandingContext ctx)
    {
        int faceIndex = _coordsCache[0].x / _grid.faceWidth;

        return new PostLandContext
        {
            GridData = _grid.gridData,
            Visualizer = _grid.visualizer,
            Config = _grid.config,
            BlockCells = new List<Vector2Int>(_coordsCache),
            BlockID = ctx.BlockID,
            FaceIndex = faceIndex
        };
    }

    private SlideResult ExecuteSlide([Bridge.Ref] LandingContext ctx)
    {
        var postCtx = BuildPostLandContext(ctx);
        return new SlideExecutor(ctx.Shape.slideDirection).Execute(postCtx);
    }

    private SlideResult ExecuteFloodFill([Bridge.Ref] LandingContext ctx)
    {
        var postCtx = BuildPostLandContext(ctx);
        Material floodMat = _grid.config.blockPalette?.floodMaterial ?? ctx.BlockMaterial;
        return new FloodFillExecutor(_grid, ctx.TowerContainer, floodMat).Execute(postCtx);
    }

    #endregion
}