using sonat_sdk.Scripts.Editor.PackageManager;
using UnityEditor;
using UnityEngine;

namespace Sonat.Editor.PackageManager.Elements
{
    public class FirebaseSDKInstallDraw
    {
        private string versionInstalled = "";
        public bool installed = false;
        private bool previewAfterDownload = true;

        public bool hasSymbol;

        //private int versionSelected;
        private bool upgrade;
        public bool needInstall;
        public string packageName, packageId, symbol;

        private SonatFirebaseWindow firebaseWindow;


        public FirebaseSDKInstallDraw(SonatFirebaseWindow firebaseWindow, string packageName, string packageId, string symbol)
        {
            this.firebaseWindow = firebaseWindow;
            this.packageName = packageName;
            this.packageId = packageId;
            this.symbol = symbol;
        }

        public void Init()
        {
            CheckAnalyticsInstalled();
        }

        private void CheckAnalyticsInstalled()
        {
            if (string.IsNullOrEmpty(versionInstalled))
            {
                versionInstalled = PackageInstaller.GetInstalledVersion(packageId);
            }

            installed = !string.IsNullOrEmpty(versionInstalled);
            hasSymbol = string.IsNullOrEmpty(symbol) || SonatEditorHelper.HasSymbol(symbol, EditorUserBuildSettings.selectedBuildTargetGroup);
            //versionSelected = firebaseWindow.firebaseVersions.Length - 1;

            if (!installed && hasSymbol)
            {
                hasSymbol = false;
                SonatEditorHelper.RemoveSymbolFromBuildTarget(symbol);
            }
        }

        public bool CheckUpdateVersion(string version)
        {
            return installed && versionInstalled != version;
        }

        // public void Draw()
        // {
        //     GUILayout.BeginVertical(new GUIStyle(GUI.skin.box));
        //     GUILayout.Label($"{packageName} SDK", EditorStyles.boldLabel);
        //     GUILayout.Space(5);
        //     if (installed)
        //     {
        //         GUILayout.BeginHorizontal();
        //         GUILayout.Label($"{packageName} Installed Version: {versionInstalled}", SonatSDKWindow.labelGreenStyle);
        //         EditorGUI.BeginDisabledGroup(!installed || hasSymbol);
        //         string symbolLabel = hasSymbol ? "Symbol Added" : "Add Symbol";
        //         if (GUILayout.Button(symbolLabel, GUILayout.Width(100)))
        //         {
        //             SonatEditorHelper.AddSymbol(new[] { symbol }, EditorUserBuildSettings.selectedBuildTargetGroup);
        //         }
        //
        //         EditorGUI.EndDisabledGroup();
        //         GUILayout.EndHorizontal();
        //     }
        //     else
        //     {
        //         EditorGUILayout.HelpBox($"{packageName} Not Installed Yet", MessageType.Error);
        //     }
        //
        //     GUILayout.Space(3);
        //
        //     if (installed)
        //     {
        //         upgrade = EditorGUILayout.Foldout(upgrade, "Upgrade", true);
        //         GUILayout.Space(3);
        //     }
        //     else
        //     {
        //         upgrade = true;
        //     }
        //
        //     if (upgrade)
        //     {
        //         GUILayout.BeginHorizontal();
        //         EditorGUIUtility.labelWidth = 80;
        //
        //         versionSelected = firebaseWindow.selectedVersion;
        //
        //
        //         previewAfterDownload = EditorGUILayout.Toggle("Preview", previewAfterDownload);
        //         string installLabel = "Install";
        //         if (installed)
        //         {
        //             installLabel = "Upgrade";
        //         }
        //
        //         EditorGUI.BeginDisabledGroup(installed && versionInstalled == firebaseWindow.firebaseVersions[versionSelected]);
        //         if (GUILayout.Button(installLabel, GUILayout.Width(120)))
        //         {
        //             string verInstall = firebaseWindow.firebaseVersions[versionSelected];
        //             PackageInstaller.InstallSDK("firebase", packageId, verInstall);
        //         }
        //
        //         EditorGUI.EndDisabledGroup();
        //         GUILayout.EndHorizontal();
        //     }
        //
        //     GUILayout.Space(5);
        //     GUILayout.EndVertical();
        // }
    }
}