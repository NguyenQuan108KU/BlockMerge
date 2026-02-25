using System;
using System.Threading;
using System.Threading.Tasks;
using DG.Tweening;
using Sirenix.OdinInspector;
using SonatFramework.Scripts.Helper;
using TMPro;
using UnityEngine;
using UnityEngine.Serialization;

[ExecuteAlways]
public class UITextAnimLocalize : MonoBehaviour
{
    [Header("Curve Settings")] [SerializeField]
    private TextMeshProUGUI[] textMeshPros;

    [SerializeField] private bool useCurve = false;

    [SerializeField] private float radius = 50f;
    [SerializeField] private float arcAngle = 180f;

    [Header("Animation Settings")] [SerializeField]
    private float animDuration = 0.5f;

    [SerializeField] private bool playOnEnable = false;
    [SerializeField] private float delayBetweenChars = 0.1f;
    [SerializeField] private AnimationCurve scaleCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);

    private Coroutine currentAnimCoroutine;
    private Vector3[] originalVertices;
    private CancellationTokenSource animationCancellation;

#if UNITY_EDITOR
    private void OnValidate()
    {
        if (textMeshPros == null)
            textMeshPros = GetComponentsInChildren<TextMeshProUGUI>();
    }
#endif

    private void Awake()
    {
        if (textMeshPros == null)
            textMeshPros = GetComponentsInChildren<TextMeshProUGUI>();
    }

    private async void OnEnable()
    {
        //await UniTask.WaitForEndOfFrame();
        if (playOnEnable) PlayScaleAnimation();
    }

    public void SetLocalizeText(string text)
    {
        foreach (var textMeshPro in textMeshPros)
        {
            textMeshPro.SetLocalize(text);
        }
        PlayScaleAnimation();
    }

    [Button]
    private void ApplyCurve()
    {
        foreach (var textMeshPro in textMeshPros)
        {
            textMeshPro.ForceMeshUpdate();

            var textInfo = textMeshPro.textInfo;
            var meshInfo = textInfo.meshInfo[0];

            for (int i = 0; i < textInfo.characterCount; i++)
            {
                var charInfo = textInfo.characterInfo[i];
                if (!charInfo.isVisible) continue;

                int vertexIndex = charInfo.vertexIndex;

                float t = (float)i / (textInfo.characterCount - 1);
                float angle = Mathf.Lerp(-arcAngle / 2, arcAngle / 2, t) * Mathf.Deg2Rad;

                Vector3 center = Vector3.zero;
                for (int j = 0; j < 4; j++)
                {
                    center += meshInfo.vertices[vertexIndex + j];
                }

                center /= 4f;

                for (int j = 0; j < 4; j++)
                {
                    Vector3 vertex = meshInfo.vertices[vertexIndex + j];

                    vertex -= center;
                    float cosAngle = Mathf.Cos(angle);
                    float sinAngle = Mathf.Sin(angle);
                    float rotatedX = vertex.x * cosAngle - vertex.y * sinAngle;
                    float rotatedY = vertex.x * sinAngle + vertex.y * cosAngle;
                    vertex = new Vector3(rotatedX, rotatedY, vertex.z);
                    vertex += center;

                    float x = vertex.x;
                    float y = vertex.y + radius;

                    float newX = x * cosAngle - y * sinAngle;
                    float newY = x * sinAngle + y * cosAngle;

                    meshInfo.vertices[vertexIndex + j] = new Vector3(newX, newY - radius, vertex.z);
                }
            }

            textMeshPro.UpdateVertexData();
        }
    }

    public void PlayScaleAnimation(float customDuration = -1f, float customDelay = -1f)
    {
        animationCancellation?.Cancel();
        animationCancellation = new CancellationTokenSource();
        float duration = customDuration > 0 ? customDuration : animDuration;
        float delay = customDelay > 0 ? customDelay : delayBetweenChars;

        try
        {
            foreach (var textMeshPro in textMeshPros)
            {
                AnimateScaleSequence(textMeshPro, duration, delay, animationCancellation.Token);
            }
        }
        catch (System.OperationCanceledException)
        {
        }
    }

    private async Task AnimateScaleSequence(TextMeshProUGUI textMeshPro, float duration, float delay, CancellationToken cancellationToken)
    {
        if (textMeshPros == null) return;


        var textInfo = textMeshPro.textInfo;
        if (textInfo?.meshInfo == null || textInfo.meshInfo.Length == 0) return;

        // Prepare vertices
        if (useCurve) ApplyCurve();
        else textMeshPro.ForceMeshUpdate();

        var meshInfo = textInfo.meshInfo[0];
        if (meshInfo.vertices == null) return;

        if (originalVertices?.Length != meshInfo.vertices.Length)
            originalVertices = new Vector3[meshInfo.vertices.Length];
        System.Array.Copy(meshInfo.vertices, originalVertices, meshInfo.vertices.Length);

        for (int i = 0; i < textInfo.characterCount; i++)
        {
            var charInfo = textInfo.characterInfo[i];
            if (charInfo.isVisible)
                ApplyScaleToCharacter(textMeshPro, charInfo.vertexIndex, GetCharacterCenter(charInfo.vertexIndex), 0f);
        }

        textMeshPro.UpdateVertexData(TMP_VertexDataUpdateFlags.Vertices);

        for (int i = 0; i < textInfo.characterCount; i++)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var charInfo = textInfo.characterInfo[i];
            if (charInfo.isVisible)
            {
                AnimateCharacterScale(textMeshPro, charInfo.vertexIndex, duration);
                if (delay > 0) await Task.Delay((int)(delay * 1000), cancellationToken: cancellationToken);
            }
        }
    }

    private void AnimateCharacterScale(TextMeshProUGUI textMeshPro, int vertexIndex, float duration)
    {
        Vector3 charCenter = GetCharacterCenter(vertexIndex);

        DOTween.To(() => 0f, scale =>
            {
                ApplyScaleToCharacter(textMeshPro, vertexIndex, charCenter, scale);
                textMeshPro.UpdateVertexData(TMP_VertexDataUpdateFlags.Vertices);
            }, 1f, duration)
            .SetEase(scaleCurve);
    }

    private Vector3 GetCharacterCenter(int vertexIndex)
    {
        Vector3 center = Vector3.zero;

        for (int j = 0; j < 4; j++)
        {
            center += originalVertices[vertexIndex + j];
        }

        return center / 4f;
    }

    private void ApplyScaleToCharacter(TextMeshProUGUI textMeshPro, int vertexIndex, Vector3 center, float scale)
    {
        var meshInfo = textMeshPro.textInfo.meshInfo[0];

        for (int j = 0; j < 4; j++)
        {
            Vector3 vertex = originalVertices[vertexIndex + j];
            Vector3 direction = vertex - center;
            meshInfo.vertices[vertexIndex + j] = center + direction * scale;
        }
    }

    public void StopAnimation()
    {
        if (currentAnimCoroutine != null)
        {
            StopCoroutine(currentAnimCoroutine);
            currentAnimCoroutine = null;
        }

        if (originalVertices != null)
        {
            foreach (var textMeshPro in textMeshPros)
            {
                var meshInfo = textMeshPro.textInfo.meshInfo[0];
                System.Array.Copy(originalVertices, meshInfo.vertices, originalVertices.Length);
                textMeshPro.UpdateVertexData();
            }
        }
    }

    [Button]
    private void TestAnimation()
    {
        PlayScaleAnimation();
    }

    [Button]
    private void TestStopAnimation()
    {
        StopAnimation();
    }

    private void OnDestroy()
    {
        if (currentAnimCoroutine != null)
        {
            StopCoroutine(currentAnimCoroutine);
        }

        // Kill all DOTween animations on this object
        DOTween.Kill(this);
    }

#if UNITY_EDITOR
    private void OnDrawGizmos()
    {
        if (textMeshPros == null || textMeshPros.Length <= 1 || Application.isPlaying) return;
        for (int i = 1; i < textMeshPros.Length; i++)
        {
            textMeshPros[i].text = textMeshPros[0].text;
        }
    }
#endif
}