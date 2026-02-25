using System;
using SonatFramework.Scripts.UIModule;
using UnityEngine;
using UnityEngine.EventSystems;
using Sonat.Enums;
public class PopupBoosterTutorial : Panel, IPointerClickHandler
{
    private const string PREF_KEY_PREFIX = "booster_tutorial_seen_";

    private Action _onCloseCallback;

    public override void Open(UIData uiData)
    {
        base.Open(uiData);

        if (uiData != null && uiData.TryGet<Action>("on_close", out var callback))
        {
            _onCloseCallback = callback;
        }
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        Close();
    }

    protected override void OnCloseCompleted()
    {
        _onCloseCallback?.Invoke();
        _onCloseCallback = null;
        base.OnCloseCompleted();
    }

    #region Static Helpers

    public static bool HasSeenTutorial(GameResource boosterType)
    {
        return PlayerPrefs.GetInt(GetPrefKey(boosterType), 0) == 1;
    }

    public static void SaveTutorialSeen(GameResource boosterType)
    {
        PlayerPrefs.SetInt(GetPrefKey(boosterType), 1);
        PlayerPrefs.Save();
    }

    private static string GetPrefKey(GameResource boosterType)
    {
        return $"{PREF_KEY_PREFIX}{boosterType}";
    }

    #endregion
}