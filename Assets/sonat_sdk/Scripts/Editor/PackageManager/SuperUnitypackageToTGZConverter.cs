using System;
using UnityEngine;
using UnityEditor;
using System.IO;
using System.IO.Compression;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using CompressionLevel = System.IO.Compression.CompressionLevel;
using Object = UnityEngine.Object;

public class SuperUnitypackageToTGZConverter : EditorWindow
{
    private Object unityPackageFile;
    private string packageName = "com.company.package";
    private string displayName = "My SDK";
    private string version = "1.0.0";

    [MenuItem("Tools/SDK Tools/UnityPackage → tgz Converter")]
    public static void OpenWindow()
    {
        GetWindow<SuperUnitypackageToTGZConverter>("Unitypackage → tgz");
    }

    private void OnGUI()
    {
        GUILayout.Label("Convert .unitypackage → .tgz (UPM)", EditorStyles.boldLabel);

        unityPackageFile = (Object)EditorGUILayout.ObjectField("Unitypackage File", unityPackageFile, typeof(Object), false);

        packageName  = EditorGUILayout.TextField("Package Name", packageName);
        displayName  = EditorGUILayout.TextField("Display Name", displayName);
        version      = EditorGUILayout.TextField("Version", version);

        if (unityPackageFile == null)
        {
            EditorGUILayout.HelpBox("Hãy drag & drop file .unitypackage vào đây", MessageType.Info);
            return;
        }

        if (GUILayout.Button("Convert to .tgz", GUILayout.Height(40)))
        {
            ConvertUnitypackageToTGZ();
        }
    }

    // ======================================================================
    // MAIN CONVERTER
    // ======================================================================
    private void ConvertUnitypackageToTGZ()
    {
        string unitypackagePath = AssetDatabase.GetAssetPath(unityPackageFile);

        if (!unitypackagePath.EndsWith(".unitypackage"))
        {
            EditorUtility.DisplayDialog("Error", "File không phải .unitypackage!", "OK");
            return;
        }

        // Create folders
        string tempRoot = "Library/_UnitypackageTemp/";
        string extractDir = tempRoot + "Extract/";
        string packageDir = tempRoot + "Package/";

        if (Directory.Exists(tempRoot))
            Directory.Delete(tempRoot, true);

        Directory.CreateDirectory(tempRoot);
        Directory.CreateDirectory(extractDir);
        Directory.CreateDirectory(packageDir);

        // =====================================================
        // 1) Extract .unitypackage
        // =====================================================
        ExtractUnitypackage(unitypackagePath, extractDir);

        // =====================================================
        // 2) Convert Structure to UPM layout
        // =====================================================
        Directory.CreateDirectory(packageDir + "Runtime/");
        Directory.CreateDirectory(packageDir + "Editor/");

        foreach (string folder in Directory.GetDirectories(extractDir))
        {
            string assetPath = Path.Combine(folder, "pathname");
            string fullAssetPath = File.ReadAllText(assetPath);

            string srcFile = Path.Combine(folder, "asset");
            if (!File.Exists(srcFile)) continue;

            string nameLower = fullAssetPath.ToLower();

            if (nameLower.Contains("/editor/"))
            {
                CopySafe(srcFile, packageDir + "Editor/" + Path.GetFileName(fullAssetPath));
            }
            else
            {
                CopySafe(srcFile, packageDir + "Runtime/" + Path.GetFileName(fullAssetPath));
            }
        }

        // =====================================================
        // 3) Create package.json
        // =====================================================
        string packageJson = $@"{{
  ""name"": ""{packageName}"",
  ""displayName"": ""{displayName}"",
  ""version"": ""{version}"",
  ""unity"": ""2019.4"",
  ""description"": ""Converted from unitypackage"",
  ""author"": {{
    ""name"": ""Auto Generator""
  }}
}}";

        File.WriteAllText(packageDir + "package.json", packageJson);

        // =====================================================
        // 4) Export to .tgz
        // =====================================================
        string savePath = EditorUtility.SaveFilePanel(
            "Save .tgz package",
            "",
            $"{packageName}_{version}.tgz",
            "tgz"
        );

        if (savePath.Length > 5)
        {
            CreateTarGz(packageDir, savePath);
            EditorUtility.DisplayDialog("Completed", "Đã tạo file .tgz thành công!", "OK");
        }

        AssetDatabase.Refresh();
    }

    // ======================================================================
    // SUPPORT FUNCTIONS
    // ======================================================================

    private void ExtractUnitypackage(string unitypackagePath, string extractDir)
    {
        // Unitypackage = tar.gz
        string tempTar = extractDir + ".tar";

        using (FileStream fs = File.OpenRead(unitypackagePath))
        using (GZipStream gzip = new GZipStream(fs, CompressionMode.Decompress))
        using (FileStream tarFs = File.OpenWrite(tempTar))
        {
            gzip.CopyTo(tarFs);
        }

        ExtractTar(tempTar, extractDir);
        File.Delete(tempTar);
    }

    private void ExtractTar(string tarPath, string outDir)
    {
        using (FileStream fs = File.OpenRead(tarPath))
        {
            byte[] header = new byte[512];

            while (fs.Read(header, 0, 512) == 512)
            {
                string name = System.Text.Encoding.ASCII.GetString(header, 0, 100).Trim('\0');
                if (string.IsNullOrEmpty(name)) break;

                long size = Convert.ToInt64(System.Text.Encoding.ASCII.GetString(header, 124, 12).Trim(), 8);

                string filePath = Path.Combine(outDir, name);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                byte[] buffer = new byte[size];
                fs.Read(buffer, 0, (int)size);
                File.WriteAllBytes(filePath, buffer);

                long blocks = (size + 511) / 512;
                fs.Seek(blocks * 512, SeekOrigin.Current);
            }
        }
    }

    private void CopySafe(string src, string dst)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(dst));
        File.Copy(src, dst, true);
    }

    private void CreateTarGz(string srcDir, string tgzPath)
    {
        string tarPath = tgzPath.Replace(".tgz", ".tar");

        // Create TAR
        using (FileStream outStream = File.Create(tarPath))
        {
            WriteDirectoryToTar(srcDir, outStream);
        }

        // Compress to GZ
        using (FileStream inTar = File.OpenRead(tarPath))
        using (FileStream outGz = File.Create(tgzPath))
        using (GZipStream gzip = new GZipStream(outGz, (CompressionLevel)CompressionLevel.Optimal))
        {
            inTar.CopyTo(gzip);
        }

        File.Delete(tarPath);
    }

    private void WriteDirectoryToTar(string srcDir, FileStream outStream)
    {
        foreach (string filePath in Directory.GetFiles(srcDir, "*", SearchOption.AllDirectories))
        {
            string relative = filePath.Substring(srcDir.Length).TrimStart('/');
            byte[] header = new byte[512];

            System.Text.Encoding.ASCII.GetBytes(relative).CopyTo(header, 0);
            string size = Convert.ToString(new FileInfo(filePath).Length, 8);
            System.Text.Encoding.ASCII.GetBytes(size).CopyTo(header, 124);

            outStream.Write(header, 0, 512);

            byte[] data = File.ReadAllBytes(filePath);
            outStream.Write(data, 0, data.Length);

            int padding = 512 - (data.Length % 512);
            if (padding < 512) outStream.Write(new byte[padding], 0, padding);
        }
    }
}

