using Sonat.Enums;
using SonatFramework.Systems.ConfigManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;

namespace SonatFramework.Scripts.Feature.Lives
{
    [CreateAssetMenu(fileName = "LivesConfig", menuName = "Sonat Configs/LivesConfig")]
    public class LivesConfig : ConfigSo
    {
        public int defaultMaxLives = 5;
        public int timeRefillLives = 1800;
        public int refillFree = 1;
        public CurrencyData refillPrice;
    }
}