using System;
using System.Collections.Generic;
using System.Linq;
using Sonat.Debugger;
using Sonat.FirebaseModule;
using UnityEngine;
using UnityEngine.Serialization;

namespace Sonat
{
    [CreateAssetMenu(menuName = "SonatSDK/Create SonatSdk Services", fileName = "SonatSdkServices")]
    public class SonatSdkServices : ScriptableObject
    {
        [SerializeField] private SonatFirebase sonatFirebase;

        [SerializeField] private List<SonatService> services;
        private Dictionary<Type, SonatService> serviceDictionary = new Dictionary<Type, SonatService>();
        private List<ISonatService> serviceInProcess = new List<ISonatService>();
        private List<SonatService> servicesInstance;

        public void Initialize()
        {
            serviceDictionary = new Dictionary<Type, SonatService>();
#if UNITY_EDITOR
            var firebaseService = Instantiate(sonatFirebase);
#else
            var firebaseService = sonatFirebase;
#endif
            serviceDictionary.Add(typeof(SonatFirebase), firebaseService);
            serviceInProcess = new List<ISonatService>();

            servicesInstance = new List<SonatService>();

            foreach (var _service in services)
            {
                if (_service == null) continue;
#if UNITY_EDITOR
                var service = Instantiate(_service);
#else
                var service = _service;
#endif
                serviceDictionary.Add(service.GetType(), service);
                servicesInstance.Add(service);
                if (service.waitingInit)
                    serviceInProcess.Add(service);
            }

            firebaseService.Initialize(OnFirebaseInitialize);
        }

        private void OnFirebaseInitialize(ISonatService serviceInited)
        {
            SonatDebugType.Common.Log($"{serviceInited.ServiceType} initialize successfully");
            foreach (var service in servicesInstance)
            {
                service.Initialize(OnServiceInitialized);
            }
        }

        private void OnServiceInitialized(ISonatService serviceInited)
        {
            SonatDebugType.Common.Log($"{serviceInited.ServiceType} initialize successfully");
            serviceInProcess.Remove(serviceInited);
        }

        public bool IsAllServicesInitialized()
        {
            return serviceInProcess.Count == 0;
        }

        public T GetService<T>() where T : SonatService
        {
            if (serviceDictionary != null)
            {
                return serviceDictionary.TryGetValue(typeof(T), out var service) ? service as T : null;
            }
            else
            {
                return services.Find(e => e.GetType() == typeof(T)) as T;
            }
        }

#if UNITY_EDITOR
        public bool HasServiceRaw(SonatService service)
        {
            return services.Contains(service);
        }

        public void TryAddServiceRaw(SonatService service)
        {
            if (services.Contains(service)) return;
            services.Add(service);
        }

        public void TryRemoveService(SonatService service)
        {
            if (!services.Contains(service)) return;
            services.Remove(service);
        }
#endif

        public void OnApplicationFocus(bool focus)
        {
            foreach (var service in serviceDictionary.Values)
            {
                service.OnApplicationFocus(focus);
            }
        }

        public void OnApplicationPause(bool pause)
        {
            foreach (var service in serviceDictionary.Values)
            {
                service.OnApplicationPause(pause);
            }
        }

        public void OnApplicationQuit()
        {
            foreach (var service in serviceDictionary.Values)
            {
                service.OnApplicationQuit();
            }
        }
    }
}