using SonatFramework.Scripts.Feature.Shop;
using UnityEditor;
using UnityEngine;

namespace SonatFramework.Scripts.Editor
{
    // [CustomPropertyDrawer(typeof(ShopPack))]
    // public class ShopPackDrawer : PropertyDrawer
    // {
    //     public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
    //     {
    //         var keyProp = property.FindPropertyRelative("key");
    //
    //         string keyName = keyProp != null ? keyProp.enumDisplayNames[keyProp.enumValueIndex] : "Unnamed";
    //
    //         label.text = keyName;
    //
    //         EditorGUI.PropertyField(position, property, new GUIContent(label), true);
    //     }
    //
    //     public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
    //     {
    //         return EditorGUI.GetPropertyHeight(property, true);
    //     }
    // }
}
