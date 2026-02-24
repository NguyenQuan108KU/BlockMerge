#if CUSTOM_ENUM
namespace Sonat.Enums
{
    public enum AudioId : ushort
    {
        None = 0,
        ButtonClick = 1,


        // Gameplay SFX
        Block_Put = 200,
        Block_Merge_01 = 201,
        Block_Merge_02 = 202,
        GP_Game_Win = 203,
        GP_Game_Over = 204,
    }
}
#endif