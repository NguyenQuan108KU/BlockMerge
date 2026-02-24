using System;
using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Systems.ConfigManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;
using UnityEngine.Serialization;

namespace SonatFramework.Systems.BoosterManagement
{
    [CreateAssetMenu(fileName = "BoostersConfig", menuName = "Sonat Configs/BoostersConfig", order = 1)]
    public class BoostersConfig : ConfigSo
    {
        public List<BoosterConfig> configs;
    }

    [Serializable]
    public class BoosterConfig
    {
        public GameResource booster;
        public int levelUnlock;
        public CurrencyData price;
        public int defaultValue;
        public int packValue = 1;
    }
}