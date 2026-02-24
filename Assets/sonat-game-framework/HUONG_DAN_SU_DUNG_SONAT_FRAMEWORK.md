# HƯỚNG DẪN SỬ DỤNG SONAT FRAMEWORK

## 📚 Mục lục
1. [Giới thiệu](#giới-thiệu)
2. [Kiến trúc tổng quan](#kiến-trúc-tổng-quan)
3. [Cài đặt ban đầu](#cài-đặt-ban-đầu)
4. [Các module chính](#các-module-chính)
5. [Hướng dẫn sử dụng từng module](#hướng-dẫn-sử-dụng-từng-module)
6. [Ví dụ thực tế](#ví-dụ-thực-tế)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Giới thiệu

**Sonat Framework** là một framework toàn diện cho Unity, được thiết kế để hỗ trợ phát triển game mobile một cách nhanh chóng và hiệu quả. Framework cung cấp các module và công cụ sẵn có giúp developer tập trung vào logic game thay vì xây dựng infrastructure từ đầu.

### Tính năng chính:
- ✅ Service Architecture: Quản lý các service độc lập, dễ bảo trì
- ✅ UI Management: Hệ thống quản lý panel/popup mạnh mẽ
- ✅ Event Bus: Giao tiếp giữa các component một cách loosely coupled
- ✅ Audio Management: Quản lý âm thanh, nhạc nền
- ✅ Level Management: Quản lý level và progression
- ✅ Inventory System: Quản lý tài nguyên game với pending resources
- ✅ Shop System: Hệ thống IAP và shop packs
- ✅ Lives System: Quản lý mạng chơi với auto refill
- ✅ Data Persistence: Lưu trữ dữ liệu người chơi
- ✅ Object Pooling: Tối ưu hiệu năng
- ✅ Singleton Patterns: Các pattern Singleton tiện dụng
- ✅ Extensions: Nhiều extension methods hữu ích

---

## Kiến trúc tổng quan

Sonat Framework được xây dựng dựa trên **Service-Oriented Architecture (SOA)**. Các thành phần chính:

```
SonatSystem (Entry Point)
    ├── SonatServicesManager (Quản lý tất cả services)
    │   ├── SonatAudioService
    │   ├── SonatConfigService
    │   ├── PlayerPrefsDataService
    │   ├── SonatInventoryService
    │   ├── LivesService
    │   ├── ShopService
    │   ├── LoadObjectServiceAsync
    │   └── ... (các service khác)
    │
    ├── PanelManager (Quản lý UI)
    │   ├── Panels Stack
    │   └── Cache System
    │
    └── EventBus (Giao tiếp giữa các component)
```

### Nguyên tắc hoạt động:

1. **SonatSystem**: Singleton chính, là entry point của framework
2. **Services**: Các module độc lập, được đăng ký với SonatServicesManager
3. **Service Reference**: Services có thể reference đến services khác thông qua `Service<T>`
4. **Event-Driven**: Sử dụng EventBus để giao tiếp giữa các phần khác nhau

---

## Cài đặt ban đầu

### Bước 1: Setup SonatSystem

1. Tạo một GameObject mới trong Scene đầu tiên (thường là Scene Loading hoặc Main Menu)
2. Đặt tên là `SonatSystem`
3. Add component `SonatSystem`

```csharp
// SonatSystem sẽ tự động DontDestroyOnLoad và persist qua các scene
// autoInit = true sẽ tự động khởi tạo services sau một khoảng delay
```

### Bước 2: Tạo Service Manager

1. Click chuột phải trong Project Window
2. Chọn: `Create > Sonat Services > SONAT SERVICE MANAGER`
3. Đặt tên: `[SONAT] SERVICE MANAGER`
4. Kéo vào field `serviceManager` trong component `SonatSystem`

### Bước 3: Thêm các Services cần thiết

1. Tạo các service ScriptableObject:
   - `Create > Sonat Services > Audio Service`
   - `Create > Sonat Services > Config Service`
   - `Create > Sonat Services > Data Service > PlayerPrefsDataService`
   - `Create > Sonat Services > Inventory Service`
   - `Create > Sonat Services > Shop Service`
   - `Create > Sonat Services > Live Service`
   - v.v...

2. Add các service vào mảng `servicesObject` trong Service Manager

### Bước 4: Setup PanelManager

1. Tạo một GameObject con của Canvas
2. Đặt tên `PanelManager`
3. Add component `PanelManager`

---

## Các module chính

### 1. **Base** - Các class nền tảng

#### 1.1 Singleton Pattern

Framework cung cấp 4 loại Singleton:

**a) Singleton&lt;T&gt;**: Singleton cơ bản, tự tạo nếu không tìm thấy
```csharp
using Base.Singleton;

public class GameManager : Singleton<GameManager>
{
    protected override void OnAwake()
    {
        // Khởi tạo ở đây
        Debug.Log("GameManager initialized");
    }
    
    public void StartGame()
    {
        // Game logic
    }
}

// Sử dụng:
GameManager.Instance.StartGame();
```

**b) SingletonPersistent&lt;T&gt;**: Singleton với DontDestroyOnLoad
```csharp
using Base.Singleton;

public class AudioController : SingletonPersistent<AudioController>
{
    protected override void OnAwake()
    {
        // Controller này sẽ tồn tại qua các scene
    }
}
```

**c) SingletonSimple&lt;T&gt;**: Singleton đơn giản, không tự tạo
```csharp
// SingletonSimple không có OnAwake abstract, chỉ virtual
public class UIController : SingletonSimple<UIController>
{
    protected override void OnAwake()
    {
        // Phải có sẵn GameObject trong scene
    }
}
```

**d) SingletonScriptableObject&lt;T&gt;**: Singleton cho ScriptableObject
```csharp
using Base.Singleton;

[CreateAssetMenu(fileName = "GameSettings", menuName = "Settings/Game Settings")]
public class GameSettings : SingletonScriptableObject<GameSettings>
{
    public int maxLives = 5;
    public float musicVolume = 0.8f;
}

// Sử dụng:
int lives = GameSettings.Instance.maxLives;
```

#### 1.2 Extensions

Framework cung cấp nhiều extension methods hữu ích:

**String Extensions:**
```csharp
// Thêm màu cho debug text (Rich Text)
Debug.Log("Error message".Color("red"));
Debug.Log("Success".Color("green"));
Debug.Log("Warning".Color("yellow"));

// Thêm style
Debug.Log("Important".Bold());
Debug.Log("Note".Italic());
Debug.Log("Big text".Size(20));
```

**Number Extensions:**
```csharp
// Convert float to int
float value = 10.5f;
int intValue = value.Int(); // 11 (rounded)

// Get percentage
float percent = 0.75f;
int percentInt = percent.Percent(); // 75

// Check range
int score = 50;
bool inRange = score.InRange(0, 100); // true

// Compare floats with tolerance
float a = 0.1f + 0.2f;
bool isEqual = a.Equal(0.3f); // true (với tolerance mặc định 0.01f)
```

**List Extensions:**
```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

// Shuffle list
numbers.Shuffle();

// Move item to new position
numbers.MoveItem(3, 0); // Di chuyển số 3 lên đầu list

// Fill array
int[] array = new int[10];
array.Fill(0);
```

---

### 2. **Systems** - Hệ thống Services

#### 2.1 Service Architecture

**Cách sử dụng Service từ SonatSystem:**

```csharp
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;

public class MyGameScript : MonoBehaviour
{
    private void Start()
    {
        // Lấy service từ SonatSystem
        var audioService = SonatSystem.GetService<SonatAudioService>();
        audioService.PlaySound(AudioId.SFX_ButtonClick);
    }
}
```

**Cách tạo Service mới:**

```csharp
using SonatFramework.Systems;
using UnityEngine;

[CreateAssetMenu(fileName = "MyCustomService", menuName = "Sonat Services/My Custom Service")]
public class MyCustomService : SonatServiceSo, IServiceInitialize
{
    private int myData;
    
    public void Initialize()
    {
        // Khởi tạo service - được gọi tự động khi Resolve()
        myData = 0;
        Debug.Log("MyCustomService initialized");
    }
    
    public void DoSomething()
    {
        myData++;
        Debug.Log($"Data: {myData}");
    }
}
```

**Service với Dependencies (Reference đến Service khác):**

```csharp
using SonatFramework.Systems;
using SonatFramework.Systems.GameDataManagement;
using Sirenix.OdinInspector;
using UnityEngine;

[CreateAssetMenu(fileName = "ProgressService", menuName = "Sonat Services/Progress Service")]
public class ProgressService : SonatServiceSo, IServiceInitialize
{
    // Reference đến service khác - được inject tự động
    [BoxGroup("SERVICES")] [SerializeField] 
    private Service<DataService> dataService = new();
    
    public void Initialize()
    {
        // Load progress từ DataService
        int level = dataService.Instance.GetInt("current_level", 1);
        Debug.Log($"Current level: {level}");
    }
    
    public void SaveProgress(int level)
    {
        dataService.Instance.SetInt("current_level", level);
    }
}
```

**Các interface Service có thể implement:**

```csharp
// IServiceInitialize - Khởi tạo đồng bộ
public interface IServiceInitialize
{
    void Initialize();
}

// IServiceInitializeAsync - Khởi tạo bất đồng bộ
public interface IServiceInitializeAsync
{
    UniTaskVoid InitializeAsync();
}

// IServiceWaitingSDKInitialize - Được gọi khi Sonat SDK đã khởi tạo
public interface IServiceWaitingSDKInitialize
{
    void OnSonatSDKInitialize();
}

// IServiceWaitingRemoteConfig - Được gọi khi Remote Config sẵn sàng
public interface IServiceWaitingRemoteConfig
{
    void OnRemoteConfigReady();
}

// IServiceActionOnFocus - Được gọi khi app focus/unfocus
public interface IServiceActionOnFocus
{
    void OnApplicationFocus(bool focus);
}
```

#### 2.2 Audio Management

**Setup Audio Service:**

1. Tạo Audio Service: `Create > Sonat Services > Audio Service`
2. Thêm vào Service Manager
3. Tạo Enum cho Audio IDs (trong Scripts > TeamplateEnum > AudioEnum.cs hoặc tạo custom)

```csharp
// AudioEnum.cs (template có sẵn)
namespace Sonat.Enums
{
    public enum AudioId
    {
        // Music
        BGM_Menu,
        BGM_Gameplay,
        BGM_Victory,
        
        // Sound Effects
        SFX_ButtonClick,
        SFX_Collect,
        SFX_Victory,
        SFX_Defeat,
    }
}
```

**Sử dụng Audio:**

```csharp
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using UnityEngine;

public class GameController : MonoBehaviour
{
    private SonatAudioService audioService;
    
    private void Start()
    {
        audioService = SonatSystem.GetService<SonatAudioService>();
        
        // Play background music (loop mặc định = true)
        audioService.PlayMusic(AudioId.BGM_Menu);
    }
    
    public void OnButtonClick()
    {
        // Play sound effect
        audioService.PlaySound(AudioId.SFX_ButtonClick);
    }
    
    public void OnCollectCoin()
    {
        // Play sound với volume tùy chỉnh
        audioService.PlaySound(AudioId.SFX_Collect, volume: 0.8f);
    }
    
    public void OnGameStart()
    {
        // Switch music - có fade transition tự động
        audioService.PlayMusic(AudioId.BGM_Gameplay);
    }
}
```

**Quản lý Volume:**

```csharp
using SonatFramework.Systems.AudioManagement;

// Get volume (0.0f - 1.0f)
float musicVolume = audioService.GetVolume(AudioTracks.Music);
float soundVolume = audioService.GetVolume(AudioTracks.Sound);

// Set volume
audioService.SetVolume(AudioTracks.Music, 0.5f); // 50%
audioService.SetVolume(AudioTracks.Sound, 1.0f); // 100%

// Check if muted (volume == 0)
bool isMusicMuted = audioService.IsMuted(AudioTracks.Music);
bool isSoundMuted = audioService.IsMuted(AudioTracks.Sound);

// Stop/Resume music
audioService.StopMusic();
audioService.ResumeMusic();

// Get current playing music
string currentMusic = audioService.GetCurrentMusic();
```

**Play Audio với AudioClip trực tiếp:**

```csharp
// Play sound effect với AudioClip có sẵn
audioService.PlayAudio(AudioId.SFX_Custom, myAudioClip, volume: 1.0f, AudioTracks.Sound);

// Play music với AudioClip có sẵn
audioService.PlayAudio(AudioId.BGM_Custom, myMusicClip, volume: 1.0f, AudioTracks.Music);
```

#### 2.3 Data Management (Save/Load)

**Sử dụng DataService:**

```csharp
using SonatFramework.Systems;
using SonatFramework.Systems.GameDataManagement;
using UnityEngine;

public class PlayerDataManager : MonoBehaviour
{
    private DataService dataService;
    
    private void Start()
    {
        dataService = SonatSystem.GetService<DataService>();
    }
    
    // Save dữ liệu primitive
    public void SavePlayerData()
    {
        dataService.SetInt("player_level", 10);
        dataService.SetFloat("player_exp", 450.5f);
        dataService.SetString("player_name", "Sonat Player");
        dataService.SetBool("tutorial_completed", true);
    }
    
    // Load dữ liệu với default value
    public void LoadPlayerData()
    {
        int level = dataService.GetInt("player_level", defaultValue: 1);
        float exp = dataService.GetFloat("player_exp", defaultValue: 0f);
        string playerName = dataService.GetString("player_name", defaultValue: "New Player");
        bool tutorialDone = dataService.GetBool("tutorial_completed", defaultValue: false);
        
        Debug.Log($"Player: {playerName}, Level: {level}, EXP: {exp}");
    }
    
    // Check key exists
    public bool HasSavedData()
    {
        return dataService.HasKey("player_level");
    }
    
    // Delete key
    public void ResetProgress()
    {
        dataService.DeleteKey("player_level");
        dataService.DeleteKey("player_exp");
    }
}
```

**Save/Load Object phức tạp (JSON serialization):**

```csharp
using Newtonsoft.Json;
using SonatFramework.Systems;
using SonatFramework.Systems.GameDataManagement;

[System.Serializable]
public class PlayerData
{
    public int level;
    public int coins;
    public int gems;
    public List<string> items;
    public Dictionary<string, int> achievements;
}

public class ComplexDataManager : MonoBehaviour
{
    private DataService dataService;
    
    private void Start()
    {
        dataService = SonatSystem.GetService<DataService>();
    }
    
    // Save object - tự động serialize thành JSON
    public void SaveComplexData()
    {
        PlayerData data = new PlayerData
        {
            level = 10,
            coins = 5000,
            gems = 100,
            items = new List<string> { "sword", "shield", "potion" },
            achievements = new Dictionary<string, int> { {"first_win", 1} }
        };
        
        dataService.SetData("player_data", data);
    }
    
    // Load object - tự động deserialize từ JSON
    public PlayerData LoadComplexData()
    {
        PlayerData data = dataService.GetData<PlayerData>("player_data");
        
        if (data == null)
        {
            // Return default data if not found
            return new PlayerData { level = 1, coins = 0, gems = 0 };
        }
        
        return data;
    }
    
    // Save với custom JsonConverter nếu cần
    public void SaveWithConverter(PlayerData data, JsonConverter converter)
    {
        dataService.SetData("player_data", data, converter);
    }
    
    // Force save to disk
    public void ForceSave()
    {
        dataService.SaveData();
    }
}
```

#### 2.4 Event Bus

Event Bus cho phép giao tiếp giữa các component mà không cần reference trực tiếp.

**Định nghĩa Event:**

```csharp
using SonatFramework.Systems.EventBus;

// Event khi player nhận điểm
public struct ScoreChangedEvent : IEvent
{
    public int newScore;
    public int scoreAdded;
}

// Event khi level complete
public struct LevelCompletedEvent : IEvent
{
    public int levelIndex;
    public int stars;
    public float completionTime;
}

// Event khi game state thay đổi
public struct GameStateChangedEvent : IEvent
{
    public string previousState;
    public string currentState;
}
```

**Đăng ký lắng nghe Event:**

```csharp
using SonatFramework.Systems.EventBus;
using UnityEngine;

public class UIScoreDisplay : MonoBehaviour
{
    private EventBinding<ScoreChangedEvent> scoreBinding;
    
    private void Start()
    {
        // Đăng ký lắng nghe event - tự động register khi tạo EventBinding
        scoreBinding = new EventBinding<ScoreChangedEvent>(OnScoreChanged);
        
        // Hoặc đăng ký và nhận data cuối cùng nếu có
        scoreBinding = new EventBinding<ScoreChangedEvent>(OnScoreChanged, getLastData: true);
    }
    
    private void OnScoreChanged(ScoreChangedEvent eventData)
    {
        Debug.Log($"Score changed to: {eventData.newScore} (+{eventData.scoreAdded})");
        UpdateScoreDisplay(eventData.newScore);
    }
    
    private void UpdateScoreDisplay(int score)
    {
        // Update UI
    }
}
```

**Đăng ký Event không cần data:**

```csharp
using SonatFramework.Systems.EventBus;

public class GameResetHandler : MonoBehaviour
{
    private EventBinding<GameResetEvent> resetBinding;
    
    private void Start()
    {
        // Đăng ký với Action không có parameter
        resetBinding = new EventBinding<GameResetEvent>(OnGameReset);
    }
    
    private void OnGameReset()
    {
        Debug.Log("Game reset triggered!");
        ResetAllData();
    }
}
```

**Phát Event:**

```csharp
using SonatFramework.Systems.EventBus;
using UnityEngine;

public class ScoreManager : MonoBehaviour
{
    private int currentScore = 0;
    
    public void AddScore(int points)
    {
        int oldScore = currentScore;
        currentScore += points;
        
        // Phát event để thông báo score đã thay đổi
        EventBus<ScoreChangedEvent>.Raise(new ScoreChangedEvent
        {
            newScore = currentScore,
            scoreAdded = points
        });
    }
}
```

**Thêm/Xóa listener động:**

```csharp
using SonatFramework.Systems.EventBus;

public class DynamicListener : MonoBehaviour
{
    private EventBinding<ScoreChangedEvent> scoreBinding;
    
    private void Start()
    {
        scoreBinding = new EventBinding<ScoreChangedEvent>(OnScoreChanged);
    }
    
    public void AddExtraListener()
    {
        // Thêm listener vào binding hiện có
        scoreBinding.Add(OnExtraScoreChanged);
    }
    
    public void RemoveExtraListener()
    {
        // Xóa listener
        scoreBinding.Remove(OnExtraScoreChanged);
    }
    
    private void OnScoreChanged(ScoreChangedEvent e) { }
    private void OnExtraScoreChanged(ScoreChangedEvent e) { }
}
```

**Các Events có sẵn trong Framework:**

```csharp
// Game events
public struct OpenGameEvent : IEvent { }
public struct GameStateChangeEvent : IEvent { public GameState gameState; }

// Level events
public struct LevelStartedEvent : IEvent 
{ 
    public GameMode gameMode; 
    public int level; 
    public int phase; 
}

public struct LevelEndedEvent : IEvent 
{ 
    public GameMode gameMode; 
    public int level; 
    public bool success; 
    public int phase; 
}

public struct LevelQuitEvent : IEvent { public string cause; }
public struct LevelStuckEvent : IEvent { public GameMode gameMode; public int level; public string cause; }
public struct LevelContinueEvent : IEvent { public string by; }

// Phase events
public struct PhaseStartedEvent : IEvent { public GameMode gameMode; public int level; public int phase; }
public struct PhaseEndedEvent : IEvent { public GameMode gameMode; public int level; public int phase; public bool success; }

// Resource events
public struct EarnResourceEvent : IEvent 
{ 
    public GameResourceKey resource; 
    public int value; 
    public string spendType; 
    public string spendId; 
    public bool isFirstBuy; 
    public string source; 
}

public struct SpendResourceEvent : IEvent 
{ 
    public GameResourceKey resource; 
    public int value; 
    public string earnType; 
    public string earnId; 
    public string source; 
}

// UI/Placement events
public struct UpdatePlacementEvent : IEvent { public string placement; }
public struct UpdateScreenEvent : IEvent { public string screen; }
public struct ClickShortcutEvent : IEvent { public string shortcut; }
```

#### 2.5 Inventory Management (Quản lý tài nguyên)

**Cấu trúc GameResource:**

```csharp
// GameResource enum (có thể customize)
namespace Sonat.Enums
{
    public enum GameResource : byte
    {
        None,
        NoAds = 1,
        NoAdsLimited = 2,
        Coin = 3,
        Live = 4,
        UnlimitedLive = 5,
        Star = 6,
        Card = 7,
        MAX
    }
}

// GameResourceKey - key để identify resource (bao gồm type và id)
public struct GameResourceKey
{
    public GameResource gameResource;
    public int id; // ID cho resource cùng type nhưng khác nhau (vd: Card_1, Card_2)
}

// ResourceData - chứa data của một resource
public class ResourceData
{
    public GameResource gameResource;
    public int id;
    public int quantity;
    public long seconds; // Cho time-based resources
    public long timestamp;
}
```

**Sử dụng InventoryService:**

```csharp
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;

public class ResourceManager : MonoBehaviour
{
    private InventoryService inventory;
    
    private void Start()
    {
        inventory = SonatSystem.GetService<InventoryService>();
        
        // Subscribe to resource updates
        inventory.OnResourceUpdate += OnResourceUpdated;
        inventory.OnAddPendingResource += OnPendingResourceAdded;
    }
    
    private void OnDestroy()
    {
        if (inventory != null)
        {
            inventory.OnResourceUpdate -= OnResourceUpdated;
            inventory.OnAddPendingResource -= OnPendingResourceAdded;
        }
    }
    
    // Lấy resource hiện tại
    public int GetCoins()
    {
        ResourceData coinData = inventory.GetResource(GameResource.Coin.ToGameResourceKey());
        return coinData.quantity;
    }
    
    // Thêm resource
    public void AddCoins(int amount, string source = "gameplay")
    {
        var logData = new EarnResourceLogData
        {
            spendType = source,
            spendId = "coin_reward",
            source = "non_iap"
        };
        
        inventory.AddResource(
            new ResourceData(GameResource.Coin, amount), 
            logData
        );
    }
    
    // Kiểm tra có đủ để giảm không
    public bool CanSpend(GameResource resource, int amount)
    {
        return inventory.CanReduce(resource.ToGameResourceKey(), amount);
    }
    
    // Tiêu resource
    public void SpendCoins(int amount)
    {
        if (!CanSpend(GameResource.Coin, amount))
        {
            Debug.Log("Not enough coins!");
            return;
        }
        
        var logData = new SpendResourceLogData
        {
            earnType = "purchase",
            earnId = "item_buy",
            source = "non_iap"
        };
        
        inventory.SpendResource(GameResource.Coin.ToGameResourceKey(), amount, logData);
    }
    
    private void OnResourceUpdated(GameResourceKey key)
    {
        Debug.Log($"Resource updated: {key.gameResource}");
    }
    
    private void OnPendingResourceAdded(ResourceData data)
    {
        Debug.Log($"Pending resource added: {data.gameResource} x{data.quantity}");
    }
}
```

**Pending Resources (Rewards chờ claim):**

```csharp
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;

public class RewardManager : MonoBehaviour
{
    private InventoryService inventory;
    
    private void Start()
    {
        inventory = SonatSystem.GetService<InventoryService>();
    }
    
    // Thêm reward vào pending (chưa cộng vào inventory)
    public void AddPendingReward(string source, RewardData rewardData)
    {
        var logData = new EarnResourceLogData
        {
            spendType = source,
            spendId = "reward",
            source = "non_iap"
        };
        
        inventory.AddPendingReward(source, rewardData, logData);
    }
    
    // Thêm một resource vào pending
    public void AddPendingResource(string source, GameResource resource, int quantity)
    {
        var resourceData = new ResourceData(resource, quantity);
        var logData = new EarnResourceLogData
        {
            spendType = source,
            spendId = "pending_reward",
            source = "non_iap"
        };
        
        inventory.AddPendingResource(source, resourceData, logData);
    }
    
    // Lấy pending resource theo source
    public ResourceData GetPendingResource(string source, GameResourceKey key)
    {
        return inventory.GetPendingResource(source, key);
    }
    
    // Claim tất cả pending resources từ một source
    public void ClaimPendingReward(string source)
    {
        inventory.ClaimPendingResource(source);
    }
    
    // Claim một resource cụ thể từ pending
    public void ClaimPendingResource(string source, GameResourceKey key)
    {
        inventory.ClaimPendingResource(source, key);
    }
    
    // Claim tất cả pending resources (source = null hoặc "")
    public void ClaimAllPending()
    {
        inventory.ClaimPendingResource(null);
    }
}
```

**RewardData - Quản lý nhiều resources:**

```csharp
using Sonat.Enums;
using SonatFramework.Systems.InventoryManagement.GameResources;

public class LevelCompleteReward
{
    public RewardData CreateLevelReward(int level, int stars)
    {
        RewardData reward = new RewardData();
        reward.resourceUnits = new List<ResourceData>();
        
        // Base reward
        reward.AddReward(new ResourceData(GameResource.Coin, level * 100));
        
        // Star bonus
        if (stars >= 2)
        {
            reward.AddReward(new ResourceData(GameResource.Star, stars));
        }
        
        if (stars == 3)
        {
            reward.AddReward(new ResourceData(GameResource.Card, 1, 1)); // Card id = 1
        }
        
        return reward;
    }
    
    public void MultiplyReward(RewardData reward, int multiplier)
    {
        reward.MultiplyReward(multiplier);
    }
}
```

#### 2.6 Shop Service (Hệ thống mua hàng IAP)

**Setup Shop Service:**

1. Tạo Shop Service: `Create > Sonat Services > Shop Service`
2. Tạo Shop Config: `Create > Sonat Configs > Shop Config`
3. Tạo các Shop Pack: `Create > Sonat Configs > Shop Config > Pack Data`
4. Định nghĩa ShopItemKey enum

```csharp
// ShopItemKey.cs (template có sẵn)
namespace Sonat.Enums
{
    public enum ShopItemKey
    {
        None = 0,
        StarterPack = 1,
        CoinPack1 = 2,
        CoinPack2 = 3,
        CoinPack3 = 4,
        NoAdsPack = 5,
        UnlimitedLivesPack = 6,
        // ... thêm các pack khác
    }
}
```

**Cấu hình ShopPack:**

```csharp
// ShopPack chứa thông tin về một gói mua
[CreateAssetMenu(menuName = "Sonat Configs/Shop Config/Pack Data", fileName = "ShopPack")]
public class ShopPack : ScriptableObject
{
    public bool active = true;           // Pack có đang active không
    public ShopItemKey key;               // Key của pack
    public int memberShip;                // Membership level required
    public ShopPackData packData;         // Nội dung pack
    public bool oneTimePurchase;          // Chỉ mua được 1 lần
    public int Group;                     // Group cho one-time purchase
}

// ShopPackData chứa các resource trong pack
[Serializable]
public class ShopPackData
{
    public List<ShopResourceItemData> resourceUnits;
}

// ShopResourceItemData extend từ ResourceData
[Serializable]
public class ShopResourceItemData : ResourceData
{
    public bool nonConsumable; // True nếu là item không tiêu hao (vd: NoAds)
}
```

**Sử dụng ShopService:**

```csharp
using Sonat.Enums;
using SonatFramework.Scripts.Feature.Shop;
using SonatFramework.Systems;
using UnityEngine;

public class ShopController : MonoBehaviour
{
    private ShopService shopService;
    
    private void Start()
    {
        shopService = SonatSystem.GetService<ShopService>();
        
        // Subscribe to buy success event
        shopService.OnBuySuccess += OnPackBought;
    }
    
    private void OnDestroy()
    {
        if (shopService != null)
        {
            shopService.OnBuySuccess -= OnPackBought;
        }
    }
    
    // Mua pack
    public void BuyPack(ShopItemKey packKey)
    {
        // Kiểm tra pack có valid không trước khi mua
        if (!shopService.VerifyPack(packKey))
        {
            Debug.Log("Pack not available!");
            return;
        }
        
        // Kiểm tra đang mua pack khác không
        if (shopService.IsBuying())
        {
            Debug.Log("Already buying another pack!");
            return;
        }
        
        // Thực hiện mua
        shopService.BuyPack(packKey);
    }
    
    // Callback khi mua thành công
    private void OnPackBought(ShopItemKey packKey)
    {
        Debug.Log($"Pack {packKey} bought successfully!");
        // Refresh UI, show reward, etc.
    }
    
    // Lấy thông tin pack
    public void DisplayPackInfo(ShopItemKey packKey)
    {
        ShopPack packData = shopService.GetPackData(packKey);
        
        if (packData != null)
        {
            string productName = shopService.GetProductName(packKey);
            Debug.Log($"Pack: {productName}");
            
            foreach (var resource in packData.packData.resourceUnits)
            {
                Debug.Log($"  - {resource.gameResource}: {resource.quantity}");
            }
        }
    }
    
    // Lấy tất cả packs trong một group
    public List<ShopPack> GetPacksInGroup(int groupId)
    {
        return shopService.GetPacksData(groupId);
    }
    
    // Restore purchase (iOS)
    public void RestorePurchases()
    {
        shopService.RestorePurchase((List<int> restoredPacks) =>
        {
            Debug.Log($"Restored {restoredPacks.Count} packs");
            foreach (var packId in restoredPacks)
            {
                Debug.Log($"Restored pack: {(ShopItemKey)packId}");
            }
        });
    }
    
    // Kiểm tra pack có thể mua không
    public bool CanBuyPack(ShopItemKey packKey)
    {
        return shopService.VerifyPack(packKey);
    }
}
```

**Custom verification cho pack:**

```csharp
using Sonat.Enums;
using SonatFramework.Scripts.Feature.Shop;
using SonatFramework.Systems;

public class CustomShopVerifier : MonoBehaviour
{
    private ShopService shopService;
    
    private void Start()
    {
        shopService = SonatSystem.GetService<ShopService>();
        
        // Thêm custom verification logic
        shopService.externalVerifyPack = CustomVerify;
    }
    
    private bool CustomVerify(ShopItemKey packKey)
    {
        // Thêm điều kiện custom
        // Ví dụ: kiểm tra level, VIP status, etc.
        
        switch (packKey)
        {
            case ShopItemKey.StarterPack:
                // Starter pack chỉ available trong 3 ngày đầu
                return IsWithinFirstDays(3);
                
            case ShopItemKey.VIPPack:
                // VIP pack cần level 10+
                return GetPlayerLevel() >= 10;
                
            default:
                return true;
        }
    }
    
    private bool IsWithinFirstDays(int days) { /* ... */ return true; }
    private int GetPlayerLevel() { /* ... */ return 1; }
}
```

#### 2.7 Lives Service (Hệ thống mạng chơi)

**Setup Lives Service:**

1. Tạo Lives Service: `Create > Sonat Services > Live Service`
2. Tạo Lives Config: `Create > Sonat Configs > LivesConfig`
3. Config trong LivesConfig:
   - `defaultMaxLives`: Số mạng tối đa (mặc định: 5)
   - `timeRefillLives`: Thời gian refill 1 mạng (giây, mặc định: 1800 = 30 phút)
   - `refillFree`: Số lần refill miễn phí
   - `refillPrice`: Giá refill bằng currency

**Sử dụng LivesService:**

```csharp
using SonatFramework.Scripts.Feature.Lives;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement;
using UnityEngine;

public class GameplayManager : MonoBehaviour
{
    private LivesService livesService;
    
    private void Start()
    {
        livesService = SonatSystem.GetService<LivesService>();
        
        // Subscribe to lives update
        livesService.onLivesUpdate += OnLivesUpdated;
    }
    
    private void OnDestroy()
    {
        if (livesService != null)
        {
            livesService.onLivesUpdate -= OnLivesUpdated;
        }
    }
    
    // Kiểm tra có thể chơi không
    public bool CanPlay()
    {
        return livesService.CanPlay();
    }
    
    // Bắt đầu level - tự động trừ mạng khi LevelStartedEvent được raise
    public void StartLevel()
    {
        if (!CanPlay())
        {
            ShowOutOfLivesPopup();
            return;
        }
        
        // Raise LevelStartedEvent - LivesService sẽ tự động handle
        EventBus<LevelStartedEvent>.Raise(new LevelStartedEvent
        {
            gameMode = GameMode.Normal,
            level = currentLevel,
            phase = 0
        });
    }
    
    // Giảm mạng thủ công
    public void LoseLive()
    {
        var logData = new SpendResourceLogData
        {
            earnType = "gameplay",
            earnId = "level_failed"
        };
        
        livesService.ReduceLive(1, logData);
    }
    
    // Refill mạng
    public void RefillLives()
    {
        var logData = new EarnResourceLogData
        {
            spendType = "refill",
            spendId = "manual_refill"
        };
        
        livesService.RefillFullLive(logData);
    }
    
    // Kiểm tra đang có unlimited lives không
    public bool HasUnlimitedLives()
    {
        return livesService.IsUnlimitedLives();
    }
    
    // Lấy thời gian còn lại để refill
    public long GetTimeToNextLife()
    {
        return livesService.GetTimeRefillRemain();
    }
    
    // Kiểm tra mạng đầy chưa
    public bool IsFullLives()
    {
        return livesService.IsFullLives();
    }
    
    // Lấy số mạng tối đa
    public int GetMaxLives()
    {
        return livesService.MaxLives();
    }
    
    // Lấy giá refill
    public CurrencyData GetRefillPrice()
    {
        return livesService.GetRefillPrice();
    }
    
    // Kiểm tra có thể refill miễn phí không
    public bool CanRefillFree()
    {
        return livesService.CanRefillFree();
    }
    
    private void OnLivesUpdated()
    {
        Debug.Log("Lives updated!");
        UpdateLivesUI();
    }
    
    private void UpdateLivesUI() { /* ... */ }
    private void ShowOutOfLivesPopup() { /* ... */ }
}
```

#### 2.8 Config Management

**Tạo Config:**

```csharp
using SonatFramework.Systems.ConfigManagement;
using UnityEngine;

[CreateAssetMenu(fileName = "GameplayConfig", menuName = "Sonat Configs/Gameplay Config")]
public class GameplayConfig : ConfigSo
{
    [Header("Player Settings")]
    public float playerSpeed = 5f;
    public int maxHealth = 100;
    public float jumpForce = 10f;
    
    [Header("Enemy Settings")]
    public int enemyHealth = 50;
    public float enemySpeed = 3f;
    public int enemyDamage = 10;
    
    [Header("Level Settings")]
    public int maxLevels = 100;
    public float levelDifficultyMultiplier = 1.1f;
}
```

**Sử dụng Config:**

```csharp
using SonatFramework.Systems;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    private GameplayConfig config;
    private int currentHealth;
    
    private void Start()
    {
        // Lấy config từ SonatSystem
        config = SonatSystem.GetConfig<GameplayConfig>();
        
        // Sử dụng config
        currentHealth = config.maxHealth;
    }
    
    private void Update()
    {
        float moveSpeed = config.playerSpeed;
        // Use moveSpeed for movement
    }
}
```

---

### 3. **UIModule** - Quản lý UI

#### 3.1 Tạo Panel/Popup

**Bước 1: Tạo Panel Script**

```csharp
using SonatFramework.Scripts.UIModule;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class SettingsPanel : Panel
{
    [Header("UI References")]
    [SerializeField] private Button closeButton;
    [SerializeField] private Slider musicSlider;
    [SerializeField] private Slider soundSlider;
    [SerializeField] private TMP_Text titleText;
    
    public override void OnSetup()
    {
        base.OnSetup();
        
        // Setup button listeners
        closeButton.onClick.AddListener(OnCloseButtonClick);
        musicSlider.onValueChanged.AddListener(OnMusicVolumeChanged);
        soundSlider.onValueChanged.AddListener(OnSoundVolumeChanged);
    }
    
    public override void Open(UIData uiData)
    {
        base.Open(uiData);
        
        // Lấy data từ UIData nếu có
        if (uiData != null && uiData.TryGet<string>("title", out var title))
        {
            titleText.text = title;
        }
        
        // Load current settings
        LoadSettings();
    }
    
    public override void OnOpenCompleted()
    {
        base.OnOpenCompleted();
        Debug.Log("Settings panel opened");
    }
    
    public override void Close()
    {
        // Save settings before close
        SaveSettings();
        base.Close();
    }
    
    public override void OnFocus()
    {
        base.OnFocus();
        Debug.Log("Settings panel focused");
    }
    
    public override void OnFocusLost()
    {
        base.OnFocusLost();
        Debug.Log("Settings panel lost focus");
    }
    
    private void OnCloseButtonClick()
    {
        Close();
    }
    
    private void OnMusicVolumeChanged(float value)
    {
        // Update music volume
    }
    
    private void OnSoundVolumeChanged(float value)
    {
        // Update sound volume
    }
    
    private void LoadSettings()
    {
        // Load from DataService
    }
    
    private void SaveSettings()
    {
        // Save to DataService
    }
}
```

**Bước 2: Tạo Prefab**

1. Tạo Canvas panel trong Scene
2. Attach script `SettingsPanel`
3. Setup UI elements
4. Tạo thành Prefab, đặt tên đúng với tên class: `SettingsPanel`
5. Đưa prefab vào Addressable hoặc Resources

**Bước 3: Mở Panel từ code**

```csharp
using SonatFramework.Scripts.UIModule;
using Cysharp.Threading.Tasks;
using UnityEngine;

public class MainMenuController : MonoBehaviour
{
    public async void OnSettingsButtonClick()
    {
        // Cách 1: Mở panel đơn giản (fire and forget)
        PanelManager.Instance.OpenForget<SettingsPanel>();
        
        // Cách 2: Mở panel với UIData
        UIData data = new UIData();
        data.Add("title", "Cài đặt game");
        PanelManager.Instance.OpenForget<SettingsPanel>(data);
        
        // Cách 3: Mở panel và xử lý khi panel được tạo
        PanelManager.Instance.OpenPanelAsync<SettingsPanel>(
            panel => {
                Debug.Log("Settings panel created!");
                // Do something with panel
            },
            data
        );
        
        // Cách 4: Mở panel và await
        var settingsPanel = await PanelManager.Instance.OpenPanelAsync<SettingsPanel>();
        // Use settingsPanel
        
        // Cách 5: Mở panel theo tên (useful for dynamic panel loading)
        await PanelManager.Instance.OpenPanelByNameAsync<SettingsPanel>("SettingsPanel", data);
    }
}
```

#### 3.2 UIData - Truyền dữ liệu cho Panel

```csharp
using SonatFramework.Scripts.UIModule;
using System;
using System.Collections.Generic;

public class GameController : MonoBehaviour
{
    public void ShowRewardPopup(int coins, int gems, List<string> items)
    {
        UIData data = new UIData();
        
        // Truyền các loại data khác nhau - sử dụng Add() method
        data.Add("coins", coins);
        data.Add("gems", gems);
        data.Add("items", items);
        data.Add("title", "Phần thưởng!");
        
        // Truyền callback với UIDataKey
        data.Add(UIDataKey.CallBackOnClose, (Action)OnRewardPopupClosed);
        
        // Có thể chain Add() calls
        UIData chainedData = new UIData()
            .Add("key1", "value1")
            .Add("key2", 123)
            .Add("key3", true);
        
        PanelManager.Instance.OpenForget<RewardPopup>(data);
    }
    
    private void OnRewardPopupClosed()
    {
        Debug.Log("Reward popup closed");
        // Continue game logic
    }
}

// Trong RewardPopup
public class RewardPopup : Panel
{
    [SerializeField] private TMP_Text coinsText;
    [SerializeField] private TMP_Text gemsText;
    [SerializeField] private Transform itemsContainer;
    
    public override void Open(UIData uiData)
    {
        base.Open(uiData);
        
        // Lấy data với TryGet (safe)
        if (uiData.TryGet<int>("coins", out var coins))
        {
            coinsText.text = coins.ToString();
        }
        
        if (uiData.TryGet<int>("gems", out var gems))
        {
            gemsText.text = gems.ToString();
        }
        
        if (uiData.TryGet<List<string>>("items", out var items))
        {
            DisplayItems(items);
        }
        
        // Hoặc lấy data trực tiếp với Get (throws nếu không tìm thấy)
        // string title = uiData.Get<string>("title");
        
        // Lấy data với UIDataKey
        if (uiData.TryGet<Action>(UIDataKey.CallBackOnClose, out var callback))
        {
            // callback sẽ được gọi tự động trong OnCloseCompleted()
        }
    }
    
    private void DisplayItems(List<string> items)
    {
        // Display items in container
    }
}
```

**UIDataKey enum có sẵn:**

```csharp
public enum UIDataKey
{
    CallBackOnClose,  // Action callback khi panel đóng
    TrackingData,     // Tracking data
    Content           // Content chung
}
```

#### 3.3 Panel Animation (Tween)

```csharp
using SonatFramework.Scripts.UIModule;
using UnityEngine;

public class AnimatedPopup : Panel
{
    // openTween và closeTween được define trong base Panel class
    // Có thể config trong Inspector
    
    public override void OnSetup()
    {
        base.OnSetup();
        
        // Tweens được config trong Inspector:
        // - Target: GameObject muốn animate
        // - TweenConfig: Duration, Delay, Ease, etc.
    }
}
```

**Config Tween trong Inspector:**
1. Select Panel prefab
2. Trong component Panel, tìm `openTween` và `closeTween`
3. Thêm TweenData elements
4. Config:
   - Target: GameObject muốn animate
   - Config: TweenConfigSO chứa Duration, Delay, Ease, etc.

#### 3.4 Đóng Panel

```csharp
using SonatFramework.Scripts.UIModule;
using System;
using System.Collections.Generic;
using UnityEngine;

public class SomePanel : Panel
{
    public void OnCloseButtonClick()
    {
        // Cách 1: Đóng với animation
        Close();
        
        // Cách 2: Đóng ngay lập tức (không animation)
        CloseImmediately();
    }
}

// Đóng panel từ bên ngoài
public class GameController : MonoBehaviour
{
    public void CloseSettingsPanel()
    {
        // Đóng panel cụ thể
        PanelManager.Instance.ClosePanel<SettingsPanel>();
        
        // Đóng ngay lập tức
        PanelManager.Instance.ClosePanel<SettingsPanel>(immediately: true);
    }
    
    public async void CloseAndWait()
    {
        // Đóng và đợi animation hoàn thành
        await PanelManager.Instance.ClosePanelAsync<SettingsPanel>(
            immediately: false, 
            waitCloseCompleted: true
        );
        
        Debug.Log("Panel closed completely");
    }
    
    public void CloseAllPanels()
    {
        // Đóng tất cả panels
        PanelManager.Instance.CloseAllPanel();
        
        // Đóng tất cả trừ một số panels
        List<Type> exceptions = new List<Type> { typeof(HUDPanel) };
        PanelManager.Instance.CloseAllPanel(exceptions);
    }
}
```

#### 3.5 Panel Stack và Focus

```csharp
using SonatFramework.Scripts.UIModule;
using UnityEngine;

public class MyPanel : Panel
{
    public override void OnFocus()
    {
        base.OnFocus();
        // Được gọi khi panel này ở top của stack
        Debug.Log("Panel focused - I'm on top!");
        // Enable interactions, resume animations, etc.
    }
    
    public override void OnFocusLost()
    {
        base.OnFocusLost();
        // Được gọi khi có panel khác mở lên trên panel này
        Debug.Log("Panel lost focus - Another panel opened on top");
        // Disable interactions, pause animations, etc.
    }
}

// Check panel hiện tại
public class UIController : MonoBehaviour
{
    private void CheckPanels()
    {
        // Get panel hiện tại (top of stack)
        View currentPanel = PanelManager.Instance.GetCurrentPanel;
        
        if (currentPanel != null)
        {
            Debug.Log($"Current panel: {currentPanel.id}");
        }
        
        // Get panel cụ thể trong stack
        var settingsPanel = PanelManager.Instance.GetPanel<SettingsPanel>();
        if (settingsPanel != null)
        {
            Debug.Log("Settings panel is in stack");
        }
        
        // Get panel by name
        var panel = PanelManager.Instance.GetPanelByName<SettingsPanel>("SettingsPanel");
        
        // Get current panel type
        Type currentType = PanelManager.Instance.CurrentPanelType;
        
        // Get number of panels in stack
        int popupCount = PanelManager.Instance.PopupCount();
        
        // Check if any popup is pausing game
        bool isPaused = PanelManager.Instance.HasAnyPopupPauseGame();
    }
}
```

#### 3.6 Panel Properties

```csharp
using SonatFramework.Scripts.UIModule;

public class CachedPanel : Panel
{
    public override void OnSetup()
    {
        base.OnSetup();
        
        // Panel này sẽ được cache khi close (không destroy)
        // Lần mở tiếp theo sẽ nhanh hơn
        keepCached = true;
        
        // Panel này sẽ pause game khi mở
        pauseGame = true;
        
        // Ignore tracking (không track panel này trong analytics)
        ignoreTracking = true;
    }
}
```

---

### 4. **Feature Module** - Các tính năng game

#### 4.1 Tạo Feature mới

```csharp
using Cysharp.Threading.Tasks;
using SonatFramework.Scripts.Feature;
using SonatFramework.Systems;
using SonatFramework.Systems.GameDataManagement;
using UnityEngine;

// Define Config cho feature
[System.Serializable]
public class DailyRewardConfig
{
    public int day1Coins = 100;
    public int day2Coins = 200;
    public int day3Coins = 300;
    public int day7Coins = 1000;
}

// Define Data cho feature
[System.Serializable]
public class DailyRewardData
{
    public int currentDay = 0;
    public long lastClaimTime = 0;
    public bool canClaim = true;
}

// Implement Feature (abstract class)
public class DailyRewardFeature : SonatFeature<DailyRewardConfig, DailyRewardData>
{
    private DataService dataService;
    
    public override async UniTaskVoid InitializeAsync()
    {
        dataService = SonatSystem.GetService<DataService>();
        await base.InitializeAsync();
    }
    
    protected override async UniTask LoadConfig()
    {
        // Load config từ ScriptableObject hoặc Remote Config
        configs = new DailyRewardConfig();
        await UniTask.Yield();
    }
    
    protected override async UniTask LoadData()
    {
        // Load data từ DataService
        data = dataService.GetData<DailyRewardData>("daily_reward_data");
        if (data == null)
        {
            data = new DailyRewardData();
        }
        
        CheckCanClaim();
        await UniTask.Yield();
    }
    
    protected override void SaveData()
    {
        dataService.SetData("daily_reward_data", data);
    }
    
    private void CheckCanClaim()
    {
        // Check if 24 hours passed
        long currentTime = System.DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        long timePassed = currentTime - data.lastClaimTime;
        
        data.canClaim = timePassed >= 86400; // 24 hours
    }
    
    public int GetRewardForDay(int day)
    {
        return day switch
        {
            1 => configs.day1Coins,
            2 => configs.day2Coins,
            3 => configs.day3Coins,
            7 => configs.day7Coins,
            _ => 100
        };
    }
    
    public bool CanClaimToday()
    {
        CheckCanClaim();
        return data.canClaim;
    }
    
    public void ClaimReward()
    {
        if (!CanClaimToday()) return;
        
        data.currentDay++;
        if (data.currentDay > 7) data.currentDay = 1;
        
        int reward = GetRewardForDay(data.currentDay);
        
        // Add reward to inventory
        var inventory = SonatSystem.GetService<InventoryService>();
        inventory.AddResource(
            new ResourceData(GameResource.Coin, reward),
            new EarnResourceLogData("daily_reward", $"day_{data.currentDay}")
        );
        
        data.lastClaimTime = System.DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        data.canClaim = false;
        
        SaveData();
    }
}
```

---

### 5. **Helper Classes** - Các class tiện ích

#### 5.1 Transform Extensions

```csharp
using SonatFramework.Scripts.Helper;
using UnityEngine;

public class ExampleTransformUsage : MonoBehaviour
{
    [SerializeField] private Transform target;
    
    private void Start()
    {
        // Set position với chỉ x, y, hoặc z
        target.SetPositionX(10f);
        target.SetPositionY(5f);
        target.SetPositionZ(0f);
        
        // Set local position
        target.SetLocalPositionX(2f);
    }
}
```

#### 5.2 GameObject Extensions

```csharp
using SonatFramework.Scripts.Helper;
using UnityEngine;

public class ExampleGameObjectUsage : MonoBehaviour
{
    [SerializeField] private GameObject target;
    
    private void Start()
    {
        // Get or Add Component
        var rigidbody = target.GetOrAddComponent<Rigidbody>();
        
        // Set layer recursively
        target.SetLayerRecursively(LayerMask.NameToLayer("UI"));
        
        // Destroy all children
        target.DestroyAllChildren();
    }
}
```

#### 5.3 Addressable Helper

```csharp
using Cysharp.Threading.Tasks;
using SonatFramework.Scripts.Helper;
using UnityEngine;
using UnityEngine.UI;

public class AddressableExample : MonoBehaviour
{
    [SerializeField] private Image avatarImage;
    [SerializeField] private SpriteRenderer characterSprite;
    
    private async void Start()
    {
        // Load và set sprite cho Image
        await avatarImage.SetSpriteAsync("Sprites/Avatar");
        
        // Load và set sprite cho SpriteRenderer
        await characterSprite.SetSpriteAsync("Sprites/Character");
    }
}
```

#### 5.4 Skeleton Animation Helper (Spine)

```csharp
using Spine.Unity;
using SonatFramework.Scripts.Helper;
using UnityEngine;

public class SpineAnimationExample : MonoBehaviour
{
    [SerializeField] private SkeletonAnimation skeleton;
    
    private void Start()
    {
        // Tạo queue animation
        SkeletonAnimationQueue queue = new SkeletonAnimationQueue(skeleton);
        
        // Add animations vào queue
        queue.Add(new SkeletonAnimationEntry
        {
            animationName = "idle",
            loop = false
        });
        
        queue.Add(new SkeletonAnimationEntry
        {
            animationName = "run",
            loop = true,
            timeScale = 1.5f
        });
        
        // Play queue
        queue.Play();
    }
    
    private void PlayAttackAnimation()
    {
        skeleton.AnimationState.SetAnimation(0, "attack", false);
        skeleton.AnimationState.AddAnimation(0, "idle", true, 0f);
    }
}
```

---

## Ví dụ thực tế

### Ví dụ 1: Tạo một game đơn giản từ đầu

**Bước 1: Setup Framework**

```csharp
// 1. Tạo GameObject SonatSystem trong scene đầu tiên
// 2. Tạo ServiceManager và add các services cần thiết:
//    - PlayerPrefsDataService
//    - SonatAudioService
//    - SonatConfigService
//    - SonatInventoryService
//    - LivesService
// 3. Tạo PanelManager GameObject
```

**Bước 2: Tạo GameConfig**

```csharp
using SonatFramework.Systems.ConfigManagement;
using UnityEngine;

[CreateAssetMenu(fileName = "GameConfig", menuName = "Sonat Configs/Game Config")]
public class GameConfig : ConfigSo
{
    [Header("Gameplay")]
    public int startingLives = 5;
    public float gameSpeed = 1f;
    public int pointsPerCoin = 10;
    
    [Header("Progression")]
    public int[] levelScoreThresholds = { 100, 250, 500, 1000, 2000 };
}
```

**Bước 3: Tạo GameManager**

```csharp
using Base.Singleton;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;

public class GameManager : Singleton<GameManager>
{
    private GameConfig config;
    private InventoryService inventory;
    private int currentScore = 0;
    
    protected override void OnAwake()
    {
        config = SonatSystem.GetConfig<GameConfig>();
        inventory = SonatSystem.GetService<InventoryService>();
    }
    
    public void StartGame()
    {
        currentScore = 0;
        
        EventBus<LevelStartedEvent>.Raise(new LevelStartedEvent
        {
            gameMode = GameMode.Normal,
            level = 1,
            phase = 0
        });
    }
    
    public void AddScore(int points)
    {
        currentScore += points;
        
        EventBus<ScoreChangedEvent>.Raise(new ScoreChangedEvent
        {
            newScore = currentScore,
            scoreAdded = points
        });
    }
    
    public void CollectCoin()
    {
        inventory.AddResource(
            new ResourceData(GameResource.Coin, config.pointsPerCoin),
            new EarnResourceLogData("gameplay", "coin_collect")
        );
        
        AddScore(config.pointsPerCoin);
    }
    
    public void GameOver()
    {
        EventBus<LevelEndedEvent>.Raise(new LevelEndedEvent
        {
            gameMode = GameMode.Normal,
            level = 1,
            success = false,
            phase = 0
        });
        
        // Save high score
        var dataService = SonatSystem.GetService<DataService>();
        int highScore = dataService.GetInt("high_score", 0);
        if (currentScore > highScore)
        {
            dataService.SetInt("high_score", currentScore);
        }
    }
}

// Custom Events
public struct ScoreChangedEvent : IEvent 
{
    public int newScore;
    public int scoreAdded;
}
```

**Bước 4: Tạo HUD Panel**

```csharp
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems.EventBus;
using TMPro;
using UnityEngine;

public class HUDPanel : Panel
{
    [SerializeField] private TMP_Text scoreText;
    [SerializeField] private TMP_Text livesText;
    
    private EventBinding<ScoreChangedEvent> scoreBinding;
    private EventBinding<EarnResourceEvent> resourceBinding;
    
    public override void OnSetup()
    {
        base.OnSetup();
        
        // Đăng ký events
        scoreBinding = new EventBinding<ScoreChangedEvent>(OnScoreChanged);
        resourceBinding = new EventBinding<EarnResourceEvent>(OnResourceEarned);
    }
    
    private void OnScoreChanged(ScoreChangedEvent e)
    {
        scoreText.text = $"Score: {e.newScore}";
    }
    
    private void OnResourceEarned(EarnResourceEvent e)
    {
        if (e.resource.gameResource == GameResource.Live)
        {
            UpdateLivesDisplay();
        }
    }
    
    private void UpdateLivesDisplay()
    {
        var inventory = SonatSystem.GetService<InventoryService>();
        var lives = inventory.GetResource(GameResource.Live.ToGameResourceKey());
        livesText.text = $"Lives: {lives.quantity}";
    }
}
```

**Bước 5: Tạo GameOver Panel**

```csharp
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.GameDataManagement;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class GameOverPanel : Panel
{
    [SerializeField] private TMP_Text finalScoreText;
    [SerializeField] private TMP_Text highScoreText;
    [SerializeField] private Button retryButton;
    [SerializeField] private Button homeButton;
    
    public override void OnSetup()
    {
        base.OnSetup();
        
        retryButton.onClick.AddListener(OnRetryClick);
        homeButton.onClick.AddListener(OnHomeClick);
    }
    
    public override void Open(UIData uiData)
    {
        base.Open(uiData);
        
        if (uiData.TryGet<int>("finalScore", out var score))
        {
            finalScoreText.text = $"Score: {score}";
        }
        
        var dataService = SonatSystem.GetService<DataService>();
        int highScore = dataService.GetInt("high_score", 0);
        highScoreText.text = $"Best: {highScore}";
    }
    
    private void OnRetryClick()
    {
        Close();
        GameManager.Instance.StartGame();
    }
    
    private void OnHomeClick()
    {
        Close();
        // Load main menu scene
    }
}
```

### Ví dụ 2: Tạo Shop UI với ShopService

```csharp
using Sonat.Enums;
using SonatFramework.Scripts.Feature.Shop;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ShopPanel : Panel
{
    [SerializeField] private Transform packContainer;
    [SerializeField] private GameObject packItemPrefab;
    
    private ShopService shopService;
    
    public override void OnSetup()
    {
        base.OnSetup();
        shopService = SonatSystem.GetService<ShopService>();
        shopService.OnBuySuccess += OnPackPurchased;
    }
    
    private void OnDestroy()
    {
        if (shopService != null)
        {
            shopService.OnBuySuccess -= OnPackPurchased;
        }
    }
    
    public override void Open(UIData uiData)
    {
        base.Open(uiData);
        RefreshShopItems();
    }
    
    private void RefreshShopItems()
    {
        // Clear old items
        foreach (Transform child in packContainer)
        {
            Destroy(child.gameObject);
        }
        
        // Create pack items
        ShopItemKey[] packs = { 
            ShopItemKey.CoinPack1, 
            ShopItemKey.CoinPack2, 
            ShopItemKey.CoinPack3 
        };
        
        foreach (var packKey in packs)
        {
            if (shopService.VerifyPack(packKey))
            {
                CreatePackItem(packKey);
            }
        }
    }
    
    private void CreatePackItem(ShopItemKey packKey)
    {
        var packData = shopService.GetPackData(packKey);
        if (packData == null) return;
        
        var item = Instantiate(packItemPrefab, packContainer);
        
        // Setup item UI
        var nameText = item.transform.Find("Name").GetComponent<TMP_Text>();
        nameText.text = shopService.GetProductName(packKey);
        
        var contentText = item.transform.Find("Content").GetComponent<TMP_Text>();
        string content = "";
        foreach (var resource in packData.packData.resourceUnits)
        {
            content += $"{resource.gameResource}: {resource.quantity}\n";
        }
        contentText.text = content;
        
        var buyButton = item.transform.Find("BuyButton").GetComponent<Button>();
        buyButton.onClick.AddListener(() => OnBuyClick(packKey));
    }
    
    private void OnBuyClick(ShopItemKey packKey)
    {
        if (shopService.IsBuying())
        {
            Debug.Log("Already buying!");
            return;
        }
        
        shopService.BuyPack(packKey);
        
        // Show loading popup
        PanelManager.Instance.OpenForget<PopupLoadingIap>();
    }
    
    private void OnPackPurchased(ShopItemKey packKey)
    {
        Debug.Log($"Pack {packKey} purchased!");
        
        // Close loading popup
        PanelManager.Instance.ClosePanel<PopupLoadingIap>();
        
        // Refresh shop
        RefreshShopItems();
        
        // Show success message or reward popup
    }
}
```

---

## Best Practices

### 1. Service Organization

```csharp
// ✅ GOOD: Service chỉ chứa logic liên quan đến domain của nó
[CreateAssetMenu(fileName = "AudioService", menuName = "Services/Audio")]
public class AudioService : SonatServiceSo
{
    public void PlaySound(string soundName) { }
    public void SetVolume(float volume) { }
}

// ❌ BAD: Service chứa quá nhiều responsibilities
[CreateAssetMenu(fileName = "GameService", menuName = "Services/Game")]
public class GameService : SonatServiceSo
{
    public void PlaySound(string soundName) { } // Should be in AudioService
    public void SaveData() { } // Should be in DataService
    public void ShowUI() { } // Should be in UIService
}
```

### 2. Event Usage

```csharp
// ✅ GOOD: Events nhỏ, rõ ràng, mục đích cụ thể
public struct PlayerDiedEvent : IEvent 
{
    public Vector3 deathPosition;
    public string causeOfDeath;
}

// ❌ BAD: Event quá chung chung
public struct GameEvent : IEvent 
{
    public string eventType; // Too generic
    public object data; // Lose type safety
}
```

### 3. Panel Management

```csharp
// ✅ GOOD: Panel chỉ handle UI logic
public class SettingsPanel : Panel
{
    public override void Open(UIData data)
    {
        base.Open(data);
        LoadUIValues(); // Only UI
    }
    
    private void OnSaveClick()
    {
        SaveSettings(); // Delegate to service
        Close();
    }
    
    private void SaveSettings()
    {
        // Call DataService to save
    }
}

// ❌ BAD: Panel có quá nhiều game logic
public class SettingsPanel : Panel
{
    public override void Open(UIData data)
    {
        base.Open(data);
        CalculateEnemySpawnRates(); // Game logic không thuộc về Panel
        ProcessAIBehavior(); // Game logic không thuộc về Panel
    }
}
```

### 4. Data Management

```csharp
// ✅ GOOD: Centralized data management
public class PlayerDataManager
{
    private DataService dataService;
    
    public void SavePlayerLevel(int level)
    {
        dataService.SetInt("player_level", level);
    }
    
    public int LoadPlayerLevel()
    {
        return dataService.GetInt("player_level", 1);
    }
}

// ❌ BAD: Data scattered everywhere
public class RandomScript1
{
    void SaveStuff()
    {
        PlayerPrefs.SetInt("level", 5); // Direct PlayerPrefs usage
    }
}

public class RandomScript2
{
    void SaveOtherStuff()
    {
        File.WriteAllText("data.json", "{}"); // Different save method
    }
}
```

### 5. Async Operations

```csharp
// ✅ GOOD: Proper async/await usage
public async UniTask LoadAndShowPanel()
{
    var panel = await PanelManager.Instance.OpenPanelAsync<MyPanel>();
    // Panel is ready to use
}

// ✅ GOOD: Fire and forget when don't need result
public void ShowPanel()
{
    PanelManager.Instance.OpenForget<MyPanel>();
}

// ❌ BAD: Blocking operations
public void LoadAndShowPanel()
{
    var panel = PanelManager.Instance.OpenPanelAsync<MyPanel>().GetAwaiter().GetResult(); // Blocking!
}
```

### 6. Resource Management với Logging

```csharp
// ✅ GOOD: Proper logging for analytics
public void AddCoins(int amount)
{
    var logData = new EarnResourceLogData
    {
        spendType = "level_complete",
        spendId = $"level_{currentLevel}",
        source = "non_iap",
        isFirstBuy = false
    };
    
    inventory.AddResource(new ResourceData(GameResource.Coin, amount), logData);
}

// ❌ BAD: No logging
public void AddCoins(int amount)
{
    inventory.AddResource(new ResourceData(GameResource.Coin, amount), null);
}
```

### 7. Config vs Data

```csharp
// ✅ GOOD: Separation of concerns
// Config - Design values (ScriptableObject)
public class GameplayConfig : ConfigSo
{
    public float playerSpeed = 5f; // Design value
    public int maxHealth = 100; // Design value
}

// Data - Runtime values (Save/Load)
public class PlayerData
{
    public int currentHealth = 100; // Runtime value
    public Vector3 position; // Runtime value
}

// ❌ BAD: Mixed concerns
public class GameData
{
    public float playerSpeed = 5f; // Config value
    public int currentHealth = 100; // Runtime value - confusing!
}
```

---

## Troubleshooting

### Vấn đề 1: Service không tìm thấy

**Triệu chứng:**
```
NullReferenceException: Object reference not set to an instance of an object
```

**Giải pháp:**
1. Kiểm tra Service đã được add vào Service Manager chưa
2. Kiểm tra SonatSystem đã được khởi tạo trong scene chưa
3. Kiểm tra Service có implement `IServiceInitialize` không
4. Kiểm tra thứ tự khởi tạo - service phụ thuộc cần được add sau service được phụ thuộc

### Vấn đề 2: Panel không mở

**Triệu chứng:**
Panel không hiển thị hoặc báo lỗi không tìm thấy prefab

**Giải pháp:**
1. Kiểm tra tên prefab phải trùng với tên class Panel
2. Kiểm tra prefab đã được đưa vào Addressable hoặc Resources
3. Kiểm tra LoadObjectServiceAsync đã được setup đúng
4. Kiểm tra PanelManager đã được add vào scene

### Vấn đề 3: Event không trigger

**Triệu chứng:**
Raise event nhưng listener không nhận được

**Giải pháp:**
1. Kiểm tra EventBinding đã được tạo trước khi Raise event
2. Kiểm tra type của Event có đúng không (cùng struct)
3. Kiểm tra listener method có đúng signature không

### Vấn đề 4: Data không save

**Triệu chứng:**
Sau khi restart game, data bị mất

**Giải pháp:**
1. Kiểm tra đã gọi `dataService.SaveData()` nếu cần force save
2. Kiểm tra key của data có nhất quán không
3. Kiểm tra platform có hỗ trợ PlayerPrefs không (WebGL có giới hạn)
4. Với complex objects, kiểm tra serialization có đúng không

### Vấn đề 5: Audio không play

**Triệu chứng:**
Gọi PlaySound nhưng không nghe thấy âm thanh

**Giải pháp:**
1. Kiểm tra volume có bị set về 0 không
2. Kiểm tra AudioClip đã được load thành công chưa (kiểm tra Addressable path)
3. Kiểm tra AudioManager GameObject có bị destroy không
4. Kiểm tra audio file đã được đưa vào Addressable với đúng key

### Vấn đề 6: Shop không hoạt động

**Triệu chứng:**
Mua pack nhưng không nhận được reward

**Giải pháp:**
1. Kiểm tra ShopConfig đã được assign vào ShopService
2. Kiểm tra ShopPack có active = true không
3. Kiểm tra ShopItemKey có đúng không
4. Kiểm tra InventoryService có được inject đúng không
5. Kiểm tra callback OnBuySuccess có được subscribe không

### Vấn đề 7: Lives không refill

**Triệu chứng:**
Mạng không tự động refill sau khoảng thời gian

**Giải pháp:**
1. Kiểm tra LivesConfig có được assign không
2. Kiểm tra TimeService có hoạt động đúng không
3. Kiểm tra timeRefillLives có đúng giá trị không
4. Kiểm tra app có được focus lại không (IServiceActionOnFocus)

---

## Kết luận

Sonat Framework cung cấp một nền tảng vững chắc để phát triển game Unity. Bằng cách sử dụng đúng các module và tuân theo best practices, bạn có thể:

- ✅ Phát triển game nhanh hơn
- ✅ Code dễ bảo trì hơn
- ✅ Ít bug hơn
- ✅ Dễ mở rộng tính năng mới
- ✅ Tracking và analytics đầy đủ

Hãy bắt đầu với các ví dụ đơn giản, sau đó dần dần áp dụng các tính năng nâng cao hơn khi đã quen thuộc với framework.

**Chúc bạn phát triển game thành công với Sonat Framework! 🎮🚀**

---

## Tài liệu tham khảo

- **Canva Design Document**: https://www.canva.com/design/DAGbZ0fZ2us/ULhvctbc_gYkJEZJvAJrBA/edit

## Liên hệ & Hỗ trợ

Nếu có bất kỳ câu hỏi hoặc cần hỗ trợ thêm, vui lòng liên hệ team Sonat Framework.

---

*Tài liệu này sẽ được cập nhật thường xuyên khi có tính năng mới hoặc cải tiến.*

*Version: 2.0*  
*Last Updated: January 2026*
