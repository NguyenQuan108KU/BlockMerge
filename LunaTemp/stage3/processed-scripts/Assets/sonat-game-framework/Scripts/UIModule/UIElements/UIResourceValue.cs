using System;
using System.Collections;
using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Scripts.UIModule.UIElements;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using TMPro;
using UnityEngine;
using UnityEngine.Serialization;

public class UIResourceValue : MonoBehaviour
{
    [SerializeField] private GameResource resource;
    [SerializeField] private TMP_Text txtQuantity;
    [SerializeField] private UITimeCounter uiTimeCounter;
    private ResourceData resourceData;

    private void Awake()
    {
        resourceData = SonatSystem.GetService<InventoryService>().GetResource(resource.ToGameResourceKey());
    }

    public virtual void OnEnable()
    {
        OnResourceUpdate();
        resourceData.onUpdate += OnResourceUpdate;
    }

    protected virtual void OnDisable()
    {
        resourceData.onUpdate -= OnResourceUpdate;
    }


    protected virtual void OnResourceUpdate()
    {
        if (txtQuantity != null)
            txtQuantity.text = resourceData.quantity.ToString();
        if (uiTimeCounter != null)
        {
            uiTimeCounter.SetData(resourceData.GetRemainingTime(), null);
        }
    }
}