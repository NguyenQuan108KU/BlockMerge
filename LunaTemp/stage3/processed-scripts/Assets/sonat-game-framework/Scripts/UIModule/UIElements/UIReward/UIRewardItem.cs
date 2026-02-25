using Sonat.Enums;
using SonatFramework.Scripts.UIModule.SpriteService;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using TMPro;
using UnityEngine;
using UnityEngine.Serialization;

namespace SonatFramework.Scripts.UIModule.UIElements
{
    public class UIRewardItem : MonoBehaviour
    {
        [SerializeField] protected FixedImageRatio icon;
        [SerializeField] protected TMP_Text txtValue;
        [SerializeField] protected bool customIcon;
        [SerializeField] protected string quantityFormat = "x{0}";
        [SerializeField] protected TxtTimeFormat timeFormat = TxtTimeFormat.Shortest;
        [SerializeField] protected string iconNameFormat = "ico_{0}";
        protected ResourceData resourceData;
        public ResourceData ResourceData => resourceData;

        public virtual void SetData(ResourceData resourceData)
        {
            this.resourceData = resourceData;
            SetVisual();
        }

        public virtual void SetVisual()
        {
            if (!customIcon && icon != null)
                icon.sprite = Service<SpriteAtlasService>.Get().GetSprite(string.Format(iconNameFormat, resourceData.gameResource, resourceData.id));

            if (txtValue != null)
            {
                if (resourceData.seconds > 0)
                {
                    txtValue.text = SonatUtils.GetTimeByFormat(resourceData.seconds, timeFormat);
                }
                else
                {
                    txtValue.text = string.Format(quantityFormat, resourceData.quantity);
                }
            }
        }

        public virtual void CollectVisual(SonatCollectEffect collectEffect)
        {
            EventBus<AddResourceVisualEvent>.Raise(new SonatFramework.Systems.EventBus.AddResourceVisualEvent()
            {
                key = resourceData.Key,
                position = transform.position,
                visualQuantity = resourceData.quantity,
                collectEffect = collectEffect
            });
        }
    }
}