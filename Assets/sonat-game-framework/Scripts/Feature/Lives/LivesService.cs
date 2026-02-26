using System;
using System.Collections;
using Sirenix.OdinInspector;
using Sonat;
using Sonat.Enums;
using SonatFramework.Scripts.Helper;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems;
using SonatFramework.Systems.EventBus;
using SonatFramework.Systems.GameDataManagement;
using SonatFramework.Systems.InventoryManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.TimeManagement;
using UnityEngine;

namespace SonatFramework.Scripts.Feature.Lives
{
    [CreateAssetMenu(fileName = "LivesService", menuName = "Sonat Services/Live Service")]
    public class LivesService : SonatServiceSo, IServiceInitialize, IServiceActionOnFocus
    {
        public long timeRemainToRefill;

        //[BoxGroup("SERVICES", true)] [Required] [SerializeField]
        private Service<InventoryService> inventoryService = new Service<InventoryService>();

        //[BoxGroup("SERVICES", true)] [Required] [SerializeField]
        private Service<TimeService> timeService = new Service<TimeService>();

        //[BoxGroup("SERVICES", true)] [Required] [SerializeField]
        private Service<DataService> dataService = new Service<DataService>();

        public LivesConfig config;

        //[BoxGroup("CONFIGS", true)] [SerializeField]
        private bool ignoreLives = false;

        private Coroutine countUnlimitedLives;

        private Coroutine refillCoroutine;

        private long timeRefillLive;
        private LongDataPref timeStartCountRefill;

        public Action onLivesUpdate;
        public IntDataPref refillFreeCount;

        private ResourceData livesData;
        private ResourceData unlimitedLivesData;
        private bool isCountingUnlimitedLives;
        private int maxLives;
        private IntDataPref reduceLiveLastSession;

        public virtual void Initialize()
        {
            if (!dataService.Instance.GetBool("LIVES_SETUP_FIRST_TIME", false)) SetUserFirstTime();
            livesData = inventoryService.Instance.GetResource(GameResource.Live.ToGameResourceKey());
            unlimitedLivesData = inventoryService.Instance.GetResource(GameResource.UnlimitedLive.ToGameResourceKey());
            SetupOnStart();
        }

        protected virtual void SetUserFirstTime()
        {
            inventoryService.Instance.UpdateResource(GameResource.Live.ToGameResourceKey(), config.defaultMaxLives);
            dataService.Instance.SetBool("LIVES_SETUP_FIRST_TIME", true);
        }

        protected virtual void SetupOnStart()
        {
            timeStartCountRefill = new LongDataPref("TimeStartCountRefill");
            refillFreeCount = new IntDataPref("ReFillLivesFreeCount");
            timeRefillLive = SonatSDKAdapter.GetRemoteInt("time_refill_lives", config.timeRefillLives);
            reduceLiveLastSession = new IntDataPref("ReduceLiveLastSession", 0);
            CheckOnFocus();
            new EventBinding<LevelStartedEvent>(OnLevelStart);
            new EventBinding<LevelEndedEvent>(OnLevelEnd);
            if (reduceLiveLastSession.BoolValue)
            {
                ReduceLiveLastSession();
            }
        }

        private void OnLevelStart(LevelStartedEvent eventData)
        {
            if (!IsUnlimitedLives())
            {
                reduceLiveLastSession.BoolValue = true;
            }
        }

        private void OnLevelEnd(LevelEndedEvent eventData)
        {
            reduceLiveLastSession.BoolValue = false;
        }

        protected virtual void CheckOnFocus()
        {
            CheckUnlimitedLive();
            if (!IsUnlimitedLives() && timeStartCountRefill.Value > 0)
            {
                var crrLives = livesData.quantity;

                var now = timeService.Instance.GetUnixTimeSeconds();
                var liveAdd = (int)((now - timeStartCountRefill.Value) / timeRefillLive);
                if (liveAdd > 0)
                {
                    var newLive = Mathf.Clamp(crrLives + liveAdd, 0, MaxLives());
                    inventoryService.Instance.UpdateResource(GameResource.Live.ToGameResourceKey(), newLive);
                    if (newLive >= MaxLives())
                        timeStartCountRefill.Value = 0;
                    else
                        timeStartCountRefill.Value += liveAdd * timeRefillLive;
                }

                if (crrLives + liveAdd < MaxLives())
                    StartCountRefill();
            }
        }

        public CurrencyData GetRefillPrice()
        {
            var price = config.refillPrice;
            int currentLives = livesData.quantity;
            price.value = price.value / MaxLives() * (MaxLives() - currentLives);
            return price;
        }

        private bool CheckUnlimitedLive(bool force = false)
        {
            if (unlimitedLivesData.IsExpired(true))
            {
                if (isCountingUnlimitedLives)
                {
                    FinishUnlimitedLives();
                }

                return false;
            }

            if (!isCountingUnlimitedLives || force)
                CountUnlimitedLives(unlimitedLivesData.GetRemainingTime());
            return true;
        }

        public virtual void OnUnlimitedLivesUpdate()
        {
            CheckUnlimitedLive(true);
            onLivesUpdate?.Invoke();
        }

        public virtual bool IsUnlimitedLives()
        {
            return !unlimitedLivesData.IsExpired(true);
        }

        private void FinishUnlimitedLives()
        {
            isCountingUnlimitedLives = false;
            inventoryService.Instance.UpdateResource(GameResource.Live.ToGameResourceKey(), MaxLives());
            EventBus<AddResourceVisualEvent>.Raise(new AddResourceVisualEvent()
            {
                key = GameResource.Live.ToGameResourceKey(),
            });
            onLivesUpdate?.Invoke();
        }

        public void CountUnlimitedLives(long sec)
        {
            isCountingUnlimitedLives = true;
            if (countUnlimitedLives != null) SonatSystem.Instance.StopCoroutine(countUnlimitedLives);
            countUnlimitedLives = SonatSystem.Instance.StartCoroutine(WaitActionRealtime(sec, FinishUnlimitedLives));
        }

        // public long GetUnlimitedLiveRemain()
        // {
        //     var now = timeService.Instance.GetUnixTimeSeconds(forceInternet);
        //     if (now <= 0) return 0;
        //     return timeFinishUnlimited.Value - now;
        // }

        public long GetTimeRefillRemain()
        {
            if (timeStartCountRefill.Value == 0) return timeRefillLive;
            var now = timeService.Instance.GetUnixTimeSeconds();
            return timeRefillLive - (now - timeStartCountRefill.Value);
        }

        public void ReduceLive(int quantity = 1, SpendResourceLogData log = null)
        {
            reduceLiveLastSession.BoolValue = false;
            if (IsUnlimitedLives() || livesData.quantity <= 0 || ignoreLives) return;
            inventoryService.Instance.SpendResource(GameResource.Live.ToGameResourceKey(), quantity, log);

            if (refillCoroutine == null) StartCountRefill();
            onLivesUpdate?.Invoke();
        }

        public void StartCountRefill()
        {
            if (refillCoroutine != null)
            {
                SonatSystem.Instance.StopCoroutine(refillCoroutine);
            }

            if (timeStartCountRefill.Value == 0) timeStartCountRefill.Value = timeService.Instance.GetUnixTimeSeconds();
            refillCoroutine =
                SonatSystem.Instance.StartCoroutine(WaitActionRealtime(GetTimeRefillRemain(),
                    () =>
                    {
                        refillCoroutine = null;
                        RefillLive(1, new EarnResourceLogData()
                        {
                            spendType = "auto_refill",
                            spendId = "auto_refill",
                        });
                    }));
        }

        public void RefillLive(int quantity, EarnResourceLogData logData)
        {
            var currLive = livesData.quantity;
            if (currLive >= MaxLives()) return;
            var newLive = Mathf.Clamp(currLive + quantity, 0, MaxLives());
            int livesAdd = newLive - currLive;
            if (livesAdd <= 0) return;

            inventoryService.Instance.AddResource(new ResourceData(GameResource.Live, livesAdd), logData);

            if (newLive == MaxLives())
            {
                if (refillCoroutine != null)
                {
                    SonatSystem.Instance.StopCoroutine(refillCoroutine);
                    refillCoroutine = null;
                }

                timeStartCountRefill.Value = 0;
            }
            else
            {
                timeStartCountRefill.Value = timeService.Instance.GetUnixTimeSeconds();
                StartCountRefill();
            }

            onLivesUpdate?.Invoke();

            //LogHelper.LogEarnCurrency(GameResource.lives, quantity, spendType, spendId, false);
        }

        public virtual void RefillFullLive(EarnResourceLogData logData)
        {
            RefillLive(MaxLives(), logData);
        }

        public virtual bool CanRefillFree()
        {
            var maxRefillFree = SonatSDKAdapter.GetRemoteInt("refill_free", config.refillFree);
            if (refillFreeCount.Value >= maxRefillFree) return false;
            return true;
        }

        public bool IsFullLives()
        {
            return livesData.quantity >= MaxLives();
        }


        public virtual bool CanPlay()
        {
            if (IsUnlimitedLives()) return true;
            return livesData.quantity > 0;
        }

        private IEnumerator WaitActionRealtime(long time, Action callback)
        {
            yield return new WaitForSecondsRealtime(time);
            callback?.Invoke();
        }

        public int MaxLives()
        {
            if (maxLives == 0)
            {
                maxLives = dataService.Instance.GetInt("MaxLives", config.defaultMaxLives);
            }

            return maxLives;
        }

        public void OnApplicationFocus(bool focus)
        {
            if (focus)
            {
                CheckOnFocus();
            }
        }

        private void ReduceLiveLastSession()
        {
            if (IsUnlimitedLives()) return;
            ReduceLive(1, new SpendResourceLogData("currency", "live"));
        }
    }
}