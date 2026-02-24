using SonatFramework.Systems.EventBus;

public struct InputMoveEvent : IEvent
{
    public int Direction; // -1: Trái, 1: Phải
}

public struct InputRotateEvent : IEvent
{
    public int Direction; // -1: Xoay trái, 1: Xoay phải
}

public struct InputDragEndedEvent : IEvent { }

public struct InputDropEvent : IEvent { }

public struct InputDragStartedEvent : IEvent { }

public struct EdgeRotateProgressEvent : IEvent
{
    public bool IsActive;
    public float Progress;   
    public int Direction;   
}