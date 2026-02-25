using Base.Singleton;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json;
using Sonat.AdsModule;
using Sonat.Enums;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.UserData;
using System;
using System.Collections;
using UnityEngine;

public class CheatManager : Singleton<CheatManager>
{
    private static bool _cheatNoAds;
    public static bool unlocked;

    protected override void OnAwake()
    {
        unlocked = PlayerPrefs.HasKey("SONAT_CHEATED");
        _cheatNoAds = PlayerPrefs.GetInt("CHEAT_NO_ADS", 0) == 1;
        SonatAds.externConditionShowAds += OnCheckShowAds;
    }

    private static bool OnCheckShowAds(AdPlacement placement)
    {
        return !_cheatNoAds;
    }

    public static void CheatNoAds()
    {
        _cheatNoAds = !_cheatNoAds;
        PlayerPrefs.SetInt("CHEAT_NO_ADS", _cheatNoAds ? 1 : 0);
        PlayerPrefs.Save();

        SonatAds.SetNoAds(_cheatNoAds);  // ← Dùng public API, destroy banner + native

        Debug.Log($"[Cheat] NoAds = {_cheatNoAds}");
    }

    void Start()
    {
    }

#if UNITY_EDITOR || UNITY_STANDALONE_WIN
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.F1))
        {
            CheatPanel cheatPanel = PanelManager.Instance.GetPanel<CheatPanel>();
            if (cheatPanel == null)
            {
                PanelManager.Instance.OpenForget<CheatPanel>();
            }
            else
            {
                cheatPanel.OnOffCheat();
            }
        }

        if (Input.GetKey(KeyCode.LeftShift))
        {
            if (Input.GetKeyDown(KeyCode.S))
            {
                CheatWinState();
                return;
            }

            if (Input.GetKeyDown(KeyCode.W))
            {
                CheatWin();
                return;
            }

            if (Input.GetKeyDown(KeyCode.L))
            {
                CheatLose();
                return;
            }
        }
    }
#endif

    public static void CheatWinState()
    {
        GameManager.Instance?.HandleScoreReached();
    }

    public static void CheatWin()
    {
        GameManager.Instance?.HandleScoreReached();
    }

    public static void CheatLose()
    {
        GameManager.Instance?.HandleBlockOverflow();
    }

    public static void CheatLevel(int level)
    {
        GameManager.Instance?.PlayLevelByIndex(level);
    }

    private static async UniTaskVoid PlayLevel()
    {
        //await GameplayController.instance.CloseTower();
        //GameplayController.instance.Play();
    }

    public static void CheatResource(GameResource resource, int value)
    {
        var inventoryService = SonatSystem.GetService<InventoryService>();

        // Dùng UpdateResource thay vì SetResource
        inventoryService.UpdateResource(resource.ToGameResourceKey(), value);

        // Raise event để UI cập nhật
        EventBus<AddResourceVisualEvent>.Raise(new AddResourceVisualEvent()
        {
            key = resource.ToGameResourceKey(),
        });
    }

    public static void CheatRemoteConfig(string key, string value)
    {
        if (int.TryParse(value, out var intValue))
        {
            PlayerPrefs.SetInt($"remote_value_{key}", intValue);
        }
        else if (bool.TryParse(value, out var booValue))
        {
            PlayerPrefs.SetInt($"remote_value_{key}", booValue ? 1 : 0);
        }
        else
        {
            PlayerPrefs.SetString($"remote_value_{key}", value);
        }
    }

    public static void CheatPlayerPrefs(string key, string value)
    {
        if (value.Length < 8 && int.TryParse(value, out var intValue))
        {
            PlayerPrefs.SetInt($"{key}", intValue);
        }
        else if (bool.TryParse(value, out var booValue))
        {
            PlayerPrefs.SetInt($"{key}", booValue ? 1 : 0);
        }
        else
        {
            PlayerPrefs.SetString($"{key}", value);
        }
    }

    public static bool IsOpenCheat()
    {
        return PlayerPrefs.GetInt("SONAT_CHEATED", 0) == 1 || Application.isEditor;
    }

    public static CheatLevelSource GetLevelSource()
    {
        CheatLevelSource cheatLevelSource = (CheatLevelSource)PlayerPrefs.GetInt("SONAT_CHEATED_LEVELSOURCE", 0);
        if (cheatLevelSource == CheatLevelSource.Drive && !IsOpenCheat())
        {
            cheatLevelSource = CheatLevelSource.Resources;
        }

        return cheatLevelSource;
    }


}

public enum CheatOption
{
    Level,
    Win,
    WinState,
    Lose,
    Resource,
    RemoteConfig,
    PlayerPrefs,
    GDLevel,
    StarChest,
    LevelChest,
    TransportTracking,
    NoAds,              // ← Ở ĐÂY
    MAX,
}

public enum CheatLevelSource
{
    Resources,
    Drive,
    MAX,                // ← GIỮ NGUYÊN, không thêm NoAds
}