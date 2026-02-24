using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEngine;

namespace sonat_sdk.Scripts.Editor.PackageManager
{
    public static class PackageInstaller
    {
        private const string MANIFEST_PATH = "Packages/manifest.json";
        private const string CACHE_DIR = "Packages/SDKCache/";

        // Google Drive download URL
        private const string DRIVE_DL_URL = "https://drive.google.com/uc?export=download&id={0}";
        private const string DRIVE_LIST_URL = "https://drive.google.com/drive/folders/{0}?usp=sharing";

        // Map SDK name → Google Drive folder ID
        private static readonly Dictionary<string, string> SDKFolders = new Dictionary<string, string>()
        {
            { "firebase", "16rBqA5jjCfKNGPV9xiqVuu8nCspW-JoA" },
            { "appsflyer", "16sdE6fxal2Pr3_ogcNNw26SB4YqMGP30" },
            { "max", "1reCb2P8tRd0V6CT4K8yCWvM3BJkVyDKl" },
            { "facebook", "1jy3ufkoalQuPWtnZtbls8pX9VH7E1hR2" },
            { "admob", "1eOlzxe4uWzhEh3SDNEIT9hgQ86GxUKAU" }
        };

        private static Dictionary<string, List<(string packageName, string version, string fileId)>> versionsAvailableCache = new();

        // AUTO RUN when Unity loads or manifest changes
        static PackageInstaller()
        {
            EditorApplication.delayCall += AutoInstallMissingSDKs;
        }

        // ===============================================================
        // UTILITY: ENSURE FILE & DIRECTORY EXISTENCE
        // ===============================================================

        private static void EnsureDirectory(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
                Debug.Log($"[SuperSDK] Created folder: {path}");
            }
        }

        private static void EnsureManifestExists()
        {
            EnsureDirectory("Packages/");

            if (!File.Exists(MANIFEST_PATH))
            {
                Debug.LogWarning("[SuperSDK] manifest.json missing → creating default manifest.");

                JObject manifest = new JObject
                {
                    ["dependencies"] = new JObject()
                };

                File.WriteAllText(MANIFEST_PATH, manifest.ToString());
            }
        }


        // ===============================================================
        // 1) GET AVAILABLE VERSIONS FROM GOOGLE DRIVE
        // ===============================================================

        public static List<(string packageName, string version, string fileId)> GetAvailableVersions(string sdkName)
        {
            if (versionsAvailableCache.TryGetValue(sdkName, out var versions))
            {
                return versions;
            }

            if (!SDKFolders.TryGetValue(sdkName.ToLower(), out string folderId))
            {
                Debug.LogError("[SuperSDK] Unknown SDK folder: " + sdkName);
                return null;
            }

            string url = string.Format(DRIVE_LIST_URL, folderId);
            string html;

            try
            {
                html = new WebClient().DownloadString(url);
            }
            catch
            {
                Debug.LogError("[SuperSDK] Failed to load Google Drive folder: " + url);
                return null;
            }

            List<(string, string, string)> result = new();

            MatchCollection files = Regex.Matches(html, @"data-id=""([^""]+)"".+?>([^<]+\.tgz)");

            foreach (Match m in files)
            {
                string fileId = m.Groups[1].Value;
                string fileName = m.Groups[2].Value;

                Match fm = Regex.Match(fileName, @"(.+)-([\d\.\w\-]+)\.tgz");
                if (fm.Success)
                    result.Add((fm.Groups[1].Value, fm.Groups[2].Value, fileId));
            }

            versionsAvailableCache.Add(sdkName, result);
            return result;
        }


        // ===============================================================
        // 2) INSTALL SDK (BY NAME + VERSION)
        // ===============================================================

        public static void InstallSDK(string sdkName, string packageName, string version)
        {
            EnsureManifestExists();
            EnsureDirectory(CACHE_DIR);

            var versions = GetAvailableVersions(sdkName);

            if (versions == null)
            {
                Debug.LogError($"[SuperSDK] SDK not found: {sdkName}");
                return;
            }

            foreach (var v in versions)
            {
                if (v.packageName == packageName && v.version == version)
                {
                    string tgzPath = DownloadTGZ(packageName, version, v.fileId);
                    WriteManifestDependency(packageName, tgzPath);

                    Debug.Log($"[SuperSDK] Installed {packageName} v{version}");
                    return;
                }
            }

            Debug.LogError($"[SuperSDK] Version not found: {packageName}_{version}.tgz");
        }


        // ===============================================================
        // 3) CHECK INSTALLED VERSION IN PROJECT
        // ===============================================================

        public static string GetInstalledVersion(string packageName)
        {
            EnsureManifestExists();

            JObject manifest = JObject.Parse(File.ReadAllText(MANIFEST_PATH));
            JObject deps = manifest["dependencies"] as JObject;

            if (deps == null || !deps.TryGetValue(packageName, out JToken value))
                return null;

            string raw = value.ToString();

            Match m = Regex.Match(raw, @"_(\d[\d\.\w\-]*)\.tgz");
            return m.Success ? m.Groups[1].Value : raw;
        }


        // ===============================================================
        // 4) AUTO INSTALL WHEN MANIFEST CHANGES
        // ===============================================================

        private static void AutoInstallMissingSDKs()
        {
            EnsureManifestExists();
            EnsureDirectory(CACHE_DIR);

            JObject manifest = JObject.Parse(File.ReadAllText(MANIFEST_PATH));
            JObject deps = manifest["dependencies"] as JObject;

            if (deps == null) return;

            bool modified = false;

            foreach (var dep in deps)
            {
                string packageName = dep.Key;
                string value = dep.Value.ToString();

                // process custom "drive:ID"
                if (!value.StartsWith("drive:")) continue;

                string fileId = value.Substring(6);

                string tgzPath = DownloadTGZ(packageName, "unknown", fileId);

                string newVal = $"file:{tgzPath.Replace("Packages/", "")}";
                deps[packageName] = newVal;

                Debug.Log($"[SuperSDK] Auto-installed {packageName} → {newVal}");
                modified = true;
            }

            if (modified)
            {
                File.WriteAllText(MANIFEST_PATH, manifest.ToString());
                AssetDatabase.Refresh();
                UnityEditor.PackageManager.Client.Resolve();
            }
        }


        // ===============================================================
        // SUPPORT: DOWNLOAD TGZ
        // ===============================================================

        private static string DownloadTGZ(string packageName, string version, string fileId)
        {
            EnsureDirectory(CACHE_DIR);

            string url = string.Format(DRIVE_DL_URL, fileId);
            string temp = $"{CACHE_DIR}{packageName}.tgz";

            try
            {
                using (WebClient wc = new WebClient())
                    wc.DownloadFile(url, temp);
            }
            catch (System.Exception ex)
            {
                Debug.LogError("[SuperSDK] Download failed: " + ex.Message);
                return null;
            }

            if (version == "unknown")
                version = ExtractVersion(temp);

            string finalPath = $"{CACHE_DIR}{packageName}_{version}.tgz";
            if (File.Exists(finalPath)) File.Delete(finalPath);
            File.Move(temp, finalPath);

            return finalPath;
        }

        private static string ExtractVersion(string path)
        {
            Match m = Regex.Match(Path.GetFileName(path), @"_(\d[\d\.\w\-]*)\.tgz");
            return m.Success ? m.Groups[1].Value : "unknown";
        }

        private static void WriteManifestDependency(string packageName, string tgzPath)
        {
            EnsureManifestExists();

            JObject manifest = JObject.Parse(File.ReadAllText(MANIFEST_PATH));
            JObject deps = manifest["dependencies"] as JObject;

            deps[packageName] = $"file:{tgzPath.Replace("Packages/", "")}";

            File.WriteAllText(MANIFEST_PATH, manifest.ToString());
            AssetDatabase.Refresh();
            UnityEditor.PackageManager.Client.Resolve();
        }
    }
}