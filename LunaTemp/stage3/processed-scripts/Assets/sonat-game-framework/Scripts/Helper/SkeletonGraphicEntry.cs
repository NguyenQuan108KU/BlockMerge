using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using Spine.Unity;
using UnityEngine;
using UnityEngine.Serialization;

public class SkeletonGraphicEntry : MonoBehaviour
{
    [SerializeField] private SkeletonGraphic skeletonGraphic;

    private void OnValidate()
    {
        if (skeletonGraphic == null) skeletonGraphic = GetComponent<SkeletonGraphic>();
    }

    public void PlayAnimation(string animationName, bool loop = false, Action callback = null)
    {
        PlayAnim(animationName, loop, callback);
    }

    public void SetSkin(string skinName)
    {
        skeletonGraphic.AnimationState.ClearTracks();
        skeletonGraphic.initialSkinName = skinName;
        skeletonGraphic.Initialize(true);
    }

    public void Fade(float from, float to, float duration, Action callback = null)
    {
        skeletonGraphic.DOFade(from, 0);
        skeletonGraphic.DOFade(to, duration).OnComplete(() => callback?.Invoke());
    }

    private void PlayAnim(string animationName, bool loop = false, Action callback = null)
    {
        skeletonGraphic.AnimationState.ClearTracks();
        skeletonGraphic.Initialize(true);
        if (loop)
        {
            skeletonGraphic.AnimationState.SetAnimation(0, animationName, loop);
        }
        else
        {
            skeletonGraphic.AnimationState.SetAnimation(0, animationName, loop).Complete += (track) => { callback?.Invoke(); };
        }
    }
}