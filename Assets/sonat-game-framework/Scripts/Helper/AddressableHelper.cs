using Cysharp.Threading.Tasks;
#if using_addressable
using Helper;
#endif
using SonatFramework.Scripts.UIModule.UIElements;
using UnityEngine;
using UnityEngine.UI;

public static class AddressableHelper
{
#if using_addressable
    public static AddressableLoader<Sprite> spriteLoader = new AddressableLoader<Sprite>();
#endif

    public static async UniTask SetSpriteAsync(this SpriteRenderer spriteRenderer, string address)
    {
#if using_addressable
        Sprite sprite = await spriteLoader.LoadAssetAsync(address);
        if (sprite != null && spriteRenderer != null)
            spriteRenderer.sprite = sprite;
#endif
    }

    public static async UniTask SetSpriteAsync(this Image image, string address)
    {
#if using_addressable
        Sprite sprite = await spriteLoader.LoadAssetAsync(address);
        if (sprite != null && image != null)
            image.sprite = sprite;
#endif
    }

    public static async UniTask SetSpriteAsync(this FixedImageRatio image, string address)
    {
#if using_addressable
        Sprite sprite = await spriteLoader.LoadAssetAsync(address);
        if (sprite != null && image != null)
            image.SetSprite(sprite);
#endif
    }
}