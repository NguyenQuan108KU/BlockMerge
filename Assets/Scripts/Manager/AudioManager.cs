using UnityEngine;
using Sonat.Enums;
using SonatFramework.Systems;
using SonatFramework.Systems.AudioManagement;
using Base.Singleton;
using SonatFramework.Systems.EventBus;

public class AudioManager : SingletonSimple<AudioManager>
{
    private static readonly AudioId[] MergeSounds = { AudioId.Block_Merge_01, AudioId.Block_Merge_02 };

    private readonly Service<AudioService> _audioService = new();

    private EventBinding<BlockLandedEvent> _blockLandedBinding;
    private EventBinding<RowsClearedEvent> _rowsClearedBinding;
    private EventBinding<LevelEndedEvent> _levelEndedBinding;

    protected override void OnAwake()
    {
        _blockLandedBinding = new EventBinding<BlockLandedEvent>(_ => PlaySound(AudioId.Block_Put));

        _rowsClearedBinding = new EventBinding<RowsClearedEvent>(e =>
        {
            if (e.RowCount > 0) PlayMergeSound();
        });

        _levelEndedBinding = new EventBinding<LevelEndedEvent>(e =>
        {
            PlaySound(e.success ? AudioId.GP_Game_Win : AudioId.GP_Game_Over);
        });
    }

    private void OnDestroy()
    {
        _blockLandedBinding?.Dispose();
        _rowsClearedBinding?.Dispose();
        _levelEndedBinding?.Dispose();
    }

    public void PlaySound(AudioId key)
    {
        _audioService.Instance?.PlaySound(key);
    }

    private void PlayMergeSound()
    {
        var id = MergeSounds[Random.Range(0, MergeSounds.Length)];
        _audioService.Instance?.PlaySound(id);
    }
}