using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using UnityEditor;
using UnityEditor.PackageManager;
using UnityEditor.PackageManager.Requests;
using UnityEngine;
using UnityEngine.Networking;
using Task = System.Threading.Tasks.Task;

namespace Sonat.Editor.PackageManager
{
    public static class SonatPackageHelper
    {
        private static AddRequest Request;
        private static string currentPackageName;

        public static void InstallPackage(string url, string packageName, bool preview)
        {
            currentPackageName = packageName;
            Request = Client.Add(url);
            EditorApplication.update += ProgressCallback;
        }

        private static void ProgressCallback()
        {
            if (Request == null) return;

            if (Request.IsCompleted)
            {
                if (Request.Status == StatusCode.Success)
                {
                    Debug.Log($"Package '{currentPackageName}' installed successfully: {Request.Result.packageId}");
                }
                else if (Request.Status >= StatusCode.Failure)
                {
                    Debug.LogError($"Failed to install package '{currentPackageName}': {Request.Error.message}");
                }

                EditorApplication.update -= ProgressCallback;
                Request = null;
            }
        }

        public static async Task<SonatPackageInfo> LoadPackageInfo()
        {
            // try
            // {
            //     packageInfo = await DownloadInfo();
            // }
            // catch (Exception e)
            // {
            //     throw; // TODO handle exception
            // }

            //if (packageInfo == null)
            //{
#if using_newtonsoft
            string filePath = SonatEditorHelper.FindFilePath("SonatSDKPackageInfo.json", "", false);
            if (filePath == null) return null;
            var t = AssetDatabase.LoadAssetAtPath(filePath, typeof(TextAsset)) as TextAsset;
            if (t != null) return JsonConvert.DeserializeObject<SonatPackageInfo>(t.text);
#endif
            return null;
            //}
        }

        private static async Task<SonatPackageInfo> DownloadInfo()
        {
            var request = new UnityWebRequest("https://sonatsdkpackageinfo.tiiny.site/PackageInfo.json")
            {
                method = UnityWebRequest.kHttpVerbGET,
                downloadHandler = new DownloadHandlerBuffer(),
                timeout = 5
            };
            request.SendWebRequest();
            while (!request.isDone)
            {
                await Task.Delay(100);
            }

            if (request.result != UnityWebRequest.Result.Success)
            {
                Debug.LogError(request.error);
                return null;
            }
            else
            {
#if using_newtonsoft
                Debug.Log("Get Package Info Successfully");
                var json = request.downloadHandler.text;
                return JsonConvert.DeserializeObject<SonatPackageInfo>(json);
#else
            return null;
#endif
            }
        }
    }

    public class SonatPackageInfo
    {
        public Dictionary<string, string> admobUrls;
        public Dictionary<string, string> maxUrls;
        public Dictionary<string, string> appsFlyerUrls;
        public Dictionary<string, string> appsFlyerPurchaseUrls;
        public Dictionary<string, string> facebookUrls;
        public Dictionary<string, string> firebase;
        public string apsUrl;
        public string admobNativeLibraryUrl;
        public Dictionary<string, Dictionary<string, string>> admobNetworkUrls;
    }
}