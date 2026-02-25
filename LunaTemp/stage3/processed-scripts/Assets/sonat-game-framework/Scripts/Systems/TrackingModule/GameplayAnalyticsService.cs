using System.Collections.Generic;
using Sonat.Enums;
using SonatFramework.Scripts.Helper;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.UserData;
using UnityEngine;

namespace SonatFramework.Systems.TrackingModule
{
    [CreateAssetMenu(fileName = "GameplayAnalyticsService", menuName = "Sonat Services/Gameplay Analytics")]
    public class GameplayAnalyticsService : SonatServiceSo, IServiceInitialize
    {
        protected readonly Service<UserDataService> userDataService = new Service<UserDataService>();

        protected readonly IntDataPref lastLevelPlay = new IntDataPref("LastLevelPlay");
        protected readonly IntDataPref startCount = new IntDataPref("StartCount");
        public LevelPlayData levelPlayData = new LevelPlayData();
        public int levelStartCount => startCount.Value;

        public virtual void Initialize()
        {
            new EventBinding<LevelStartedEvent>(OnStartLevel);
            new EventBinding<LevelEndedEvent>(OnEndLevel);
            new EventBinding<LevelStuckEvent>(OnLevelStuck);
            new EventBinding<LevelContinueEvent>(OnPlayContinue);
            new EventBinding<PhaseStartedEvent>(OnStartPhase);
            new EventBinding<UseBoosterEvent>(OnUseBooster);
            new EventBinding<LevelQuitEvent>(OnQuitLevel);

            SetLevelPlayData();
        }

        protected virtual void SetLevelPlayData()
        {
            levelPlayData = new LevelPlayData()
            {
                level = userDataService.Instance.GetLevel(),
                gameMode = GameMode.Classic,
            };
        }

        public virtual void OnStartLevel([Bridge.Ref] LevelStartedEvent eventData)
        {
            levelPlayData = new LevelPlayData();
            levelPlayData.isFirstPlay = eventData.level != lastLevelPlay.Value;
            lastLevelPlay.Value = eventData.level;
            levelPlayData.timeStartLevel = Time.time;
            levelPlayData.level = eventData.level;
            levelPlayData.gameMode = eventData.gameMode;
            levelPlayData.moveCount = 0;
            if (levelPlayData.isFirstPlay)
            {
                startCount.Value = 1;
            }
            else
            {
                startCount.Value += 1;
            }

            levelPlayData.startCount = startCount.Value;
        }

        public virtual void OnStartPhase([Bridge.Ref] PhaseStartedEvent eventData)
        {
            levelPlayData.phase = eventData.phase;
        }

        public virtual void OnEndLevel([Bridge.Ref] LevelEndedEvent eventData)
        {
            if (eventData.success)
            {
                levelPlayData.timeEndLevel = Time.time;
                levelPlayData.isWin = true;
                int level = eventData.level;
            }
        }

        public virtual void OnLevelStuck([Bridge.Ref] LevelStuckEvent eventData)
        {
            levelPlayData.loseCause = eventData.cause;
            levelPlayData.stuckCount++;
            levelPlayData.timeEndLevel = Time.time;
            levelPlayData.isWin = false;
        }

        public virtual void OnPlayContinue([Bridge.Ref] LevelContinueEvent eventData)
        {
            levelPlayData.continueWith = eventData.by;
        }

        public virtual void OnUseBooster([Bridge.Ref] UseBoosterEvent eventData)
        {
            levelPlayData.useBoosterCount++;
        }

        public virtual void OnQuitLevel([Bridge.Ref] LevelQuitEvent eventData)
        {
            levelPlayData.loseCause = eventData.cause;
        }

        public int CheckStartCount(int level)
        {
            if (level != lastLevelPlay.Value)
            {
                return 1;
            }
            else
            {
                return startCount.Value + 1;
            }
        }
    }

    public class LevelPlayData
    {
        public GameMode gameMode;
        public int level;
        public int phase;
        public bool isFirstPlay;
        public float timeStartLevel;
        public float timeEndLevel;
        public int useBoosterCount;
        public int moveCount;
        public string loseCause;
        public bool isWin;
        public string continueWith;
        public int stuckCount;
        public int startCount;
        public int reviveByRwd;
        public int buyBoosterByRwd;
        public Dictionary<string, object> otherData = new Dictionary<string, object>();

        public bool TryGet(string key, out object value)
        {
            return otherData.TryGetValue(key, out value);
        }

        public void TrySetData(string key, object value)
        {
            if (otherData.ContainsKey(key))
            {
                otherData[key] = value;
            }
            else
            {
                otherData.Add(key, value);
            }
        }

        public float FullTimePlayLevel
        {
            get
            {
                if (timeEndLevel > timeStartLevel)
                {
                    return timeEndLevel - timeStartLevel;
                }
                else
                {
                    return Time.time - timeStartLevel;
                }
            }
        }
    }
}