using System.Threading.Tasks;
using UnityEngine;

namespace SonatFramework.Scripts.UIModule
{
    public interface IPanelAsyncManager
    {
        public void OpenForget<T>(UIData uiData = null, Transform container = null) where T : View;

        public Task<T> OpenPanelByNameAsync<T>(string panelName, UIData uiData = null, Transform container = null)
            where T : View;

        public Task<T> OpenPanelAsync<T>(UIData uiData = null, Transform container = null) where T : View;

        public Task ClosePanelAsync<T>(bool immediately = false, bool waitCloseCompleted = false) where T : View;

        public void ReleasePanel(View panelClosed);
    }
}