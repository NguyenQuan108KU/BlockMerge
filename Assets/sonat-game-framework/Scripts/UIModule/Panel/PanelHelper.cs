
using System.Threading.Tasks;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule
{
    public static class PanelHelper
    {
        public static async Task CreateInstancePanel<T>(this T panel, UIData uiData = null, Transform container = null) where T : Panel
        {
            panel = await PanelManager.Instance.OpenPanelAsync<T>(uiData, container);
        }
        
        public static async Task CreateInstancePanelByName<T>(this T panel, string panelName, UIData uiData = null, Transform container = null) where T : Panel
        {
            panel = await PanelManager.Instance.OpenPanelByNameAsync<T>(panelName, uiData, container);
        }
    }
}