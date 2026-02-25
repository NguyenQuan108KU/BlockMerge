using System.IO;
using Newtonsoft.Json;
using UnityEditor;
using UnityEngine;

namespace SonatFramework.Systems.LoadObject
{
    [CreateAssetMenu(fileName = "Save Folder",
        menuName = "Sonat Services/Save Service/Save Folder")]
    public class SonatSaveObjectFolderService : SaveObjectService
    {
        private readonly JsonSerializerSettings settings = new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        };
        [SerializeField] protected string extension = ".json";

        public override void SaveObject<T>(T data, string fileName)
        {
            var json = JsonConvert.SerializeObject(data, settings);
            if (Directory.Exists(path) == false) Directory.CreateDirectory(path);
            var fullPath = $"{path}{fileName}{extension}";
            File.WriteAllText(fullPath, json);
#if UNITY_EDITOR
            AssetDatabase.Refresh();
#endif
        }
    }
}