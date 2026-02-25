using UnityEngine;
using UnityEngine.EventSystems;
using System.Collections.Generic;
using System.Threading;
using SonatFramework.Systems.EventBus;
using System.Threading.Tasks;

namespace Booster
{
    public class HammerInputHandler : MonoBehaviour
    {
        public static HammerInputHandler Instance { get; private set; }

        [Header("Settings")]
        [SerializeField] private float holdTimeToConfirm = 0.3f;
        [SerializeField] private Material highlightMaterial;

        [Header("References")]
        [SerializeField] private Camera mainCamera;

        // State
        private bool _isActive = false;
        private List<Vector2Int> _highlightedCells = new List<Vector2Int>();
        private List<BlockVisual> _highlightedVisuals = new List<BlockVisual>();

        // Input tracking
        private float _holdStartTime = -1f;
        private bool _isHolding = false;
        private Vector2Int _holdingCell = new Vector2Int(-1, -1);

        // Completion
        private TaskCompletionSource<HammerResult> _completionSource;
        private CancellationTokenSource _cts;

        private HammerService _hammerService;

        #region Unity Lifecycle

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else { Destroy(gameObject); return; }

            if (mainCamera == null) mainCamera = Camera.main;
        }

        private void Update()
        {
            if (!_isActive) return;
            if (Pointer.current == null) return;

            HandleInput();
        }

        private void OnDisable()
        {
            CancelSelection();
        }

        #endregion

        #region Public API

        public void Initialize(HammerService service)
        {
            _hammerService = service;
        }

        public async Task<HammerResult> WaitForSelection(CancellationToken token = default)
        {
            _isActive = true;
            _completionSource = new TaskCompletionSource<HammerResult>();
            _cts = CancellationTokenSource.CreateLinkedTokenSource(token);

            _cts.Token.Register(() =>
            {
                _completionSource?.TrySetResult(HammerResult.Cancelled());
            });

            EventBus<HammerModeEvent>.Raise(new HammerModeEvent { IsActive = true });

            try
            {
                return await _completionSource.Task;
            }
            finally
            {
                Cleanup();
            }
        }

        public void CancelSelection()
        {
            _completionSource?.TrySetResult(HammerResult.Cancelled());
            Cleanup();
        }

        #endregion

        #region Input Handling

        private void HandleInput()
        {
            var pointer = Pointer.current;
            Vector2 screenPos = pointer.position.ReadValue();

            if (IsPointerOverUI()) return;

            // PRESS START
            if (pointer.press.wasPressedThisFrame)
            {
                HandlePressStart(screenPos);
            }

            // HOLDING
            if (pointer.press.isPressed && _isHolding)
            {
                HandleHolding();
            }

            // RELEASE
            if (pointer.press.wasReleasedThisFrame)
            {
                HandleRelease();
            }
        }

        private void HandlePressStart(Vector2 screenPos)
        {
            // Dùng Raycast mới
            Vector2Int hitCell = RaycastToBlock(screenPos);

            if (hitCell.x >= 0)
            {
                _holdingCell = hitCell;
                _holdStartTime = Time.time;
                _isHolding = true;

                // Highlight CẢ HÀNG
                UpdateHighlightRow(hitCell.y);
            }
            else
            {
                ClearHighlight();
                _isHolding = false;
            }
        }

        private void HandleHolding()
        {
            if (!_isHolding || _holdingCell.x < 0) return;

            float holdDuration = Time.time - _holdStartTime;
            if (holdDuration >= holdTimeToConfirm)
            {
                ConfirmSelection(_holdingCell);
            }
        }

        private void HandleRelease()
        {
            _isHolding = false;
            _holdStartTime = -1f;
        }

        private bool IsPointerOverUI()
        {
            if (EventSystem.current == null) return false;

            var pointerData = new PointerEventData(EventSystem.current)
            {
                position = Pointer.current.position.ReadValue()
            };
            var results = new List<RaycastResult>();
            EventSystem.current.RaycastAll(pointerData, results);

            return results.Count > 0;
        }

        // --- CORE LOGIC MỚI: RAYCAST PHYSICS ---
        private Vector2Int RaycastToBlock(Vector2 screenPos)
        {
            if (mainCamera == null) return new Vector2Int(-1, -1);

            Ray ray = mainCamera.ScreenPointToRay(screenPos);

            if (Physics.Raycast(ray, out RaycastHit hit, 100f))
            {
                BlockVisual visual = hit.collider.GetComponent<BlockVisual>();
                if (visual == null) visual = hit.collider.GetComponentInParent<BlockVisual>();

                if (visual != null)
                {
                    return new Vector2Int(visual.GridX, visual.GridY);
                }
            }
            return new Vector2Int(-1, -1);
        }

        #endregion

        #region Highlight Row Logic

        private void UpdateHighlightRow(int y)
        {
            ClearHighlight();

            if (_hammerService == null) return;

            // Gọi logic lấy hàng từ Service
            _highlightedCells = _hammerService.GetRowCells(y);

            if (_highlightedCells.Count == 0) return;

            HashSet<int> processedIDs = new HashSet<int>();
            Mesh fullMesh = GridManager.Instance?.meshLibrary?.full;

            foreach (var c in _highlightedCells)
            {
                GameObject visual = GridManager.Instance?.visualizer.GetVisual(c.x, c.y);
                if (visual == null) continue;

                int id = visual.GetInstanceID();
                if (processedIDs.Contains(id)) continue;
                processedIDs.Add(id);

                BlockVisual blockVis = visual.GetComponent<BlockVisual>();
                if (blockVis != null)
                {
                    blockVis.SetPreviewState(true, fullMesh, highlightMaterial);
                    _highlightedVisuals.Add(blockVis);
                }
            }

            EventBus<HammerHighlightEvent>.Raise(new HammerHighlightEvent
            {
                Cells = _highlightedCells,
                IsValid = true 
            });
        }

        private void ClearHighlight()
        {
            foreach (var vis in _highlightedVisuals)
            {
                if (vis != null) vis.SetPreviewState(false);
            }
            _highlightedVisuals.Clear();
            _highlightedCells.Clear();
        }

        #endregion

        #region Completion

        private void ConfirmSelection(Vector2Int cell)
        {
            if (_highlightedCells.Count == 0) return;

            var result = new HammerResult
            {
                Success = true,
                SelectedCell = cell,
                CellsToDestroy = new List<Vector2Int>(_highlightedCells)
            };

            _completionSource?.TrySetResult(result);
        }

        private void Cleanup()
        {
            _isActive = false;
            ClearHighlight();
            _isHolding = false;
            _holdingCell = new Vector2Int(-1, -1);

            _cts?.Cancel();
            _cts?.Dispose();
            _cts = null;

            EventBus<HammerModeEvent>.Raise(new HammerModeEvent { IsActive = false });
        }

        #endregion
    }

    // 👇 [QUAN TRỌNG] PHẦN NÀY LÀ CÁI BẠN ĐANG THIẾU 👇
    #region Result Struct

    public struct HammerResult
    {
        public bool Success;
        public Vector2Int SelectedCell;
        public List<Vector2Int> CellsToDestroy;

        public static HammerResult Cancelled()
        {
            return new HammerResult
            {
                Success = false,
                SelectedCell = new Vector2Int(-1, -1),
                CellsToDestroy = new List<Vector2Int>()
            };
        }
    }

    #endregion
}