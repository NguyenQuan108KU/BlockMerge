using Sonat.Enums;
using System.Threading.Tasks;
using UnityEngine;

namespace Booster
{
    /// <summary>
    /// HammerStrategy - Phá hủy một hàng blocks
    /// </summary>
    public class HammerStrategy : IBoosterStrategy
    {
        public GameResource BoosterType => GameResource.Hammer;

        private BoosterContext _context;
        private HammerService _service;

        public void Initialize(BoosterContext context)
        {
            _context = context;
            // Lazy init service khi cần
        }

        public bool CanExecute()
        {
            var grid = _context?.Grid ?? GridManager.Instance;
            if (grid == null) return false;
            return grid.gridData.GetMaxHeight() > 0;
        }

        public async Task<bool> Execute()
        {
            // Ensure service initialized
            EnsureServiceInitialized();

            var hammerInput = _context?.HammerInput ?? HammerInputHandler.Instance;
            if (hammerInput == null)
            {
                Debug.LogError("[HammerStrategy] HammerInputHandler not found!");
                return false;
            }

            // Chờ user chọn cell
            HammerResult result = await hammerInput.WaitForSelection();

            if (!result.Success || result.CellsToDestroy.Count == 0)
            {
                return false;
            }

            // Thực hiện xóa
            return await _service.ExecuteDestroy(result.CellsToDestroy);
        }

        public void Cleanup()
        {
            // Không có gì cần cleanup
        }

        private void EnsureServiceInitialized()
        {
            if (_service != null) return;

            var grid = _context?.Grid ?? GridManager.Instance;
            if (grid == null) return;

            var meshLibrary = _context?.MeshLibrary ?? grid.meshLibrary;
            _service = new HammerService(grid, meshLibrary);

            var hammerInput = _context?.HammerInput ?? HammerInputHandler.Instance;
            if (hammerInput != null)
            {
                hammerInput.Initialize(_service);
            }
        }
    }
}