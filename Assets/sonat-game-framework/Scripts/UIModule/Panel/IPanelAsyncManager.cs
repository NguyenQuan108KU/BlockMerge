using System.Threading.Tasks;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule
{
    public interface IPanelAsyncManager
    {
         void OpenForget<T>(UIData uiData = null, Transform container = null) where T : View;

         Task<T> OpenPanelByNameAsync<T>(string panelName, UIData uiData = null, Transform container = null)
            where T : View;

         Task<T> OpenPanelAsync<T>(UIData uiData = null, Transform container = null) where T : View;

         Task ClosePanelAsync<T>(bool immediately = false, bool waitCloseCompleted = false) where T : View;

         void ReleasePanel(View panelClosed);
    }
}