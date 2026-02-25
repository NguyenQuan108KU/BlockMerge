using UnityEngine;
using Cysharp.Threading.Tasks;
using TMPro;
using DG.Tweening;

public class TimeManager : SingletonSimple<TimeManager>
{
    [Header("UI")]
    public TextMeshProUGUI textTimer;
    public GameObject warningImage;

    [Header("Settings")]
    public float startTime = 30f;
    public float timeWarning = 5f;

    private float currentTime;
    private bool isCounting = false;
    private bool hasStarted = false;

    private CanvasGroup warningCanvas;
    private Tween warningTween;

    private void Start()
    {
        currentTime = startTime;

        warningCanvas = warningImage.GetComponent<CanvasGroup>();
        if (warningCanvas == null)
            warningCanvas = warningImage.AddComponent<CanvasGroup>();

        warningCanvas.alpha = 0f;
        warningImage.SetActive(false);

        UpdateUI();
    }

    private void Update()
    {
        if (!hasStarted && Input.GetMouseButtonDown(0))
        {
            hasStarted = true;
            StartCountdown().Forget();
        }
    }

    public async UniTaskVoid StartCountdown()
    {
        isCounting = true;
        currentTime = startTime;

        while (currentTime > 0f && isCounting)
        {
            UpdateUI();

            if (currentTime <= timeWarning)
            {
                StartWarningEffect();
                AudioManager.Instance.PlaySFX(AudioManager.Instance.warning);
            }

            await UniTask.Delay(1000);
            currentTime--;
        }
        if (!isCounting)
            return;
        currentTime = 0;
        UpdateUI();
        isCounting = false;

        StopWarningEffect();

        GameManager.Instance.ecLose.SetActive(true);
        AudioManager.Instance.PlaySFX(AudioManager.Instance.gameLose);
    }

    private void StartWarningEffect()
    {
        if (warningTween != null) return;

        warningImage.SetActive(true);

        warningTween = warningCanvas
            .DOFade(1f, 0.4f)
            .SetLoops(-1, LoopType.Yoyo)
            .SetEase(Ease.InOutSine);
    }

    private void StopWarningEffect()
    {
        if (warningTween != null)
        {
            warningTween.Kill();
            warningTween = null;
        }

        warningCanvas.alpha = 0f;
        warningImage.SetActive(false);
    }

    private void UpdateUI()
    {
        int minutes = Mathf.FloorToInt(currentTime / 60);
        int seconds = Mathf.FloorToInt(currentTime % 60);
        textTimer.text = $"{minutes:00}:{seconds:00}";
    }

    public void StopTimer()
    {
        isCounting = false;
        StopWarningEffect();
    }
}