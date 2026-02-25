using System.Collections;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json;
using Sonat.Enums;
#if sonat_sdk
using Sonat.TrackingModule;
#endif
using SonatFramework.Scripts.Helper;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems.UserData;
using UnityEngine;
using UnityEngine.Networking;

namespace SonatFramework.Systems.LevelManagement
{
    [CreateAssetMenu(fileName = "LevelRemoteServiceAsync", menuName = "Sonat Services/Level Service/Level Remote Service Async")]
    public class LevelRemoteServiceAsync : LevelServiceAsync, IServiceInitialize, IServiceWaitingRemoteConfig
    {
        private LevelRemoteConfigData levelRemoteConfigData;
        private AssetBundle assetBundle;
        private StringDataPref lastId;
        private bool outOfSegment;
        private StringDataPref cachedRemoteValue;
        public static string mapId;
        private bool initialized = false;
        protected LevelData levelCache;

        [SerializeField] private SonatLevelServiceAsync levelServiceFallback;

        public void Initialize()
        {
            lastId = new SonatFramework.Scripts.Helper.StringDataPref("LAST_REMOTE_LEVEL_DATA_ID", "");
            cachedRemoteValue = new SonatFramework.Scripts.Helper.StringDataPref("CACHED_REMOTE_VALUE", "");
            levelServiceFallback = Instantiate(levelServiceFallback);
        }

        public void OnRemoteConfigReady()
        {
            if (initialized) return;
            initialized = true;
            if (levelServiceFallback != null)
            {
                levelServiceFallback.OnRemoteConfigReady();
            }

            GetRemoteData();
        }

        public override async UniTask<T> GetLevelData<T>(int level, GameMode gameMode, bool force = false, bool loop = true, int category = 0)
        {
            if (!force && levelCache != null && levelCache.gameMode == gameMode && levelCache.level == level && levelCache.category == category)
                return levelCache as T;
            return await GetLevel<T>(level, gameMode, category);
        }

        protected override async UniTask<T> GetLevel<T>(int level, GameMode gameMode, int category)
        {
            if (!outOfSegment && assetBundle != null)
            {
                string assetBundleName = category == 0 ? level.ToString() : $"{level}.{category}";
                TextAsset textAsset = assetBundle.LoadAsset<TextAsset>(assetBundleName);
                if (textAsset != null && !string.IsNullOrEmpty(textAsset.text))
                {
                    var data = JsonConvert.DeserializeObject<T>(textAsset.text, Settings);
                    if (data != null && data.gameMode == gameMode)
                    {
                        data.category = category;
                        levelCache = data;
                        return data;
                    }
                }
            }

            return await levelServiceFallback.GetLevelData<T>(level, gameMode, category: category);
        }

        private void GetRemoteData(int currentLevel = -1)
        {
            string json = SonatSDKAdapter.GetRemoteString("remote_level_data", null);

            if (string.IsNullOrEmpty(json) && !SonatSDKAdapter.IsInternetConnection())
            {
                json = cachedRemoteValue.Value;
            }

            if (!string.IsNullOrEmpty(json))
            {
                if (!cachedRemoteValue.Value.Equals(json))
                {
                    cachedRemoteValue.Value = json;
                    if (PlayerPrefs.HasKey("DOWN_LOAD_LEVEL_LOG"))
                    {
                        PlayerPrefs.DeleteKey("DOWN_LOAD_LEVEL_LOG");
                    }
                }

                levelRemoteConfigData = JsonConvert.DeserializeObject<LevelRemoteConfigData>(json);
                levelRemoteConfigData.ParseData();
                if (string.IsNullOrEmpty(lastId.Value) || levelRemoteConfigData.id != lastId.Value)
                {
                    if (levelRemoteConfigData.force)
                    {
                        if (currentLevel < 0) currentLevel = SonatSystem.GetService<UserDataService>().GetLevel();
                        if (currentLevel > levelRemoteConfigData.levelStart)
                        {
                            outOfSegment = true;
                        }
                    }
                }
            }
            else
            {
                outOfSegment = true;
            }

            if (!outOfSegment)
            {
                SonatSystem.Instance.StartCoroutine(DownloadAssetBundle());
            }
        }

        private IEnumerator DownloadAssetBundle()
        {
            Debug.Log("DownloadLevelManager: start load remote level data");
            Hash128 hash128 = new Hash128();
            hash128.Append(levelRemoteConfigData.id);
            CachedAssetBundle cached = new CachedAssetBundle(levelRemoteConfigData.id, hash128);
            LogDownLoadPhase("start", levelRemoteConfigData.id);
            using (UnityWebRequest www = UnityWebRequestAssetBundle.GetAssetBundle(levelRemoteConfigData.url, cached, 0))
            {
                yield return www.SendWebRequest();
                if (www.result != UnityWebRequest.Result.Success)
                {
                    Debug.Log("DownloadLevelManager: request fail!!");
                    LogDownLoadPhase("failed", levelRemoteConfigData.id);
                }
                else
                {
                    Debug.Log("DownloadLevelManager: download success!");
                    assetBundle = DownloadHandlerAssetBundle.GetContent(www);
                    if (assetBundle != null)
                        lastId.Value = levelRemoteConfigData.id;
                    yield return new WaitForSeconds(0.1f);
                    LogDownLoadPhase("success", levelRemoteConfigData.id);
                    PlayerPrefs.SetString("DOWN_LOAD_LEVEL_LOG_ID", levelRemoteConfigData.id);
                }
            }
        }

        private void LogDownLoadPhase(string phase, string map_id)
        {
#if sonat_sdk
            if (PlayerPrefs.GetString("DOWN_LOAD_LEVEL_LOG_ID", "unknow").Equals(map_id)) return;
            new SonatLogDownloadLevelData()
            {
                phase = phase,
                map_id = map_id
            }.Post();
#endif
        }
    }
}