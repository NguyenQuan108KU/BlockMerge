using SonatFramework.Systems.EventBus;

public struct UndoRequestEvent : IEvent { }

public struct UndoPerformedEvent : IEvent
{
    public BlockShapeSO RestoredShape;
}

// [MỚI] Thêm cái này để UndoUIButton lắng nghe
public struct UndoStateEvent : IEvent
{
    public bool IsAvailable;
    public int RemainingCount;
}