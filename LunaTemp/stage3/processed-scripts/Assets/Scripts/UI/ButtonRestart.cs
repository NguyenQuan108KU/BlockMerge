using SonatFramework.Scripts.SonatSDKAdapterModule;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]
public class ButtonRestart : MonoBehaviour
{
    private bool _clicked;

    private void Start()
    {
        GetComponent<Button>().onClick.AddListener(OnClick);
    }

    private void OnClick()
    {
        if (_clicked) return;
        _clicked = true;

        SonatSDKAdapter.ShowInterAds("restart", Restart);
    }

    private void Restart()
    {
        _clicked = false;
        GameManager.Instance.RestartGame();
    }
}