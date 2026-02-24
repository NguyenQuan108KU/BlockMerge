using UnityEngine;
using UnityEngine.Events;

namespace SonatFramework.Scripts.Helper
{
    public class ColliderButton : MonoBehaviour
    {
        [SerializeField] private UnityEvent unityEvent;

        private void OnMouseUpAsButton()
        {
            unityEvent?.Invoke();
        }
    }
}
