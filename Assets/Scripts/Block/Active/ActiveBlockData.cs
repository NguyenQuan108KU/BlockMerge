using System;
using UnityEngine;

/// <summary>
/// Quản lý data và state của Active Block
/// Pure data class - không có logic phức tạp
/// </summary>
[Serializable]
public class ActiveBlockData
{
   
    #region Position Data

    [Header("Position")]
    public int currentFaceIndex = 0;
    public float localX = 0f;

    /// <summary>
    /// Logic X = faceIndex * faceWidth + localX
    /// </summary>
    public float GetLogicX(int faceWidth)
    {
        return (currentFaceIndex * faceWidth) + localX;
    }

    #endregion

    #region State

    [Header("State")]
    public int logicY;
    public int blockID;
    public bool isDropping = false;
    public bool isReady = false;
    public int lastLandingRow = -1;
    public int lastLandingX = -1;
    public int lastLandingY = -1;

    #endregion

    #region Visual

    [Header("Visual")]
    public Material currentMaterial;

    public event Action<Material> OnMaterialChanged;

    public void SetMaterial(Material mat)
    {
        currentMaterial = mat;
        OnMaterialChanged?.Invoke(mat);
    }

    #endregion

    #region Reset

    /// <summary>
    /// Reset state khi spawn block mới
    /// </summary>
    public void ResetForNewBlock()
    {
        isDropping = false;
        isReady = false;
        lastLandingX = -1;    // [THÊM]
        lastLandingY = -1;    // [THÊM]
    }

    /// <summary>
    /// Đánh dấu block đã sẵn sàng
    /// </summary>
    public void SetReady()
    {
        isReady = true;
    }

    /// <summary>
    /// Bắt đầu drop
    /// </summary>
    public void StartDrop()
    {
        isDropping = true;
        isReady = false;
    }

    /// <summary>
    /// Kết thúc drop
    /// </summary>
    public void EndDrop()
    {
        isDropping = false;
    }

    #endregion

    #region Validation

    /// <summary>
    /// Kiểm tra có thể nhận input không
    /// </summary>
    public bool CanReceiveInput(GridManager grid)
    {
        return isReady && !isDropping && grid != null;
    }

    #endregion
}