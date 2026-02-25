using Cysharp.Threading.Tasks;
using Sonat.Enums;

namespace Booster
{
    public interface IBoosterStrategy
    {
        GameResource BoosterType { get; }
        void Initialize(BoosterContext context);
        bool CanExecute();
        UniTask<bool> Execute();
        void Cleanup();
    }
}