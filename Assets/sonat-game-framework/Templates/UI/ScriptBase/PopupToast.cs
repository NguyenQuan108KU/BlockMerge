using DG.Tweening;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;

public class PopupToast : Panel
{
    private static PopupToast popupToast;
    private readonly Service<PoolingContainerService> poolingContainer = new();
    private static bool isCreatingPopupToast;

    public static void Create(string content, string param = null)
    {
        if (isCreatingPopupToast) return;
        if (popupToast == null || !popupToast.gameObject.activeInHierarchy)
        {
            isCreatingPopupToast = true;
            UIData uIData = new UIData();
            uIData.Add("content", content);
            uIData.Add("param", param);
            PanelManager.Instance.OpenPanelAsync<PopupToast>(OnCreatedPopupToast, uIData).Forget();
        }
        else
        {
            popupToast.transform.SetAsLastSibling();
            popupToast.AddToast(content, param);
        }
    }

    private static void OnCreatedPopupToast(PopupToast toast)
    {
        popupToast = toast;
        isCreatingPopupToast = false;
    }

    public Transform container;

    public override void Open(UIData uIData)
    {
        base.Open(uIData);
        poolingContainer.Instance.CleanContainer(container);
        string content = uiData.Get<string>("content");
        string param = uiData.Get<string>("param");
        AddToast(content, param);
    }


    public void AddToast(string content, string param = null)
    {
        UIToastItem toast = poolingContainer.Instance.CreateObject<UIToastItem>(container);
        toast.SetData(content, param);
        DOVirtual.DelayedCall(1.25f, () => toast.gameObject.SetActive(false));
        DOTween.Kill("toast_dismiss");
        DOVirtual.DelayedCall(1.35f, () => Close()).SetId("toast_dismiss");
    }
}