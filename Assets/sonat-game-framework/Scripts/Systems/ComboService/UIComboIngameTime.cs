using System;
using System.Collections;
using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Scripts.Helper;
using SonatFramework.Scripts.Systems.GamePlay;
using SonatFramework.Systems;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UIComboIngameTime : MonoBehaviour
{
    private ComboServiceTime comboServiceTime;
    [SerializeField] private Slider slider;
    [SerializeField] private TMP_Text txtCombo;
    [SerializeField] private GameObject mainObject;
    [SerializeField] private ParticleSystem blastEffect;
    [SerializeField] private LayoutElement layoutElement;
    private int combo;
    private Coroutine cooldownCoroutine;

    private void Awake()
    {
        comboServiceTime = SonatSystem.GetService<ComboServiceTime>();
    }

    private void OnEnable()
    {
        comboServiceTime.OnComboChange += OnComboUpdate;
        OnComboUpdate();
    }

    private void OnDisable()
    {
        comboServiceTime.OnComboChange -= OnComboUpdate;
    }

    private void OnComboUpdate()
    {
        combo = comboServiceTime.Combo;
        if (combo < 1)
        {
            mainObject.SetActive(false);
            layoutElement.ignoreLayout = true;
            if (cooldownCoroutine != null)
            {
                StopCoroutine(cooldownCoroutine);
                cooldownCoroutine = null;
            }
        }
        else
        {
            mainObject.SetActive(true);
            layoutElement.ignoreLayout = false;
            blastEffect.gameObject.SetActive(true);
            blastEffect.Play();
            txtCombo.SetLocalizeParam("VALUE", combo.ToString());
            if (cooldownCoroutine != null)
            {
                StopCoroutine(cooldownCoroutine);
            }

            cooldownCoroutine = StartCoroutine(ComboCooldown());
        }
    }

    IEnumerator ComboCooldown()
    {
        float maxTime = comboServiceTime.GetComboTime();
        float time = maxTime;
        while (time > 0)
        {
            if (SonatSystem.GetService<GameplayService>().GetGameState() == GameState.Playing)
            {
                time -= Time.deltaTime;
                slider.value = time / maxTime;
            }

            yield return null;
        }
    }
}