using System;
using SonatFramework.Scripts.Feature.Shop.UI;
using SonatFramework.Scripts.UIModule;
using UnityEngine;

public class UIShopElement : MonoBehaviour
{
    public int priority;
    [SerializeField] protected UIShopPackBase[] shopPacks;
    [SerializeField] protected UITweenElement uiTweenElement;
    [SerializeField] protected float delayElementAnim = 0.1f;
    protected int index = 0;

    protected virtual void OnValidate()
    {
        if (shopPacks == null || shopPacks.Length == 0)
        {
            UIShopPackBase shopPackBase = gameObject.GetComponent<UIShopPackBase>();
            if (shopPackBase != null)
            {
                shopPacks = new[] { shopPackBase };
            }
        }
    }

    public virtual void SetIndex(int index)
    {
        this.index = index;
        if (uiTweenElement != null)
        {
            uiTweenElement.tweenData.config.delay = index * delayElementAnim;
        }
    }

    protected virtual void OnEnable()
    {
        if (uiTweenElement != null)
        {
            uiTweenElement.Play();
        }
    }

    public virtual void CheckContent()
    {
        if (shopPacks == null || shopPacks.Length == 0) return;
        foreach (var shopPack in shopPacks)
        {
            if (!shopPack.IsActive())
            {
                shopPack.gameObject.SetActive(false);
            }
        }
    }

    public virtual bool IsEmpty()
    {
        if (shopPacks == null || shopPacks.Length == 0) return true;
        foreach (var shopPack in shopPacks)
        {
            if (shopPack.IsActive())
            {
                return false;
            }
        }

        return true;
    }
}