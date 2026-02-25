using UnityEngine;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.GameDataManagement;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Scripts.Feature.Lives;
using SonatFramework.Systems.UserData;

[System.Serializable]
public class PlayerData
{
    private const string KEY_HIGHEST_SCORE = "USER_HIGHEST_SCORE";
    private const string KEY_TOTAL_GAMES = "USER_TOTAL_GAMES";

    private DataService DataService => SonatSystem.GetService<DataService>();
    private InventoryService InventoryService => SonatSystem.GetService<InventoryService>();
    private LivesService LivesService => SonatSystem.GetService<LivesService>();
    private UserDataService UserDataService => SonatSystem.GetService<UserDataService>();

    // === SỬA: Dùng UserDataService thay vì KEY riêng ===
    public int UnlockedLevel => UserDataService?.GetLevel(GameMode.Classic) ?? 1;

    public int HighestScore => DataService.GetInt(KEY_HIGHEST_SCORE, 0);
    public int TotalGamesPlayed => DataService.GetInt(KEY_TOTAL_GAMES, 0);

    public int CurrentHearts
    {
        get
        {
            if (InventoryService == null) return 0;
            return InventoryService.GetResource(GameResource.Live.ToGameResourceKey()).quantity;
        }
    }

    public int CurrentCoins
    {
        get
        {
            if (InventoryService == null) return 0;
            return InventoryService.GetResource(GameResource.Coin.ToGameResourceKey()).quantity;
        }
    }

    public bool HasUnlimitedLives => LivesService != null && LivesService.IsUnlimitedLives();

    public PlayerData() { }

    public void Load()
    {
        Debug.Log($"[PlayerData] Level: {UnlockedLevel}, Hearts: {CurrentHearts}, Coins: {CurrentCoins}");
    }

    public void Save()
    {
        DataService.SaveData();
    }

    #region Level Management

    // === SỬA: Không cần tự lưu level, UserDataService sẽ xử lý qua LevelEndedEvent ===
    public void UnlockNextLevel(int completedLevel)
    {
        // Chỉ raise event, không lưu trực tiếp
        // UserDataService sẽ tự LevelUp() khi nhận LevelEndedEvent
        EventBus<LevelUnlockedEvent>.Raise(new LevelUnlockedEvent { LevelIndex = completedLevel + 1 });
    }

    public bool IsLevelUnlocked(int levelIndex)
    {
        return levelIndex <= UnlockedLevel;
    }

    public void ResetProgress()
    {
        // Reset qua UserDataService
        UserDataService?.SaveLevel(1, GameMode.Classic);
        DataService.SetInt(KEY_HIGHEST_SCORE, 0);
        DataService.SetInt(KEY_TOTAL_GAMES, 0);
        Save();
    }

    #endregion

    #region Heart Management

    public bool CanPlay()
    {
        if (LivesService != null) return LivesService.CanPlay();
        return CurrentHearts > 0;
    }

    public bool TrySpendHeart(int amount = 1)
    {
        if (LivesService != null)
        {
            if (!LivesService.CanPlay()) return false;
            LivesService.ReduceLive(amount, new SpendResourceLogData("gameplay", "start_level"));
            EventBus<HeartChangedEvent>.Raise(new HeartChangedEvent { NewBalance = CurrentHearts });
            return true;
        }

        if (InventoryService == null) return false;
        var key = GameResource.Live.ToGameResourceKey();
        if (!InventoryService.CanReduce(key, amount)) return false;

        InventoryService.SpendResource(key, amount, new SpendResourceLogData("gameplay", "start_level"));
        EventBus<HeartChangedEvent>.Raise(new HeartChangedEvent { NewBalance = CurrentHearts });
        return true;
    }

    public void AddHearts(int amount, string source = "reward")
    {
        if (LivesService != null)
        {
            LivesService.RefillLive(amount, new EarnResourceLogData("currency", source));
            EventBus<HeartChangedEvent>.Raise(new HeartChangedEvent { NewBalance = CurrentHearts });
            return;
        }

        if (InventoryService == null) return;
        InventoryService.AddResource(
            new ResourceData(GameResource.Live, amount),
            new EarnResourceLogData("currency", source)
        );
        EventBus<HeartChangedEvent>.Raise(new HeartChangedEvent { NewBalance = CurrentHearts });
    }

    #endregion

    #region Coin Management

    public bool TrySpendCoins(int amount, string reason = "purchase")
    {
        if (InventoryService == null) return false;

        var key = GameResource.Coin.ToGameResourceKey();
        if (!InventoryService.CanReduce(key, amount)) return false;

        InventoryService.SpendResource(key, amount, new SpendResourceLogData("currency", reason));
        EventBus<CoinChangedEvent>.Raise(new CoinChangedEvent { NewBalance = CurrentCoins });
        return true;
    }

    public void AddCoins(int amount, string source = "reward")
    {
        if (InventoryService == null) return;

        InventoryService.AddResource(
            new ResourceData(GameResource.Coin, amount),
            new EarnResourceLogData("currency", source)
        );
        EventBus<CoinChangedEvent>.Raise(new CoinChangedEvent { NewBalance = CurrentCoins });
    }

    #endregion

    #region Statistics

    public void UpdateHighestScore(int score)
    {
        if (score > HighestScore)
        {
            DataService.SetInt(KEY_HIGHEST_SCORE, score);
            Save();
        }
    }

    public void IncrementGamesPlayed()
    {
        DataService.SetInt(KEY_TOTAL_GAMES, TotalGamesPlayed + 1);
        Save();
    }

    #endregion
}