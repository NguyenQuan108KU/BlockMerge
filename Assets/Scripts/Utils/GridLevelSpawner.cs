using System.Collections.Generic;
using UnityEngine;
using Cysharp.Threading.Tasks;

public class GridLevelSpawner
{
    private readonly GameConfig config;
    private readonly GridData gridData;
    private readonly GridVisualizer visualizer;
    private readonly CellMeshLibrary meshLibrary;

    #region Constructor

    public GridLevelSpawner(GameConfig config, GridData gridData, GridVisualizer visualizer, CellMeshLibrary meshLibrary)
    {
        this.config = config;
        this.gridData = gridData;
        this.visualizer = visualizer;
        this.meshLibrary = meshLibrary;
    }

    #endregion

    #region Spawn Level Map

    public async UniTask SpawnLevelMap(List<PreplacedBlockData> mapData, Transform towerContainer)
    {
        if (mapData == null || mapData.Count == 0) return;

        HashSet<Vector2Int> occupiedCells = new HashSet<Vector2Int>();
        SpawnStats stats = new SpawnStats();

        for (int i = 0; i < mapData.Count; i++)
        {
            await SpawnElement(mapData[i], i, towerContainer, occupiedCells, stats);
        }

        gridData.RecalculateHeights();

        if (stats.totalSpawned > 0)
        {
            Debug.Log($"[GridLevelSpawner] Spawned {stats.totalSpawned} cells. Skipped: {stats.skippedOverlap} overlap, {stats.skippedOutOfBounds} out of bounds, {stats.skippedTwinDuplicate} twin duplicates");
        }
    }

    private async UniTask SpawnElement(
        PreplacedBlockData data,
        int elementIndex,
        Transform towerContainer,
        HashSet<Vector2Int> occupiedCells,
        SpawnStats stats)
    {
        BlockShapeSO shapeSO = await LoadShape(data, elementIndex);
        if (shapeSO == null) return;

        int uniqueMapBlockID = GridManager.GetNextBlockID();
        Material blockMat = GetBlockMaterial(data.colorIndex);
        int pivotX = (data.faceIndex * config.faceWidth) + data.localX;

        Material innerMat = shapeSO.defaultLayers > 1
            ? GetRandomInnerMaterial(blockMat)
            : null;

        HashSet<Vector2Int> shapeOffsets = new HashSet<Vector2Int>(shapeSO.structuralOffsets);
        bool isFirstCell = true;

        foreach (var offset in shapeSO.structuralOffsets)
        {
            await SpawnCell(
                data, elementIndex, pivotX, offset, towerContainer,
                occupiedCells, stats, blockMat, uniqueMapBlockID,
                shapeOffsets, shapeSO, isFirstCell, innerMat
            );
            isFirstCell = false;
        }

        if (shapeSO.defaultLayers > 1)
        {
            gridData.SetBlockLayer(uniqueMapBlockID, shapeSO.defaultLayers);
        }
    }

    private async UniTask SpawnCell(
        PreplacedBlockData data,
        int elementIndex,
        int pivotX,
        Vector2Int offset,
        Transform towerContainer,
        HashSet<Vector2Int> occupiedCells,
        SpawnStats stats,
        Material blockMat,
        int blockID,
        HashSet<Vector2Int> shapeOffsets,
        BlockShapeSO shapeSO,
        bool isFirstCell,
        Material innerMat)
    {
        int rawX = pivotX + offset.x;
        int tx = gridData.GetWrappedX(rawX);
        int ty = data.y + offset.y;
        Vector2Int cellPos = new Vector2Int(tx, ty);

        if (!ValidateCellWithTwin(cellPos, elementIndex, occupiedCells, stats)) return;

        occupiedCells.Add(cellPos);
        int twinCol = gridData.GetTwinColumn(tx);
        if (twinCol != -1)
        {
            occupiedCells.Add(new Vector2Int(twinCol, ty));
        }

        Vector3 worldPos = visualizer.GetLocalPosition(tx, ty);
        int currentFace = visualizer.GetFaceFromX(tx);
        Quaternion rot = visualizer.GetRotationForFace(currentFace);

        GameObject obj = BlockFactory.Instance.CreateStaticBlock(
            worldPos, rot, towerContainer, blockMat
        );

        if (obj != null)
        {
            BlockVisual blockVisual = obj.GetComponent<BlockVisual>();
            if (blockVisual != null && meshLibrary != null)
            {
                blockVisual.ResolveMesh(offset, shapeOffsets, meshLibrary);

                if (shapeSO.defaultLayers > 1)
                {
                    if (isFirstCell && shapeSO.innerMesh != null)
                    {
                        blockVisual.SetupInnerMesh(
                            shapeSO.innerMesh,
                            innerMat,
                            shapeSO.innerScale,
                            shapeSO.innerOffset
                        );
                    }
                    else
                    {
                        blockVisual.SetupInnerMaterial(innerMat);
                    }
                }
                else
                {
                    blockVisual.FindOuterInnerReferences();
                    blockVisual.SetInnerVisible(false);
                }
            }
        }

        visualizer.SetVisual(tx, ty, obj);
        gridData.SetCell(tx, ty, blockID);

        stats.totalSpawned++;
    }

    #endregion

    #region Helpers

    private async UniTask<BlockShapeSO> LoadShape(PreplacedBlockData data, int elementIndex)
    {
        if (data.blockShapeRef == null) return null;

        BlockShapeSO shapeSO = null;

        if (data.blockShapeRef.Asset != null)
        {
            shapeSO = data.blockShapeRef.Asset as BlockShapeSO;
        }
        else if (data.blockShapeRef.RuntimeKeyIsValid())
        {
            shapeSO = await data.blockShapeRef.LoadAssetAsync<BlockShapeSO>().Task;
        }

        return shapeSO;
    }

    private Material GetBlockMaterial(int colorIndex)
    {
        return config.blockPalette != null
            ? config.blockPalette.GetByIndex(colorIndex)
            : null;
    }

    private Material GetRandomInnerMaterial(Material outerMat)
    {
        return config.blockPalette != null
            ? config.blockPalette.GetRandomExcept(outerMat)
            : null;
    }

    private bool ValidateCellWithTwin(Vector2Int cellPos, int elementIndex, HashSet<Vector2Int> occupiedCells, SpawnStats stats)
    {
        int tx = cellPos.x;
        int ty = cellPos.y;

        if (ty < 0 || ty >= config.height)
        {
            stats.skippedOutOfBounds++;
            return false;
        }

        if (tx < 0 || tx >= config.Perimeter)
        {
            stats.skippedOutOfBounds++;
            return false;
        }

        if (occupiedCells.Contains(cellPos))
        {
            stats.skippedOverlap++;
            return false;
        }

        int twinCol = gridData.GetTwinColumn(tx);
        if (twinCol != -1)
        {
            Vector2Int twinPos = new Vector2Int(twinCol, ty);
            if (occupiedCells.Contains(twinPos))
            {
                stats.skippedTwinDuplicate++;
                return false;
            }
        }

        return true;
    }

    private class SpawnStats
    {
        public int totalSpawned = 0;
        public int skippedOverlap = 0;
        public int skippedOutOfBounds = 0;
        public int skippedTwinDuplicate = 0;
    }

    #endregion
}