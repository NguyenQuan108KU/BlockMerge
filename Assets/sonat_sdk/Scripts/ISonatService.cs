using System;

namespace Sonat
{
    public interface ISonatService
    {
         SonatServiceType ServiceType { get;}
         bool Ready { get; set; }
        
         void Initialize(Action<ISonatService> onInitialized);
        
         void OnApplicationFocus(bool focus);
         void OnApplicationPause(bool pause);
         void OnApplicationQuit();
    }

    public enum SonatServiceType: byte
    {
        AdsService,
        IapService,
        FirebaseService,
        //RemoteConfig,
        TrackingService,
        AppsFlyerService,
        FacebookService
    }
}