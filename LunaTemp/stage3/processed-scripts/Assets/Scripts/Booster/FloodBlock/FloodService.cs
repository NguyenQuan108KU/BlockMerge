using DG.Tweening;
using System.Collections.Generic;
using UnityEngine;
using SonatFramework.Systems.EventBus;
using System.Threading.Tasks;

namespace Booster
{
    /// <summary>
    /// FloodService - Xử lý logic lan tràn của Flood Block
    /// 
    /// LOGIC:
    /// - Chỉ lan trong CÙNG 1 FACE chứa seed block
    /// - Lấp đầy từ Y=0 đến Y=seedTopY (đỉnh của seed)
    /// - Sử dụng thuật toán BFS để tìm các ô có thể lan tới
    /// </summary>
    public class FloodService
    {
        private readonly GridManager _grid;
        private readonly Transform _towerContainer;

        // Animation settings
        private const float WAVE_DELAY_MS = 50f;
        private const float SPAWN_SCALE_DURATION = 0.15f;

        public FloodService(GridManager grid, Transform towerContainer)
        {
            _grid = grid;
            _towerContainer = towerContainer;
        }

        /// <summary>
        /// Thực hiện flood fill từ vị trí seed
        /// </summary>
        public async Task ExecuteFlood(int seedX, int seedTopY, Material floodMaterial)
        {
            if (_grid == null || _grid.gridData == null || _grid.visualizer == null)
            {
                Debug.LogError("[FloodService] Grid not initialized!");
                return;
            }

            // 1. Xác định FACE chứa seed
            int faceWidth = _grid.faceWidth;
            int faceIndex = seedX / faceWidth;
            int faceStartX = faceIndex * faceWidth;
            int faceEndX = faceStartX + faceWidth;

            // 2. Tạo danh sách cells cần fill bằng BFS
            List<Vector2Int> cellsToFill = CollectCellsToFill(seedX, seedTopY, faceStartX, faceEndX);

            if (cellsToFill.Count == 0)
            {
                EventBus<FloodBlockEvent>.Raise(new FloodBlockEvent
                {
                    IsActivated = false
                });
                return;
            }

            // 3. Spawn blocks với wave effect
            await SpawnFloodBlocksWithWaveEffect(cellsToFill, seedX, seedTopY, floodMaterial);

            // 4. Đợi animation hoàn thành
            await Task.Delay((int)(SPAWN_SCALE_DURATION * 1000) + 100);

            // 5. Check và clear rows
            HashSet<int> rowsToCheck = new HashSet<int>();
            for (int y = 0; y <= seedTopY; y++)
            {
                rowsToCheck.Add(y);
            }

            await _grid.CheckAndClearRowsAsync(rowsToCheck);

            EventBus<FloodBlockEvent>.Raise(new FloodBlockEvent
            {
                IsActivated = false
            });
        }

        /// <summary>
        /// Thu thập cells cần fill bằng thuật toán BFS
        /// </summary>
        private List<Vector2Int> CollectCellsToFill(int seedX, int seedY, int faceStartX, int faceEndX)
        {
            List<Vector2Int> result = new List<Vector2Int>();
            HashSet<Vector2Int> visited = new HashSet<Vector2Int>();
            Queue<Vector2Int> queue = new Queue<Vector2Int>();

            Vector2Int startCell = new Vector2Int(seedX, seedY);
            visited.Add(startCell);

            if (!_grid.gridData.HasBlock(seedX, seedY))
            {
                queue.Enqueue(startCell);
            }

            int[] dx = { -1, 1, 0, 0 };
            int[] dy = { 0, 0, 1, -1 };

            for (int i = 0; i < 4; i++)
            {
                int nx = seedX + dx[i];
                int ny = seedY + dy[i];

                if (ny > seedY) continue;
                if (ny < 0) continue;
                if (nx < faceStartX || nx >= faceEndX) continue;
                if (_grid.gridData.HasBlock(nx, ny)) continue;

                Vector2Int neighbor = new Vector2Int(nx, ny);
                visited.Add(neighbor);
                queue.Enqueue(neighbor);
            }

            while (queue.Count > 0)
            {
                Vector2Int current = queue.Dequeue();
                result.Add(current);

                for (int i = 0; i < 4; i++)
                {
                    int nx = current.x + dx[i];
                    int ny = current.y + dy[i];

                    if (ny > seedY) continue;
                    if (ny < 0) continue;
                    if (nx < faceStartX || nx >= faceEndX) continue;

                    Vector2Int neighbor = new Vector2Int(nx, ny);

                    if (visited.Contains(neighbor)) continue;
                    if (_grid.gridData.HasBlock(nx, ny)) continue;

                    visited.Add(neighbor);
                    queue.Enqueue(neighbor);
                }
            }

            return result;
        }

        /// <summary>
        /// Spawn các flood blocks với hiệu ứng wave từ seed ra 2 bên
        /// </summary>
        private async Task SpawnFloodBlocksWithWaveEffect(List<Vector2Int> cells, int seedX, int seedY, Material mat)
        {
            if (cells.Count == 0) return;

            cells.Sort((a, b) =>
            {
                int distA = Mathf.Abs(a.x - seedX);
                int distB = Mathf.Abs(b.x - seedX);
                if (distA != distB) return distA.CompareTo(distB);
                return a.y.CompareTo(b.y);
            });

            int lastDistance = -1;
            List<Task> currentWaveTasks = new List<Task>();

            foreach (var cell in cells)
            {
                int distance = Mathf.Abs(cell.x - seedX);

                if (distance != lastDistance && currentWaveTasks.Count > 0)
                {
                    await Task.WhenAll(currentWaveTasks);
                    currentWaveTasks.Clear();
                    await Task.Delay((int)WAVE_DELAY_MS);
                }

                lastDistance = distance;
                currentWaveTasks.Add(SpawnSingleFloodBlock(cell.x, cell.y, mat));
            }

            if (currentWaveTasks.Count > 0)
            {
                await Task.WhenAll(currentWaveTasks);
            }
        }

        /// <summary>
        /// Spawn 1 flood block tại vị trí (x, y)
        /// </summary>
        private async Task SpawnSingleFloodBlock(int x, int y, Material mat)
        {
            if (_grid.gridData.HasBlock(x, y))
            {
                return;
            }

            Vector3 localPos = _grid.visualizer.GetLocalPosition(x, y);
            int face = _grid.visualizer.GetFaceFromX(x);
            Quaternion rotation = _grid.visualizer.GetRotationForFace(face);

            Transform parent = _towerContainer ?? _grid.transform.parent;

            GameObject obj = BlockFactory.Instance.CreateStaticBlock(
                localPos,
                rotation,
                parent,
                mat
            );

            if (obj == null)
            {
                Debug.LogError($"[FloodService] Failed to create block at ({x},{y})");
                return;
            }

            var blockVis = obj.GetComponent<BlockVisual>();
            if (blockVis != null && _grid.meshLibrary != null && _grid.meshLibrary.full != null)
            {
                blockVis.ChangeMeshToFull(_grid.meshLibrary.full);
            }

            obj.transform.localScale = Vector3.zero;
            DOTween.To(
                () => obj.transform.localScale,
                scale => obj.transform.localScale = scale,
                Vector3.one,
                SPAWN_SCALE_DURATION
            ).SetEase(Ease.OutBack);

            int floodBlockID = GridManager.GetNextBlockID();
            _grid.gridData.SetCell(x, y, floodBlockID);
            _grid.visualizer.SetVisual(x, y, obj);
        }
    }
}