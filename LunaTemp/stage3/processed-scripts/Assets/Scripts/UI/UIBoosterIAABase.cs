using Sonat.Enums;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems.EventBus;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public abstract class UIBoosterIAABase : MonoBehaviour
{
    [Header("=== Config ===")]
    [SerializeField] protected int countPerLevel = 2;
    [SerializeField] protected GameResource boosterType;

    [Header("=== Unlock ===")]
    [SerializeField] protected int unlockLevel = 0;

    [Header("=== UI ===")]
    [SerializeField] protected Button button;
    [SerializeField] protected TMP_Text txtCount;
    [SerializeField] protected Image normalIcon;
    [SerializeField] protected Image adsIcon;

    protected int remainingCount;
    protected bool isExecuting;

    private CanvasGroup _canvasGroup;
    private bool _waitingFirstDrop;
    private EventBinding<LevelStartedEvent> _levelStartedBinding;

    #region Lifecycle

    protected virtual void OnEnable()
    {
        _canvasGroup = GetComponent<CanvasGroup>();
        _levelStartedBinding = new EventBinding<LevelStartedEvent>(OnLevelStarted);
        button?.onClick.AddListener(OnClick);

        if (unlockLevel > 0)
            SetVisible(false);
        else
            ResetCount();
    }

    protected virtual void OnDisable()
    {
        _levelStartedBinding?.Dispose();
        _levelStartedBinding = null;
        button?.onClick.RemoveListener(OnClick);
    }

    #endregion

    #region Visibility

    protected void SetVisible(bool visible)
    {
        if (_canvasGroup == null) return;
        _canvasGroup.alpha = visible ? 1f : 0f;
        _canvasGroup.interactable = visible;
        _canvasGroup.blocksRaycasts = visible;
    }

    #endregion

    #region Unlock + Level Reset

    private void OnLevelStarted([Bridge.Ref] LevelStartedEvent e)
    {
        if (unlockLevel > 0 && e.level < unlockLevel)
        {
            SetVisible(false);
            return;
        }

        SetVisible(true);
        ResetCount();
        OnLevelReset();
    }



    protected virtual void ResetCount()
    {
        remainingCount = countPerLevel;
        isExecuting = false;
        UpdateUI();
    }

    protected virtual void OnLevelReset() { }

    #endregion

    #region Click Flow

    private void OnClick()
    {
        if (isExecuting) return;

        if (!CanExecute())
        {
            OnCannotExecute();
            return;
        }

        if (remainingCount > 0)
            DoExecute();
        else
            RequestAd();
    }

    private async Task DoExecute()
    {
        isExecuting = true;

        bool success = await ExecuteBooster();
        if (success)
        {
            remainingCount--;
            UpdateUI();
            OnBoosterSuccess();
        }

        isExecuting = false;
    }

    private void RequestAd()
    {
        if (!SonatSDKAdapter.IsRewardAdsReady())
        {
            PopupToast.Create("No video available!");
            return;
        }

        SonatSDKAdapter.ShowRewardAds(() =>
        {
            remainingCount++;
            UpdateUI();
        }, "booster", boosterType.ToString());
    }

    #endregion

    #region Abstract / Virtual

    protected abstract Task<bool> ExecuteBooster();

    protected virtual bool CanExecute() => true;

    protected virtual void OnCannotExecute() { }

    protected virtual void OnBoosterSuccess()
    {
        EventBus<BoosterUsedEvent>.Raise(new BoosterUsedEvent
        {
            BoosterType = boosterType
        });
    }

    #endregion

    #region UI

    protected virtual void UpdateUI()
    {
        bool hasFreeUses = remainingCount > 0;

        if (txtCount != null)
        {
            txtCount.text = remainingCount.ToString();
            txtCount.gameObject.SetActive(hasFreeUses);
        }

        //if (normalIcon != null) normalIcon.gameObject.SetActive(hasFreeUses);
        if (adsIcon != null) adsIcon.gameObject.SetActive(!hasFreeUses);
    }

    #endregion
}