using Sonat.Enums;
using SonatFramework.Systems.EventBus;
using System.Collections.Generic;
using UnityEngine;

public struct CoinChangedEvent : IEvent
{
    public int NewBalance;
}

public struct HeartChangedEvent : IEvent
{
    public int NewBalance;
}

public struct LevelUnlockedEvent : IEvent
{
    public int LevelIndex;
}

public struct GameLoseEvent : IEvent
{
    public LoseReason reason;
}

public struct LevelChangedEvent : IEvent
{
    public int LevelIndex;
    public string LevelName;
}

public struct ScoreUpdatedEvent : IEvent
{
    public int CurrentScore;
    public int TargetScore;
    public int AddedAmount;
}

public struct RowsClearedEvent : IEvent
{
    public int RowCount;
    public int ComboCount;
    public int TotalScoreAdded;
}

public struct TimerUpdatedEvent : IEvent
{
    public float TimeRemaining;
}

public struct TimerWarningEvent : IEvent
{
    public bool IsWarning;
    public float TimeRemaining;
}

public struct FaceChangedEvent : IEvent
{
    public int NewFaceIndex;
    public int OldFaceIndex;
}

public struct RegisterMoveEvent : IEvent
{
    public BlockShapeSO Shape;
    public List<GameObject> Objs;
    public List<Vector2Int> Coords;
}

public struct GridStableEvent : IEvent { }