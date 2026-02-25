using System;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.UIModule;
using UnityEngine;
using UnityEngine.EventSystems;

public class PopupWin : Panel, IPointerClickHandler
{
    public class Data : UIData
    {
        public int level;
        public Action nextLevel;
    }

    private Data _data;
    private bool _clicked;
    private bool _nativeShown;

    public override void Open(UIData uiData)
    {
        base.Open(uiData);
        _data = (Data)uiData;
        _clicked = false;
        _nativeShown = false;

        TryShowNativeBanner();
    }

    public override void Close()
    {
        HideNativeBanner();
        base.Close();
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        if (_clicked) return;
        _clicked = true;

        if (GameAdsController.CanShowInterByTimeGap())
        {
            SonatSDKAdapter.ShowInterAds("win", GoNextLevel);
            GameAdsController.RecordInterShown();
        }
        else
        {
            GoNextLevel();
        }
    }

    private void TryShowNativeBanner()
    {
        if (_data.level < GameRemoteConfig.LevelStartShowNativeBanner) return;
        if (!SonatSDKAdapter.IsNativeAdsReady()) return;

        SonatSDKAdapter.ShowNativeAds();
        _nativeShown = true;
    }

    private void HideNativeBanner()
    {
        if (!_nativeShown) return;
        SonatSDKAdapter.HideNavtiveAds();
        _nativeShown = false;
    }

    private void GoNextLevel()
    {
        Close();
        _data?.nextLevel?.Invoke();
    }
}