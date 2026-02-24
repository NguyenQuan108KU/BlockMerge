#if CUSTOM_ENUM
namespace Sonat.Enums
{
    public enum GameMode : byte
        {
            Classic
        }

    public enum GameState : byte
    {
        Loading = 0,
        Menu = 1,          
        Playing = 2,
        Paused = 3,
        GameOver = 4,
        LevelComplete = 5, 
        Tool = 6
    }

    public enum LoseReason : byte
    {
        None,
        BlockOverflow,  // Block chạm limit
        TimeOut         // Hết giờ
    }

    public enum GamePlacement : byte
        {
            Loading,
            Gameplay,
            Home
        }
        
        public enum NavigationType: byte
        {
            None = 0,
            Home,
            Shop,
            Leaderboard,	
        }
    
        public enum StuckType: byte
        {
            Stuck = 0,
            OutOfMove = 1
        }
    
        public enum LevelDifficulty : byte
        {
            Normal = 0,
            Hard = 1,
            SuperHard = 2,
        }
}
#endif