using System;
using UnityEngine;

namespace SonatFramework.Systems.ObjectPooling
{
    public interface IPoolingObject
    {
         Transform transform { get; }

         void Setup();
         void OnCreateObj(params object[] args);
         void OnReturnObj();
    }
}