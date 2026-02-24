using System;
using System.Linq;
using Sonat.AppsFlyerModule;
using UnityEditor;
using UnityEngine;

namespace Sonat.Editor.PackageManager.Elements
{
    public class AppsFlyerPanelDraw
    {
        private SonatAppsFlyer sonatAppsFlyer;

        private bool edit;
        private string afVersion;

        public void Init()
        {
            sonatAppsFlyer = SonatEditorHelper.LoadConfigSo<SonatAppsFlyer>(nameof(SonatAppsFlyer));
            if (sonatAppsFlyer == null) return;

            hasAppsFlyerSymbol = SonatEditorHelper.HasSymbol("using_appsflyer", EditorUserBuildSettings.selectedBuildTargetGroup);
            CheckAppsFlyerInstalled();
            //CheckAppsFlyerConnectorInstalled();
        }

        public void Draw()
        {
            if (sonatAppsFlyer == null) return;
            GUILayout.BeginVertical(new GUIStyle(GUI.skin.box));
            GUILayout.Space(5);
            //EditorGUILayout.PropertyField(loginProperty, new GUIContent("Login"));
            //serializedAppFlyer.ApplyModifiedProperties();
            GUILayout.BeginHorizontal();
            EditorGUIUtility.labelWidth = 80;
            EditorGUI.BeginDisabledGroup(!edit);
            sonatAppsFlyer.devKey = EditorGUILayout.TextField("Dev Key", sonatAppsFlyer.devKey, GUILayout.Width(300));
            EditorGUI.EndDisabledGroup();
            GUILayout.FlexibleSpace();
            EditorGUIUtility.labelWidth = 30;
            edit = EditorGUILayout.Toggle("Edit", edit);
            EditorGUIUtility.labelWidth = 80;
            GUILayout.EndHorizontal();
            sonatAppsFlyer.waitingInit = EditorGUILayout.Toggle("Waiting Init", sonatAppsFlyer.waitingInit);
            EditorGUIUtility.labelWidth = 50;

            GUILayout.Space(5);
            GUILayout.EndVertical();


            GUILayout.Space(10);

            GUILayout.BeginVertical(new GUIStyle(GUI.skin.box));
            GUILayout.Label("INSTALL", EditorStyles.boldLabel);

            GUILayout.Box(Texture2D.whiteTexture, GUILayout.Height(1.5f), GUILayout.ExpandWidth(true));

            GUILayout.Space(5);
            AppsFlyerInstallation();
            GUILayout.Space(5);

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            EditorGUI.BeginDisabledGroup(!appsFlyerInstalled || hasAppsFlyerSymbol);
            string symbolLabel = hasAppsFlyerSymbol ? "Symbol Added" : "Add Symbol";
            if (GUILayout.Button(symbolLabel, GUILayout.Width(120)))
            {
                SonatEditorHelper.AddSymbol(new[] { "using_appsflyer" }, EditorUserBuildSettings.selectedBuildTargetGroup);
            }

            EditorGUI.EndDisabledGroup();
            GUILayout.EndHorizontal();

            GUILayout.EndVertical();

            EditorUtility.SetDirty(sonatAppsFlyer);
        }

        private string appsFlyerVersionInstalled = "";
        private bool appsFlyerInstalled;

        private bool hasAppsFlyerSymbol;
        private string[] appsFlyerVersions;
        private int appsFlyerVersionSelected;
        private bool appsFlyerUpgrade;
        private bool previewAppsFlyerAfterDownload = true;

        private void CheckAppsFlyerInstalled()
        {
            if (string.IsNullOrEmpty(appsFlyerVersionInstalled))
            {
                appsFlyerVersionInstalled =
                    SonatEditorHelper.CheckVersionInstalled("AppsFlyerDependencies.xml", "AppsFlyer", @"""com.appsflyer:unity-wrapper:(?<ver>.+)""");
                if (!string.IsNullOrEmpty(appsFlyerVersionInstalled))
                {
                    if (new Version(appsFlyerVersionInstalled) < new Version("6.15.0"))
                    {
                        if (!SonatEditorHelper.HasSymbol("appsflyer_6_15_or_older", EditorUserBuildSettings.selectedBuildTargetGroup))
                            SonatEditorHelper.AddSymbol(new string[] { "appsflyer_6_15_or_older" }, EditorUserBuildSettings.selectedBuildTargetGroup);
                    }
                    else
                    {
                        if (SonatEditorHelper.HasSymbol("appsflyer_6_15_or_older", EditorUserBuildSettings.selectedBuildTargetGroup))
                            SonatEditorHelper.RemoveSymbolFromBuildTarget("appsflyer_6_15_or_older");
                    }
                }
            }

            appsFlyerInstalled = !string.IsNullOrEmpty(appsFlyerVersionInstalled);
            appsFlyerVersions = SonatSDKWindow.packageInfo.appsFlyerUrls.Keys.ToArray();
            appsFlyerVersionSelected = appsFlyerVersions.Length - 1;

            if (!appsFlyerInstalled && hasAppsFlyerSymbol)
            {
                hasAppsFlyerSymbol = false;
                SonatEditorHelper.RemoveSymbolFromBuildTarget("using_appsflyer");
            }
        }

        private void AppsFlyerInstallation()
        {
            GUILayout.BeginVertical(new GUIStyle(GUI.skin.box));
            GUILayout.Label($"AppsFlyer SDK", EditorStyles.boldLabel);
            GUILayout.Space(5);
            if (appsFlyerInstalled)
                GUILayout.Label($"AppsFlyer Installed Version: {appsFlyerVersionInstalled}", SonatSDKWindow.labelGreenStyle);
            else
            {
                EditorGUILayout.HelpBox("AppsFlyer Not Installed Yet", MessageType.Error);
            }

            GUILayout.Space(5);

            if (appsFlyerInstalled)
            {
                appsFlyerUpgrade = EditorGUILayout.Foldout(appsFlyerUpgrade, "Upgrade", true);
                GUILayout.Space(3);
            }
            else
            {
                appsFlyerUpgrade = true;
            }

            if (appsFlyerUpgrade)
            {
                GUILayout.BeginHorizontal();
                //GUILayout.Label("Install");
                appsFlyerVersionSelected = EditorGUILayout.Popup("Version", appsFlyerVersionSelected, appsFlyerVersions, GUILayout.Width(200));

                previewAppsFlyerAfterDownload = EditorGUILayout.Toggle("Preview", previewAppsFlyerAfterDownload);
                string installLabel = "Install";
                if (appsFlyerInstalled)
                {
                    installLabel = "Upgrade";
                }

                EditorGUI.BeginDisabledGroup(appsFlyerInstalled && appsFlyerVersionInstalled == appsFlyerVersions[^1]);
                if (GUILayout.Button(installLabel, GUILayout.Width(120)))
                {
                    string verInstall = appsFlyerVersions[appsFlyerVersionSelected];
                    string url = SonatSDKWindow.packageInfo.appsFlyerUrls[appsFlyerVersions[appsFlyerVersionSelected]];
                    SonatPackageHelper.InstallPackage(url, $"appsflyer-unity-purchase-connector-{verInstall}", previewAppsFlyerAfterDownload);
                }

                EditorGUI.EndDisabledGroup();


                GUILayout.EndHorizontal();
            }

            GUILayout.Space(5);
            GUILayout.EndVertical();
        }

        
    }
}