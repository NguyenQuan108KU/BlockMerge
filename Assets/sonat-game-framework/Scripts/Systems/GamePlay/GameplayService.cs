using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;

namespace SonatFramework.Scripts.Systems.GamePlay
{
    public class GameplayService : SonatServiceSo
    {
        protected GameState gameState;


        public virtual void SetGameState(GameState gameState)
        {
            this.gameState = gameState;
            EventBus<GameStateChangeEvent>.Raise(new GameStateChangeEvent() { gameState = gameState });
        }

        public virtual GameState GetGameState()
        {
            return gameState;
        }

        public virtual bool CanInteract()
        {
            return gameState == GameState.Playing;
        }

        public virtual bool CanCountTime()
        {
            return gameState == GameState.Playing;
        }
    }
}