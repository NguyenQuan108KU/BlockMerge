using Difficulty;
using Sonat.Enums;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AddressableAssets;

[System.Serializable]
public struct PreplacedBlockData
{
    public int faceIndex;
    public int localX;
    public int y;
    public AssetReference blockShapeRef;
    public int colorIndex;
}

[CreateAssetMenu(fileName = "Level_Data", menuName = "TowerStack/Level Data")]
public class LevelDataSO : ScriptableObject
{
    [Header("Level Info")]
    public string levelID;
    public string displayName;
    public GameMode gameMode = GameMode.Classic;
    public LevelDifficulty difficulty = LevelDifficulty.Normal;
    public int targetGoal = 50;
    public float timeLimit = 120f;

    [Header("Flood Block")]
    [Tooltip("Số row cleared trước khi spawn flood block đầu tiên. 0 = tắt")]
    public int floodStartInterval = 5;
    [Tooltip("Mỗi lần spawn flood, interval tăng thêm")]
    public int floodIntervalIncrease = 2;

    [Header("Grid Configuration")]
    public GameConfig gameConfig;

    [Header("Floor Configuration")]
    [Range(3, 10)]
    public int levelWidth = 6;
    public GameObject floorPrefab;

    [Header("Level Data")]
    public List<PreplacedBlockData> mapData;

    [Header("Difficulty System")]
    public DifficultyConfig difficultyConfig;
    public ShapePoolSO shapePool;
    public List<BlockShapeSO> fixedStartSequence;

    public List<BlockShapeSO> GetSpawnableBag()
    {
        if (shapePool != null)
        {
            var bag = shapePool.CreateWeightedBag();
            shapePool.ShuffleBag(bag);
            return bag;
        }
        return new List<BlockShapeSO>();
    }

    #region Properties

    public int FaceWidth => levelWidth > 0 ? levelWidth : (gameConfig != null ? gameConfig.faceWidth : 6);
    public int MaxHeight => gameConfig != null ? gameConfig.height : 15;
    public int Perimeter => FaceWidth * 4;
    public int FloorCellCount => FaceWidth * 4 - 4;
    public bool HasValidConfig => gameConfig != null;
    public bool HasFloorPrefab => floorPrefab != null;

    #endregion

    #region Validation

    [System.Serializable]
    public class ValidationResult
    {
        public bool isValid = true;
        public List<string> errors = new List<string>();
        public List<string> warnings = new List<string>();
        public List<Vector2Int> occupiedCells = new List<Vector2Int>();

        public void AddError(string message)
        {
            isValid = false;
            errors.Add(message);
        }

        public void AddWarning(string message)
        {
            warnings.Add(message);
        }

        public void Clear()
        {
            isValid = true;
            errors.Clear();
            warnings.Clear();
            occupiedCells.Clear();
        }
    }

    public List<Vector2Int> GetOccupiedCells(int elementIndex)
    {
        List<Vector2Int> cells = new List<Vector2Int>();

        if (mapData == null || elementIndex < 0 || elementIndex >= mapData.Count)
            return cells;

        if (!HasValidConfig)
            return cells;

        var data = mapData[elementIndex];
        BlockShapeSO shape = GetShapeFromElement(data);
        if (shape == null) return cells;

        int pivotX = (data.faceIndex * FaceWidth) + data.localX;

        foreach (var offset in shape.structuralOffsets)
        {
            int rawX = pivotX + offset.x;
            int wrappedX = ((rawX % Perimeter) + Perimeter) % Perimeter;
            int cellY = data.y + offset.y;
            cells.Add(new Vector2Int(wrappedX, cellY));
        }

        return cells;
    }

    public ValidationResult ValidateElement(int elementIndex, HashSet<Vector2Int> previouslyOccupied = null)
    {
        ValidationResult result = new ValidationResult();

        if (!HasValidConfig)
        {
            result.AddError("GameConfig chưa được gán");
            return result;
        }

        if (mapData == null || elementIndex < 0 || elementIndex >= mapData.Count)
        {
            result.AddError("Invalid element index");
            return result;
        }

        var data = mapData[elementIndex];

        if (data.faceIndex < 0 || data.faceIndex > 3)
            result.AddError($"Face Index phải từ 0-3 (hiện tại: {data.faceIndex})");

        if (data.localX < 0)
            result.AddError($"Local X không được âm (hiện tại: {data.localX})");

        if (data.y < 0)
            result.AddError($"Y không được âm (hiện tại: {data.y})");

        if (data.blockShapeRef == null || !data.blockShapeRef.RuntimeKeyIsValid())
        {
            result.AddError("Block Shape chưa được gán");
            return result;
        }

        BlockShapeSO shape = GetShapeFromElement(data);
        if (shape == null)
        {
            result.AddError("Không thể load Block Shape");
            return result;
        }

        int pivotX = (data.faceIndex * FaceWidth) + data.localX;

        foreach (var offset in shape.structuralOffsets)
        {
            int localCellX = data.localX + offset.x;
            int cellY = data.y + offset.y;

            if (localCellX < 0 || localCellX >= FaceWidth)
                result.AddError($"Cell ({offset.x}, {offset.y}) tràn ra ngoài mặt {data.faceIndex}");

            if (cellY < 0)
                result.AddError($"Cell ({offset.x}, {offset.y}) có Y âm");

            if (cellY >= MaxHeight)
                result.AddError($"Cell ({offset.x}, {offset.y}) vượt quá chiều cao tối đa");

            int rawX = pivotX + offset.x;
            int wrappedX = ((rawX % Perimeter) + Perimeter) % Perimeter;
            Vector2Int cellPos = new Vector2Int(wrappedX, cellY);
            result.occupiedCells.Add(cellPos);

            if (previouslyOccupied != null && previouslyOccupied.Contains(cellPos))
            {
                result.AddWarning($"Cell ({wrappedX}, {cellY}) bị OVERLAP");
                result.isValid = false;
            }
        }

        return result;
    }

    public ValidationResult ValidateAll()
    {
        ValidationResult totalResult = new ValidationResult();

        if (!HasValidConfig)
        {
            totalResult.AddError("GameConfig chưa được gán!");
            return totalResult;
        }

        HashSet<Vector2Int> allOccupiedCells = new HashSet<Vector2Int>();

        if (mapData == null || mapData.Count == 0)
            return totalResult;

        for (int i = 0; i < mapData.Count; i++)
        {
            ValidationResult elementResult = ValidateElement(i, allOccupiedCells);

            foreach (var error in elementResult.errors)
                totalResult.AddError($"Element {i}: {error}");

            foreach (var warning in elementResult.warnings)
                totalResult.AddWarning($"Element {i}: {warning}");

            foreach (var cell in elementResult.occupiedCells)
            {
                if (!allOccupiedCells.Contains(cell))
                    allOccupiedCells.Add(cell);
            }
        }

        totalResult.occupiedCells = new List<Vector2Int>(allOccupiedCells);
        return totalResult;
    }

    private BlockShapeSO GetShapeFromElement(PreplacedBlockData data)
    {
#if UNITY_EDITOR
        if (data.blockShapeRef != null && data.blockShapeRef.editorAsset != null)
            return data.blockShapeRef.editorAsset as BlockShapeSO;
#endif
        return null;
    }

    public bool CanSave()
    {
        if (!HasValidConfig) return false;
        var result = ValidateAll();
        return result.isValid;
    }

    #endregion

#if UNITY_EDITOR
    [ContextMenu("Print Cell Layout")]
    public void PrintCellLayout()
    {
        if (!HasValidConfig)
        {
            Debug.LogError("GameConfig chưa được gán!");
            return;
        }

        if (mapData == null || mapData.Count == 0)
        {
            Debug.Log("Map Data is empty");
            return;
        }

        Debug.Log($"=== CELL LAYOUT: {displayName} ===");
        Debug.Log($"Config: FaceWidth={FaceWidth}, MaxHeight={MaxHeight}, Perimeter={Perimeter}");
    }
#endif
}