using System;
using System.Threading.Tasks;
using Sonat.Enums;
using SonatFramework.Systems.InventoryManagement.GameResources;
using UnityEngine;

public abstract class SonatCollectEffect
{
    public abstract Task Collect(GameResourceKey key, int quantity, Vector3 startPos, Vector3 endPos, Action<int> onFinishStep = null, Action callback = null);
}
