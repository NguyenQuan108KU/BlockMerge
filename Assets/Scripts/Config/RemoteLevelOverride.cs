using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;

public static class RemoteLevelOverride
{
    private static Dictionary<int, LevelOverrideData> _cache;
    private static string _cachedRaw;

    // level_id: prefix cho level key
    // "" hoặc "in-app-default" → dùng default "Level_05"
    // "hard" → "Level_hard_05"
    public static string GetLevelKey(int levelIndex)
    {
        string levelId = GameRemoteConfig.LevelId;

        if (string.IsNullOrEmpty(levelId) || levelId == "in-app-default")
            return $"Level_{levelIndex:D2}";

        return $"Level_{levelId}_{levelIndex:D2}";
    }

    // Apply remote override lên runtime copy (KHÔNG sửa SO gốc)
    public static LevelDataSO ApplyOverride(LevelDataSO original, int levelIndex)
    {
        var overrideData = GetOverrideForLevel(levelIndex);
        if (overrideData == null) return original;

        // Tạo runtime copy
        var copy = Object.Instantiate(original);
        copy.name = original.name + "_RemoteOverride";

        if (overrideData.targetGoal.HasValue)
            copy.targetGoal = overrideData.targetGoal.Value;

        if (overrideData.timeLimit.HasValue)
            copy.timeLimit = overrideData.timeLimit.Value;

        if (overrideData.floodStartInterval.HasValue)
            copy.floodStartInterval = overrideData.floodStartInterval.Value;

        if (overrideData.floodIntervalIncrease.HasValue)
            copy.floodIntervalIncrease = overrideData.floodIntervalIncrease.Value;

        if (overrideData.levelWidth.HasValue)
            copy.levelWidth = overrideData.levelWidth.Value;

        Debug.Log($"[RemoteLevelOverride] Level {levelIndex} overridden: {JsonConvert.SerializeObject(overrideData)}");
        return copy;
    }

    private static LevelOverrideData GetOverrideForLevel(int levelIndex)
    {
        string raw = GameRemoteConfig.RemoteLevelData;
        if (string.IsNullOrEmpty(raw) || raw == "in-app-default") return null;

        if (raw != _cachedRaw)
        {
            _cachedRaw = raw;
            _cache = ParseJson(raw);
        }

        if (_cache == null) return null;
        _cache.TryGetValue(levelIndex, out var data);
        return data;
    }

    private static Dictionary<int, LevelOverrideData> ParseJson(string json)
    {
        try
        {
            return JsonConvert.DeserializeObject<Dictionary<int, LevelOverrideData>>(json);
        }
        catch (System.Exception e)
        {
            Debug.LogWarning($"[RemoteLevelOverride] Parse failed: {e.Message}");
            return null;
        }
    }

    // Nullable fields — chỉ override field có trong JSON
    private class LevelOverrideData
    {
        public int? targetGoal;
        public float? timeLimit;
        public int? floodStartInterval;
        public int? floodIntervalIncrease;
        public int? levelWidth;
    }
}