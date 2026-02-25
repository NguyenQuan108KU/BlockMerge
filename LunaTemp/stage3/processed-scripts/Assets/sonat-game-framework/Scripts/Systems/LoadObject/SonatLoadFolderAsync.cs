using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using UnityEngine;

namespace SonatFramework.Systems.LoadObject
{
    [CreateAssetMenu(menuName = "Sonat Services/Load Service/Load Folder Async", fileName = "Load Folder Async")]
    public class SonatLoadFolderAsync : LoadObjectServiceAsync
    {
        [SerializeField] protected string extension = ".json";
        public override async Task<T> LoadAsync<T>(string assetPath) where T : class
        {
            string fullPath = $"{path}{assetPath}{extension}";
            var data = await File.ReadAllTextAsync(fullPath);
            return JsonConvert.DeserializeObject<T>(data, Settings);
        }
    }
}