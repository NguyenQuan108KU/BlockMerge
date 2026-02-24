using DG.Tweening;
using SonatFramework.Systems.EventBus;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class GameHUD : MonoBehaviour
{
    [Header("References")]
    [SerializeField] private TextMeshProUGUI levelText;
    [SerializeField] private TextMeshProUGUI scoreText;

    [Header("Score Bar (Image Filled)")]
    [SerializeField] private Image scoreFillImage;

    private EventBinding<ScoreUpdatedEvent> scoreBinding;
    private EventBinding<LevelChangedEvent> levelBinding;

    private void OnEnable()
    {
        scoreBinding = new EventBinding<ScoreUpdatedEvent>(OnScoreUpdated, true);
        levelBinding = new EventBinding<LevelChangedEvent>(OnLevelChanged, true);
    }

    private void OnDisable()
    {
        scoreBinding?.Dispose();
        levelBinding?.Dispose();
    }

    private void OnScoreUpdated(ScoreUpdatedEvent e)
    {
        int current = e.CurrentScore;
        int target = e.TargetScore;

        if (scoreFillImage)
        {
            float ratio = (target > 0) ? (float)current / target : 0f;
            ratio = Mathf.Clamp01(ratio);
            scoreFillImage.DOKill();
            scoreFillImage.DOFillAmount(ratio, 0.5f);
        }

        if (scoreText) scoreText.text = $"{current}/{target}";
    }

    private void OnLevelChanged(LevelChangedEvent e)
    {
        if (levelText == null || string.IsNullOrEmpty(e.LevelName)) return;
        string num = System.Text.RegularExpressions.Regex.Match(e.LevelName, @"\d+").Value;
        levelText.text = num;
    }
}