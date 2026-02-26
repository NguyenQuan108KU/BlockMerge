using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Sirenix.OdinInspector;
using UnityEditor;

namespace SonatFramework.Systems.LoadObject
{
    public abstract class LoadObjectServiceAsync : SonatServiceSo
    {
        protected static readonly JsonSerializerSettings Settings = new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        };
        //[OnValueChanged(nameof(OnPathChanged))]
        public string path;

        public abstract Task<T> LoadAsync<T>(string assetName);

        public virtual void ReleaseAsset(string assetName)
        {
            
        }
        

#if UNITY_EDITOR
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

            AssetDatabase.RenameAsset(AssetDatabase.GetAssetPath(this), newName);
        }
#endif
    }
}