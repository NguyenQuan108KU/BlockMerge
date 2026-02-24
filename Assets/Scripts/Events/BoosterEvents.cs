using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Systems.EventBus;
using UnityEngine;

// === Gameplay Events (giữ) ===

public struct BoosterUsedEvent : IEvent
{
    public GameResource BoosterType;
}

public struct TimerFreezeEvent : IEvent
{
    public float Duration;
    public bool IsStarted;
}

public struct HammerModeEvent : IEvent
{
    public bool IsActive;
}

public struct HammerHighlightEvent : IEvent
{
    public List<Vector2Int> Cells;
    public bool IsValid;
}

public struct HammerConfirmEvent : IEvent { }

public struct HammerRowSelectedEvent : IEvent
{
    public int RowIndex;
}

public struct FloodBlockEvent : IEvent
{
    public bool IsActivated;
}

public struct FloodProgressEvent : IEvent
{
    public float Progress;
    public int CurrentCount;
    public int TargetCount;
}