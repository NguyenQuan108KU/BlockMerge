using System;
using UnityEngine;

#if UNITY_EDITOR
[ExecuteAlways]
#endif
public class ScaleToScreen : MonoBehaviour
{
    RectTransform rect;
    RectTransform parent;

    [SerializeField] private float DESIGN_W = 1084f;
    [SerializeField] private float DESIGN_H = 2404f;

    void Awake()
    {
        Init();
    }

    private void Start()
    {
        ApplyScale();
    }

#if UNITY_EDITOR
    void Update()
    {
        if (!Application.isPlaying)
        {
            ApplyScale();
        }
    }
#endif

    void Init()
    {
        if (rect == null)
            rect = GetComponent<RectTransform>();

        if (parent == null)
            parent = transform.parent.GetComponent<RectTransform>();
    }

    void ApplyScale()
    {
        if (rect == null || parent == null)
            return;

        float screenW = parent.rect.width;
        float screenH = parent.rect.height;

        // Scale the UI based on the limiting dimension
        float scaleW = screenW / DESIGN_W;
        float scaleH = screenH / DESIGN_H;

        float finalScale = Mathf.Max(scaleW, scaleH);

        rect.localScale = Vector3.one * finalScale;
    }
}