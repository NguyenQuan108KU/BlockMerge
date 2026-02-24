using SonatFramework.Scripts.UIModule;
using SonatFramework.Systems.EventBus;

public abstract class TutorialPanelBase : Panel
{
    public override void OnSetup()
    {
        base.OnSetup();
        ignoreTracking = true;
        pauseGame = false;
    }

    public override void Open(UIData uiData)
    {
        base.Open(uiData);

        if (panelCanvasGroup != null)
        {
            panelCanvasGroup.interactable = false;
            panelCanvasGroup.blocksRaycasts = false;
        }

        OnTutorialStarted();
    }

    public override void OnOpenCompleted()
    {
        if (panelCanvasGroup != null)
        {
            panelCanvasGroup.interactable = false;
            panelCanvasGroup.blocksRaycasts = false;
        }
    }

    protected abstract void OnTutorialStarted();

    protected void CompleteTutorial()
    {
        EventBus<TutorialCompletedEvent>.Raise(
            new TutorialCompletedEvent { PanelKey = gameObject.name });
        Close();
    }
}