using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Sirenix.OdinInspector;
using UnityEditor;
using UnityEngine;

namespace SonatFramework.Systems.LoadObject
{
    public abstract class LoadObjectService : SonatServiceSo
    {
        protected static readonly JsonSerializerSettings Settings = new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        };
#if UNITY_EDITOR
        [OnValueChanged(nameof(OnPathChanged))]
#endif
        public string path;

        public abstract T LoadObject<T>(string assetName);

        private void OnPathChanged()
        {
            string preName = this.name;
            string subName = string.IsNullOrEmpty(path) ? "" : $"[{Regex.Replace(path, @"\W", "-")}]";
            var newName = "";
            if (Regex.IsMatch(preName, @"\[\S*\]"))
            {
                newName = Regex.Replace(preName, @"\[\S*\]", $"{subName}");
            }
            else
            {
                newName = preName + (string.IsNullOrEmpty(subName) ? "" : $" {subName}");
            }

            //AssetDatabase.RenameAsset(AssetDatabase.GetAssetPath(this), newName);
        }
    }
}