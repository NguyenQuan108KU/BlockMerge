using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public interface IServiceWaitingSDKInitialize
{
    void OnSonatSDKInitialize();
}

public interface IServiceWaitingRemoteConfig
{
    void OnRemoteConfigReady();
}
