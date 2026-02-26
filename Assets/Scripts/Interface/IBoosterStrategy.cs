using Sonat.Enums;
using System.Threading.Tasks;

namespace Booster
{
    public interface IBoosterStrategy
    {
        //GameResource BoosterType { get; }
        void Initialize(BoosterContext context);
        bool CanExecute();
        Task<bool> Execute();
        void Cleanup();
    }
}