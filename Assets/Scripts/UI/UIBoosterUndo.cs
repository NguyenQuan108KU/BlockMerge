using SonatFramework.Systems.EventBus;
using System.Threading.Tasks;
using UnityEngine;

public class UIBoosterUndo : UIBoosterIAABase
{
    private const string UNLOCK_KEY = "booster_unlocked_undo";

    private bool _hasUsedThisTurn;
    private bool _waitingFirstDrop;
    private EventBinding<BlockLandedEvent> _blockLandedBinding;

    protected override void OnEnable()
    {
        base.OnEnable();
        _blockLandedBinding = new EventBinding<BlockLandedEvent>(OnBlockLanded);
    }

    protected override void OnDisable()
    {
        _blockLandedBinding?.Dispose();
        _blockLandedBinding = null;
        base.OnDisable();
    }

    protected override void OnLevelReset()
    {
        _hasUsedThisTurn = false;
        _waitingFirstDrop = false;

        // Đã unlock vĩnh viễn → hiện luôn
        if (PlayerPrefs.GetInt(UNLOCK_KEY, 0) == 1) return;

        // Đúng level unlock, chưa unlock → ẩn, đợi first drop
        SetVisible(false);
        _waitingFirstDrop = true;
    }

    private void OnBlockLanded(BlockLandedEvent e)
    {
        _hasUsedThisTurn = false;

        if (!_waitingFirstDrop) return;
        _waitingFirstDrop = false;

        PlayerPrefs.SetInt(UNLOCK_KEY, 1);
        PlayerPrefs.Save();
        SetVisible(true);
    }

    #region Override Base

    protected override bool CanExecute()
    {
        if (_hasUsedThisTurn)
        {
            PopupToast.Create("You can't!");
            return false;
        }

        if (!GameHistorySystem.Instance.HasHistory())
            return false;

        return true;
    }

    protected override void OnCannotExecute() { }

    protected override async Task<bool> ExecuteBooster()
    {
        var history = GameHistorySystem.Instance;
        if (history == null) return false;

        var snapshot = history.PopLastSnapshot();
        if (snapshot == null) return false;

        var grid = GridManager.Instance;
        if (grid == null) return false;

        GameHistorySystem.RevertSnapshot(snapshot, grid);
        grid.RecalculateHeightsPublic();

        EventBus<UndoPerformedEvent>.Raise(new UndoPerformedEvent
        {
            RestoredShape = snapshot.shapeData
        });

        _hasUsedThisTurn = true;
        return await Task.FromResult(true);
    }

    #endregion
}
