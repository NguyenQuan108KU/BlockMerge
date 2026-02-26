namespace SonatFramework.Systems
{
    public interface IServiceInitialize
    {
        void Initialize();
    }

    public interface IServiceActionOnFocus
    {
        void OnApplicationFocus(bool focus);
    }
}