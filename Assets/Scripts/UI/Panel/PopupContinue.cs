using Sonat.Enums;
using TMPro;
using UnityEngine;

/// <summary>
/// PopupContinue - Game-specific continue popup
/// 
/// Kế thừa PopupContinueBase (Sonat Framework).
/// Hiển thị booster reward tùy theo reason:
///   - TimeOut:       Clock x1, Hammer x1, Flood x1
///   - BlockOverflow: Hammer x1, Undo x1, Flood x1
///
/// 3 Image slots trên prefab = 3 booster icons.
/// </summary>
public class PopupContinue : PopupContinueBase
{
    [Header("=== Game Specific ===")]
    [SerializeField] private TMP_Text descriptionText;

    [Header("Booster Reward Icons")]
    [SerializeField] private GameObject iconSlot1;
    [SerializeField] private GameObject iconSlot2;
    [SerializeField] private GameObject iconSlot3;

    protected override void SetLayout()
    {
        switch (data.stuckType)
        {
            case StuckType.Stuck: // BlockOverflow
                if (descriptionText != null) descriptionText.text = "Continue to get these boosters!";
                break;

            case StuckType.OutOfMove: // TimeOut
                if (descriptionText != null) descriptionText.text = "Continue to get extra time & boosters!";
                break;
        }

        // Hiện tại set cố định trong prefab
    }
}