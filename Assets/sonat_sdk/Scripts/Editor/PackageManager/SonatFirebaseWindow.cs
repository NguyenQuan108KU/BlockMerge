using System.Collections.Generic;
using System.Linq;
using sonat_sdk.Scripts.Editor.PackageManager;
using Sonat.Editor.PackageManager.Elements;
using Sonat.FirebaseModule.Analytic;
using UnityEditor;
using UnityEngine;

#if UNITY_EDITOR
namespace Sonat.Editor.PackageManager
{
    public class SonatFirebaseWindow
    {
        private SonatSDKWindow sonatSDKWindow;
        private GUIContent[] myContent;

        public SonatFirebaseConfig sonatFirebaseConfig;

        private AnalyticWindowDraw analyticWindowDraw;
        private RemoteConfigWindowDraw remoteConfigWindowDraw;

        private string firebaseVersionInstalled;
        public string[] firebaseVersions;
        public int selectedVersion;
        private List<FirebaseSDKInstallDraw> sdkInstalls = new List<FirebaseSDKInstallDraw>();

        public string[] externalVersions;
        public int selectedVersionExternal;
        private string externalVersionInstalled;
        private bool externalInstalled;

        public SonatFirebaseWindow(SonatSDKWindow sonatSDKWindow)
        {
            this.sonatSDKWindow = sonatSDKWindow;
        }

        public void Init()
        {
            myContent = new GUIContent[]
            {
                new GUIContent("RemoteConfig"),
                new GUIContent("Analytics"),
                new GUIContent("Install")
            };

            sonatFirebaseConfig = SonatEditorHelper.LoadConfigSo<SonatFirebaseConfig>(nameof(SonatFirebaseConfig));

            analyticWindowDraw = new AnalyticWindowDraw(this);
            remoteConfigWindowDraw = new RemoteConfigWindowDraw();
            remoteConfigWindowDraw.Init(this);

            //firebaseVersions = SonatSDKWindow.packageInfo.firebase.Keys.ToArray();
            var firebaseVersionAvailable = PackageInstaller.GetAvailableVersions("firebase");
            firebaseVersions = firebaseVersionAvailable.Where(e => e.packageName == "com.google.firebase.app").Select(v => v.version).ToArray();
            selectedVersion = firebaseVersions.Length - 1;

            externalVersions = firebaseVersionAvailable.Where(e => e.packageName == "com.google.external-dependency-manager").Select(v => v.version).ToArray();
            selectedVersionExternal = externalVersions.Length - 1;

            sdkInstalls.Clear();
            sdkInstalls.Add(new FirebaseSDKInstallDraw(this, "Firebase Analytics", "com.google.firebase.analytics", "using_firebase_analytics"));
            sdkInstalls.Add(new FirebaseSDKInstallDraw(this, "Firebase Installations", "com.google.firebase.installations", "using_firebase_installation"));
            sdkInstalls.Add(new FirebaseSDKInstallDraw(this, "Firebase Crashlytics", "com.google.firebase.crashlytics", "using_firebase_crashlytics"));
            sdkInstalls.Add(new FirebaseSDKInstallDraw(this, "Firebase Remote Config", "com.google.firebase.remote-config", "using_firebase_remote"));
            sdkInstalls.Add(new FirebaseSDKInstallDraw(this, "Firebase Messaging", "com.google.firebase.messaging", "using_firebase_message"));
            sdkInstalls.Add(new FirebaseSDKInstallDraw(this, "Firebase Authentication", "com.google.firebase.auth", "using_firebase_auth"));


            foreach (var sdkInstall in sdkInstalls)
            {
                sdkInstall.Init();
            }

            firebaseVersionInstalled = PackageInstaller.GetInstalledVersion("com.google.firebase.app");
            if (!string.IsNullOrEmpty(firebaseVersionInstalled))
            {
                selectedVersion = firebaseVersions.ToList().IndexOf(firebaseVersionInstalled);
            }

            CheckExternal();
        }

        private void CheckExternal()
        {
            externalVersionInstalled = PackageInstaller.GetInstalledVersion("com.google.external-dependency-manager");
            if (!string.IsNullOrEmpty(externalVersionInstalled))
            {
                selectedVersion = externalVersions.ToList().IndexOf(externalVersionInstalled);
                externalInstalled = true;
            }
        }

        public void Show()
        {
            var tabStyle = EditorStyles.toolbarButton;
            tabStyle.alignment = TextAnchor.MiddleLeft;
            var selectedTabStyle = new GUIStyle(tabStyle);
            selectedTabStyle.normal.background = selectedTabStyle.active.background;

            GUILayout.BeginHorizontal();
            GUILayout.BeginVertical(GUILayout.Width(150), GUILayout.ExpandHeight(true));
            for (int i = 0; i < myContent.Length; i++)
            {
                GUIStyle style = sonatSDKWindow.firebaseTab == i ? selectedTabStyle : tabStyle;
                if (GUILayout.Toggle(sonatSDKWindow.firebaseTab == i, myContent[i], style))
                    sonatSDKWindow.firebaseTab = i;
            }

            GUILayout.EndVertical();

            GUILayout.Box(Texture2D.blackTexture, GUILayout.Width(1.2f), GUILayout.ExpandHeight(true));

            GUILayout.BeginVertical(new GUIStyle(GUI.skin.box));
            switch (sonatSDKWindow.firebaseTab)
            {
                case 0:
                    ShowRemoteConfigPanel();
                    break;
                case 1:
                    ShowAnalyticPanel();
                    break;
                case 2:
                    ShowInstallPanel();
                    break;
            }

            GUILayout.EndVertical();
            GUILayout.EndHorizontal();
        }

        private void ShowAnalyticPanel()
        {
            Undo.RecordObject(sonatFirebaseConfig, "SonatFirebaseConfig");
            analyticWindowDraw.Draw();
            EditorUtility.SetDirty(sonatFirebaseConfig);
        }

        private void ShowRemoteConfigPanel()
        {
            Undo.RecordObject(sonatFirebaseConfig, "SonatFirebaseConfig");
            remoteConfigWindowDraw.Draw();
            EditorUtility.SetDirty(sonatFirebaseConfig);
        }

        private Vector2 scrollPosition = Vector2.zero;

        private void ShowInstallPanel()
        {
            // GUILayout.BeginHorizontal();
            // GUILayout.Label("Firebase Version Common", EditorStyles.boldLabel);
            // selectedVersion = EditorGUILayout.Popup("", selectedVersion, firebaseVersions, GUILayout.Width(200));
            // GUILayout.EndHorizontal();
            //
            // GUILayout.Box(Texture2D.whiteTexture, GUILayout.Height(1.5f), GUILayout.ExpandWidth(true));
            //


            scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition);

            GUILayout.BeginVertical(new GUIStyle(GUI.skin.box));
            // GUILayout.Label($"Firebase SDKs", EditorStyles.boldLabel);
            // GUILayout.Space(5);

            GUILayout.BeginHorizontal();
            //EditorGUI.BeginDisabledGroup(externalInstalled);

            GUILayout.Label("External Dependencies: ");
            selectedVersionExternal = EditorGUILayout.Popup(selectedVersionExternal, externalVersions, GUILayout.Width(100));
            bool changeVersion = externalVersionInstalled != externalVersions[selectedVersionExternal];
            EditorGUI.BeginDisabledGroup(externalInstalled && !changeVersion);
            string buttonText = externalInstalled ? changeVersion ? "Upgrade" : "Installed" : "Install";
            if (GUILayout.Button(buttonText, GUILayout.Width(150)))
            {
                PackageInstaller.InstallSDK("firebase", "com.google.external-dependency-manager", externalVersions[selectedVersionExternal]);
                CheckExternal();
            }

            EditorGUI.EndDisabledGroup();
            GUILayout.EndHorizontal();

            GUILayout.Space(5);
            GUILayout.Label($"Firebase SDKs", EditorStyles.boldLabel);
            GUILayout.Space(5);

            EditorGUI.BeginDisabledGroup(!externalInstalled);
            selectedVersion = EditorGUILayout.Popup("Version", selectedVersion, firebaseVersions, GUILayout.Width(250));

            GUILayout.Space(5);


            bool needInstall = false;
            bool needAddSymbol = false;

            foreach (var sdkInstall in sdkInstalls)
            {
                GUILayout.BeginHorizontal();
                bool needUpdate = sdkInstall.CheckUpdateVersion(firebaseVersions[selectedVersion]);
                EditorGUI.BeginDisabledGroup(sdkInstall.installed && !needUpdate);
                sdkInstall.needInstall = GUILayout.Toggle(sdkInstall.needInstall || sdkInstall.installed, sdkInstall.packageName);
                if (!needInstall && (sdkInstall.needInstall || needUpdate)) needInstall = !sdkInstall.installed || needUpdate;
                EditorGUI.EndDisabledGroup();

                EditorGUI.BeginDisabledGroup(!sdkInstall.installed || sdkInstall.hasSymbol);
                string symbolLabel = sdkInstall.hasSymbol ? "Symbol Added" : "Add Symbol";
                if (!needAddSymbol && !sdkInstall.hasSymbol) needAddSymbol = sdkInstall.installed;
                if (GUILayout.Button(symbolLabel, GUILayout.Width(150)))
                {
                    SonatEditorHelper.AddSymbol(new[] { sdkInstall.symbol }, EditorUserBuildSettings.selectedBuildTargetGroup);
                }

                EditorGUI.EndDisabledGroup();
                GUILayout.EndHorizontal();
            }

            GUILayout.Space(5);

            GUILayout.BeginHorizontal();

            EditorGUI.BeginDisabledGroup(!needInstall);
            if (GUILayout.Button("Install", GUILayout.Width(150)))
            {
                string firebaseAppVersionInstalled = PackageInstaller.GetInstalledVersion("com.google.firebase.app");
                bool firebaseAppInstalled = firebaseAppVersionInstalled == firebaseVersions[selectedVersion];

                if (!firebaseAppInstalled)
                {
                    PackageInstaller.InstallSDK("firebase", "com.google.firebase.app", firebaseVersions[selectedVersion]);
                }

                foreach (var sdkInstall in sdkInstalls)
                {
                    if ((sdkInstall.needInstall && !sdkInstall.installed) || sdkInstall.CheckUpdateVersion(firebaseVersions[selectedVersion]))
                    {
                        PackageInstaller.InstallSDK("firebase", sdkInstall.packageId, firebaseVersions[selectedVersion]);
                    }
                }
            }

            EditorGUI.EndDisabledGroup();

            GUILayout.FlexibleSpace();

            EditorGUI.BeginDisabledGroup(!needAddSymbol);
            if (GUILayout.Button("Add All Symbols", GUILayout.Width(150)))
            {
                List<string> symbols = new List<string>();
                foreach (var sdkInstall in sdkInstalls)
                {
                    if (!sdkInstall.hasSymbol && sdkInstall.installed) symbols.Add(sdkInstall.symbol);
                }

                SonatEditorHelper.AddSymbol(symbols.ToArray(), EditorUserBuildSettings.selectedBuildTargetGroup);
            }

            EditorGUI.EndDisabledGroup();

            GUILayout.EndHorizontal();

            EditorGUI.EndDisabledGroup();

            GUILayout.EndVertical();

            EditorGUILayout.EndScrollView();
        }
    }
}
#endif