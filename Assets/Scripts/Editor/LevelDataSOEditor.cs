#if UNITY_EDITOR
using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using UnityEngine.AddressableAssets;
using Sonat.Enums;

[CustomEditor(typeof(LevelDataSO))]
public class LevelDataSOEditor : Editor
{
    private LevelDataSO.ValidationResult _validation;
    private Dictionary<int, LevelDataSO.ValidationResult> _elementValidations = new();
    private bool _showMapData = true;
    private Dictionary<int, bool> _elementFoldouts = new();
    private bool _needsRevalidation = true;

    public override void OnInspectorGUI()
    {
        var data = (LevelDataSO)target;

        EditorGUI.BeginChangeCheck();

        DrawHeader();
        EditorGUILayout.Space(5);

        DrawLevelInfo(data);
        EditorGUILayout.Space(10);

        DrawGridConfig(data);
        EditorGUILayout.Space(10);

        DrawFloorConfig(data);
        EditorGUILayout.Space(10);

        DrawFloodConfig(data);
        EditorGUILayout.Space(10);

        DrawDifficultySystem(data);
        EditorGUILayout.Space(10);

        DrawMapData(data);
        EditorGUILayout.Space(10);

        DrawValidationSummary(data);
        EditorGUILayout.Space(10);

        DrawActions(data);

        if (EditorGUI.EndChangeCheck())
        {
            _needsRevalidation = true;
            Undo.RecordObject(data, "Modify Level Data");
            EditorUtility.SetDirty(data);
        }

        if (_needsRevalidation)
        {
            RevalidateAll(data);
            _needsRevalidation = false;
        }
    }

    private void DrawHeader()
    {
        var style = new GUIStyle(EditorStyles.boldLabel)
        {
            fontSize = 16,
            alignment = TextAnchor.MiddleCenter
        };
        EditorGUILayout.LabelField("LEVEL EDITOR", style, GUILayout.Height(25));
    }

    private void DrawLevelInfo(LevelDataSO data)
    {
        EditorGUILayout.LabelField("Level Info", EditorStyles.boldLabel);
        EditorGUILayout.BeginVertical("box");

        data.levelID = EditorGUILayout.TextField("Level ID", data.levelID);
        data.displayName = EditorGUILayout.TextField("Display Name", data.displayName);
        data.gameMode = (GameMode)EditorGUILayout.EnumPopup("Game Mode", data.gameMode);
        data.difficulty = (LevelDifficulty)EditorGUILayout.EnumPopup("Difficulty", data.difficulty);
        data.targetGoal = EditorGUILayout.IntField("Target Goal", data.targetGoal);
        data.timeLimit = EditorGUILayout.FloatField("Time Limit", data.timeLimit);

        EditorGUILayout.EndVertical();
    }

    private void DrawGridConfig(LevelDataSO data)
    {
        EditorGUILayout.LabelField("Grid Configuration", EditorStyles.boldLabel);
        EditorGUILayout.BeginVertical("box");

        data.gameConfig = (GameConfig)EditorGUILayout.ObjectField(
            "Game Config", data.gameConfig, typeof(GameConfig), false);

        EditorGUI.BeginDisabledGroup(true);
        EditorGUILayout.IntField("Max Height", data.MaxHeight);
        EditorGUI.EndDisabledGroup();

        EditorGUILayout.EndVertical();
    }

    private void DrawFloorConfig(LevelDataSO data)
    {
        EditorGUILayout.LabelField("Floor Configuration", EditorStyles.boldLabel);
        EditorGUILayout.BeginVertical("box");

        int newWidth = EditorGUILayout.IntSlider("Level Width", data.levelWidth, 3, 10);
        if (newWidth != data.levelWidth)
        {
            data.levelWidth = newWidth;
            _needsRevalidation = true;
        }

        data.floorPrefab = (GameObject)EditorGUILayout.ObjectField(
            "Floor Prefab", data.floorPrefab, typeof(GameObject), false);

        EditorGUILayout.HelpBox(
            $"Face Width: {data.FaceWidth}\n" +
            $"Perimeter: {data.Perimeter} cells\n" +
            $"Floor Cells: {data.FloorCellCount}",
            MessageType.Info);

        EditorGUILayout.EndVertical();
    }

    private void DrawFloodConfig(LevelDataSO data)
    {
        EditorGUILayout.LabelField("Flood Block", EditorStyles.boldLabel);
        EditorGUILayout.BeginVertical("box");

        data.floodStartInterval = EditorGUILayout.IntField(
            new GUIContent("Start Interval", "Số row cleared trước flood đầu tiên. 0 = tắt"),
            data.floodStartInterval);

        data.floodIntervalIncrease = EditorGUILayout.IntField(
            new GUIContent("Interval Increase", "Interval tăng thêm mỗi lần spawn flood"),
            data.floodIntervalIncrease);

        data.floodStartInterval = Mathf.Max(0, data.floodStartInterval);
        data.floodIntervalIncrease = Mathf.Max(0, data.floodIntervalIncrease);

        if (data.floodStartInterval > 0)
        {
            int f1 = data.floodStartInterval;
            int f2 = f1 + data.floodIntervalIncrease;
            int f3 = f2 + data.floodIntervalIncrease;
            EditorGUILayout.HelpBox(
                $"Flood #1 sau {f1} rows  →  #2 sau {f2} rows  →  #3 sau {f3} rows",
                MessageType.Info);
        }
        else
        {
            EditorGUILayout.HelpBox("Flood: TẮT", MessageType.None);
        }

        EditorGUILayout.EndVertical();
    }

    private void DrawDifficultySystem(LevelDataSO data)
    {
        EditorGUILayout.LabelField("Difficulty System", EditorStyles.boldLabel);
        EditorGUILayout.BeginVertical("box");

        serializedObject.Update();

        var diffConfigProp = serializedObject.FindProperty("difficultyConfig");
        EditorGUILayout.PropertyField(diffConfigProp);

        EditorGUILayout.Space(5);

        GUI.backgroundColor = new Color(0.9f, 0.9f, 1f);
        var shapePoolProp = serializedObject.FindProperty("shapePool");
        EditorGUILayout.PropertyField(shapePoolProp, new GUIContent("Shape Pool"));
        GUI.backgroundColor = Color.white;

        if (data.shapePool == null)
            EditorGUILayout.HelpBox("Shape Pool is required!", MessageType.Error);

        EditorGUILayout.Space(5);

        var fixedSeqProp = serializedObject.FindProperty("fixedStartSequence");
        EditorGUILayout.PropertyField(fixedSeqProp, new GUIContent("Fixed Start Sequence"), true);

        serializedObject.ApplyModifiedProperties();

        EditorGUILayout.EndVertical();
    }

    private void DrawMapData(LevelDataSO data)
    {
        EditorGUILayout.BeginHorizontal();
        _showMapData = EditorGUILayout.Foldout(_showMapData, "Map Data", true);
        GUILayout.FlexibleSpace();
        EditorGUILayout.LabelField($"[{data.mapData?.Count ?? 0}]", GUILayout.Width(40));

        if (GUILayout.Button("+", GUILayout.Width(25)))
        {
            data.mapData ??= new List<PreplacedBlockData>();
            data.mapData.Add(new PreplacedBlockData());
            _needsRevalidation = true;
        }

        EditorGUILayout.EndHorizontal();

        if (!_showMapData) return;

        EditorGUILayout.BeginVertical("box");

        if (data.mapData != null)
        {
            for (int i = 0; i < data.mapData.Count; i++)
                DrawMapElement(data, i);
        }

        EditorGUILayout.EndVertical();
    }

    private void DrawMapElement(LevelDataSO data, int index)
    {
        _elementValidations.TryGetValue(index, out var validation);
        bool hasError = validation != null && !validation.isValid;
        bool hasWarning = validation != null && validation.warnings.Count > 0;

        Color bgColor = GUI.backgroundColor;
        if (hasError) GUI.backgroundColor = new Color(1f, 0.5f, 0.5f, 0.3f);
        else if (hasWarning) GUI.backgroundColor = new Color(1f, 0.9f, 0.5f, 0.3f);

        EditorGUILayout.BeginVertical("helpbox");
        GUI.backgroundColor = bgColor;

        EditorGUILayout.BeginHorizontal();

        if (!_elementFoldouts.ContainsKey(index))
            _elementFoldouts[index] = false;

        string icon = hasError ? "✗" : (hasWarning ? "!" : "✓");
        _elementFoldouts[index] = EditorGUILayout.Foldout(
            _elementFoldouts[index], $"[{icon}] Element {index}", true);

        GUILayout.FlexibleSpace();

        if (GUILayout.Button("X", GUILayout.Width(20)))
        {
            data.mapData.RemoveAt(index);
            _elementFoldouts.Remove(index);
            _needsRevalidation = true;
            EditorGUILayout.EndHorizontal();
            EditorGUILayout.EndVertical();
            return;
        }

        EditorGUILayout.EndHorizontal();

        if (_elementFoldouts[index])
        {
            EditorGUI.indentLevel++;

            var block = data.mapData[index];

            block.faceIndex = EditorGUILayout.IntSlider("Face", block.faceIndex, 0, 3);

            EditorGUILayout.BeginHorizontal();
            block.localX = EditorGUILayout.IntField("Local X", block.localX);
            EditorGUILayout.LabelField($"(0-{data.FaceWidth - 1})", GUILayout.Width(60));
            EditorGUILayout.EndHorizontal();

            block.y = EditorGUILayout.IntField("Y", block.y);
            block.colorIndex = EditorGUILayout.IntField("Color Index", block.colorIndex);

            BlockShapeSO currentShape = null;
            if (block.blockShapeRef != null)
                currentShape = block.blockShapeRef as BlockShapeSO;

            var newShape = (BlockShapeSO)EditorGUILayout.ObjectField(
                "Shape", currentShape, typeof(BlockShapeSO), false);

            if (newShape != currentShape)
            {
                if (newShape != null)
                {
                    string path = AssetDatabase.GetAssetPath(newShape);
                    string guid = AssetDatabase.AssetPathToGUID(path);
                    block.blockShapeRef = newShape;
                }
                else
                {
                    block.blockShapeRef = null;
                }
                _needsRevalidation = true;
            }

            data.mapData[index] = block;

            if (validation != null)
            {
                foreach (var error in validation.errors)
                    EditorGUILayout.HelpBox(error, MessageType.Error);

                foreach (var warning in validation.warnings)
                    EditorGUILayout.HelpBox(warning, MessageType.Warning);

                if (validation.isValid && validation.occupiedCells.Count > 0)
                {
                    string cells = string.Join(", ", validation.occupiedCells);
                    EditorGUILayout.HelpBox($"Cells: {cells}", MessageType.None);
                }
            }

            EditorGUI.indentLevel--;
        }

        EditorGUILayout.EndVertical();
    }

    private void DrawValidationSummary(LevelDataSO data)
    {
        EditorGUILayout.LabelField("Validation", EditorStyles.boldLabel);
        EditorGUILayout.BeginVertical("box");

        if (_validation == null)
        {
            EditorGUILayout.HelpBox("Click 'Validate' to check", MessageType.Info);
        }
        else if (_validation.isValid && _validation.warnings.Count == 0)
        {
            EditorGUILayout.HelpBox(
                $"All OK!\nTotal cells: {_validation.occupiedCells.Count}",
                MessageType.Info);
        }
        else
        {
            string summary = "";
            if (_validation.errors.Count > 0)
                summary += $"{_validation.errors.Count} Error(s)\n";
            if (_validation.warnings.Count > 0)
                summary += $"{_validation.warnings.Count} Warning(s)\n";
            summary += $"Total cells: {_validation.occupiedCells.Count}";

            EditorGUILayout.HelpBox(summary,
                _validation.errors.Count > 0 ? MessageType.Error : MessageType.Warning);
        }

        EditorGUILayout.EndVertical();
    }

    private void DrawActions(LevelDataSO data)
    {
        EditorGUILayout.BeginHorizontal();

        if (GUILayout.Button("Validate", GUILayout.Height(30)))
            RevalidateAll(data);

        if (GUILayout.Button("Print Layout", GUILayout.Height(30)))
            data.PrintCellLayout();

        GUI.backgroundColor = new Color(1f, 0.5f, 0.5f);
        if (GUILayout.Button("Clear All", GUILayout.Height(30)))
        {
            if (EditorUtility.DisplayDialog("Clear", "Clear all map data?", "Yes", "No"))
            {
                data.mapData?.Clear();
                _needsRevalidation = true;
            }
        }
        GUI.backgroundColor = Color.white;

        EditorGUILayout.EndHorizontal();

        EditorGUILayout.Space(5);

        bool canSave = (_validation == null || _validation.isValid) && data.shapePool != null;

        GUI.backgroundColor = canSave ? new Color(0.3f, 0.9f, 0.3f) : Color.gray;
        EditorGUI.BeginDisabledGroup(!canSave);

        if (GUILayout.Button(canSave ? "Ready to Play" : "Fix Errors First", GUILayout.Height(35)))
        {
            EditorUtility.SetDirty(data);
            AssetDatabase.SaveAssets();
            Debug.Log($"Saved: {data.name}");
        }

        EditorGUI.EndDisabledGroup();
        GUI.backgroundColor = Color.white;

        if (!canSave && data.shapePool == null)
            EditorGUILayout.HelpBox("Shape Pool is required!", MessageType.Error);
    }

    private void RevalidateAll(LevelDataSO data)
    {
        _elementValidations.Clear();

        if (data.mapData == null || data.mapData.Count == 0)
        {
            _validation = new LevelDataSO.ValidationResult();
            return;
        }

        HashSet<Vector2Int> allOccupied = new HashSet<Vector2Int>();

        for (int i = 0; i < data.mapData.Count; i++)
        {
            var result = data.ValidateElement(i, allOccupied);
            _elementValidations[i] = result;

            foreach (var cell in result.occupiedCells)
                allOccupied.Add(cell);
        }

        _validation = data.ValidateAll();
        Repaint();
    }
}
#endif