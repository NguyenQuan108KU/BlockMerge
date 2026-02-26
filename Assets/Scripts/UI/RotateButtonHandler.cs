using UnityEngine;
using UnityEngine.EventSystems;
using Sonat.Enums;

public class RotateButtonHandler : MonoBehaviour, IPointerDownHandler
{
    [SerializeField] private int direction = 1;

    private TowerController _tower;

    private void Start()
    {
        _tower = Object.FindObjectOfType<TowerController>();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (_tower == null) return;
        if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing) return;

        _tower.RotateStep(direction);
    }
}