using System.Collections.Generic;
using System.IO;
using System.Linq;
using Cysharp.Threading.Tasks;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems.LoadObject;
#if UNITY_EDITOR
using UnityEditor;
#endif
using UnityEngine;

namespace SonatFramework.Systems.LevelManagement
{
    [CreateAssetMenu(fileName = "SonatLevelServiceAsync", menuName = "Sonat Services/Level Service/Sonat Level Service Async")]
    public class SonatLevelServiceAsync : LevelServiceAsync, IServiceInitialize, IServiceWaitingRemoteConfig
    {
        [BoxGroup("SERVICES")]
        [Required]
        [SerializeField]
        protected Service<LoadObjectServiceAsync> loadObjectServiceAsync = new Service<LoadObjectServiceAsync>();

        protected LevelData levelCache;

        [SerializeField]
        private List<GameModeLevel> gameModeLevels = new List<GameModeLevel>();

        protected Dictionary<GameMode, int> levelsByGameMode = new Dictionary<GameMode, int>();

        public void Initialize()
        {
            InitLevelModeData();
        }

        public void OnRemoteConfigReady()
        {
            gameModeLevels = SonatSDKAdapter.GetRemoteConfig("game_level", gameModeLevels);
            InitLevelModeData();
        }

        private void InitLevelModeData()
        {
            levelsByGameMode.Clear();
            foreach (var gameModeLevel in gameModeLevels)
            {
                levelsByGameMode.Add(gameModeLevel.mode, gameModeLevel.level);
            }
        }

        public override async UniTask<T> GetLevelData<T>(int level, GameMode gameMode, bool force = false,
            bool loop = true, int category = 0)
        {
            if (!force && levelCache != null && levelCache.gameMode == gameMode && levelCache.level == level && levelCache.category == category)
                return levelCache as T;

            if (levelsByGameMode.TryGetValue(gameMode, out var gameModeLevel) && level > gameModeLevel && loop)
            {
                var levelData = await GetLevel<T>(gameModeLevel / 2 + level % (gameModeLevel / 2), gameMode, category);
                levelData.level = level;
                return levelData;
            }

            return await GetLevel<T>(level, gameMode, category);
        }

        protected override async UniTask<T> GetLevel<T>(int level, GameMode gameMode, int category = 0)
        {
            string fileName = category == 0 ? $"{gameMode}/{level}" : $"{gameMode}/{level}.{category}";
            var levelData = await loadObjectServiceAsync.Instance.LoadAsync<T>(fileName);
            return levelData;
        }

        // public override async UniTask SaveLevel<T>(T levelData)
        // {
        //     await saveObjectServiceAsync.Instance.SaveObject(levelData, $"{levelData.level}.json");
        // }


#if UNITY_EDITOR

        public DefaultAsset levelFolder;

        private void OnValidate()
        {
            UpdateCount();
        }

        public void UpdateCount()
        {
            if (levelFolder == null || gameModeLevels.Count == 0) return;

            string folderPath = AssetDatabase.GetAssetPath(levelFolder);

            var files = Directory.GetFiles(folderPath, "*.json",
                    SearchOption.AllDirectories)
                .Where(f => !f.EndsWith(".meta"))
                .ToArray();

            gameModeLevels[0].level = files.Length;

            EditorUtility.SetDirty(this);
        }


#endif
    }
}