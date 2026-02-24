using Sonat.Enums;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems.EventBus;
using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class PopupLose : LosePanelBase
{
    public new class Data : LosePanelBase.Data
    {
        public LoseReason reason;
        public bool canContinue;
        public Action onContinueClick;
    }

    [Header("=== UI References ===")]
    [SerializeField] private TMP_Text txtTitle;
    [SerializeField] private TMP_Text txtReason;
    [SerializeField] private Button btnAds;
    [SerializeField] private TMP_Text txtBtnAds;
    [SerializeField] private Button btnRetry;

    private Data _data;

    public override void Open(UIData uiData)
    {
        base.Open(uiData);
        _data = (Data)uiData;
        clicked = false;

        SetupTexts();
        SetupButtons();
    }

    private void SetupTexts()
    {
        if (txtTitle != null)
            txtTitle.text = "Almost!";

        if (txtReason != null)
        {
            txtReason.text = _data.reason switch
            {
                LoseReason.BlockOverflow => "Stack too high!",
                LoseReason.TimeOut => "Time's up!",
                _ => "Game Over!"
            };
        }

        if (txtBtnAds != null)
        {
            txtBtnAds.text = _data.reason switch
            {
                LoseReason.TimeOut => $"+{GameRemoteConfig.ContinueExtraTime} Seconds",
                LoseReason.BlockOverflow => $"Undo {GameRemoteConfig.ContinueUndoSteps} Steps",
                _ => "Watch Ad"
            };
        }
    }

    private void SetupButtons()
    {
        btnAds.onClick.RemoveAllListeners();
        btnAds.onClick.AddListener(OnWatchAdClick);

        if (btnRetry != null)
        {
            btnRetry.onClick.RemoveAllListeners();
            btnRetry.onClick.AddListener(OnRetryClick);
        }
    }

    private void OnWatchAdClick()
    {
        if (clicked) return;

        if (!_data.canContinue || !SonatSDKAdapter.IsRewardAdsReady())
        {
            PopupToast.Create("No video available!");
            return;
        }

        clicked = true;
        SonatSDKAdapter.ShowRewardAds(OnRewardedSuccess, "booster", "revive");
    }

    private void OnRewardedSuccess()
    {
        EventBus<LevelContinueEvent>.Raise(new LevelContinueEvent
        {
            by = _data.reason == LoseReason.TimeOut ? "rewarded_time" : "rewarded_undo"
        });

        Close();
        _data?.onContinueClick?.Invoke();
    }

    private void OnRetryClick()
    {
        if (clicked) return;

        if (GameAdsController.CanShowInterOnLose() && GameAdsController.CanShowInterByTimeGap())
        {
            bool showed = SonatSDKAdapter.ShowInterAds("lose", Retry);
            if (showed)
            {
                GameAdsController.RecordInterShown();
            }
            else
            {
                Retry();
            }
        }
        else
        {
            Retry();
        }
    }
}