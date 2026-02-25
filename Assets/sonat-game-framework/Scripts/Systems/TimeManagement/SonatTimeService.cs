using System;
using System.Collections;
using System.Globalization;
using System.Net;
using Sonat;
using SonatFramework.Scripts.SonatSDKAdapterModule;
using SonatFramework.Systems.GameDataManagement;
using UnityEngine;

namespace SonatFramework.Systems.TimeManagement
{
    [CreateAssetMenu(fileName = "SonatTimeService", menuName = "Sonat Services/Time Service")]
    public class SonatTimeService : TimeService, IServiceInitialize
    {
        [SerializeField] private Service<DataService> dataService = new Service<DataService>();

        //private static bool usingLocalTime = true;
        private bool getNetTimeSuccess;
        private DateTime lastFeatTime;
        private float timeFeat;

        private bool UsingLocalTime
        {
            get => dataService.Instance.GetInt("USING_LOCAL_TIME", 0) == 1;
            set => dataService.Instance.SetInt("USING_LOCAL_TIME", value ? 1 : 0);
        }

        public void Initialize()
        {
            getNetTimeSuccess = false;
        }

        public void SetUsingLocalTime(bool value)
        {
            UsingLocalTime = value;
        }

        public void ForceUpdateNetTime()
        {
            getNetTimeSuccess = false;
            UsingLocalTime = false;
            GetCurrentTime();
        }

        public override long GetUnixTimeSeconds(bool force = true)
        {
            var now = GetCurrentTime(force);
            if (now == DateTime.MinValue) return 0;
            return ((DateTimeOffset)now).ToUnixTimeSeconds();
        }

        public override DateTime GetCurrentTime(bool force = true)
        {
            if (!getNetTimeSuccess)
            {
                lastFeatTime = LoadNetTime(force);
                if (force && SonatSDKAdapter.IsInternetConnection())
                {
                    getNetTimeSuccess = true;
                    timeFeat = Time.realtimeSinceStartup;
                }

                return lastFeatTime;
            }

            var dateTime = lastFeatTime.AddSeconds(Time.realtimeSinceStartup - timeFeat);
            return dateTime;
        }
        
        public override int GetDaysPassed(DateTime timeStart, DateTime timeEnd)
        {
            DateTime dateOnlyStart = timeStart.Date;
            DateTime dateOnlyEnd = timeEnd.Date;

            TimeSpan difference = dateOnlyEnd - dateOnlyStart;

            return (int)difference.TotalDays;
        }

        private DateTime LoadNetTime(bool force)
        {
            if (!UsingLocalTime)
                try
                {
                    using (var response = WebRequest.Create("https://www.google.com").GetResponse())
                        //string todaysDates =  response.Headers["date"];
                    {
                        return DateTime.ParseExact(response.Headers["date"],
                            "ddd, dd MMM yyyy HH:mm:ss 'GMT'",
                            CultureInfo.InvariantCulture.DateTimeFormat,
                            DateTimeStyles.AssumeUniversal);
                    }
                }
                catch (WebException)
                {
                    if (force)
                        return DateTime.Now; //In case something goes wrong. 
                    return DateTime.Now;
                }

            return DateTime.Now;
        }

        public override IEnumerator DoActionRealtime(long sec, Action<long> action, bool force = true)
        {
            var timeFinihsed = GetUnixTimeSeconds(force) + sec;
            var timeRemain = sec;
            while (timeRemain > 0)
            {
                action?.Invoke(timeRemain);
                yield return new WaitForSecondsRealtime(1);
                timeRemain = timeFinihsed - GetUnixTimeSeconds(force);
            }

            action?.Invoke(timeRemain);
        }
    }
}