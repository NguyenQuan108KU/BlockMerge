using Cysharp.Threading.Tasks;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems.EventBus;
using UnityEngine;

public class TutorialManager : MonoBehaviour
{
    private const string PREFS_PREFIX = "tut_shown_";

    [SerializeField] private TutorialConfigSO config;

    private EventBinding<LevelStartedEvent> _levelStartedBinding;
    private EventBinding<BlockLandedEvent> _blockLandedBinding;

    private int _currentLevel;
    private bool _firstDropHandled;

    private void OnEnable()
    {
        _levelStartedBinding = new EventBinding<LevelStartedEvent>(OnLevelStarted);
        _blockLandedBinding = new EventBinding<BlockLandedEvent>(OnBlockLanded);
    }

    private void OnDisable()
    {
        _levelStartedBinding?.Dispose();
        _blockLandedBinding?.Dispose();
    }

    private void OnLevelStarted(LevelStartedEvent e)
    {
        _currentLevel = e.level;
        _firstDropHandled = false;

        // Trigger: OnLevel
        TryShowTutorials(TutorialTrigger.OnLevel, e.level).Forget();
    }

    private void OnBlockLanded(BlockLandedEvent e)
    {
        if (_firstDropHandled) return;
        _firstDropHandled = true;

        // Trigger: OnFirstDrop
        TryShowTutorials(TutorialTrigger.OnFirstDrop, _currentLevel).Forget();
    }

    private async UniTaskVoid TryShowTutorials(TutorialTrigger trigger, int level)
    {
        if (config == null) return;

        var entries = config.GetEntriesForTrigger(trigger, level);

        foreach (var entry in entries)
        {
            if (entry.showOnce && HasShown(entry.panelKey))
                continue;

            if (entry.delay > 0f)
                await UniTask.Delay(System.TimeSpan.FromSeconds(entry.delay));

            var panel = await PanelManager.Instance
                .OpenPanelByNameAsync<TutorialPanelBase>(entry.panelKey);

            if (panel == null)
            {
                Debug.LogWarning($"[Tutorial] Panel not found: {entry.panelKey}");
                continue;
            }

            if (entry.showOnce)
                MarkShown(entry.panelKey);

            await panel.WaitForClose();
        }
    }

    private static bool HasShown(string key)
        => PlayerPrefs.GetInt($"{PREFS_PREFIX}{key}", 0) == 1;

    private static void MarkShown(string key)
    {
        PlayerPrefs.SetInt($"{PREFS_PREFIX}{key}", 1);
        PlayerPrefs.Save();
    }

#if UNITY_EDITOR
    [ContextMenu("Reset All Tutorials")]
    private void ResetAll()
    {
        if (config == null) return;
        foreach (var entry in config.entries)
            PlayerPrefs.DeleteKey($"{PREFS_PREFIX}{entry.panelKey}");
        PlayerPrefs.Save();
        Debug.Log("[Tutorial] All reset.");
    }
#endif
}