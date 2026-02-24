using System;
using System.Collections.Generic;
using System.Linq;
using Sirenix.OdinInspector;
using Sonat.Enums;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;
using UnityEngine.Serialization;

namespace SonatFramework.Scripts.Feature.Shop
{
    [CreateAssetMenu(menuName = ("Sonat Configs/Shop Config/Pack Data"), fileName = "ShopPack")]
    public class ShopPack : ScriptableObject
    {
        public bool active = true;
        public ShopItemKey key;
        public int memberShip;
        public ShopPackData packData;
        public bool oneTimePurchase;
        [SerializeField] private int group;
        public int Group => group > 0 ? group : (int)key;
    }

    [Serializable]
    public class ShopPackData
    {
        public List<ShopResourceItemData> resourceUnits;

        public RewardData GetRewardData()
        {
            return new RewardData()
            {
                resourceUnits = resourceUnits.Select(e => (ResourceData)e).ToList()
            };
        }
    }

    [Serializable]
    public class ShopResourceItemData : ResourceData
    {
        [FoldoutGroup("@gameResource")] public bool nonConsumable;
    }
}