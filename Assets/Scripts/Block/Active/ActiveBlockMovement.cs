using UnityEngine;

/// <summary>
/// Xử lý logic di chuyển của Active Block
/// Bao gồm: slide, move horizontal, face switching, clamping
/// </summary>
public class ActiveBlockMovement
{
    #region Settings

    public float FaceSwitchThreshold { get; set; } = 0.4f;
    public System.Action<int, int> OnFaceChanged;

    #endregion

    #region Dependencies

    private readonly GridManager grid;

    #endregion

    #region Constructor

    public ActiveBlockMovement(GridManager grid)
    {
        this.grid = grid;
    }

    #endregion

    #region Slide Input

    /// <summary>
    /// Xử lý input kéo (drag)
    /// </summary>
    public void HandleSlideInput(ActiveBlockData data, BlockShapeSO shape, float inputDelta)
    {
        if (!data.CanReceiveInput(grid) || shape == null) return;

        float sensitivity = grid.config?.blockDragSensitivity ?? 0.05f;
        data.localX += inputDelta * sensitivity;

        CheckFaceSwitch(data, shape);
    }

    #endregion

    #region Discrete Movement

    /// <summary>
    /// Di chuyển theo bước (nút trái/phải)
    /// </summary>
    public void MoveHorizontal(ActiveBlockData data, BlockShapeSO shape, int direction)
    {
        if (!data.CanReceiveInput(grid) || shape == null) return;

        data.localX += direction;
        CheckFaceSwitch(data, shape);
    }

    #endregion

    #region Absolute Position

    /// <summary>
    /// Đặt vị trí tuyệt đối (0-1 normalized)
    /// </summary>
    public void SetAbsolutePosition(ActiveBlockData data, BlockShapeSO shape, float normalizedPos)
    {
        if (!data.CanReceiveInput(grid) || shape == null) return;

        int faceW = grid.faceWidth;

        // Tính localX mục tiêu
        float targetLocalX = normalizedPos * (faceW - 1);

        // Clamp theo shape
        float minLocalX = -shape.minX;
        float maxLocalX = (faceW - 1) - shape.maxX;
        targetLocalX = Mathf.Clamp(targetLocalX, minLocalX, maxLocalX);

        // Smoothing
        float smoothing = grid.config?.absolutePositionSmoothing ?? 0.1f;

        if (smoothing > 0.001f)
        {
            data.localX = Mathf.Lerp(data.localX, targetLocalX, 1f - smoothing);
        }
        else
        {
            data.localX = targetLocalX;
        }
    }

    #endregion

    #region Face Switching

    /// <summary>
    /// Kiểm tra và xử lý chuyển mặt tháp
    /// </summary>
    public void CheckFaceSwitch(ActiveBlockData data, BlockShapeSO shape)
    {
        if (shape == null) return;

        int faceW = grid.faceWidth;
        float leftEdge = data.localX + shape.minX;
        float rightEdge = data.localX + shape.maxX;

        // Kiểm tra tràn phải
        if (rightEdge > (faceW - 1) + FaceSwitchThreshold)
        {
            FlipFace(data, 1);
            data.localX -= faceW;
        }
        // Kiểm tra tràn trái
        else if (leftEdge < 0 - FaceSwitchThreshold)
        {
            FlipFace(data, -1);
            data.localX += faceW;
        }

        // Clamp trong bounds
        ClampPosition(data, shape, faceW);
    }

    private void FlipFace(ActiveBlockData data, int direction)
    {
        int oldFace = data.currentFaceIndex;

        data.currentFaceIndex += direction;
        if (data.currentFaceIndex > 3) data.currentFaceIndex = 0;
        if (data.currentFaceIndex < 0) data.currentFaceIndex = 3;

        OnFaceChanged?.Invoke(oldFace, data.currentFaceIndex);
    }

    private void ClampPosition(ActiveBlockData data, BlockShapeSO shape, int faceW)
    {
        // Clamp phải
        if (data.localX + shape.maxX > (faceW - 1) + FaceSwitchThreshold)
        {
            data.localX = (faceW - 1) + FaceSwitchThreshold - shape.maxX;
        }

        // Clamp trái
        if (data.localX + shape.minX < -FaceSwitchThreshold)
        {
            data.localX = -FaceSwitchThreshold - shape.minX;
        }
    }

    #endregion

    #region Edge Detection

    /// <summary>
    /// Kiểm tra ghost block có đang ở mép face hay không.
    /// Dùng cho edge fill indicator — chỉ fill khi ghost ở boundary.
    /// </summary>
    public bool IsAtFaceEdge(ActiveBlockData data, BlockShapeSO shape, int direction)
    {
        if (shape == null || grid == null) return false;

        int faceW = grid.faceWidth;

        if (direction > 0)
            return data.localX + shape.maxX >= faceW - 1;
        else
            return data.localX + shape.minX <= 0;
    }

    #endregion

    #region Initialization Helpers

    /// <summary>
    /// Tính localX để block nằm giữa mặt tháp
    /// </summary>
    public float CalculateCenteredLocalX(BlockShapeSO shape)
    {
        if (shape == null || grid == null) return 0f;

        int shapeWidth = shape.structuralOffsets.Count > 0
            ? (shape.width > 0 ? shape.width : 1)
            : 1;

        float centeringOffset = (grid.faceWidth - shapeWidth) / 2f;
        return centeringOffset - shape.minX;
    }

    #endregion

    #region Landing

    /// <summary>
    /// Làm tròn vị trí trước khi drop
    /// </summary>
    public void SnapToGrid(ActiveBlockData data)
    {
        data.localX = Mathf.Round(data.localX);
    }

    /// <summary>
    /// Lấy vị trí landing Y
    /// </summary>
    public float GetLandingY(ActiveBlockData data, BlockShapeSO shape)
    {
        if (grid == null || shape == null) return 0f;

        float finalLogicX = data.GetLogicX(grid.faceWidth);
        return grid.GetLandingYForShape(shape.structuralOffsets, finalLogicX);
    }

    #endregion
}