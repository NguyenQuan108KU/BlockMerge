//using UnityEngine;

//[CreateAssetMenu(fileName = "GameScoreConfig", menuName = "Data/Score Config")]
//public class GameScoreConfigSO : ScriptableObject
//{
//    [Header("Base Scores")]
//    public int score1Line = 10;
//    public int score2Lines = 20;
//    public int score3Lines = 30;
//    public int score4Lines = 40;

//    [Header("Combo Multiplier")]

//    public float multiLineMultiplier = 1.25f;

//    public int GetScore(int linesCleared)
//    {
//        switch (linesCleared)
//        {
//            case 1: return score1Line;
//            case 2: return score2Lines;
//            case 3: return score3Lines;
//            case 4: return score4Lines;
//            default:
//                return Mathf.RoundToInt(linesCleared * score1Line * multiLineMultiplier);
//        }
//    }
//}