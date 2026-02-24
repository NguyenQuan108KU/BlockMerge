using System;
using System.Collections.Generic;
using System.Linq;
using Sonat.Enums;
using SonatFramework.Systems.ConfigManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;
using UnityEngine.Serialization;

namespace SonatFramework.Scripts.Feature.Shop
{
    [CreateAssetMenu(menuName = ("Sonat Configs/Shop Config"), fileName = "ShopConfig")]
    public class ShopConfig : ConfigSo
    {
        public List<ShopPack> packs;
    }
}