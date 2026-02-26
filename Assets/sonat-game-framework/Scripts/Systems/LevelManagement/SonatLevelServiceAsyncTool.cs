using System.IO;
using System.Threading.Tasks;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Systems.LoadObject;
using UnityEngine;

namespace SonatFramework.Systems.LevelManagement
{
    [CreateAssetMenu(fileName = "SonatLevelServiceAsyncTool", menuName = "Sonat Services/Level Service/Sonat Level Service Async Tool")]
    public class SonatLevelServiceAsyncTool : SonatLevelServiceAsync
    {
        [SerializeField] protected string path = "";

        //[BoxGroup("SERVICES")] [Required] [SerializeField]
        protected Service<SaveObjectServiceAsync> saveObjectServiceAsync = new Service<SaveObjectServiceAsync>();

        public void SetFolder(string folder)
        {
            path = folder;
        }

        public override async Task<T> GetLevelData<T>(int level, GameMode gameMode, bool force = false,
            bool loop = false, int category = 0)
        {
            return await GetLevel<T>(level, gameMode, category);
        }

        protected override async Task<T> GetLevel<T>(int level, GameMode gameMode, int category = 0)
        {
            string mergePath = category == 0 ? $"{path}{level}" : $"{path}{level}.{category}";
            var levelData = await loadObjectServiceAsync.Instance.LoadAsync<T>(mergePath);
            if (levelData == null && category > 0)
            {
                levelData = await GetLevel<T>(level, gameMode, category - 1);
            }

            return levelData;
        }

        public void SaveLevel<T>(T levelData) where T : LevelData
        {
            if (Directory.Exists(saveObjectServiceAsync.Instance.path) == false) Directory.CreateDirectory(saveObjectServiceAsync.Instance.path);
            if (Directory.Exists(Path.Combine(saveObjectServiceAsync.Instance.path, path)) == false)
                Directory.CreateDirectory(Path.Combine(saveObjectServiceAsync.Instance.path, path));
            saveObjectServiceAsync.Instance.SaveObject(levelData, $"{path}{levelData.level}");
        }
    }
}