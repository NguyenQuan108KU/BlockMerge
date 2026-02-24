using System;
using UnityEngine;

namespace SonatFramework.Systems.ConfigManagement
{
    public interface IConfig
    {
    }

    [Serializable]
    public class ConfigSo : ScriptableObject, IConfig
    {
    }
}