using System;
using DG.Tweening;
using Sonat.Enums;
using SonatFramework.Scripts.Utils;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;
using Random = UnityEngine.Random;
using UnityEngine.UI;

public class UICollectEffectItemMultiple : UICollectEffectItem
{
    private Vector3 tempPos;
    private float scaleDown = 1.0f;
    [SerializeField] private float timeMoveOut = 0.2f;
    [SerializeField] private float timeDelay = 0.3f;
    [SerializeField] private bool random;
    [SerializeField] private float randomAmplitude = 0.1f;
    [SerializeField] private float delayRotate = 0f;

    [SerializeField] private int numCircle = 1;
    [SerializeField] private AnimationCurve rotateCurve;

    [Header("Play On Awake")] [SerializeField]
    private bool playOnAwake = true;

    [SerializeField] private float delayToDestroyEfffect = 0.8f;
    [SerializeField] private AudioId collectSound;

    [Header("Particle")] [SerializeField] private ParticleSystem psDisappear;

    private void ResetState()
    {
        transform.DOKill(true);
        transform.localScale = Vector3.one;
        transform.localRotation = Quaternion.identity;
        transform.localPosition = Vector3.zero;
    }

    public override void SetData(int index, [Bridge.Ref] GameResourceKey key, int quantity, [Bridge.Ref] Vector3 startPos, [Bridge.Ref] Vector3 endPos, Action<int> onFinish)
    {
        ResetState();
        uiResourceItem.Icon?.gameObject.SetActive(true);
        base.SetData(index, key, quantity, startPos, endPos, onFinish);
    }

    public void SetIntermediaryPos([Bridge.Ref] Vector3 pos)
    {
        tempPos = pos;
    }

    protected override void DOEffect()
    {
        transform.DOMove(tempPos, timeMoveOut).onComplete += () =>
        {
            float rand = random ? Random.Range(0f, randomAmplitude) : 0;
            DOVirtual.DelayedCall(timeDelay + rand, () =>
            {
                //transform.DOMove(tempPos, timeMoveOut);

                float customDuration = speed > 0 ? Vector3.Distance(tempPos, targetPosition) / speed : duration;
                transform.DOScale(scaleDown, customDuration).SetEase(Ease.InOutSine);
                transform.DOMoveX(targetPosition.x, customDuration).SetEase(moveXCurve);
                transform.DOMoveY(targetPosition.y, customDuration).SetEase(moveYCurve).OnComplete(() =>
                {
                    onFinish?.Invoke(index);
                    onFinish = null;
                    OffIcon();
                });
                if (rotate)
                {
                    transform.DORotate(new Vector3(0, 0, numCircle * 360), customDuration, RotateMode.FastBeyond360).SetEase(rotateCurve).SetDelay(delayRotate);
                }

                if (collectSound != AudioId.None)
                    SonatSystem.GetService<AudioService>().PlaySound(collectSound);
            });
        };
    }

    private void OffIcon()
    {
        uiResourceItem.Icon?.gameObject.SetActive(false);
        if (psDisappear != null) psDisappear.Play();
        SonatUtils.DelayCall(delayToDestroyEfffect, () => SonatSystem.GetService<PoolingServiceAsync>().ReturnObj(this), this);
    }

    public void PlayEffect()
    {
        DOEffect();
    }
}