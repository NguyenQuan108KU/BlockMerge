using Newtonsoft.Json;
using UnityEngine;

namespace SonatFramework.Systems.LoadObject
{
    [CreateAssetMenu(menuName = "Sonat Services/Load Service/Load Resources", fileName = "Load Resources")]
    public class SonatLoadResources : LoadObjectService
    {
        public override T LoadObject<T>(string assetName)
        {
            string fullPath = $"{path}{assetName}";
            var obj = Resources.Load(fullPath);
            if (obj == null) return default(T);
            //if (obj is TextAsset textAsset)
            //{
            //    return string.IsNullOrEmpty(textAsset.text) ? null : JsonConvert.DeserializeObject<T>(textAsset.text, Settings);
            //}
            //else
            //{
            //    return obj as T;
            //}
            return default(T);
        }
    }
}