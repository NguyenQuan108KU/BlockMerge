using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using SonatFramework.Systems.GameDataManagement;
using SonatFramework.Systems.EventBus;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using System.Collections.Generic;

public class HomePanel : Panel
{
    [Header("UI References")]
    [SerializeField] protected Transform mapContent;
    [SerializeField] protected LevelButton levelBtnPrefab;
    // [SerializeField] protected Button btnGo; // <-- BỎ DÒNG NÀY (Không cần tham chiếu code nữa)
    [SerializeField] protected GameConfig gameConfig;

    private List<LevelButton> _spawnedButtons = new List<LevelButton>();
    private int _currentSelectedLevel = 1;

    private const string KEY_LEVEL_UNLOCK = "USER_LEVEL_UNLOCK";
    private const string KEY_CURRENT_PLAY = "USER_CURRENT_LEVEL";
    private const string SCENE_GAME = "GameScene";

    private EventBinding<LevelUnlockedEvent> _levelUnlockedBinding;

    // --- BỎ HÀM SETUP LOẰNG NGOẰNG ---
    public override void OnSetup()
    {
        base.OnSetup();
        // Không đăng ký listener ở đây nữa!
        _levelUnlockedBinding = new EventBinding<LevelUnlockedEvent>(OnLevelUnlocked);
    }

    private void OnDestroy()
    {
        if (_levelUnlockedBinding != null)
            EventBus<LevelUnlockedEvent>.Deregister(_levelUnlockedBinding);
    }

    // Dùng OnEnable để sinh Map mỗi khi bật lên
    protected virtual void OnEnable()
    {
        GenerateMap();
    }

    // --- HÀM PUBLIC ĐỂ BẠN KÉO VÀO NÚT ---
    public void OnClickGo()
    {
        Debug.Log("🔴 ĐÃ BẤM VÀO NÚT GO (Từ Inspector)!");

        // 1. Check Tim
        var dataService = SonatSystem.GetService<DataService>();
        int currentHeart = dataService != null ? dataService.GetInt("USER_HEART", 5) : 5;

        if (currentHeart > 0)
        {
            Debug.Log($"🚀 Chọn Level {_currentSelectedLevel}. Loading GameScene...");

            // 2. Lưu level muốn chơi
            if (dataService != null)
            {
                dataService.SetInt(KEY_CURRENT_PLAY, _currentSelectedLevel);
                dataService.SaveData();
            }

            // 3. Chuyển Scene
            SceneManager.LoadScene(SCENE_GAME);
        }
        else
        {
            Debug.Log("❌ Hết tim!");
            // Gọi Popup Shop
        }
    }

    // ... (Giữ nguyên phần GenerateMap và OnLevelSelected bên dưới) ...
    private void GenerateMap()
    {
        foreach (Transform child in mapContent) Destroy(child.gameObject);
        _spawnedButtons.Clear();

        var dataService = SonatSystem.GetService<DataService>();
        int unlockedLevel = dataService != null ? dataService.GetInt(KEY_LEVEL_UNLOCK, 1) : 1;
        int total = (gameConfig != null) ? gameConfig.totalLevelCount : 50;

        for (int i = 1; i <= total; i++)
        {
            LevelButton btn = Instantiate(levelBtnPrefab, mapContent);
            bool isLocked = (i > unlockedLevel);
            btn.Setup(i, isLocked, OnLevelSelected);
            _spawnedButtons.Add(btn);
        }

        if (_currentSelectedLevel > unlockedLevel || _currentSelectedLevel == 0)
            _currentSelectedLevel = unlockedLevel;

        OnLevelSelected(_currentSelectedLevel);
    }

    private void OnLevelSelected(int levelIndex)
    {
        _currentSelectedLevel = levelIndex;
        for (int i = 0; i < _spawnedButtons.Count; i++)
        {
            _spawnedButtons[i].SetSelectedState((i + 1) == _currentSelectedLevel);
        }
    }

    private void OnLevelUnlocked(LevelUnlockedEvent evt)
    {
        GenerateMap();
    }
}