
using Newtonsoft.Json;
using System.Threading.Tasks;
using UnityEngine;

namespace SonatFramework.Systems.LoadObject
{
    [CreateAssetMenu(menuName = "Sonat Services/Load Service/Load Resources Async",
        fileName = "Load Resources Async")]
    public class SonatLoadResourcesAsync : LoadObjectServiceAsync
    {
        [SerializeField] private LoadObjectServiceAsync fallbackService;

        public override async Task<T> LoadAsync<T>(string assetPath) where T : class
        {
            //var fullPath = $"{path}{assetPath}";
            //var data = await Resources.LoadAsync(fullPath);

            //if (data == null)
            //{
            //    if (fallbackService != null) return await fallbackService.LoadAsync<T>(assetPath);
            //}

            //if (data is TextAsset textAsset) return JsonConvert.DeserializeObject<T>(textAsset.text, Settings);

            //return data as T;
            return null;
        }
    }
}