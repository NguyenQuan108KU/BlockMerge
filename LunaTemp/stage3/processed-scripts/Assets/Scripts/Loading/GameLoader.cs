using DG.Tweening;
using Sonat;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.SceneManagement;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.UI;

public class GameLoader : MonoBehaviour
{
    #region Serialized Fields

    [Header("Panels")]
    [SerializeField] private CanvasGroup panelGameLoading;
    [SerializeField] private CanvasGroup panelSplash;

    [Header("Progress Bars")]
    [SerializeField] private Image loadingFillImage;
    [SerializeField] private Image splashFillImage;

    [Header("Preload Settings")]
    [SerializeField] private int blockPrewarmCount = 60;
    [SerializeField] private int vfxPrewarmCount = 10;

    [Header("Timing")]
    [SerializeField] private float crossfadeDuration = 0.3f;
    [SerializeField] private float splashHoldDuration = 1.5f;
    [SerializeField] private float fadeOutDuration = 0.3f;

    #endregion

    #region Private Fields

    private readonly Service<SceneService> _sceneService = new Service<SceneService>();
    private bool _isSdkReady;

    #endregion

    #region Unity Lifecycle

    private void Start()
    {
        Application.targetFrameRate = 60;
        QualitySettings.vSyncCount = 0;

        //SonatSdkManager.Initialize(() => _isSdkReady = true);
        RunLoadingSequence();
    }

    #endregion

    #region Main Sequence

    private async Task RunLoadingSequence()
    {
        // ── Init panels ──
        SetCanvasGroup(panelGameLoading, 0f);
        SetCanvasGroup(panelSplash, 0f);
        SetFill(loadingFillImage, 0f);
        SetFill(splashFillImage, 0f);

        //  PHASE 1: Game Loading
        //  SDK init (bao gồm Remote Config) → Preload
        panelGameLoading.gameObject.SetActive(true);
        panelSplash.gameObject.SetActive(false);

        //await panelGameLoading
        //    .DOFade(1f, 0.3f)
        //    .SetEase(Ease.OutCubic)
        //    .AsyncWaitForCompletion();

        var loadingBar = new SmoothProgress(loadingFillImage);

        // SDK init (Remote Config tự fetch bên trong)
        //await Task.WaitUntil(() => _isSdkReady);
        loadingBar.Target = 0.25f;

        // Preload game assets
        await PoolingPrewarmHelper.PrewarmAsync<BlockVisual>("Block_1x1", blockPrewarmCount);
        loadingBar.Target = 0.6f;

        await PoolingPrewarmHelper.PrewarmAsync<DualDirectionEffect>("VFX_BlockBreak_Dual", vfxPrewarmCount);
        loadingBar.Target = 1f;

        // Chờ progress bar fill đầy visual
        await loadingBar.WaitUntilFull();

        //  CROSSFADE: Loading → Splash
        panelSplash.gameObject.SetActive(true);
        SetCanvasGroup(panelSplash, 0f);

        var fadeOut = panelGameLoading
            .DOFade(0f, crossfadeDuration)
            .SetEase(Ease.InCubic);
        var fadeIn = panelSplash
            .DOFade(1f, crossfadeDuration)
            .SetEase(Ease.OutCubic);

        //await UniTask.WhenAll(
        //    fadeOut.AsyncWaitForCompletion().AsUniTask(),
        //    fadeIn.AsyncWaitForCompletion().AsUniTask()
        //);

        panelGameLoading.gameObject.SetActive(false);

        //  PHASE 2: Splash (Branding)
        //  Logo + hình game + progress → vào game
        var splashBar = new SmoothProgress(splashFillImage);

        float elapsed = 0f;
        while (elapsed < splashHoldDuration)
        {
            elapsed += Time.deltaTime;
            splashBar.Target = Mathf.Clamp01(elapsed / splashHoldDuration);
            //await UniTask.Yield();
        }

        splashBar.Target = 1f;
        await splashBar.WaitUntilFull();

        //  TRANSITION → Gameplay
        panelSplash
            .DOFade(0f, fadeOutDuration)
            .SetEase(Ease.InCubic);

        DOTween.KillAll();
        _sceneService.Instance.SwitchScene(GamePlacement.Gameplay);
    }

    #endregion

    #region SmoothProgress

    private class SmoothProgress
    {
        public float Target;

        private readonly Image _fillImage;
        private float _display;

        public SmoothProgress(Image fillImage)
        {
            _fillImage = fillImage;
            _display = 0f;
            Target = 0f;
            RunLoop();
        }

        private async Task RunLoop()
        {
            //while (_display < 1f)
            //{
            //    Tick();
            //    await Task.Yield();
            //}
        }

        private void Tick()
        {
            _display = Mathf.Lerp(_display, Target, Time.deltaTime * 5f);

            if (Target >= 1f && _display > 0.98f)
                _display = 1f;

            if (_fillImage != null)
                _fillImage.fillAmount = _display;
        }

        public async Task WaitUntilFull()
        {
            //while (_display < 0.99f)
            //    await Task.Yield();
        }
    }

    #endregion

    #region Helpers

    private void SetCanvasGroup(CanvasGroup cg, float alpha)
    {
        if (cg != null) cg.alpha = alpha;
    }

    private void SetFill(Image image, float value)
    {
        if (image != null) image.fillAmount = value;
    }

    #endregion
}