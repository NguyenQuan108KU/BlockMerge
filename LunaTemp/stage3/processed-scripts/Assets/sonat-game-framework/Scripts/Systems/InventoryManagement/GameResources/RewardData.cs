using System;
using System.Collections.Generic;
using JetBrains.Annotations;
using Sirenix.Serialization;
using Sonat.Enums;
using SonatFramework.Systems.TimeManagement;

namespace SonatFramework.Systems.InventoryManagement.GameResources
{
    [Serializable]
    public class RewardData
    {
        public List<ResourceData> resourceUnits;

        public void AddReward(ResourceData resourceUnit)
        {
            if (resourceUnits == null) resourceUnits = new System.Collections.Generic.List<SonatFramework.Systems.InventoryManagement.GameResources.ResourceData>();
            int index = resourceUnits.FindIndex(e => e.Key == resourceUnit.Key);
            if (index < 0) resourceUnits.Add(resourceUnit);
            else resourceUnits[index].Add(resourceUnit);
        }

        public void MultiplyReward(int multiplier)
        {
            if (resourceUnits == null) return;
            foreach (var resourceUnit in resourceUnits)
            {
                resourceUnit.Multiply(multiplier);
            }
        }
    }
    
}