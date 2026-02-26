using System.Collections.Generic;
using System.Linq;
using Sonat.Enums;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule.UIElements
{
    public class UIResourceBar : MonoBehaviour
    {
        private static readonly List<UIResourceBar> resourceBars = new List<UIResourceBar>();
        [SerializeField] private Transform container;
        [SerializeField] private List<UICurrency> uiCurrencies;
        [SerializeField] private bool hideOnLostFocus = true;

        public static UIResourceBar Main
        {
            get
            {
                if (resourceBars != null && resourceBars.Count > 0)
                {
                    return resourceBars[resourceBars.Count - 1];
                }

                return null;
            }
        }

        public void OnEnable()
        {
            Main?.OnLostFocus();
            resourceBars.Add(this);
            OnFocus();
        }

        private void OnDisable()
        {
            resourceBars.Remove(this);
            Main?.OnFocus();
        }

        protected virtual void OnFocus()
        {
            container.gameObject.SetActive(true);
        }

        protected virtual void OnLostFocus()
        {
            if (hideOnLostFocus)
                container.gameObject.SetActive(false);
        }

        public UICurrency GetUICurrency(GameResource currency)
        {
            return uiCurrencies.FirstOrDefault(e => e.resource == currency);
        }
    }
}