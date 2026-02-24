using UnityEngine;
using SonatFramework.Scripts.UIModule.CollectEffect;

public class EffectPoolTrail : EffectPoolBase
{
    [SerializeField] private TrailRenderer[] trailRenderers;

    public override void OnCreateObj(params object[] args)
    {
        base.OnCreateObj(args);
    }

    public void CleanTrailRenderers()
    {
        if (trailRenderers != null)
        {
            foreach (var trailRenderer in trailRenderers)
            {
                trailRenderer.emitting = false;
                trailRenderer.Clear();
            }
        }
    }

    public void ActiveTrailRenderers()
    {
        if (trailRenderers != null)
        {
            foreach (var trailRenderer in trailRenderers)
            {
                trailRenderer.enabled = true;
            }
        }
    }
}
