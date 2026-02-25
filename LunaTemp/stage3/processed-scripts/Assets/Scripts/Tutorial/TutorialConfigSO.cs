using System;
using System.Collections.Generic;
using SonatFramework.Systems.EventBus;
using UnityEngine;

[CreateAssetMenu(fileName = "TutorialConfig", menuName = "Game/Tutorial Config")]
public class TutorialConfigSO : ScriptableObject
{
    public List<TutorialEntry> entries = new System.Collections.Generic.List<TutorialEntry>();

    public List<TutorialEntry> GetEntriesForLevel(int level)
    {
        var result = new List<TutorialEntry>();
        foreach (var entry in entries)
        {
            if (entry.trigger == TutorialTrigger.OnLevel && entry.level == level)
                result.Add(entry);
        }
        return result;
    }

    public List<TutorialEntry> GetEntriesForTrigger(TutorialTrigger trigger, int level)
    {
        var result = new List<TutorialEntry>();
        foreach (var entry in entries)
        {
            if (entry.trigger == trigger && entry.level == level)
                result.Add(entry);
        }
        return result;
    }
}

public enum TutorialTrigger
{
    OnLevel,
    OnFirstDrop,
    OnBooster,
    OnFirstPlay,
}

public struct TutorialCompletedEvent : IEvent
{
    public string PanelKey;
}

[Serializable]
public class TutorialEntry
{
    public TutorialTrigger trigger;
    public int level;
    public string panelKey;
    public bool showOnce = true;
    public float delay = 0.5f;
}