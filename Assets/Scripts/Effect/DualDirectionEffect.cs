using UnityEngine;
using Cysharp.Threading.Tasks;
using SonatFramework.Systems;
using SonatFramework.Systems.ObjectPooling;

public class DualDirectionEffect : MonoBehaviour, IPoolingObject
{
    [SerializeField] private ParticleSystem[] particleSystems;

    private static readonly Service<PoolingServiceAsync> _pooling = new();
    private const string POOL_KEY = "VFX_BlockBreak_Dual";

    // [PERF] Cache renderer references — tránh GetComponent mỗi lần play
    private ParticleSystemRenderer[] _renderers;

    private void Awake()
    {
        CacheReferences();
    }

    private void CacheReferences()
    {
        if (particleSystems == null || particleSystems.Length == 0)
            particleSystems = GetComponentsInChildren<ParticleSystem>();

        _renderers = new ParticleSystemRenderer[particleSystems.Length];
        for (int i = 0; i < particleSystems.Length; i++)
        {
            if (particleSystems[i] != null)
                _renderers[i] = particleSystems[i].GetComponent<ParticleSystemRenderer>();
        }
    }

    #region IPoolingObject Implementation

    public void Setup()
    {
        CacheReferences();
    }

    public void OnCreateObj(params object[] args)
    {
        gameObject.SetActive(true);
    }

    public void OnReturnObj()
    {
        if (particleSystems != null)
        {
            foreach (var ps in particleSystems)
            {
                if (ps != null)
                    ps.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            }
        }
    }

    #endregion

    #region VFX Logic

    public void SetupAndPlay(Material blockMaterial)
    {
        for (int i = 0; i < particleSystems.Length; i++)
        {
            if (particleSystems[i] == null) continue;

            if (blockMaterial != null && _renderers[i] != null)
                _renderers[i].sharedMaterial = blockMaterial;

            particleSystems[i].Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            particleSystems[i].Play();
        }

        ReturnAfterDelay(1.5f).Forget();
    }

    private async UniTaskVoid ReturnAfterDelay(float delay)
    {
        var token = this.GetCancellationTokenOnDestroy();
        await UniTask.Delay(System.TimeSpan.FromSeconds(delay), cancellationToken: token);

        if (!token.IsCancellationRequested)
        {
            _pooling.Instance?.ReturnObj(this);
        }
    }

    #endregion
}