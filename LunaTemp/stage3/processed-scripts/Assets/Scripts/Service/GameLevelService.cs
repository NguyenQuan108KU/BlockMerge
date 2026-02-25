using Cysharp.Threading.Tasks;
using Sirenix.OdinInspector;
using SonatFramework.Systems;
using SonatFramework.Systems.GameDataManagement;
using SonatFramework.Systems.LoadObject;
using UnityEngine;

namespace SonatFramework.Systems.LevelManagement
{
    [CreateAssetMenu(fileName = "GameLevelService", menuName = "Sonat Services/Game Level Service")]
    public class GameLevelService : SonatServiceSo, IServiceInitialize
    {
        [BoxGroup("SERVICES", true)]
        [SerializeField]
        protected Service<LoadObjectServiceAsync> loadServiceAsync = new SonatFramework.Systems.Service<SonatFramework.Systems.LoadObject.LoadObjectServiceAsync>();

        [BoxGroup("SERVICES", true)]
        [SerializeField]
        protected Service<DataService> dataService = new SonatFramework.Systems.Service<SonatFramework.Systems.GameDataManagement.DataService>();

        [BoxGroup("CONFIGS", true)]
        [SerializeField]
        private string levelKeyPrefix = "Level_";

        [BoxGroup("CONFIGS", true)]
        [SerializeField]
        private string prefCurrentLevel = "USER_CURRENT_LEVEL";

        public LevelDataSO CurrentLevelData { get; private set; }

        public void Initialize()
        {
            // Init logic if needed
        }

        public int GetCurrentLevelIndex()
        {
            return dataService.Instance.GetInt(prefCurrentLevel, 1);
        }

        public async UniTask<LevelDataSO> LoadLevelAsync(int levelIndex)
        {
            string key = $"{levelKeyPrefix}{levelIndex:D2}";

            var levelData = await loadServiceAsync.Instance.LoadAsync<LevelDataSO>(key);

            if (levelData != null)
            {
                CurrentLevelData = levelData;
                return levelData;
            }
            else
            {
                Debug.LogWarning($"[GameLevelService] Not found: {key}. Returning to Level 1.");
                if (levelIndex != 1) return await LoadLevelAsync(1);
            }

            return null;
        }

        public void CompleteCurrentLevel()
        {
            int current = GetCurrentLevelIndex();
            int next = current + 1;

            // Sonat DataService tự động save khi SetInt
            dataService.Instance.SetInt(prefCurrentLevel, next);
        }

        [Button("Reset Level to 1")]
        public void DebugResetProgress()
        {
            dataService.Instance.SetInt(prefCurrentLevel, 1);
        }
    }
}