using Difficulty;
using SonatFramework.Systems;
using UnityEngine;

public static class ConfigHelper
{
    private static GameConfig _gameConfig;
    private static DifficultyConfig _difficultyConfig;

    public static GameConfig Game
    {
        get
        {
            if (_gameConfig == null)
            {
                // Gọi đúng chuẩn Sonat
                _gameConfig = SonatSystem.GetConfig<GameConfig>();

                // Chỉ cảnh báo nếu quên setup, không code chắp vá logic khác
                if (_gameConfig == null)
                {
                    Debug.LogError("⛔ [ConfigHelper] GameConfig is NULL! Kiểm tra xem bạn đã add GameConfig vào SonatConfigService trong Editor chưa?");
                }
            }
            return _gameConfig;
        }
    }

    public static DifficultyConfig Difficulty
    {
        get
        {
            if (_difficultyConfig == null)
            {
                _difficultyConfig = SonatSystem.GetConfig<DifficultyConfig>();

                if (_difficultyConfig == null)
                {
                    Debug.LogError("⛔ [ConfigHelper] DifficultyConfig is NULL! Kiểm tra xem bạn đã add DifficultyConfig vào SonatConfigService trong Editor chưa?");
                }
            }
            return _difficultyConfig;
        }
    }

    public static void ClearCache()
    {
        _gameConfig = null;
        _difficultyConfig = null;
    }
}