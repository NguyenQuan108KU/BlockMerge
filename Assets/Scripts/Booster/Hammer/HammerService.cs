using UnityEngine;
using Cysharp.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Booster
{
    public class HammerService
    {
        private readonly GridManager _grid;
        private readonly CellMeshLibrary _meshLib;

        public HammerService(GridManager grid, CellMeshLibrary meshLib)
        {
            _grid = grid;
            _meshLib = meshLib;
        }

        #region Public API

        /// <summary>
        /// [MỚI] Lấy toàn bộ các ô có gạch trong hàng Y
        /// </summary>
        public List<Vector2Int> GetRowCells(int y)
        {
            List<Vector2Int> result = new List<Vector2Int>();
            if (_grid == null || y < 0 || y >= _grid.config.height) return result;

            for (int x = 0; x < _grid.config.Perimeter; x++)
            {
                if (_grid.gridData.HasBlock(x, y))
                {
                    result.Add(new Vector2Int(x, y));
                }
            }
            return result;
        }

        public bool IsSingleCell(int x, int y)
        {
            if (_grid == null || _meshLib == null) return false;

            GameObject visual = _grid.visualizer.GetVisual(x, y);
            if (visual == null) return false;

            MeshFilter mf = GetMeshFilter(visual);
            if (mf == null || mf.sharedMesh == null) return false;

            return mf.sharedMesh == _meshLib.full;
        }

        public bool IsMultiLayerBlock(int x, int y)
        {
            int blockID = _grid.gridData.GetCell(x, y);
            if (blockID == -1) return false;
            return _grid.gridData.IsMultiLayerBlock(blockID);
        }

        // [LOGIC CŨ] GetCellsToDestroy (Cho 1 block) - Giữ lại để tham khảo hoặc dùng cho mode khác
        public List<Vector2Int> GetBlockCells(int x, int y)
        {
            List<Vector2Int> result = new List<Vector2Int>();
            int blockID = _grid.gridData.GetCell(x, y);
            if (blockID == -1) return result;

            if (IsSingleCell(x, y))
            {
                result.Add(new Vector2Int(x, y));
            }
            else
            {
                var cells = _grid.gridData.GetCellsByBlockID(blockID);
                if (cells != null) result.AddRange(cells);
            }
            return result;
        }

        /// <summary>
        /// [NÂNG CẤP] Xử lý phá hủy cho danh sách ô (có thể thuộc nhiều block khác nhau)
        /// </summary>
        public async UniTask<bool> ExecuteDestroy(List<Vector2Int> cellsToProcess)
        {
            if (cellsToProcess == null || cellsToProcess.Count == 0) return false;

            HashSet<int> multiLayerBlockIDs = new HashSet<int>();
            List<Vector2Int> cellsToDestroy = new List<Vector2Int>();

            // 1. Phân loại: Cái nào Strip (bóc vỏ), cái nào Destroy (xóa)
            foreach (var cell in cellsToProcess)
            {
                int blockID = _grid.gridData.GetCell(cell.x, cell.y);
                if (blockID == -1) continue;

                if (_grid.gridData.IsMultiLayerBlock(blockID))
                {
                    multiLayerBlockIDs.Add(blockID);
                }
                else
                {
                    cellsToDestroy.Add(cell);
                }
            }

            bool hasAction = false;

            // 2. Xử lý Multi-layer Blocks (Strip toàn bộ block đó, dù chỉ trúng 1 phần)
            foreach (int blockID in multiLayerBlockIDs)
            {
                // Lấy tất cả cell của block này để bóc vỏ đồng bộ
                var blockCells = _grid.gridData.GetCellsByBlockID(blockID);
                if (blockCells != null)
                {
                    await ExecuteStripLayer(blockID, blockCells.ToList());
                    hasAction = true;
                }
            }

            // 3. Xử lý Normal Blocks (Xóa các ô trong hàng)
            if (cellsToDestroy.Count > 0)
            {
                await ExecuteNormalDestroy(cellsToDestroy);
                hasAction = true;
            }

            return hasAction;
        }

        #endregion

        #region Internal Logic

        private async UniTask<bool> ExecuteStripLayer(int blockID, List<Vector2Int> cells)
        {
            HashSet<int> processedVisualIDs = new HashSet<int>();

            foreach (var cell in cells)
            {
                GameObject visual = _grid.visualizer.GetVisual(cell.x, cell.y);
                if (visual == null) continue;

                int visualID = visual.GetInstanceID();
                if (processedVisualIDs.Contains(visualID)) continue;
                processedVisualIDs.Add(visualID);

                var blockVis = visual.GetComponent<BlockVisual>();
                if (blockVis != null)
                {
                    SpawnDestroyEffect(visual); // Hiệu ứng vỡ vỏ
                    blockVis.StripOuterLayer();
                }
            }

            _grid.gridData.DecreaseBlockLayer(blockID);
            await UniTask.Delay(50); // Delay nhỏ cho mượt
            return true;
        }

        private async UniTask<bool> ExecuteNormalDestroy(List<Vector2Int> cellsToDestroy)
        {
            HashSet<int> affectedRows = new HashSet<int>();
            HashSet<int> destroyedVisualIDs = new HashSet<int>();
            HashSet<int> processedBlockIDs = new HashSet<int>();

            // Xóa Visual & Data
            foreach (var cell in cellsToDestroy)
            {
                int blockID = _grid.gridData.GetCell(cell.x, cell.y);

                GameObject visual = _grid.visualizer.GetVisual(cell.x, cell.y);
                if (visual != null)
                {
                    int visualID = visual.GetInstanceID();
                    // Chỉ spawn effect và return pool 1 lần cho mỗi visual object (vì 1 visual có thể cover nhiều cell)
                    if (destroyedVisualIDs.Add(visualID))
                    {
                        var blockVis = visual.GetComponent<BlockVisual>();
                        blockVis?.CleanupInnerMesh();

                        SpawnDestroyEffect(visual);
                        BlockFactory.Instance?.ReturnBlock(visual);
                    }
                }

                _grid.visualizer.ClearVisualReference(cell.x, cell.y);
                _grid.gridData.SetCellWithoutHeightUpdate(cell.x, cell.y, -1); // Xóa data tại ô này
                affectedRows.Add(cell.y);

                if (blockID != -1) processedBlockIDs.Add(blockID);
            }

            // Cleanup layer data nếu block bị xóa hết
            foreach (int blockID in processedBlockIDs)
            {
                // Kiểm tra xem block còn cell nào sống sót không
                var remainingCells = _grid.gridData.GetCellsByBlockID(blockID);
                if (remainingCells == null || remainingCells.Count == 0)
                {
                    _grid.gridData.RemoveBlockLayer(blockID);
                }
            }

            _grid.gridData.RecalculateHeights();

            // Trọng lực rơi xuống lấp chỗ trống
            await _grid.ApplyGravityAsync();

            // Check ăn điểm sau khi rơi
            HashSet<int> allRows = new HashSet<int>();
            int maxH = _grid.gridData.GetMaxHeight();
            for (int y = 0; y <= maxH && y < _grid.config.height; y++) allRows.Add(y);

            await _grid.CheckAndClearRowsAsync(allRows);

            return true;
        }

        private MeshFilter GetMeshFilter(GameObject obj)
        {
            if (obj == null) return null;
            Transform outer = obj.transform.Find("Visual_Outer");
            if (outer != null)
            {
                MeshFilter mf = outer.GetComponent<MeshFilter>();
                if (mf != null) return mf;
            }
            MeshFilter rootMF = obj.GetComponent<MeshFilter>();
            if (rootMF != null) return rootMF;
            return obj.GetComponentInChildren<MeshFilter>();
        }

        private void SpawnDestroyEffect(GameObject blockObj)
        {
            if (ObjectPoolManager.Instance == null || blockObj == null) return;

            Vector3 pos = blockObj.transform.position;
            Vector3 dir = pos.normalized;

            // Dùng tên string cứng hoặc hằng số
            GameObject vfx = ObjectPoolManager.Instance.SpawnSync(
                "VFX_BlockBreak_Dual",
                pos + dir * 0.2f,
                Quaternion.LookRotation(dir)
            );

            if (vfx != null)
            {
                var vis = blockObj.GetComponent<BlockVisual>();
                var eff = vfx.GetComponent<DualDirectionEffect>();
                if (vis != null && eff != null)
                {
                    //eff.SetupAndPlay(vis.CurrentColor);
                }
            }
        }

        #endregion
    }
}