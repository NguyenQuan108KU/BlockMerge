using System;
using System.Collections;
using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Scripts.Systems.GamePlay;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using UnityEngine;

[CreateAssetMenu(fileName = "ComboServiceTime", menuName = "Sonat Services/Combo Service Time")]
public class ComboServiceTime : SonatServiceSo, IServiceInitialize
{
    [SerializeField] private List<int> comboTime;
    private int combo;
    public int Combo => combo;
    private Coroutine cooldownCoroutine;
    public Action OnComboChange;
    private GameplayService gameplayService;

    public void Initialize()
    {
        combo = 0;
        new EventBinding<LevelStartedEvent>(OnLevelStart);
        gameplayService = SonatSystem.GetService<GameplayService>();
    }

    private void OnLevelStart([Bridge.Ref] LevelStartedEvent eventData)
    {
        ResetCombo();
    }

    public void ResetCombo()
    {
        combo = 0;
        if (cooldownCoroutine != null)
        {
            StopCoroutine(cooldownCoroutine);
            cooldownCoroutine = null;
        }

        OnComboChange?.Invoke();
    }

    public int GetComboTime()
    {
        if (combo >= comboTime.Count) return comboTime[^1];
        return comboTime[combo];
    }

    public void AddCombo()
    {
        combo++;
        if (cooldownCoroutine != null)
        {
            StopCoroutine(cooldownCoroutine);
        }

        cooldownCoroutine = StartCoroutine(ComboCooldown());
        OnComboChange?.Invoke();
    }

    IEnumerator ComboCooldown()
    {
        float time = GetComboTime();
        while (time > 0)
        {
            if (gameplayService.CanCountTime())
                time -= Time.deltaTime;
            yield return null;
        }

        ResetCombo();
    }

    public Coroutine StartCoroutine(IEnumerator routine)
    {
        return SonatSystem.Instance.StartCoroutine(routine);
    }

    public void StopCoroutine(Coroutine routine)
    {
        SonatSystem.Instance.StopCoroutine(routine);
    }
}