using System;
using DG.Tweening;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.InventoryManagement.GameResources;
using SonatFramework.Systems.ObjectPooling;
using UnityEngine;
using Random = UnityEngine.Random;

public class UICollectEffectItem : MonoBehaviour, IPoolingObject
{
    protected int index = 0;
    protected Vector3 startPosition;
    protected Vector3 targetPosition;

    protected Action<int> onFinish;

    [SerializeField] protected UIResourceItem uiResourceItem;
    [SerializeField] protected AnimationCurve moveXCurve, moveYCurve;
    [SerializeField] protected float duration;
    [SerializeField] protected float speed;
    [SerializeField] protected bool rotate;

    public virtual void SetData(int index, [Bridge.Ref] GameResourceKey key, int quantity, [Bridge.Ref] Vector3 startPos, [Bridge.Ref] Vector3 endPos, Action<int> onFinish)
    {
        this.index = index;
        var resource = key;
        startPosition = startPos;
        targetPosition = endPos;
        this.onFinish = onFinish;
        transform.position = startPosition;
        uiResourceItem.SetData(resource, quantity);
        DOEffect();
    }

    protected virtual void DOEffect()
    {
        transform.DOMoveX(targetPosition.x, duration).SetEase(moveXCurve);
        transform.DOMoveY(targetPosition.y, duration).SetEase(moveYCurve).OnComplete(() =>
        {
            try
            {
                onFinish?.Invoke(index);
                onFinish = null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            SonatSystem.GetService<PoolingServiceAsync>().ReturnObj(this);
        });
        if (rotate)
        {
            transform.Rotate(Vector3.forward, Random.Range(-360, 360));
            transform.DORotate(Vector3.zero, duration, RotateMode.FastBeyond360).SetEase(Ease.OutBounce);
        }
    }

    public void Setup()
    {
    }

    public virtual void OnCreateObj(params object[] args)
    {
    }

    public void OnReturnObj()
    {
        onFinish = null;
    }

    private void OnDisable()
    {
        onFinish = null;
    }
}