using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// GridFloorSpawner - Spawn các gạch nền (floor) cho tháp
/// Floor cells = levelWidth × 4 - 4 (trừ 4 góc trùng)
/// </summary>
public class GridFloorSpawner
{

    private static readonly Vector3 FLOOR_SCALE = new Vector3(0.9f, 1f, 0.9f);
    private const float FLOOR_Y = 0f;
    private const string FLOOR_TAG = "Floor";  // Optional: Tag để dễ tìm

    private readonly List<GameObject> spawnedFloors = new List<GameObject>();

    /// <summary>
    /// Spawn tất cả floor cells cho level
    /// </summary>
    /// <param name="width">Chiều rộng mỗi mặt (faceWidth)</param>
    /// <param name="prefab">Prefab gạch nền</param>
    /// <param name="container">Parent transform (Container trong Tower)</param>
    /// <param name="tileSize">Kích thước mỗi ô (thường = 1)</param>
    public void SpawnFloor(int width, GameObject prefab, Transform container, float tileSize = 1f)
    {
        if (prefab == null)
        {
            Debug.LogWarning("[GridFloorSpawner] Floor prefab is null!");
            return;
        }

        if (container == null)
        {
            Debug.LogWarning("[GridFloorSpawner] Container is null!");
            return;
        }

        // Clear floor cũ trước
        ClearFloor();

        int perimeter = width * 4;
        float gridRadius = (width * tileSize) / 2f - 0.5f;

        // HashSet để track các góc đã spawn (tránh spawn trùng)
        HashSet<int> spawnedCorners = new HashSet<int>();

        // Spawn cho 4 mặt
        for (int face = 0; face < 4; face++)
        {
            for (int localX = 0; localX < width; localX++)
            {
                int globalX = face * width + localX;

                // Kiểm tra góc trùng
                bool isCorner = (localX == 0 || localX == width - 1);

                if (isCorner)
                {
                    // Tính corner ID để check trùng
                    int cornerId = GetCornerId(face, localX, width);

                    if (spawnedCorners.Contains(cornerId))
                    {
                        // Góc này đã spawn rồi, skip
                        continue;
                    }

                    spawnedCorners.Add(cornerId);
                }

                // Tính vị trí world
                Vector3 worldPos = CalculateFloorPosition(face, localX, width, tileSize, gridRadius);

                // Tính rotation cho mặt
                Quaternion rotation = GetRotationForFace(face);

                // Spawn floor cell
                GameObject floor = Object.Instantiate(prefab, container);
                floor.transform.localPosition = worldPos;
                floor.transform.localRotation = rotation;
                floor.transform.localScale = FLOOR_SCALE;
                floor.name = $"Floor_{face}_{localX}";

                spawnedFloors.Add(floor);
            }
        }

        //Debug.Log($"[GridFloorSpawner] Spawned {spawnedFloors.Count} floor cells (width={width})");
    }

    /// <summary>
    /// Xóa tất cả floor cells
    /// </summary>
    public void ClearFloor()
    {
        foreach (var floor in spawnedFloors)
        {
            if (floor != null)
            {
                Object.Destroy(floor);
            }
        }
        spawnedFloors.Clear();
    }

    /// <summary>
    /// Xóa floor trong một container cụ thể (dùng khi chưa có reference)
    /// </summary>
    public void ClearFloorInContainer(Transform container)
    {
        if (container == null) return;

        List<GameObject> toDestroy = new List<GameObject>();

        foreach (Transform child in container)
        {
            if (child.name.StartsWith("Floor_"))
            {
                toDestroy.Add(child.gameObject);
            }
        }

        foreach (var obj in toDestroy)
        {
            Object.Destroy(obj);
        }

        spawnedFloors.Clear();
    }


    /// <summary>
    /// Tính vị trí local của floor cell
    /// </summary>
    private Vector3 CalculateFloorPosition(int face, int localX, int width, float tileSize, float gridRadius)
    {
        // Tính offset X từ tâm mặt
        float offsetX = (localX - (width - 1) / 2f) * tileSize;

        // Vị trí dựa trên mặt
        switch (face)
        {
            case 0: // Front (Z-)
                return new Vector3(offsetX, FLOOR_Y, -gridRadius);

            case 1: // Right (X+)
                return new Vector3(gridRadius, FLOOR_Y, offsetX);

            case 2: // Back (Z+)
                return new Vector3(-offsetX, FLOOR_Y, gridRadius);

            case 3: // Left (X-)
                return new Vector3(-gridRadius, FLOOR_Y, -offsetX);

            default:
                return Vector3.zero;
        }
    }

    /// <summary>
    /// Lấy rotation cho mỗi mặt
    /// </summary>
    private Quaternion GetRotationForFace(int face)
    {
        switch (face)
        {
            case 0: return Quaternion.Euler(0, 0, 0);      // Front
            case 1: return Quaternion.Euler(0, 90, 0);     // Right
            case 2: return Quaternion.Euler(0, 180, 0);    // Back
            case 3: return Quaternion.Euler(0, 270, 0);    // Left
            default: return Quaternion.identity;
        }
    }

    private int GetCornerId(int face, int localX, int width)
    {
        bool isLeftEdge = (localX == 0);
        bool isRightEdge = (localX == width - 1);

        // Map về 4 góc cố định
        if (face == 0 && isLeftEdge) return 0;   // Front-Left
        if (face == 3 && isRightEdge) return 0;  // Front-Left (same corner)

        if (face == 0 && isRightEdge) return 1;  // Front-Right
        if (face == 1 && isLeftEdge) return 1;   // Front-Right (same corner)

        if (face == 1 && isRightEdge) return 2;  // Back-Right
        if (face == 2 && isLeftEdge) return 2;   // Back-Right (same corner)

        if (face == 2 && isRightEdge) return 3;  // Back-Left
        if (face == 3 && isLeftEdge) return 3;   // Back-Left (same corner)

        // Không phải góc (không nên đến đây)
        return -1;
    }


}