using UnityEngine;
using SonatFramework.Systems.EventBus;
using System.Collections.Generic;

public struct BlockSpawnedEvent : IEvent
{
    public ActiveBlockController BlockController;
    public int BlockId; // Để tracking nếu cần
}

public struct BlockLandedEvent : IEvent
{
    public ActiveBlockController Block;
    public int GridX;
    public int GridY;
}

public struct NextBlockUpdatedEvent : IEvent
{
    public BlockShapeSO ShapeData;
    public Material BlockMaterial;
}

public struct GhostVisibilityEvent : IEvent
{
    public bool IsVisible;
}

public struct GhostLandingUpdatedEvent : IEvent
{
    public int TopRow;
}

public struct BlockMovedEvent : IEvent { }

public struct GravityLandedEvent : IEvent { }
