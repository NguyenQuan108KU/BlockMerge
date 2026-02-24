using UnityEngine;
using UnityEngine.UI;
using SonatFramework.Systems.EventBus;

public class NextBlockUI : MonoBehaviour
{
    [Header("UI References")]
    public Image blockImage;

    [Header("Special Icons")]
    [SerializeField] private Image slideDirectionIcon;

    private EventBinding<NextBlockUpdatedEvent> nextBlockBinding;

    private void OnEnable()
    {
        nextBlockBinding = new EventBinding<NextBlockUpdatedEvent>(e =>
        {
            UpdateUI(e.ShapeData, e.BlockMaterial);
        });
    }

    private void OnDisable()
    {
        nextBlockBinding?.Dispose();
    }

    private void UpdateUI(BlockShapeSO shape, Material mat)
    {
        if (shape == null || shape.uiIcon == null)
        {
            if (blockImage) blockImage.enabled = false;
            UpdateSlideDirectionIcon(null);
            return;
        }

        if (blockImage)
        {
            blockImage.enabled = true;
            blockImage.sprite = shape.uiIcon;
            blockImage.color = mat != null ? mat.color : Color.white;
            blockImage.SetNativeSize();
        }

        UpdateSlideDirectionIcon(shape);
    }

    private void UpdateSlideDirectionIcon(BlockShapeSO shape)
    {
        if (slideDirectionIcon == null) return;

        bool hasSlideIcon = shape != null
            && shape.slideDirection != Vector2Int.zero
            && shape.specialIcon != null;

        slideDirectionIcon.enabled = hasSlideIcon;

        if (hasSlideIcon)
        {
            slideDirectionIcon.sprite = shape.specialIcon;
        }
    }
}