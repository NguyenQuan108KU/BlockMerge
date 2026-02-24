using UnityEngine;
using UnityEngine.UI;

public class EmojiSlot : MonoBehaviour
{
    [SerializeField] private GameObject emojiPrefab;

    private Image _placeholder;
    private GameObject _instance;

    private void Awake()
    {
        _placeholder = GetComponent<Image>();
    }

    private void OnEnable()
    {
        if (_placeholder != null)
            _placeholder.enabled = false;

        SpawnEmoji();
    }

    private void OnDisable()
    {
        DestroyEmoji();

        if (_placeholder != null)
            _placeholder.enabled = true;
    }

    private void SpawnEmoji()
    {
        if (emojiPrefab == null || _instance != null) return;

        _instance = Instantiate(emojiPrefab, transform);

        var rt = _instance.GetComponent<RectTransform>();
        if (rt != null)
        {
            rt.anchoredPosition = Vector2.zero;
            rt.localScale = Vector3.one;
        }
    }

    private void DestroyEmoji()
    {
        if (_instance == null) return;

        Destroy(_instance);
        _instance = null;
    }
}