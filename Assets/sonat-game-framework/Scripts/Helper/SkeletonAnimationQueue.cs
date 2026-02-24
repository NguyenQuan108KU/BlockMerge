using System.Collections.Generic;
using DG.Tweening;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using Spine.Unity;
using UnityEngine;
using UnityEngine.Serialization;

public class SkeletonAnimationQueue : MonoBehaviour
{
    [SerializeField] private SkeletonAnimation skeletonAnimation;
    [SerializeField] private List<AnimTrack> animTracks;
    private int trackIndex;
    public bool reInit = true;
    public bool isHide = true;

#if UNITY_EDITOR

    private void OnValidate()
    {
        if (skeletonAnimation == null)
            skeletonAnimation = GetComponent<SkeletonAnimation>();
    }

#endif

    private void Awake()
    {
        if (skeletonAnimation == null)
            skeletonAnimation = GetComponent<SkeletonAnimation>();
    }

    private void OnEnable()
    {
        if (skeletonAnimation == null) return;

        if (reInit)
        {
            trackIndex = 0;
            skeletonAnimation.AnimationState.ClearTracks();
            skeletonAnimation.Initialize(true);
        }

        PlayQueue();
    }


    public void PlayQueue()
    {
        if (animTracks == null || trackIndex >= animTracks.Count) return;

        if (animTracks[trackIndex].delay > 0 && isHide)
        {
            skeletonAnimation.enabled = false;
        }

        DOVirtual.DelayedCall(animTracks[trackIndex].delay, () =>
        {
            if (animTracks[trackIndex].playAudio)
            {
                SonatUtils.DelayCall(animTracks[trackIndex].delayAudio,
                    () => { SonatSystem.GetService<AudioService>().PlaySound(animTracks[trackIndex].AudioName); });
            }

            if (animTracks[trackIndex].delay > 0)
            {
                skeletonAnimation.enabled = true;
            }

            skeletonAnimation.AnimationState.ClearTracks();
            skeletonAnimation.Initialize(true);
            if (animTracks[trackIndex].loop)
            {
                skeletonAnimation.AnimationState.SetAnimation(0, animTracks[trackIndex].animationName, animTracks[trackIndex].loop);
            }
            else
            {
                skeletonAnimation.AnimationState.SetAnimation(0, animTracks[trackIndex].animationName, animTracks[trackIndex].loop).Complete += (track) =>
                {
                    trackIndex++;
                    PlayQueue();
                };
            }
        });
    }
}