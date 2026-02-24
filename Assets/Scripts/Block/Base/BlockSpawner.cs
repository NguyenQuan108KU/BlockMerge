using Cysharp.Threading.Tasks;
using DG.Tweening;
using Difficulty;
using SonatFramework.Systems.EventBus;
using System.Collections.Generic;
using UnityEngine;

public class BlockSpawner : MonoBehaviour
{
    private ActiveBlockController activeBlock;
    private Transform towerContainer;
    private FloodSpawnTracker _floodTracker;

    private List<BlockShapeSO> spawnBag = new List<BlockShapeSO>();
    private int currentBagIndex;

    private BlockShapeSO nextShape;
    private Material nextMaterial;

    private TowerRotator _rotator;

    private bool useDifficultySystem = true;
    private bool isSpawning;
    public bool IsSpawning => isSpawning;
    private TowerHeightController _heightController;

    private Tween spawnTween;
    private EventBinding<UndoPerformedEvent> undoBinding;

    private void OnEnable()
    {
        undoBinding = new EventBinding<UndoPerformedEvent>(OnUndoPerformed);
    }

    private void OnDisable()
    {
        undoBinding?.Dispose();
    }

    #region Setup

    public void Initialize(ActiveBlockController blockRef, Transform containerRef, TowerRotator rotator)
    {
        activeBlock = blockRef;
        towerContainer = containerRef;
        _heightController = containerRef.GetComponent<TowerHeightController>();
        _rotator = rotator;
    }

    public void SetFloodTracker(FloodSpawnTracker tracker)
    {
        _floodTracker = tracker;
    }

    

    public void SetupSpawnerBag(List<BlockShapeSO> newBag)
    {
        spawnBag = new List<BlockShapeSO>(newBag);
        currentBagIndex = 0;
        PrepareNextBlockData().Forget();
    }

    public void Reset()
    {
        isSpawning = false;
        spawnTween?.Kill();
        nextShape = null;
        nextMaterial = null;
        spawnBag.Clear();
        currentBagIndex = 0;
        if (activeBlock != null) activeBlock.transform.DOKill();
    }

    public void Stop()
    {
        isSpawning = false;
        spawnTween?.Kill();
    }

    #endregion

    #region Spawning

    public void SpawnNextBlock() => SpawnNextBlockAsync().Forget();

    private async UniTaskVoid SpawnNextBlockAsync()
    {
        try
        {
            if (activeBlock == null) return;
            if (nextShape == null) await PrepareNextBlockData();
            if (nextShape == null) return;

            isSpawning = true;
            var config = GridManager.Instance.config;

            activeBlock.LogicY = config.spawnY;
            int currentFace = _rotator != null ? _rotator.TargetFaceIndex : 0;

            spawnTween?.Kill();
            activeBlock.transform.DOKill();

            activeBlock.blockID = GridManager.GetNextBlockID();
            activeBlock.InitializeShape(nextShape, currentFace);
            activeBlock.SetMaterial(nextMaterial);
            activeBlock.IsFloodBlock = _floodTracker?.ConsumeFloodFlag() ?? false;

            if (activeBlock.IsFloodBlock)
            {
                var floodMat = config.blockPalette?.floodMaterial;
                if (floodMat != null) activeBlock.SetMaterial(floodMat);
            }

            activeBlock.transform.localScale = Vector3.zero;
            activeBlock.UpdateVisuals(false);

            ApplyHeightCompensation();

            EventBus<BlockSpawnedEvent>.Raise(new BlockSpawnedEvent { BlockController = activeBlock });

            spawnTween = activeBlock.transform
                .DOScale(Vector3.one, 0.2f)
                .SetEase(Ease.OutBack);

            await spawnTween.AsyncWaitForCompletion();

            activeBlock.transform.localScale = Vector3.one;
            isSpawning = false;
            PrepareNextBlockData().Forget();
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Spawn Error: {e.Message}");
            isSpawning = false;
        }
    }

    #endregion

    #region Data Preparation

    private async UniTask PrepareNextBlockData()
    {
        var config = GridManager.Instance.config;

        if (useDifficultySystem && DifficultyManager.Instance != null && DifficultyManager.Instance.IsInitialized)
        {
            var result = DifficultyManager.Instance.GetNextShape();
            if (result != null && result.Shape != null)
            {
                nextShape = result.Shape;
                nextMaterial = config.blockPalette != null ? config.blockPalette.GetRandom() : null;
                NotifyNextBlock();
                return;
            }
        }

        if (spawnBag != null && spawnBag.Count > 0)
        {
            if (currentBagIndex >= spawnBag.Count) RefillBag();
            if (currentBagIndex < spawnBag.Count)
            {
                nextShape = spawnBag[currentBagIndex];
                currentBagIndex++;
                nextMaterial = config.blockPalette != null ? config.blockPalette.GetRandom() : null;
                NotifyNextBlock();
                return;
            }
        }

        Debug.LogWarning("Spawner: Out of shapes!");
        nextShape = null;
    }

    private void NotifyNextBlock()
    {
        EventBus<NextBlockUpdatedEvent>.Raise(new NextBlockUpdatedEvent
        {
            ShapeData = nextShape,
            BlockMaterial = nextMaterial
        });
    }

    private void RefillBag()
    {
        if (GameManager.Instance?.CurrentLevelData != null)
        {
            var newBag = GameManager.Instance.CurrentLevelData.GetSpawnableBag();
            if (newBag != null) spawnBag.AddRange(newBag);
        }
        if (currentBagIndex >= spawnBag.Count && spawnBag.Count > 0) currentBagIndex = 0;
    }

    #endregion

    #region Special Actions

    private void OnUndoPerformed(UndoPerformedEvent e)
    {
        if (e.RestoredShape != null)
        {
            SwapNextShape();
            RespawnSpecificShape(e.RestoredShape);
        }
    }

    public void RespawnSpecificShape(BlockShapeSO shape)
    {
        spawnTween?.Kill();
        activeBlock.transform.DOKill();

        float currentAngle = towerContainer.localEulerAngles.y;
        int currentFace = Mathf.RoundToInt(currentAngle / 90f);
        currentFace = (currentFace % 4 + 4) % 4;

        activeBlock.blockID = GridManager.GetNextBlockID();
        activeBlock.transform.localScale = Vector3.zero;
        activeBlock.InitializeShape(shape, currentFace);
        activeBlock.UpdateVisuals(false);

        ApplyHeightCompensation();

        EventBus<BlockSpawnedEvent>.Raise(new BlockSpawnedEvent { BlockController = activeBlock });

        spawnTween = activeBlock.transform
            .DOScale(Vector3.one, 0.2f)
            .SetEase(Ease.OutBack);
    }

    public void SwapNextShape() => PrepareNextBlockData().Forget();

    #endregion

    #region Height Compensation

    private void ApplyHeightCompensation()
    {
        if (_heightController != null)
        {
            activeBlock.VisualOffsetY = -_heightController.TargetOffset;
        }
    }

    #endregion
}