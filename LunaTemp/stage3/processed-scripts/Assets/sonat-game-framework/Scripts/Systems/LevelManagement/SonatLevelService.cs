using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems.LoadObject;
using UnityEngine;

namespace SonatFramework.Systems.LevelManagement
{
    [CreateAssetMenu(fileName = "SonatLevelService", menuName = "Sonat Services/Level Service/Sonat Level Service")]
    public class SonatLevelService : LevelService, IServiceWaitingRemoteConfig
    {
        [SerializeField] private string path = "Level";

        [BoxGroup("SERVICES")] [Required] [SerializeField]
        private Service<LoadObjectService> loadObjectService = new SonatFramework.Systems.Service<SonatFramework.Systems.LoadObject.LoadObjectService>();

        [BoxGroup("SERVICES")] [Required] [SerializeField]
        private Service<SaveObjectService> saveObjectService = new SonatFramework.Systems.Service<SonatFramework.Systems.LoadObject.SaveObjectService>();


        [BoxGroup("CONFIGS")] [SerializeField] protected LevelConfig config;

        protected LevelData levelCache;
        [SerializeField] private List<GameModeLevel> gameModeLevels = new System.Collections.Generic.List<SonatFramework.Systems.LevelManagement.GameModeLevel>();
        private Dictionary<GameMode, int> levelsByGameMode = new System.Collections.Generic.Dictionary<Sonat.Enums.GameMode, int>();

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
        public override T GetLevelData<T>(int level, GameMode gameMode, bool force = false, bool loop = true, int category = 0)
        {
            if (!force && levelCache != null && levelCache.gameMode == gameMode && levelCache.level == level && levelCache.category == category)
                return levelCache as T;
            if (levelsByGameMode.TryGetValue(gameMode, out var gameModeLevel) && level > gameModeLevel && loop)
            {
                var levelData = GetLevel<T>(gameModeLevel / 2 + level % (gameModeLevel / 2), gameMode, category);
                levelData.level = level;
                return levelData;
            }
            return GetLevel<T>(level, gameMode, category);
        }

        public void SetFolder(string folder)
        {
            path = folder;
        }

        protected override T GetLevel<T>(int level, GameMode gameMode, int category)
        {
            string mergePath = category == 0 ? string.IsNullOrEmpty(path) ? $"{gameMode}/{level}" : $"{path}/{gameMode}/{level}" :
                string.IsNullOrEmpty(path) ? $"{gameMode}/{level}.{category}" : $"{path}/{gameMode}/{level}.{category}";
            var levelData = loadObjectService.Instance.LoadObject<T>(mergePath);
            if (levelData == null && category > 0)
            {
                levelData = GetLevel<T>(level, gameMode, category - 1);
            }

            return levelData;
        }

        public override void SaveLevel<T>(T levelData)
        {
            if (Directory.Exists(saveObjectService.Instance.path) == false) Directory.CreateDirectory(saveObjectService.Instance.path);
            if (Directory.Exists(Path.Combine(saveObjectService.Instance.path, path)) == false)
                Directory.CreateDirectory(Path.Combine(saveObjectService.Instance.path, path));
            saveObjectService.Instance.SaveObject(levelData, $"{path}/{levelData.level}");
        }
        
    }
}