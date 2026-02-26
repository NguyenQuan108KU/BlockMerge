using System;
using System.Collections;
using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Systems.ConfigManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;
using UnityEngine.Serialization;

[CreateAssetMenu(fileName = "StarChestConfig", menuName = "Sonat Configs/Star Chest Config", order = 1)]
public class StarChestConfig : ConfigSo
{
    [SerializeField] protected List<StarChest> starChests;

    public virtual StarChest GetStarChest(int milestone)
    {
        if (milestone >= starChests.Count)
        {
            return starChests[starChests.Count - 1];
        }
        return starChests[milestone];
    }
}
[Serializable]
public class StarChest
{
    public int starRequire;
    public RewardData reward;
}
