using UnityEngine;
using System.Collections.Generic;


public static class SmartMeshResolver
{
    public static Mesh Resolve(Vector2Int p, HashSet<Vector2Int> set, CellMeshLibrary lib)
    {
        if (lib == null || set == null) return null;

        bool hasUp = set.Contains(p + Vector2Int.up);
        bool hasDown = set.Contains(p + Vector2Int.down);
        bool hasLeft = set.Contains(p + Vector2Int.left);
        bool hasRight = set.Contains(p + Vector2Int.right);

        int mask = 0;
        if (hasUp) mask |= 1;
        if (hasDown) mask |= 2;
        if (hasLeft) mask |= 4;
        if (hasRight) mask |= 8;

        switch (mask)
        {
            // === KHỐI ĐƠN (không hàng xóm) ===
            case 0: return lib.full;

            // === KHỐI LÕI (4 hàng xóm) ===
            case 15: return lib.center;

            // === EDGE: 1 hàng xóm → cell ở phía NGƯỢC LẠI ===
            case 1: return lib.edgeBottom;  // có Up    → cell ở dưới
            case 2: return lib.edgeTop;     // có Down  → cell ở trên
            case 8: return lib.edgeLeft;    // có Right → cell ở trái
            case 4: return lib.edgeRight;   // có Left  → cell ở phải

            // === STRAIGHT: 2 hàng xóm đối diện ===
            case 3: return lib.straightVer ?? lib.center;  // Up+Down
            case 12: return lib.straightHor ?? lib.center;  // Left+Right

            // === CORNER: 2 hàng xóm kề → cell ở góc NGƯỢC LẠI ===
            case 10: return lib.cornerTL;    // có Down+Right → cell ở trên-trái
            case 6: return lib.cornerTR;    // có Down+Left  → cell ở trên-phải
            case 9: return lib.cornerBL;    // có Up+Right   → cell ở dưới-trái
            case 5: return lib.cornerBR;    // có Up+Left    → cell ở dưới-phải

            // === TRIPLE: 3 hàng xóm → cell ở cạnh hướng CỤT ===
            case 14: return lib.tripleTop;    // có D+L+R (cụt Up)    → cell ở cạnh trên
            case 13: return lib.tripleBottom; // có U+L+R (cụt Down)  → cell ở cạnh dưới
            case 11: return lib.tripleLeft;   // có U+D+R (cụt Left)  → cell ở cạnh trái
            case 7: return lib.tripleRight;  // có U+D+L (cụt Right) → cell ở cạnh phải

            default: return lib.full;
        }
    }
}