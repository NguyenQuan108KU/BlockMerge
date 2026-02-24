using UnityEngine;
using DG.Tweening;
using SonatFramework.Systems.ConfigManagement;


[CreateAssetMenu(fileName = "GameConfig", menuName = "TowerStack/Game Config")]
public class GameConfig : GameConfigBase
{

    #region Tower Height Auto-Adjust

    [Header("═══ TOWER HEIGHT SETTINGS ═══")]
    [Tooltip("Row bắt đầu hạ tower (face cao hơn giá trị này mới hạ)")]
    public int towerHeightThreshold = 4;

    [Tooltip("Tỉ lệ hạ (0.5 = chỉ hạ 50% so với tính toán)")]
    [Range(0.1f, 1f)]
    public float towerHeightRatio = 0.5f;

    [Tooltip("Duration hạ tower khi block drop")]
    public float towerDropAdjustDuration = 0.15f;

    [Tooltip("Duration nâng/hạ tower thông thường (clear row, xoay)")]
    public float towerHeightSmoothDuration = 0.15f;

    [Tooltip("Ease nâng/hạ tower")]
    public Ease towerHeightEase = Ease.OutQuad;

    [Range(0.1f, 1f)]
    [Tooltip("Thời gian chờ trước khi bắt đầu edge scroll (giây)")]
    public float edgeRotateDelay = 0.4f;

    #endregion

    #region Input Settings

    [Header("═══ INPUT SETTINGS ═══")]
    [Tooltip("Thời gian giữ để drop block")]
    public float dragHoldTime = 0.3f;

    [Tooltip("Độ nhạy kéo block")]
    public float blockDragSensitivity = 0.01f;

    [Tooltip("Sử dụng absolute positioning")]
    public bool useAbsolutePositioning = true;

    [Range(0f, 0.5f)]
    [Tooltip("Smoothing cho absolute position")]
    public float absolutePositionSmoothing = 0.1f;

    [Header("Edge Scroll")]
    [Range(0.05f, 0.2f)]
    [Tooltip("Vùng edge để scroll (% màn hình)")]
    public float edgeScrollThreshold = 0.12f;

    [Range(1f, 20f)]
    [Tooltip("Tốc độ edge scroll")]
    public float edgeScrollSpeed = 8f;

    #endregion

    #region Tower Settings

    [Header("═══ TOWER SETTINGS ═══")]
    [Tooltip("Smooth time cơ bản")]
    public float baseSmoothTime = 0.3f;

    [Tooltip("Smooth time nhanh")]
    public float fastSmoothTime = 0.1f;

    [Tooltip("Góc deadzone")]
    public float deadzoneAngle = 15f;

    [Header("Button Rotate")]
    [Tooltip("Duration xoay bằng button")]
    public float buttonRotateDuration = 0.5f;

    [Tooltip("Ease xoay button")]
    public Ease buttonRotateEase = Ease.OutQuad;

    [Header("Tower Snap")]
    [Tooltip("Duration snap tower")]
    public float towerSnapDuration = 0.3f;

    [Tooltip("Ease snap tower")]
    public Ease towerSnapEase = Ease.OutBack;

    #endregion

    #region Block Settings

    [Header("═══ BLOCK SETTINGS ═══")]
    [Tooltip("Duration drop block")]
    public float dropDuration = 0.3f;

    [Tooltip("Ease drop block")]
    public Ease dropEase = Ease.InQuad;

    [Tooltip("Palette chứa materials cho block")]
    public BlockPaletteSO blockPalette;

    [Tooltip("Alpha của ghost block")]
    public float ghostAlpha = 0.4f;

    #endregion

    #region Grid Settings

    [Header("═══ GRID SETTINGS ═══")]
    [Tooltip("Chiều rộng mỗi mặt tower")]
    public int faceWidth = 6;

    [Tooltip("Chiều cao grid")]
    public int height = 12;

    [Tooltip("Kích thước mỗi ô")]
    public float tileSize = 1f;

    [Tooltip("Vị trí Y spawn block")]
    public int spawnY = 9;

    #endregion

    #region Score Settings (Merged from GameScoreConfigSO)

    [Header("═══ SCORE SETTINGS ═══")]
    [Tooltip("Điểm cho 1 line")]
    public int score1Line = 10;

    [Tooltip("Điểm cho 2 lines")]
    public int score2Lines = 10;

    [Tooltip("Điểm cho 3 lines")]
    public int score3Lines = 20;

    [Tooltip("Điểm cho 4 lines")]
    public int score4Lines = 30;
    [Tooltip("Điểm mỗi hàng (dùng khi không có bonus)")]
    public int pointsPerRow = 10;

    [Tooltip("Bật tính bonus khi ăn nhiều hàng cùng lúc")]
    public bool useMultiLineBonus = false;

    [Tooltip("Hệ số nhân cho multi-line")]
    public float multiLineMultiplier = 1.25f;

    #endregion

    #region Game Rules

    [Header("═══ GAME RULES ═══")]
    [Tooltip("Chiều cao tối đa trước game over")]
    public int maxHeight = 9;

    [Tooltip("Ngưỡng cảnh báo (số hàng trước max)")]
    public int warningThreshold = 3;

    #endregion

    #region Level System

    [Header("═══ LEVEL SYSTEM ═══")]
    [Tooltip("Tổng số level trong game")]
    public int totalLevelCount = 20;

    #endregion

    #region Limit Line Visuals

    [Header("═══ LIMIT LINE VISUALS ═══")]
    [Tooltip("Màu cảnh báo")]
    public Color warningColor = new Color(1, 0, 0, 0.4f);

    [Tooltip("Màu game over")]
    public Color gameOverColor = new Color(1, 0, 0, 0.9f);

    [Tooltip("Duration pulse effect")]
    public float pulseDuration = 1f;

    #endregion

    #region Computed Properties

    public int Perimeter => faceWidth * 4;

    public float GridRadius => (faceWidth * tileSize) / 2f - 0.5f;

    #endregion


    #region Level Sync

    // [TIER2] Backup giá trị gốc của SO để restore khi exit Play Mode
#if UNITY_EDITOR
    [System.NonSerialized] private int _editorBackup_faceWidth;
    [System.NonSerialized] private bool _hasBackup = false;

    private void OnEnable()
    {
        // Lưu giá trị gốc khi SO được load lần đầu
        if (!_hasBackup)
        {
            _editorBackup_faceWidth = faceWidth;
            _hasBackup = true;
        }
    }

    private void OnDisable()
    {
        // Restore giá trị gốc khi exit Play Mode — tránh SO bị dirty
        if (_hasBackup)
        {
            faceWidth = _editorBackup_faceWidth;
            _hasBackup = false;
        }
    }
#endif

    public void SyncFromLevelData(LevelDataSO levelData)
    {
        if (levelData != null && levelData.levelWidth > 0)
        {
            this.faceWidth = levelData.levelWidth;
            Debug.Log($"[GameConfig] Synced faceWidth = {faceWidth} from level: {levelData.displayName}");
        }
    }

    /// <summary>
    /// Reset về giá trị mặc định
    /// </summary>
    public void ResetToDefault()
    {
        this.faceWidth = 6;
    }

    #endregion
}