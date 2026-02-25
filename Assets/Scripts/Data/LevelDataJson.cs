using System;
using System.Collections.Generic;
using Sonat.Enums;

namespace TowerStack.LevelManagement
{
    [Serializable]
    public class LevelDataJson
    {
        public int level;
        public string levelID;
        public string displayName;
        public GameMode gameMode = GameMode.Classic;
        public LevelDifficulty difficulty = LevelDifficulty.Normal;

        public int targetGoal = 50;
        public float timeLimit = 120f;
        public int levelWidth = 6;

        public string floorPrefabKey;
        public string gameConfigKey;
        public string difficultyConfigKey;
        public string shapePoolKey;

        public List<BlockPlacement> mapData = new List<BlockPlacement>();
        public List<string> fixedStartSequenceKeys = new List<string>();
    }

    [Serializable]
    public class BlockPlacement
    {
        public int faceIndex;
        public int localX;
        public int y;
        public string shapeKey;
        public int colorIndex;
    }
}