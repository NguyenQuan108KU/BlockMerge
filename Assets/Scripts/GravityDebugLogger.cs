using UnityEngine;
using System.IO;
using System.Text;

/// <summary>
/// Helper class để xuất gravity debug log ra file
/// Đặt script này vào scene (attach vào bất kỳ GameObject nào)
/// </summary>
public class GravityDebugLogger : MonoBehaviour
{
    private static GravityDebugLogger _instance;
    private StringBuilder _logBuilder = new StringBuilder();
    private string _logFilePath;
    private bool _isCapturing = false;

    [Header("Settings")]
    [Tooltip("Tự động bắt đầu capture khi Start")]
    public bool autoCaptureOnStart = true;

    [Header("Info (Read Only)")]
    [SerializeField] private string logPath;
    [SerializeField] private int logLineCount;

    private void Awake()
    {
        if (_instance != null)
        {
            Destroy(gameObject);
            return;
        }
        _instance = this;
        DontDestroyOnLoad(gameObject);

        // Tạo path cho log file
        _logFilePath = Path.Combine(Application.persistentDataPath, "gravity_debug.txt");
        logPath = _logFilePath;

        Debug.Log($"<color=cyan>[GravityDebugLogger] Log file path: {_logFilePath}</color>");
    }

    private void Start()
    {
        if (autoCaptureOnStart)
        {
            StartCapture();
        }
    }

    private void OnEnable()
    {
        Application.logMessageReceived += HandleLog;
    }

    private void OnDisable()
    {
        Application.logMessageReceived -= HandleLog;
    }

    private void OnDestroy()
    {
        // Tự động save khi destroy
        if (_logBuilder.Length > 0)
        {
            SaveToFile();
        }
    }

    private void HandleLog(string logString, string stackTrace, LogType type)
    {
        if (!_isCapturing) return;

        // Chỉ capture log liên quan đến Gravity debug
        if (logString.Contains("GRAVITY") ||
            logString.Contains("SimMap") ||
            logString.Contains("Block") ||
            logString.Contains("CLEAR") ||
            logString.Contains("MOVES") ||
            logString.Contains("Cell") ||
            logString.Contains("fallDist") ||
            logString.Contains("Processing") ||
            logString.Contains("canFall"))
        {
            // Loại bỏ color tags
            string cleanLog = RemoveColorTags(logString);
            _logBuilder.AppendLine(cleanLog);
            logLineCount = _logBuilder.ToString().Split('\n').Length;
        }
    }

    private string RemoveColorTags(string input)
    {
        // Remove <color=xxx> và </color>
        string result = System.Text.RegularExpressions.Regex.Replace(input, @"<color=[^>]+>", "");
        result = result.Replace("</color>", "");
        return result;
    }

    /// <summary>
    /// Bắt đầu capture log
    /// </summary>
    public void StartCapture()
    {
        _logBuilder.Clear();
        _logBuilder.AppendLine($"===== GRAVITY DEBUG LOG =====");
        _logBuilder.AppendLine($"Time: {System.DateTime.Now}");
        _logBuilder.AppendLine($"================================\n");
        _isCapturing = true;
        logLineCount = 0;

        Debug.Log("<color=green>[GravityDebugLogger] Started capturing...</color>");
    }

    /// <summary>
    /// Dừng capture và save ra file
    /// </summary>
    public void StopAndSave()
    {
        _isCapturing = false;

        if (_logBuilder.Length > 0)
        {
            SaveToFile();
            Debug.Log($"<color=green>[GravityDebugLogger] Saved {logLineCount} lines to: {_logFilePath}</color>");
        }
        else
        {
            Debug.Log("<color=yellow>[GravityDebugLogger] No log to save</color>");
        }
    }

    private void SaveToFile()
    {
        try
        {
            File.WriteAllText(_logFilePath, _logBuilder.ToString());
        }
        catch (System.Exception e)
        {
            Debug.LogError($"[GravityDebugLogger] Failed to save: {e.Message}");
        }
    }

    /// <summary>
    /// Mở folder chứa log file
    /// </summary>
    public void OpenLogFolder()
    {
        string folderPath = Application.persistentDataPath;

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN
        System.Diagnostics.Process.Start("explorer.exe", folderPath.Replace("/", "\\"));
#elif UNITY_EDITOR_OSX || UNITY_STANDALONE_OSX
        System.Diagnostics.Process.Start("open", folderPath);
#else
        Debug.Log($"Log folder: {folderPath}");
#endif
    }

    // ===== STATIC METHODS =====

    public static void BeginCapture() => _instance?.StartCapture();
    public static void EndCapture() => _instance?.StopAndSave();
    public static void OpenFolder() => _instance?.OpenLogFolder();
}


#if UNITY_EDITOR
/// <summary>
/// Custom Editor để thêm buttons
/// </summary>
[UnityEditor.CustomEditor(typeof(GravityDebugLogger))]
public class GravityDebugLoggerEditor : UnityEditor.Editor
{
    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        GravityDebugLogger logger = (GravityDebugLogger)target;

        UnityEditor.EditorGUILayout.Space(10);
        UnityEditor.EditorGUILayout.LabelField("Actions", UnityEditor.EditorStyles.boldLabel);

        if (GUILayout.Button("Start Capture", GUILayout.Height(30)))
        {
            logger.StartCapture();
        }

        if (GUILayout.Button("Stop & Save to File", GUILayout.Height(30)))
        {
            logger.StopAndSave();
        }

        UnityEditor.EditorGUILayout.Space(5);

        if (GUILayout.Button("Open Log Folder", GUILayout.Height(25)))
        {
            logger.OpenLogFolder();
        }
    }
}
#endif