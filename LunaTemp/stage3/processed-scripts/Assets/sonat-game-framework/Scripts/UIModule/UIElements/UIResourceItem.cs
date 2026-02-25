using Sonat.Enums;
using SonatFramework.Scripts.UIModule.SpriteService;
using SonatFramework.Scripts.UIModule.UIElements;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement.GameResources;
using TMPro;
using UnityEngine;
using UnityEngine.TextCore.Text;

public class UIResourceItem : MonoBehaviour
{
    [SerializeField] private FixedImageRatio icon;
    [SerializeField] private TMP_Text txtQuantity;

    [SerializeField] private Service<SpriteAtlasService> spriteAtlasService = new SonatFramework.Systems.Service<SonatFramework.Scripts.UIModule.SpriteService.SpriteAtlasService>();
    private GameResourceKey resourceKey;
    public Transform Transform => transform;

    public void SetData([Bridge.Ref] GameResourceKey resourceKey, int quantity = 0)
    {
        this.resourceKey = resourceKey;
        if (txtQuantity)
            txtQuantity.text = quantity.ToString();
        if (icon)
            icon.sprite = spriteAtlasService.Instance.GetSprite($"ico_{this.resourceKey.gameResource}");
    }
    public FixedImageRatio Icon => icon;
}