using System.Collections.Generic;

public class FloodGroupRegistry
{
    private enum GroupState { Intact, Broken }

    private class GroupData
    {
        public int OriginBlockID;
        public HashSet<int> AllBlockIDs;
        public GroupState State;
    }

    private readonly Dictionary<int, GroupData> _blockToGroup = new();

    #region Registration

    public void Register(int originBlockID, List<int> floodBlockIDs)
    {
        if (floodBlockIDs == null || floodBlockIDs.Count == 0) return;

        var group = new GroupData
        {
            OriginBlockID = originBlockID,
            AllBlockIDs = new HashSet<int>(floodBlockIDs.Count + 1) { originBlockID },
            State = GroupState.Intact
        };

        foreach (int id in floodBlockIDs)
            group.AllBlockIDs.Add(id);

        foreach (int id in group.AllBlockIDs)
            _blockToGroup[id] = group;
    }

    #endregion

    #region Group Break (Row Clear)


    public List<int> BreakGroup(int blockID)
    {
        if (!_blockToGroup.TryGetValue(blockID, out var group)) return null;
        if (group.State == GroupState.Broken) return null;

        group.State = GroupState.Broken;

        var othersToRevert = new List<int>(group.AllBlockIDs.Count);
        foreach (int id in group.AllBlockIDs)
        {
            if (id != blockID) othersToRevert.Add(id);
        }

        return othersToRevert;
    }

    #endregion

    #region Undo Support


    public HashSet<int> GetIntactGroupIDs(int blockID)
    {
        if (!_blockToGroup.TryGetValue(blockID, out var group)) return null;
        if (group.State != GroupState.Intact) return null;

        return group.AllBlockIDs;
    }


    public void RemoveGroup(int blockID)
    {
        if (!_blockToGroup.TryGetValue(blockID, out var group)) return;

        foreach (int id in group.AllBlockIDs)
            _blockToGroup.Remove(id);
    }

    #endregion

    #region Query

    public bool IsFloodBlock(int blockID) => _blockToGroup.ContainsKey(blockID);

    #endregion

    #region Lifecycle

    public void Clear() => _blockToGroup.Clear();

    #endregion
}