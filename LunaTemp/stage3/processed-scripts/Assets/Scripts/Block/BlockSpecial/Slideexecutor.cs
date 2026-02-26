using DG.Tweening;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// SlideExecutor - Xử lý Slide Block sau khi land
/// 
/// Flow: Block land → Register vào grid → SlideExecutor.Execute()
///   1. Tính face boundary (không wrap qua face khác)
///   2. Trượt từng ô theo hướng đến khi bị chặn hoặc mép face
///   3. Nếu gặp hố (sàn trống) → rơi xuống → dừng
///   4. Data update sync (ngay lập tức), animation fire-and-forget
/// 
/// Design: Tách riêng khỏi ActiveBlockController.
///         Interface IPostLandEffect sẵn sàng cho mở rộng sau này.
/// </summary>
public interface IPostLandEffect
{
    int Priority { get; }
    SlideResult Execute(PostLandContext context);
}

public struct PostLandContext
{
    public GridData GridData;
    public GridVisualizer Visualizer;
    public GameConfig Config;
    public List<Vector2Int> BlockCells;    // cells hiện tại (canonical)
    public int BlockID;
    public int FaceIndex;
}

public struct SlideResult
{
    public bool GridChanged;
    public List<Vector2Int> FinalCells;
    public HashSet<int> AffectedRows;
}

public class SlideExecutor : IPostLandEffect
{
    public int Priority => 0;

    private readonly Vector2Int _direction;

    // Animation settings
    private const float SLIDE_DURATION_PER_CELL = 0.06f;
    private const float FALL_DURATION = 0.15f;
    private static readonly int SLIDE_EASE = 1;
    //private static readonly Ease SLIDE_EASE = Ease.Linear;
    //private static readonly Ease FALL_EASE = Ease.InQuad;
    private static readonly int FALL_EASE = 5;

    public SlideExecutor(Vector2Int direction)
    {
        _direction = direction;
    }

    #region Main Execute

    public SlideResult Execute([Bridge.Ref] PostLandContext ctx)
    {
        var result = new SlideResult
        {
            GridChanged = false,
            FinalCells = new List<Vector2Int>(ctx.BlockCells),
            AffectedRows = new HashSet<int>()
        };

        // Không có hướng slide → skip
        if (_direction == Vector2Int.zero) return result;

        int dirX = _direction.x; // -1 = trái, +1 = phải
        if (dirX == 0) return result;

        // 1. Tính face boundary
        int faceWidth = ctx.Config.faceWidth;
        int faceMin = ctx.FaceIndex * faceWidth;       // cột đầu face
        int faceMax = faceMin + faceWidth - 1;          // cột cuối face

        // Collect tất cả vị trí block sẽ đi qua (cho animation)
        var slidePath = new List<List<Vector2Int>>();
        slidePath.Add(CopyCells(result.FinalCells));

        // 2. Slide loop — dịch từng ô
        int slideSteps = 0;
        while (true)
        {
            if (!CanSlideOneStep(ctx.GridData, result.FinalCells, dirX, faceMin, faceMax, ctx.BlockID))
                break;

            // Dịch data 1 ô
            MoveBlockHorizontal(ctx.GridData, ctx.Visualizer, result.FinalCells, dirX, ctx.BlockID);
            slideSteps++;
            result.GridChanged = true;

            slidePath.Add(CopyCells(result.FinalCells));

            // Check sàn: nếu có hố → rơi → dừng
            int fallDist = CalculateFallDistance(ctx.GridData, result.FinalCells, ctx.BlockID);
            if (fallDist > 0)
            {
                // Collect rows trước khi rơi
                foreach (var cell in result.FinalCells)
                    result.AffectedRows.Add(cell.y);

                MoveBlockDown(ctx.GridData, ctx.Visualizer, result.FinalCells, fallDist, ctx.BlockID);
                result.GridChanged = true;

                // Collect rows sau khi rơi
                foreach (var cell in result.FinalCells)
                    result.AffectedRows.Add(cell.y);

                // Fire animation: slide path + fall
                FireSlideAndFallAnimation(ctx.Visualizer, ctx.GridData, result.FinalCells, slidePath, fallDist);

                ctx.GridData.RecalculateHeights();
                return result;
            }
        }

        // Collect affected rows (vị trí cuối)
        foreach (var cell in result.FinalCells)
            result.AffectedRows.Add(cell.y);

        // Fire animation: chỉ slide (không fall)
        if (slideSteps > 0)
        {
            FireSlideAnimation(ctx.Visualizer, result.FinalCells, slidePath);
            ctx.GridData.RecalculateHeights();
        }

        return result;
    }

    #endregion

    #region Slide Logic

    /// <summary>
    /// Check tất cả cells có thể dịch 1 ô theo hướng không
    /// </summary>
    private bool CanSlideOneStep(GridData gridData, List<Vector2Int> cells, int dirX, int faceMin, int faceMax, int blockID)
    {
        foreach (var cell in cells)
        {
            int nextX = cell.x + dirX;

            // Check mép face
            if (nextX < faceMin || nextX > faceMax)
                return false;

            // Check occupied bởi block KHÁC
            if (gridData.HasBlock(nextX, cell.y) && gridData.GetCell(nextX, cell.y) != blockID)
                return false;
        }
        return true;
    }

    /// <summary>
    /// Di chuyển block ngang 1 ô trong grid data + visual
    /// </summary>
    private void MoveBlockHorizontal(GridData gridData, GridVisualizer visualizer,
        List<Vector2Int> cells, int dirX, int blockID)
    {
        // 1. Collect visuals trước khi clear
        var visualMap = new Dictionary<Vector2Int, GameObject>();
        foreach (var cell in cells)
        {
            GameObject vis = visualizer.GetVisual(cell.x, cell.y);
            if (vis != null) visualMap[cell] = vis;
        }

        // 2. Clear old positions
        foreach (var cell in cells)
        {
            gridData.SetCellWithoutHeightUpdate(cell.x, cell.y, -1);
            visualizer.ClearVisualReference(cell.x, cell.y);
        }

        // 3. Update cell positions
        for (int i = 0; i < cells.Count; i++)
        {
            cells[i] = new Vector2Int(cells[i].x + dirX, cells[i].y);
        }

        // 4. Write new positions
        foreach (var cell in cells)
        {
            gridData.SetCellWithoutHeightUpdate(cell.x, cell.y, blockID);
        }

        // 5. Update visual references (không move transform — animation sẽ làm)
        foreach (var cell in cells)
        {
            // Tìm visual từ old position
            var oldCell = new Vector2Int(cell.x - dirX, cell.y);
            if (visualMap.TryGetValue(oldCell, out GameObject vis))
            {
                visualizer.SetVisual(cell.x, cell.y, vis);
            }
        }
    }

    #endregion

    #region Fall Logic

    /// <summary>
    /// Tính khoảng rơi tối thiểu cho toàn bộ block
    /// </summary>
    private int CalculateFallDistance(GridData gridData, List<Vector2Int> cells, int blockID)
    {
        int minFall = int.MaxValue;

        foreach (var cell in cells)
        {
            int fall = 0;
            for (int y = cell.y - 1; y >= 0; y--)
            {
                int idBelow = gridData.GetCell(cell.x, y);
                if (idBelow == -1 || idBelow == blockID)
                    fall++;
                else
                    break;
            }
            if (fall < minFall) minFall = fall;
        }

        return minFall == int.MaxValue ? 0 : minFall;
    }

    /// <summary>
    /// Di chuyển block xuống trong grid data + visual
    /// </summary>
    private void MoveBlockDown(GridData gridData, GridVisualizer visualizer,
        List<Vector2Int> cells, int fallDist, int blockID)
    {
        if (fallDist <= 0) return;

        // 1. Collect visuals
        var visualMap = new Dictionary<Vector2Int, GameObject>();
        foreach (var cell in cells)
        {
            GameObject vis = visualizer.GetVisual(cell.x, cell.y);
            if (vis != null) visualMap[cell] = vis;
        }

        // 2. Clear old
        foreach (var cell in cells)
        {
            gridData.SetCellWithoutHeightUpdate(cell.x, cell.y, -1);
            visualizer.ClearVisualReference(cell.x, cell.y);
        }

        // 3. Update positions
        for (int i = 0; i < cells.Count; i++)
        {
            cells[i] = new Vector2Int(cells[i].x, cells[i].y - fallDist);
        }

        // 4. Write new
        foreach (var cell in cells)
        {
            gridData.SetCellWithoutHeightUpdate(cell.x, cell.y, blockID);
        }

        // 5. Update visual references
        foreach (var cell in cells)
        {
            var oldCell = new Vector2Int(cell.x, cell.y + fallDist);
            if (visualMap.TryGetValue(oldCell, out GameObject vis))
            {
                visualizer.SetVisual(cell.x, cell.y, vis);
            }
        }
    }

    #endregion

    #region Animation (Fire-and-Forget)

    /// <summary>
    /// Animation slide + fall: visual catch up với data đã ở final position
    /// </summary>
    private void FireSlideAndFallAnimation(GridVisualizer visualizer, GridData gridData,
        List<Vector2Int> finalCells, List<List<Vector2Int>> slidePath, int fallDist)
    {
        // Collect unique visuals ở final position
        HashSet<int> animated = new HashSet<int>();

        foreach (var cell in finalCells)
        {
            GameObject vis = visualizer.GetVisual(cell.x, cell.y);
            if (vis == null) continue;

            int vid = vis.GetInstanceID();
            if (!animated.Add(vid)) continue;

            // Tính start position (vị trí ban đầu trước slide)
            var startCell = slidePath[0][finalCells.IndexOf(cell)];
            int canonicalStartX = TwinColumnHelper.GetCanonicalColumn(startCell.x, gridData.FaceWidth, gridData.Width);
            Vector3 startPos = visualizer.GetLocalPosition(canonicalStartX, startCell.y);

            // Tính slide end position (sau slide, trước fall)
            var slideEndCell = slidePath[slidePath.Count - 1][finalCells.IndexOf(cell)];
            int canonicalSlideEndX = TwinColumnHelper.GetCanonicalColumn(slideEndCell.x, gridData.FaceWidth, gridData.Width);
            Vector3 slideEndPos = visualizer.GetLocalPosition(canonicalSlideEndX, slideEndCell.y);

            // Tính final position (sau fall)
            int canonicalFinalX = TwinColumnHelper.GetCanonicalColumn(cell.x, gridData.FaceWidth, gridData.Width);
            Vector3 finalPos = visualizer.GetLocalPosition(canonicalFinalX, cell.y);

            // Set visual tại start position
            vis.transform.localPosition = startPos;
            vis.transform.DOKill();

            // Sequence: slide → fall
            float slideDuration = (slidePath.Count - 1) * SLIDE_DURATION_PER_CELL;
            Sequence seq = DOTween.Sequence();
            if (slideDuration > 0)
                seq.Append(vis.transform.DOLocalMove(slideEndPos, slideDuration).SetEase((Ease)SLIDE_EASE));
            seq.Append(vis.transform.DOLocalMove(finalPos, FALL_DURATION).SetEase((Ease)FALL_EASE));
        }
    }

    /// <summary>
    /// Animation chỉ slide (không fall)
    /// </summary>
    private void FireSlideAnimation(GridVisualizer visualizer, List<Vector2Int> finalCells,
        List<List<Vector2Int>> slidePath)
    {
        HashSet<int> animated = new HashSet<int>();

        foreach (var cell in finalCells)
        {
            GameObject vis = visualizer.GetVisual(cell.x, cell.y);
            if (vis == null) continue;

            int vid = vis.GetInstanceID();
            if (!animated.Add(vid)) continue;

            int cellIndex = finalCells.IndexOf(cell);

            // Start position
            var startCell = slidePath[0][cellIndex];
            int canonicalStartX = TwinColumnHelper.GetCanonicalColumn(startCell.x,
                GridManager.Instance.config.faceWidth, GridManager.Instance.config.Perimeter);
            Vector3 startPos = visualizer.GetLocalPosition(canonicalStartX, startCell.y);

            // Final position
            int canonicalFinalX = TwinColumnHelper.GetCanonicalColumn(cell.x,
                GridManager.Instance.config.faceWidth, GridManager.Instance.config.Perimeter);
            Vector3 finalPos = visualizer.GetLocalPosition(canonicalFinalX, cell.y);

            vis.transform.localPosition = startPos;
            vis.transform.DOKill();

            float slideDuration = (slidePath.Count - 1) * SLIDE_DURATION_PER_CELL;
            vis.transform.DOLocalMove(finalPos, slideDuration).SetEase((Ease)SLIDE_EASE);
        }
    }

    #endregion

    #region Utility

    private List<Vector2Int> CopyCells(List<Vector2Int> cells)
    {
        return new List<Vector2Int>(cells);
    }

    #endregion
}