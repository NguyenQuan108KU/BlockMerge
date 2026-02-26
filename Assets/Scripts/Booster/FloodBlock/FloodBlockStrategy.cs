using Sonat.Enums;
using System.Threading.Tasks;
using UnityEngine;

namespace Booster
{

    public class FloodBlockStrategy : IBoosterStrategy
    {
        //public GameResource BoosterType => GameResource.Flood;

        public void Initialize(BoosterContext context) { }

        public bool CanExecute() => false;

        public async Task<bool> Execute()
        {
            Debug.LogWarning("[FloodBlockStrategy] Deprecated. Flood is now auto-spawn.");
            return false;
        }

        public void Cleanup() { }
    }
}