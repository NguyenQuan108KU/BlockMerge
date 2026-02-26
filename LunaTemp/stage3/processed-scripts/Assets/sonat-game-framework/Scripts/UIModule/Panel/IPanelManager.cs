using UnityEngine;

namespace SonatFramework.Scripts.UIModule
{
    public interface IPanelManager
    {
         T OpenPanelByName<T>(string panelName, UIData uiData = null, Transform container = null) where T : View;

         T OpenPanel<T>(UIData uiData = null, Transform container = null) where T : View;

         void ClosePanel<T>(bool immediately = false) where T : View;

         void ReleasePanel(View panelClosed);
    }
}