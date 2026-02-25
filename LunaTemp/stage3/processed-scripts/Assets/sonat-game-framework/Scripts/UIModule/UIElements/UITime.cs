using SonatFramework.Scripts.Utils;
using TMPro;
using UnityEngine;

public class UITime : MonoBehaviour
{
    [SerializeField] private TMP_Text txtValue;
    [SerializeField] private TxtTimeFormat timeFormat;

    public void SetData(long seconds)
    {
        txtValue.text = SonatUtils.GetTimeByFormat(seconds, timeFormat);
    }
}
