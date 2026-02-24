using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using Sonat.Enums;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UINavigationItem : MonoBehaviour
{
    public NavigationType type;
    [SerializeField] protected Transform icon;
    [SerializeField] protected TMP_Text txtName;
    [SerializeField] protected LayoutElement layoutElement;
    [SerializeField] protected float selectFlexibleWidth = 1.8f;
    [SerializeField] protected float scaleSelected = 1.35f;
    protected UINavigateBarBase navigateBar;

    public virtual void InitData(UINavigateBarBase navigateSwipeBar)
    {
        this.navigateBar = navigateSwipeBar;
        txtName.gameObject.SetActive(false);
    }

    public virtual void OnClickThis()
    {
        navigateBar.SwitchTab(this.type);
    }

    public virtual void OnSelected()
    {
        icon.transform.DOKill();
        layoutElement.DOKill();
        icon.transform.DOScale(scaleSelected, 0.2f);
        layoutElement.DOFlexibleSize(new Vector2(selectFlexibleWidth, 1), 0.2f);
        txtName.gameObject.SetActive(true);
    }

    public virtual void OnDeselected()
    {
        icon.transform.DOKill();
        layoutElement.DOKill();
        icon.transform.DOScale(1, 0.2f);
        layoutElement.DOFlexibleSize(Vector3.one, 0.2f);
        txtName.gameObject.SetActive(false);
    }
}
