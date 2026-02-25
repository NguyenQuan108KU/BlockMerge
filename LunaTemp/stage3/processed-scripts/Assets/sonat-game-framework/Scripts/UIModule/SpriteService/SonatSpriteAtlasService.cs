using Cysharp.Threading.Tasks;
using Sirenix.OdinInspector;
using SonatFramework.Scripts.UIModule.UIElements;
using SonatFramework.Systems;
using UnityEngine;
using UnityEngine.U2D;
using UnityEngine.UI;

namespace SonatFramework.Scripts.UIModule.SpriteService
{
    [CreateAssetMenu(fileName = "SonatSpriteAtlasService", menuName = "Sonat Services/Atlas Service")]
    public class SonatSpriteAtlasService : SpriteAtlasService
    {
        [Required] [SerializeField] private SpriteAtlas spriteAtlas;

        public override Sprite GetSprite(string spriteName)
        {
            if (spriteAtlas == null) return null;
            return spriteAtlas.GetSprite(spriteName);
        }
    }

    public static class SpriteAtlasServiceExtension
    {
        public static void SetIcon(this Image image, string spriteName)
        {
            if (image == null) return;
            Sprite sprite = SonatSystem.GetService<SpriteAtlasService>().GetSprite(spriteName);
            if (sprite == null)
            {
                Debug.LogError($"Sprite {spriteName} not found");
            }

            image.sprite = sprite;
        }
        
        public static void SetIcon(this FixedImageRatio image, string spriteName)
        {
            if (image == null) return;
            Sprite sprite = SonatSystem.GetService<SpriteAtlasService>().GetSprite(spriteName);
            if (sprite == null)
            {
                Debug.LogError($"Sprite {spriteName} not found");
            }

            image.SetSprite(sprite);
        }
    }
}