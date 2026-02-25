using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public interface IServiceWaitingSDKInitialize
{
    public void OnSonatSDKInitialize();
}

public interface IServiceWaitingRemoteConfig
{
    public void OnRemoteConfigReady();
}
