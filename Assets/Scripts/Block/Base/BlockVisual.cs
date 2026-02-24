using UnityEngine;
using System.Collections.Generic;
using DG.Tweening;
using SonatFramework.Systems.ObjectPooling;

public class BlockVisual : MonoBehaviour, IPoolingObject
{
    [Header("Components")]
    private Renderer _outerRenderer;
    private MeshFilter _outerFilter;

    private static MaterialPropertyBlock _propBlock;
    private static int ColorPropId;

    private Collider _cachedCollider;

    private Mesh _originalMesh;
    private Material[] _originalMaterials;

    private Material[] _previewMats;
    private Material _lastOverlayMaterial;

    [Header("Multi-Layer References")]
    [SerializeField] private Transform _visualOuter;
    [SerializeField] private Transform _visualInner;
    private Renderer _innerRenderer;

    #region Properties

    public Material CurrentMaterial { get; private set; }
    public Material InnerMaterial { get; private set; }


    public Color CurrentColor => CurrentMaterial != null ? CurrentMaterial.GetColor(ColorPropId) : Color.white;
    public Color InnerColor => InnerMaterial != null ? InnerMaterial.GetColor(ColorPropId) : Color.white;

    public bool HasInnerMesh => _visualInner != null;

    #endregion

    #region Initialization

    private void Awake()
    {
        InitializeInternal();
    }

    private void InitializeInternal()
    {
        if (_propBlock == null) _propBlock = new MaterialPropertyBlock();
        if (ColorPropId == 0) ColorPropId = Shader.PropertyToID("_BaseColor");

        FindOuterInnerReferences();

        if (_outerRenderer == null)
        {
            _outerRenderer = GetComponent<Renderer>();
            _outerFilter = GetComponent<MeshFilter>();
        }

        if (_outerRenderer != null)
            _originalMaterials = _outerRenderer.sharedMaterials;

        _cachedCollider = GetComponent<Collider>();
    }

    #endregion

    #region IPoolingObject Implementation

    public void Setup()
    {
        InitializeInternal();
    }

    public void OnCreateObj(params object[] args)
    {
        gameObject.SetActive(true);
        transform.localScale = Vector3.one;

        CurrentMaterial = null;
        InnerMaterial = null;
        ClearPropertyBlock(_outerRenderer);
        SetInnerVisible(false);

        if (_outerFilter != null && _originalMesh != null)
            _outerFilter.sharedMesh = _originalMesh;
    }

    public void OnReturnObj()
    {
        transform.DOKill();
        CurrentMaterial = null;
        InnerMaterial = null;
        _originalMesh = null;        
        GridX = 0;
        GridY = 0;
    }

    #endregion

    #region Helper Methods

    public void FindOuterInnerReferences()
    {
        if (_visualOuter == null) _visualOuter = transform.Find("Visual_Outer");
        if (_visualInner == null) _visualInner = transform.Find("Visual_Inner");

        if (_visualOuter != null)
        {
            _outerRenderer = _visualOuter.GetComponent<Renderer>();
            _outerFilter = _visualOuter.GetComponent<MeshFilter>();
        }

        if (_visualInner != null)
            _innerRenderer = _visualInner.GetComponent<Renderer>();
    }

    #endregion

    #region Mesh Operations

    public void ResolveMesh(Vector2Int cellPos, HashSet<Vector2Int> shapeOffsets, CellMeshLibrary lib)
    {
        if (_outerFilter == null) FindOuterInnerReferences();
        if (_outerFilter == null || lib == null || shapeOffsets == null) return;

        Mesh resolved = SmartMeshResolver.Resolve(cellPos, shapeOffsets, lib);

        if (resolved != null && _outerFilter.sharedMesh != resolved)
        {
            _outerFilter.sharedMesh = resolved;
            _originalMesh = resolved;
        }
    }

    public void ChangeMeshToFull(Mesh fullMesh)
    {
        if (_outerFilter != null && fullMesh != null)
        {
            _outerFilter.sharedMesh = fullMesh;
            _originalMesh = fullMesh;  
        }
    }

    public void SetPreviewState(bool isActive, Mesh previewMesh = null, Material overlayMaterial = null)
    {
        if (_outerRenderer == null || _outerFilter == null) return;

        if (isActive)
        {
            if (previewMesh != null) _outerFilter.sharedMesh = previewMesh;

            if (overlayMaterial != null && _originalMaterials != null)
            {
                if (_outerRenderer.sharedMaterials.Length == _originalMaterials.Length)
                {
                    int origLen = _originalMaterials.Length;
                    if (_previewMats == null || _previewMats.Length != origLen + 1 || _lastOverlayMaterial != overlayMaterial)
                    {
                        _previewMats = new Material[origLen + 1];
                        for (int i = 0; i < origLen; i++) _previewMats[i] = _originalMaterials[i];
                        _previewMats[origLen] = overlayMaterial;
                        _lastOverlayMaterial = overlayMaterial;
                    }
                    _outerRenderer.sharedMaterials = _previewMats;
                }
            }
        }
        else
        {
            if (_originalMesh != null) _outerFilter.sharedMesh = _originalMesh;

            if (_originalMaterials != null)
                _outerRenderer.sharedMaterials = _originalMaterials;

            if (CurrentMaterial != null)
                ApplyMaterial(_outerRenderer, CurrentMaterial);
        }
    }

    #endregion

    #region Material Operations

    public void SetMaterial(Material mat)
    {
        CurrentMaterial = mat;
        ApplyMaterial(_outerRenderer, mat);
    }

    /// <summary>
    /// Dùng cho Ghost block preview — override alpha qua PropertyBlock
    /// alpha = 1f → clear PropertyBlock để material gốc hiển thị đúng
    /// </summary>
    public void SetAlpha(float alpha)
    {
        if (_outerRenderer == null) return;

        if (Mathf.Approximately(alpha, 1f))
        {
            ClearPropertyBlock(_outerRenderer);
            return;
        }

        Color baseColor = CurrentColor;
        baseColor.a = alpha;

        _outerRenderer.GetPropertyBlock(_propBlock);
        _propBlock.SetColor(ColorPropId, baseColor);
        _outerRenderer.SetPropertyBlock(_propBlock);
    }

    private void ApplyMaterial(Renderer r, Material mat)
    {
        if (r == null || mat == null) return;
        r.sharedMaterial = mat;
        if (r == _outerRenderer)
            _originalMaterials = r.sharedMaterials;
    }

    private void ClearPropertyBlock(Renderer r)
    {
        if (r == null) return;
        _propBlock.Clear();
        r.SetPropertyBlock(_propBlock);
    }

    #endregion

    #region Multi-Layer Methods

    public void SetupInnerMesh(Mesh mesh, Material innerMat, Vector3 scale, Vector3 offset)
    {
        FindOuterInnerReferences();

        if (_visualInner != null)
        {
            _visualInner.localScale = scale;
            _visualInner.localPosition = offset;
        }

        if (_visualInner != null && mesh != null)
        {
            MeshFilter innerFilter = _visualInner.GetComponent<MeshFilter>();
            if (innerFilter != null) innerFilter.mesh = mesh;
        }

        SetupInnerMaterial(innerMat);
    }

    public void SetupInnerMaterial(Material innerMat)
    {
        FindOuterInnerReferences();
        InnerMaterial = innerMat;
        ApplyMaterial(_innerRenderer, innerMat);
        SetInnerVisible(true);
    }

    public void StripOuterLayer()
    {
        SetMaterial(InnerMaterial);
        SetInnerVisible(false);
    }

    public void SetInnerVisible(bool visible)
    {
        if (_visualInner != null)
            _visualInner.gameObject.SetActive(visible);
    }

    public void CleanupInnerMesh()
    {
        SetInnerVisible(true);
    }

    #endregion

    #region Grid Position

    public int GridX { get; private set; }
    public int GridY { get; private set; }

    public void SetGridPosition(int x, int y)
    {
        GridX = x;
        GridY = y;

        if (_cachedCollider == null)
        {
            var box = gameObject.AddComponent<BoxCollider>();
            box.size = Vector3.one;
            _cachedCollider = box;
        }
    }

    #endregion
}