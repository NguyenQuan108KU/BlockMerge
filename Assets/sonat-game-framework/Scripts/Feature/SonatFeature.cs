using SonatFramework.Systems;
using System.Threading.Tasks;

namespace SonatFramework.Scripts.Feature
{
    public abstract class SonatFeature<TConfig, TData> : IServiceInitializeAsync
    {
        public TConfig configs;
        public TData data;


        public virtual async Task InitializeAsync()
        {
            await LoadConfig();
            await LoadData();
        }

        protected abstract Task LoadConfig();
        protected abstract Task LoadData();

        protected abstract void SaveData();
    }
}