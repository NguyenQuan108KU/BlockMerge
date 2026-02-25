using UnityEngine;

[CreateAssetMenu(fileName = "NewCellLibrary", menuName = "Game/Cell Mesh Library")]
public class CellMeshLibrary : ScriptableObject
{
    [Header("1. Khối Đơn")]
    public Mesh full;

    [Header("2. Khối Thân (MỚI)")]
    public Mesh straightVer; // Thân dọc (cho thanh 1x3)
    public Mesh straightHor; // Thân ngang (cho thanh 3x1)
    public Mesh center;      // Lõi 

    [Header("3. Khối Cạnh (Đầu mút)")]
    public Mesh edgeTop;
    public Mesh edgeBottom;
    public Mesh edgeLeft;
    public Mesh edgeRight;

    [Header("4. Khối Góc")]
    public Mesh cornerTL;
    public Mesh cornerTR;
    public Mesh cornerBL;
    public Mesh cornerBR;

    // --- PHẦN MỚI THÊM VÀO ---
    [Header("5. Khối Ngã Ba (Triples)")]
    public Mesh tripleTop;    // Ngã ba có kết nối lên TRÊN (Cụt dưới)
    public Mesh tripleBottom; // Ngã ba có kết nối xuống DƯỚI (Cụt trên)
    public Mesh tripleLeft;   // Ngã ba có kết nối sang TRÁI (Cụt phải)
    public Mesh tripleRight;  // Ngã ba có kết nối sang PHẢI (Cụt trái)
}