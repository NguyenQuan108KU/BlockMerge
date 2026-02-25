using UnityEngine;

public class AudioManager : SingletonSimple<AudioManager>
{
    [Header("Audio Sources")]
    public AudioSource bgmSource;
    public AudioSource sfxSource;
    [Header("Clips")]
    public AudioClip bgm;
    public AudioClip merge;
    public AudioClip warning;
    public AudioClip gameLose;
    public AudioClip gameWin;
    bool soundOn = true;
    void Start()
    {
       // PlayBGM();
    }
    public void PlayBGM()
    {
        if (!soundOn) return;

        bgmSource.clip = bgm;
        bgmSource.loop = true;
        bgmSource.Play();
    }
    public void PlaySFX(AudioClip clip)
    {
        if (!soundOn || clip == null) return;
        sfxSource.PlayOneShot(clip);
    }

    public void ToggleSound()
    {
        soundOn = !soundOn;

        if (soundOn) bgmSource.Play();
        else bgmSource.Stop();
    }
    public void StopBGM()
    {
        if (bgmSource == null) return;
        bgmSource.Stop();
    }

}