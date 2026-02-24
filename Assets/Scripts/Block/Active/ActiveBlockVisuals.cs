using UnityEngine;
using DG.Tweening;
using Cysharp.Threading.Tasks;

/// <summary>
/// Xử lý visual và animation của Active Block
/// </summary>
public class ActiveBlockVisuals
{
    #region Settings

    public float MoveDuration { get; set; } = 0.05f;
    public float RotateDuration { get; set; } = 0.15f;
    public float DropDuration { get; set; } = 0.3f;

    #endregion

    #region Dependencies

    private readonly Transform blockTransform;
    private readonly GridManager grid;

    #endregion

    #region Constructor

    public ActiveBlockVisuals(Transform transform, GridManager grid)
    {
        this.blockTransform = transform;
        this.grid = grid;
    }

    #endregion

    #region Update Visuals

    /// <summary>
    /// Cập nhật vị trí và rotation của block
    /// </summary>
    public void UpdateVisuals(ActiveBlockData data, bool isSmooth)
    {
        if (grid == null) return;

        float globalLogX = data.GetLogicX(grid.faceWidth);
        Vector3 targetPos = grid.GetLocalPosition(globalLogX, data.logicY);

        float targetAngleY = data.currentFaceIndex * -90f;
        Quaternion targetRot = Quaternion.Euler(0, targetAngleY, 0);

        if (isSmooth)
        {
            // [PERF] Lerp trực tiếp — không tạo/kill DOTween mỗi frame khi drag
            // MoveDuration (0.05s) ≈ 3 frames @ 60fps → Lerp factor ~0.3 cho cảm giác tương tự
            float moveLerp = 1f - Mathf.Pow(0.01f, Time.deltaTime / Mathf.Max(MoveDuration, 0.001f));
            float rotLerp = 1f - Mathf.Pow(0.01f, Time.deltaTime / Mathf.Max(RotateDuration, 0.001f));

            blockTransform.localPosition = Vector3.Lerp(blockTransform.localPosition, targetPos, moveLerp);
            blockTransform.localRotation = Quaternion.Slerp(blockTransform.localRotation, targetRot, rotLerp);
        }
        else
        {
            blockTransform.DOKill();
            blockTransform.localPosition = targetPos;
            blockTransform.localRotation = targetRot;
        }
    }

    #endregion

    #region Drop Animation

    /// <summary>
    /// Animation drop xuống vị trí landing
    /// </summary>
    public async UniTask AnimateDrop(float landingY)
    {
        float duration = grid?.config?.dropDuration ?? DropDuration;

        await blockTransform
            .DOLocalMoveY(landingY, duration)
            .SetEase(Ease.InQuad)
            .AsyncWaitForCompletion();
    }

    /// <summary>
    /// Đặt block tại vị trí landing (không animation)
    /// </summary>
    public void SnapToLanding(float yPos)
    {
        Vector3 pos = blockTransform.localPosition;
        pos.y = yPos;
        blockTransform.localPosition = pos;
    }

    #endregion

    #region Spawn Animation

    /// <summary>
    /// Animation khi spawn block mới
    /// </summary>
    public void PlaySpawnAnimation()
    {
        blockTransform.localScale = Vector3.zero;
        blockTransform.DOScale(Vector3.one, 0.2f).SetEase(Ease.OutBack);
    }

    #endregion

    #region Cleanup

    /// <summary>
    /// Dừng tất cả animation
    /// </summary>
    public void StopAllAnimations()
    {
        blockTransform.DOKill();
    }

    #endregion
}