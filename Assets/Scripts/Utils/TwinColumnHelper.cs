using UnityEngine;

/// <summary>
/// TwinColumnHelper - Shared utility cho Twin Column logic
/// 
/// Twin columns là các cột ở góc của tower (chỗ 2 mặt gặp nhau).
/// Chúng chia sẻ cùng 1 vị trí vật lý nên cần xử lý đặc biệt.
/// 
/// Ví dụ với faceWidth = 6, perimeter = 24:
/// - Cột 5 và 6 là twin (góc Face0-Face1)
/// - Cột 11 và 12 là twin (góc Face1-Face2)
/// - Cột 17 và 18 là twin (góc Face2-Face3)
/// - Cột 23 và 0 là twin (góc Face3-Face0)
/// </summary>
public static class TwinColumnHelper
{
    #region Core Methods

    /// <summary>
    /// Lấy twin column của một cột (nếu có)
    /// </summary>
    /// <returns>Twin column index, hoặc -1 nếu không phải corner column</returns>
    public static int GetTwinColumn(int col, int faceWidth, int perimeter)
    {
        // Cột cuối của mỗi face (5, 11, 17, 23 với faceWidth=6)
        if ((col + 1) % faceWidth == 0)
        {
            return (col + 1) % perimeter;
        }

        // Cột đầu của mỗi face (0, 6, 12, 18 với faceWidth=6)
        if (col % faceWidth == 0)
        {
            return (col - 1 + perimeter) % perimeter;
        }

        return -1;
    }

    /// <summary>
    /// Overload sử dụng GameConfig
    /// </summary>
    public static int GetTwinColumn(int col, GameConfig config)
    {
        if (config == null) return -1;
        return GetTwinColumn(col, config.faceWidth, config.Perimeter);
    }

    /// <summary>
    /// Kiểm tra cột có phải corner column không
    /// </summary>
    public static bool IsCornerColumn(int col, int faceWidth, int perimeter)
    {
        return GetTwinColumn(col, faceWidth, perimeter) != -1;
    }

    /// <summary>
    /// Overload sử dụng GameConfig
    /// </summary>
    public static bool IsCornerColumn(int col, GameConfig config)
    {
        if (config == null) return false;
        return IsCornerColumn(col, config.faceWidth, config.Perimeter);
    }

    /// <summary>
    /// Lấy canonical column (cột đại diện cho cặp twin)
    /// Dùng để tránh xử lý trùng lặp
    /// </summary>
    public static int GetCanonicalColumn(int col, int faceWidth, int perimeter)
    {
        int twin = GetTwinColumn(col, faceWidth, perimeter);
        if (twin == -1) return col;

        // Special case: cột 0 và cột cuối (perimeter-1)
        if (col == 0 && twin == perimeter - 1) return col;
        if (col == perimeter - 1 && twin == 0) return twin;

        return Mathf.Min(col, twin);
    }

    /// <summary>
    /// Overload sử dụng GameConfig
    /// </summary>
    public static int GetCanonicalColumn(int col, GameConfig config)
    {
        if (config == null) return col;
        return GetCanonicalColumn(col, config.faceWidth, config.Perimeter);
    }

    /// <summary>
    /// Kiểm tra cột có phải canonical không
    /// </summary>
    public static bool IsCanonicalColumn(int col, int faceWidth, int perimeter)
    {
        return GetCanonicalColumn(col, faceWidth, perimeter) == col;
    }

    /// <summary>
    /// Overload sử dụng GameConfig
    /// </summary>
    public static bool IsCanonicalColumn(int col, GameConfig config)
    {
        if (config == null) return true;
        return IsCanonicalColumn(col, config.faceWidth, config.Perimeter);
    }

    #endregion

    #region Wrap Utilities

    /// <summary>
    /// Wrap X coordinate để luôn nằm trong [0, perimeter)
    /// </summary>
    public static int WrapX(int x, int perimeter)
    {
        return ((x % perimeter) + perimeter) % perimeter;
    }

    /// <summary>
    /// Overload sử dụng GameConfig
    /// </summary>
    public static int WrapX(int x, GameConfig config)
    {
        if (config == null) return x;
        return WrapX(x, config.Perimeter);
    }

    #endregion

    #region Face Utilities

    /// <summary>
    /// Lấy face index từ global X
    /// </summary>
    public static int GetFaceFromX(int globalX, int faceWidth)
    {
        return globalX / faceWidth;
    }

    /// <summary>
    /// Overload sử dụng GameConfig
    /// </summary>
    public static int GetFaceFromX(int globalX, GameConfig config)
    {
        if (config == null) return 0;
        return GetFaceFromX(globalX, config.faceWidth);
    }

    /// <summary>
    /// Lấy local X trong face
    /// </summary>
    public static int GetLocalXInFace(int globalX, int faceWidth)
    {
        return globalX % faceWidth;
    }

    #endregion

    #region Validation

    /// <summary>
    /// Kiểm tra 2 cột có phải twin của nhau không
    /// </summary>
    public static bool AreTwinColumns(int col1, int col2, int faceWidth, int perimeter)
    {
        int twin1 = GetTwinColumn(col1, faceWidth, perimeter);
        return twin1 == col2;
    }

    /// <summary>
    /// Kiểm tra position có valid không
    /// </summary>
    public static bool IsValidPosition(int x, int y, int perimeter, int height)
    {
        return x >= 0 && x < perimeter && y >= 0 && y < height;
    }

    #endregion
}