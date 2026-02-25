using System;
using Spine.Unity;
using UnityEngine;
using UnityEngine.Serialization;

public class SkeletonAnimationEntry : MonoBehaviour
{
    [SerializeField] private SkeletonAnimation skeletonAnimation;

    private void OnValidate()
    {
        if (skeletonAnimation == null) skeletonAnimation = GetComponent<SkeletonAnimation>();
    }

    public void PlayAnimation(string animationName, bool loop = false, Action callback = null)
    {
        PlayAnim(animationName, loop, callback);
    }

    public void SetSkin(string skinName)
    {
        skeletonAnimation.AnimationState.ClearTracks();
        skeletonAnimation.initialSkinName = skinName;
        skeletonAnimation.Initialize(true);
    }
    
    private void PlayAnim(string animationName, bool loop = false, Action callback = null)
    {
        skeletonAnimation.AnimationState.ClearTracks();
        skeletonAnimation.Initialize(true);
        if (loop)
        {
            skeletonAnimation.AnimationState.SetAnimation(0, animationName, loop);
        }
        else
        {
            skeletonAnimation.AnimationState.SetAnimation(0, animationName, loop).Complete += (track) => { callback?.Invoke(); };
        }
    }
}
