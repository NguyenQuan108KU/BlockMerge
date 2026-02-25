using SonatFramework.Systems.EventBus;

public static class EventExtensions
{

    public static void Dispose<T>(this EventBinding<T> binding) where T : IEvent
    {
        if (binding != null)
        {
            EventBus<T>.Deregister(binding);
        }
    }
}