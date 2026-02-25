
using Newtonsoft.Json;
using Sonat.Enums;
using System.Threading.Tasks;

namespace SonatFramework.Systems.LevelManagement
{
    public abstract class LevelServiceAsync : SonatServiceSo
    {
        protected readonly JsonSerializerSettings Settings = new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        };
        public abstract Task<T> GetLevelData<T>(int level, GameMode gameMode, bool force = false,
            bool loop = true, int category = 0) where T : LevelData;

        protected abstract Task<T> GetLevel<T>(int level, GameMode gameMode, int category = 0) where T : LevelData;
        //public abstract UniTask SaveLevel<T>(T levelData) where T : LevelData;
    }
}