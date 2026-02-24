using System.Collections.Generic;
using System.Linq;
using DG.Tweening;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using Spine.Unity;
using UnityEngine;

public class SkeletonGraphicRandom : MonoBehaviour
{
    [SerializeField] private SkeletonGraphic skeletonGraphic;
    [SerializeField] private List<AnimTrackChance> animTracks;
    [SerializeField] private bool reInit = true;
    private Dictionary<string, int> chances = new Dictionary<string, int>();

#if UNITY_EDITOR

    private void OnValidate()
    {
        if (skeletonGraphic == null)
            skeletonGraphic = GetComponent<SkeletonGraphic>();
    }

#endif

    private void Awake()
    {
        if (skeletonGraphic == null)
            skeletonGraphic = GetComponent<SkeletonGraphic>();
    }

    private void OnEnable()
    {
        if (skeletonGraphic == null) return;

        if (reInit)
        {
            skeletonGraphic.AnimationState.ClearTracks();
            skeletonGraphic.Initialize(true);
        }

        chances = animTracks.ToDictionary(e => e.animationName, e => e.chance);
        PlayAnim();
    }


    public void PlayAnim()
    {
        string animationName = RandomExtensions.GetRandomKeyInDictionary(chances);
        skeletonGraphic.AnimationState.ClearTracks();
        skeletonGraphic.Initialize(true);
        skeletonGraphic.AnimationState.SetAnimation(0, animationName, false).Complete += (track) => { PlayAnim(); };
    }
}

[System.Serializable]
public class AnimTrackChance
{
    public string animationName;
    public int chance = 1;
}