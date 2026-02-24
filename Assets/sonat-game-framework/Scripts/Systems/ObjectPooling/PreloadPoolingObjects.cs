using System.Collections.Generic;
using UnityEngine;

namespace SonatFramework.Scripts.Systems.ObjectPooling
{
    [CreateAssetMenu(fileName = "PreloadPoolingObjects", menuName = "Sonat Services/Pooling/Preload Pooling Service")]
    public class PreloadPoolingObjects : ScriptableObject
    {
        public List<string> objectsToPreload = new List<string>();
    }
}