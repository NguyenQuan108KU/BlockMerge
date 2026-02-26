var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i816 = root || request.c( 'UnityEngine.JointSpring' )
  var i817 = data
  i816.spring = i817[0]
  i816.damper = i817[1]
  i816.targetPosition = i817[2]
  return i816
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i818 = root || request.c( 'UnityEngine.JointMotor' )
  var i819 = data
  i818.m_TargetVelocity = i819[0]
  i818.m_Force = i819[1]
  i818.m_FreeSpin = i819[2]
  return i818
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i820 = root || request.c( 'UnityEngine.JointLimits' )
  var i821 = data
  i820.m_Min = i821[0]
  i820.m_Max = i821[1]
  i820.m_Bounciness = i821[2]
  i820.m_BounceMinVelocity = i821[3]
  i820.m_ContactDistance = i821[4]
  i820.minBounce = i821[5]
  i820.maxBounce = i821[6]
  return i820
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i822 = root || request.c( 'UnityEngine.JointDrive' )
  var i823 = data
  i822.m_PositionSpring = i823[0]
  i822.m_PositionDamper = i823[1]
  i822.m_MaximumForce = i823[2]
  i822.m_UseAcceleration = i823[3]
  return i822
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i824 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i825 = data
  i824.m_Spring = i825[0]
  i824.m_Damper = i825[1]
  return i824
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i826 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i827 = data
  i826.m_Limit = i827[0]
  i826.m_Bounciness = i827[1]
  i826.m_ContactDistance = i827[2]
  return i826
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i828 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i829 = data
  i828.m_ExtremumSlip = i829[0]
  i828.m_ExtremumValue = i829[1]
  i828.m_AsymptoteSlip = i829[2]
  i828.m_AsymptoteValue = i829[3]
  i828.m_Stiffness = i829[4]
  return i828
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i830 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i831 = data
  i830.m_LowerAngle = i831[0]
  i830.m_UpperAngle = i831[1]
  return i830
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i832 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i833 = data
  i832.m_MotorSpeed = i833[0]
  i832.m_MaximumMotorTorque = i833[1]
  return i832
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i834 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i835 = data
  i834.m_DampingRatio = i835[0]
  i834.m_Frequency = i835[1]
  i834.m_Angle = i835[2]
  return i834
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i836 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i837 = data
  i836.m_LowerTranslation = i837[0]
  i836.m_UpperTranslation = i837[1]
  return i836
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i839 = data
  i838.name = i839[0]
  i838.width = i839[1]
  i838.height = i839[2]
  i838.mipmapCount = i839[3]
  i838.anisoLevel = i839[4]
  i838.filterMode = i839[5]
  i838.hdr = !!i839[6]
  i838.format = i839[7]
  i838.wrapMode = i839[8]
  i838.alphaIsTransparency = !!i839[9]
  i838.alphaSource = i839[10]
  i838.graphicsFormat = i839[11]
  i838.sRGBTexture = !!i839[12]
  i838.desiredColorSpace = i839[13]
  i838.wrapU = i839[14]
  i838.wrapV = i839[15]
  return i838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i840 = root || new pc.UnityMaterial()
  var i841 = data
  i840.name = i841[0]
  request.r(i841[1], i841[2], 0, i840, 'shader')
  i840.renderQueue = i841[3]
  i840.enableInstancing = !!i841[4]
  var i843 = i841[5]
  var i842 = []
  for(var i = 0; i < i843.length; i += 1) {
    i842.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i843[i + 0]) );
  }
  i840.floatParameters = i842
  var i845 = i841[6]
  var i844 = []
  for(var i = 0; i < i845.length; i += 1) {
    i844.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i845[i + 0]) );
  }
  i840.colorParameters = i844
  var i847 = i841[7]
  var i846 = []
  for(var i = 0; i < i847.length; i += 1) {
    i846.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i847[i + 0]) );
  }
  i840.vectorParameters = i846
  var i849 = i841[8]
  var i848 = []
  for(var i = 0; i < i849.length; i += 1) {
    i848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i849[i + 0]) );
  }
  i840.textureParameters = i848
  var i851 = i841[9]
  var i850 = []
  for(var i = 0; i < i851.length; i += 1) {
    i850.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i851[i + 0]) );
  }
  i840.materialFlags = i850
  return i840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i855 = data
  i854.name = i855[0]
  i854.value = i855[1]
  return i854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i859 = data
  i858.name = i859[0]
  i858.value = new pc.Color(i859[1], i859[2], i859[3], i859[4])
  return i858
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i863 = data
  i862.name = i863[0]
  i862.value = new pc.Vec4( i863[1], i863[2], i863[3], i863[4] )
  return i862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i867 = data
  i866.name = i867[0]
  request.r(i867[1], i867[2], 0, i866, 'value')
  return i866
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i870 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i871 = data
  i870.name = i871[0]
  i870.enabled = !!i871[1]
  return i870
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i873 = data
  i872.pivot = new pc.Vec2( i873[0], i873[1] )
  i872.anchorMin = new pc.Vec2( i873[2], i873[3] )
  i872.anchorMax = new pc.Vec2( i873[4], i873[5] )
  i872.sizeDelta = new pc.Vec2( i873[6], i873[7] )
  i872.anchoredPosition3D = new pc.Vec3( i873[8], i873[9], i873[10] )
  i872.rotation = new pc.Quat(i873[11], i873[12], i873[13], i873[14])
  i872.scale = new pc.Vec3( i873[15], i873[16], i873[17] )
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i875 = data
  i874.m_Alpha = i875[0]
  i874.m_Interactable = !!i875[1]
  i874.m_BlocksRaycasts = !!i875[2]
  i874.m_IgnoreParentGroups = !!i875[3]
  i874.enabled = !!i875[4]
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i877 = data
  i876.cullTransparentMesh = !!i877[0]
  return i876
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i878 = root || request.c( 'UnityEngine.UI.Mask' )
  var i879 = data
  i878.m_ShowMaskGraphic = !!i879[0]
  return i878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i881 = data
  i880.name = i881[0]
  i880.tagId = i881[1]
  i880.enabled = !!i881[2]
  i880.isStatic = !!i881[3]
  i880.layer = i881[4]
  return i880
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i882 = root || request.c( 'UnityEngine.UI.Image' )
  var i883 = data
  request.r(i883[0], i883[1], 0, i882, 'm_Sprite')
  i882.m_Type = i883[2]
  i882.m_PreserveAspect = !!i883[3]
  i882.m_FillCenter = !!i883[4]
  i882.m_FillMethod = i883[5]
  i882.m_FillAmount = i883[6]
  i882.m_FillClockwise = !!i883[7]
  i882.m_FillOrigin = i883[8]
  i882.m_UseSpriteMesh = !!i883[9]
  i882.m_PixelsPerUnitMultiplier = i883[10]
  request.r(i883[11], i883[12], 0, i882, 'm_Material')
  i882.m_Maskable = !!i883[13]
  i882.m_Color = new pc.Color(i883[14], i883[15], i883[16], i883[17])
  i882.m_RaycastTarget = !!i883[18]
  i882.m_RaycastPadding = new pc.Vec4( i883[19], i883[20], i883[21], i883[22] )
  return i882
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i884 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i885 = data
  i884.m_hasFontAssetChanged = !!i885[0]
  request.r(i885[1], i885[2], 0, i884, 'm_baseMaterial')
  i884.m_maskOffset = new pc.Vec4( i885[3], i885[4], i885[5], i885[6] )
  i884.m_text = i885[7]
  i884.m_isRightToLeft = !!i885[8]
  request.r(i885[9], i885[10], 0, i884, 'm_fontAsset')
  request.r(i885[11], i885[12], 0, i884, 'm_sharedMaterial')
  var i887 = i885[13]
  var i886 = []
  for(var i = 0; i < i887.length; i += 2) {
  request.r(i887[i + 0], i887[i + 1], 2, i886, '')
  }
  i884.m_fontSharedMaterials = i886
  request.r(i885[14], i885[15], 0, i884, 'm_fontMaterial')
  var i889 = i885[16]
  var i888 = []
  for(var i = 0; i < i889.length; i += 2) {
  request.r(i889[i + 0], i889[i + 1], 2, i888, '')
  }
  i884.m_fontMaterials = i888
  i884.m_fontColor32 = UnityEngine.Color32.ConstructColor(i885[17], i885[18], i885[19], i885[20])
  i884.m_fontColor = new pc.Color(i885[21], i885[22], i885[23], i885[24])
  i884.m_enableVertexGradient = !!i885[25]
  i884.m_colorMode = i885[26]
  i884.m_fontColorGradient = request.d('TMPro.VertexGradient', i885[27], i884.m_fontColorGradient)
  request.r(i885[28], i885[29], 0, i884, 'm_fontColorGradientPreset')
  request.r(i885[30], i885[31], 0, i884, 'm_spriteAsset')
  i884.m_tintAllSprites = !!i885[32]
  request.r(i885[33], i885[34], 0, i884, 'm_StyleSheet')
  i884.m_TextStyleHashCode = i885[35]
  i884.m_overrideHtmlColors = !!i885[36]
  i884.m_faceColor = UnityEngine.Color32.ConstructColor(i885[37], i885[38], i885[39], i885[40])
  i884.m_fontSize = i885[41]
  i884.m_fontSizeBase = i885[42]
  i884.m_fontWeight = i885[43]
  i884.m_enableAutoSizing = !!i885[44]
  i884.m_fontSizeMin = i885[45]
  i884.m_fontSizeMax = i885[46]
  i884.m_fontStyle = i885[47]
  i884.m_HorizontalAlignment = i885[48]
  i884.m_VerticalAlignment = i885[49]
  i884.m_textAlignment = i885[50]
  i884.m_characterSpacing = i885[51]
  i884.m_wordSpacing = i885[52]
  i884.m_lineSpacing = i885[53]
  i884.m_lineSpacingMax = i885[54]
  i884.m_paragraphSpacing = i885[55]
  i884.m_charWidthMaxAdj = i885[56]
  i884.m_enableWordWrapping = !!i885[57]
  i884.m_wordWrappingRatios = i885[58]
  i884.m_overflowMode = i885[59]
  request.r(i885[60], i885[61], 0, i884, 'm_linkedTextComponent')
  request.r(i885[62], i885[63], 0, i884, 'parentLinkedComponent')
  i884.m_enableKerning = !!i885[64]
  i884.m_enableExtraPadding = !!i885[65]
  i884.checkPaddingRequired = !!i885[66]
  i884.m_isRichText = !!i885[67]
  i884.m_parseCtrlCharacters = !!i885[68]
  i884.m_isOrthographic = !!i885[69]
  i884.m_isCullingEnabled = !!i885[70]
  i884.m_horizontalMapping = i885[71]
  i884.m_verticalMapping = i885[72]
  i884.m_uvLineOffset = i885[73]
  i884.m_geometrySortingOrder = i885[74]
  i884.m_IsTextObjectScaleStatic = !!i885[75]
  i884.m_VertexBufferAutoSizeReduction = !!i885[76]
  i884.m_useMaxVisibleDescender = !!i885[77]
  i884.m_pageToDisplay = i885[78]
  i884.m_margin = new pc.Vec4( i885[79], i885[80], i885[81], i885[82] )
  i884.m_isUsingLegacyAnimationComponent = !!i885[83]
  i884.m_isVolumetricText = !!i885[84]
  request.r(i885[85], i885[86], 0, i884, 'm_Material')
  i884.m_Maskable = !!i885[87]
  i884.m_Color = new pc.Color(i885[88], i885[89], i885[90], i885[91])
  i884.m_RaycastTarget = !!i885[92]
  i884.m_RaycastPadding = new pc.Vec4( i885[93], i885[94], i885[95], i885[96] )
  return i884
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i892 = root || request.c( 'TMPro.VertexGradient' )
  var i893 = data
  i892.topLeft = new pc.Color(i893[0], i893[1], i893[2], i893[3])
  i892.topRight = new pc.Color(i893[4], i893[5], i893[6], i893[7])
  i892.bottomLeft = new pc.Color(i893[8], i893[9], i893[10], i893[11])
  i892.bottomRight = new pc.Color(i893[12], i893[13], i893[14], i893[15])
  return i892
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i894 = root || request.c( 'UnityEngine.UI.Button' )
  var i895 = data
  i894.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i895[0], i894.m_OnClick)
  i894.m_Navigation = request.d('UnityEngine.UI.Navigation', i895[1], i894.m_Navigation)
  i894.m_Transition = i895[2]
  i894.m_Colors = request.d('UnityEngine.UI.ColorBlock', i895[3], i894.m_Colors)
  i894.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i895[4], i894.m_SpriteState)
  i894.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i895[5], i894.m_AnimationTriggers)
  i894.m_Interactable = !!i895[6]
  request.r(i895[7], i895[8], 0, i894, 'm_TargetGraphic')
  return i894
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i896 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i897 = data
  i896.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i897[0], i896.m_PersistentCalls)
  return i896
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i898 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i899 = data
  var i901 = i899[0]
  var i900 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i901.length; i += 1) {
    i900.add(request.d('UnityEngine.Events.PersistentCall', i901[i + 0]));
  }
  i898.m_Calls = i900
  return i898
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i904 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i905 = data
  request.r(i905[0], i905[1], 0, i904, 'm_Target')
  i904.m_TargetAssemblyTypeName = i905[2]
  i904.m_MethodName = i905[3]
  i904.m_Mode = i905[4]
  i904.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i905[5], i904.m_Arguments)
  i904.m_CallState = i905[6]
  return i904
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i906 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i907 = data
  i906.m_Mode = i907[0]
  i906.m_WrapAround = !!i907[1]
  request.r(i907[2], i907[3], 0, i906, 'm_SelectOnUp')
  request.r(i907[4], i907[5], 0, i906, 'm_SelectOnDown')
  request.r(i907[6], i907[7], 0, i906, 'm_SelectOnLeft')
  request.r(i907[8], i907[9], 0, i906, 'm_SelectOnRight')
  return i906
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i908 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i909 = data
  i908.m_NormalColor = new pc.Color(i909[0], i909[1], i909[2], i909[3])
  i908.m_HighlightedColor = new pc.Color(i909[4], i909[5], i909[6], i909[7])
  i908.m_PressedColor = new pc.Color(i909[8], i909[9], i909[10], i909[11])
  i908.m_SelectedColor = new pc.Color(i909[12], i909[13], i909[14], i909[15])
  i908.m_DisabledColor = new pc.Color(i909[16], i909[17], i909[18], i909[19])
  i908.m_ColorMultiplier = i909[20]
  i908.m_FadeDuration = i909[21]
  return i908
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i910 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i911 = data
  request.r(i911[0], i911[1], 0, i910, 'm_HighlightedSprite')
  request.r(i911[2], i911[3], 0, i910, 'm_PressedSprite')
  request.r(i911[4], i911[5], 0, i910, 'm_SelectedSprite')
  request.r(i911[6], i911[7], 0, i910, 'm_DisabledSprite')
  return i910
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i912 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i913 = data
  i912.m_NormalTrigger = i913[0]
  i912.m_HighlightedTrigger = i913[1]
  i912.m_PressedTrigger = i913[2]
  i912.m_SelectedTrigger = i913[3]
  i912.m_DisabledTrigger = i913[4]
  return i912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i915 = data
  i914.position = new pc.Vec3( i915[0], i915[1], i915[2] )
  i914.scale = new pc.Vec3( i915[3], i915[4], i915[5] )
  i914.rotation = new pc.Quat(i915[6], i915[7], i915[8], i915[9])
  return i914
}

Deserializers["BlockVisual"] = function (request, data, root) {
  var i916 = root || request.c( 'BlockVisual' )
  var i917 = data
  request.r(i917[0], i917[1], 0, i916, '_visualOuter')
  request.r(i917[2], i917[3], 0, i916, '_visualInner')
  return i916
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i918 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i919 = data
  request.r(i919[0], i919[1], 0, i918, 'sharedMesh')
  return i918
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i921 = data
  request.r(i921[0], i921[1], 0, i920, 'additionalVertexStreams')
  i920.enabled = !!i921[2]
  request.r(i921[3], i921[4], 0, i920, 'sharedMaterial')
  var i923 = i921[5]
  var i922 = []
  for(var i = 0; i < i923.length; i += 2) {
  request.r(i923[i + 0], i923[i + 1], 2, i922, '')
  }
  i920.sharedMaterials = i922
  i920.receiveShadows = !!i921[6]
  i920.shadowCastingMode = i921[7]
  i920.sortingLayerID = i921[8]
  i920.sortingOrder = i921[9]
  i920.lightmapIndex = i921[10]
  i920.lightmapSceneIndex = i921[11]
  i920.lightmapScaleOffset = new pc.Vec4( i921[12], i921[13], i921[14], i921[15] )
  i920.lightProbeUsage = i921[16]
  i920.reflectionProbeUsage = i921[17]
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i924 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i925 = data
  i924.name = i925[0]
  i924.halfPrecision = !!i925[1]
  i924.useSimplification = !!i925[2]
  i924.useUInt32IndexFormat = !!i925[3]
  i924.vertexCount = i925[4]
  i924.aabb = i925[5]
  var i927 = i925[6]
  var i926 = []
  for(var i = 0; i < i927.length; i += 1) {
    i926.push( !!i927[i + 0] );
  }
  i924.streams = i926
  i924.vertices = i925[7]
  var i929 = i925[8]
  var i928 = []
  for(var i = 0; i < i929.length; i += 1) {
    i928.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i929[i + 0]) );
  }
  i924.subMeshes = i928
  var i931 = i925[9]
  var i930 = []
  for(var i = 0; i < i931.length; i += 16) {
    i930.push( new pc.Mat4().setData(i931[i + 0], i931[i + 1], i931[i + 2], i931[i + 3],  i931[i + 4], i931[i + 5], i931[i + 6], i931[i + 7],  i931[i + 8], i931[i + 9], i931[i + 10], i931[i + 11],  i931[i + 12], i931[i + 13], i931[i + 14], i931[i + 15]) );
  }
  i924.bindposes = i930
  var i933 = i925[10]
  var i932 = []
  for(var i = 0; i < i933.length; i += 1) {
    i932.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i933[i + 0]) );
  }
  i924.blendShapes = i932
  return i924
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i939 = data
  i938.triangles = i939[0]
  return i938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i944 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i945 = data
  i944.name = i945[0]
  var i947 = i945[1]
  var i946 = []
  for(var i = 0; i < i947.length; i += 1) {
    i946.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i947[i + 0]) );
  }
  i944.frames = i946
  return i944
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i949 = data
  request.r(i949[0], i949[1], 0, i948, 'sharedMesh')
  i948.convex = !!i949[2]
  i948.enabled = !!i949[3]
  i948.isTrigger = !!i949[4]
  request.r(i949[5], i949[6], 0, i948, 'material')
  return i948
}

Deserializers["LimitLineController"] = function (request, data, root) {
  var i950 = root || request.c( 'LimitLineController' )
  var i951 = data
  return i950
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i953 = data
  i952.planeDistance = i953[0]
  i952.referencePixelsPerUnit = i953[1]
  i952.isFallbackOverlay = !!i953[2]
  i952.renderMode = i953[3]
  i952.renderOrder = i953[4]
  i952.sortingLayerName = i953[5]
  i952.sortingOrder = i953[6]
  i952.scaleFactor = i953[7]
  request.r(i953[8], i953[9], 0, i952, 'worldCamera')
  i952.overrideSorting = !!i953[10]
  i952.pixelPerfect = !!i953[11]
  i952.targetDisplay = i953[12]
  i952.overridePixelPerfect = !!i953[13]
  i952.enabled = !!i953[14]
  return i952
}

Deserializers["PopupSettings"] = function (request, data, root) {
  var i954 = root || request.c( 'PopupSettings' )
  var i955 = data
  var i957 = i955[0]
  var i956 = []
  for(var i = 0; i < i957.length; i += 1) {
    i956.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i957[i + 0]) );
  }
  i954.openTween = i956
  var i959 = i955[1]
  var i958 = []
  for(var i = 0; i < i959.length; i += 1) {
    i958.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i959[i + 0]) );
  }
  i954.closeTween = i958
  i954.keepCached = !!i955[2]
  i954.pauseGame = !!i955[3]
  i954.ignoreTracking = !!i955[4]
  request.r(i955[5], i955[6], 0, i954, 'toggleSoundVisual')
  request.r(i955[7], i955[8], 0, i954, 'toggleMusicVisual')
  request.r(i955[9], i955[10], 0, i954, 'toggleVibrationVisual')
  request.r(i955[11], i955[12], 0, i954, 'btnResume')
  request.r(i955[13], i955[14], 0, i954, 'btnClose')
  request.r(i955[15], i955[16], 0, i954, 'btnRestart')
  i954.trackingName = i955[17]
  return i954
}

Deserializers["SonatFramework.Scripts.UIModule.TweenData"] = function (request, data, root) {
  var i962 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenData' )
  var i963 = data
  request.r(i963[0], i963[1], 0, i962, 'target')
  request.r(i963[2], i963[3], 0, i962, 'configSO')
  i962.custom = !!i963[4]
  i962.config = request.d('SonatFramework.Scripts.UIModule.TweenConfig', i963[5], i962.config)
  i962.OnCompleted = request.d('System.Action', i963[6], i962.OnCompleted)
  return i962
}

Deserializers["SonatFramework.Scripts.UIModule.TweenConfig"] = function (request, data, root) {
  var i964 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenConfig' )
  var i965 = data
  i964.tweenType = i965[0]
  i964.from = i965[1]
  i964.to = i965[2]
  i964.mFrom = new pc.Vec3( i965[3], i965[4], i965[5] )
  i964.mTo = new pc.Vec3( i965[6], i965[7], i965[8] )
  i964.duration = i965[9]
  i964.delay = i965[10]
  i964.curve = new pc.AnimationCurve( { keys_flow: i965[11] } )
  return i964
}

Deserializers["System.Action"] = function (request, data, root) {
  var i966 = root || request.c( 'System.Action' )
  var i967 = data
  return i966
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i968 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i969 = data
  i968.m_Spacing = i969[0]
  i968.m_ChildForceExpandWidth = !!i969[1]
  i968.m_ChildForceExpandHeight = !!i969[2]
  i968.m_ChildControlWidth = !!i969[3]
  i968.m_ChildControlHeight = !!i969[4]
  i968.m_ChildScaleWidth = !!i969[5]
  i968.m_ChildScaleHeight = !!i969[6]
  i968.m_ReverseArrangement = !!i969[7]
  i968.m_Padding = UnityEngine.RectOffset.FromPaddings(i969[8], i969[9], i969[10], i969[11])
  i968.m_ChildAlignment = i969[12]
  return i968
}

Deserializers["SonatFramework.Systems.SettingsManagement.SettingsElement"] = function (request, data, root) {
  var i970 = root || request.c( 'SonatFramework.Systems.SettingsManagement.SettingsElement' )
  var i971 = data
  request.r(i971[0], i971[1], 0, i970, 'musicToggle')
  request.r(i971[2], i971[3], 0, i970, 'soundToggle')
  request.r(i971[4], i971[5], 0, i970, 'vibrateToggle')
  return i970
}

Deserializers["ButtonScale"] = function (request, data, root) {
  var i972 = root || request.c( 'ButtonScale' )
  var i973 = data
  i972.hoverScale = i973[0]
  i972.clickScale = i973[1]
  i972.duration = i973[2]
  i972.baseScale = new pc.Vec3( i973[3], i973[4], i973[5] )
  return i972
}

Deserializers["UnityEngine.UI.Toggle"] = function (request, data, root) {
  var i974 = root || request.c( 'UnityEngine.UI.Toggle' )
  var i975 = data
  i974.toggleTransition = i975[0]
  request.r(i975[1], i975[2], 0, i974, 'graphic')
  i974.onValueChanged = request.d('UnityEngine.UI.Toggle+ToggleEvent', i975[3], i974.onValueChanged)
  request.r(i975[4], i975[5], 0, i974, 'm_Group')
  i974.m_IsOn = !!i975[6]
  i974.m_Navigation = request.d('UnityEngine.UI.Navigation', i975[7], i974.m_Navigation)
  i974.m_Transition = i975[8]
  i974.m_Colors = request.d('UnityEngine.UI.ColorBlock', i975[9], i974.m_Colors)
  i974.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i975[10], i974.m_SpriteState)
  i974.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i975[11], i974.m_AnimationTriggers)
  i974.m_Interactable = !!i975[12]
  request.r(i975[13], i975[14], 0, i974, 'm_TargetGraphic')
  return i974
}

Deserializers["UnityEngine.UI.Toggle+ToggleEvent"] = function (request, data, root) {
  var i976 = root || request.c( 'UnityEngine.UI.Toggle+ToggleEvent' )
  var i977 = data
  i976.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i977[0], i976.m_PersistentCalls)
  return i976
}

Deserializers["UIToggleExtension"] = function (request, data, root) {
  var i978 = root || request.c( 'UIToggleExtension' )
  var i979 = data
  request.r(i979[0], i979[1], 0, i978, 'deactiveObj')
  request.r(i979[2], i979[3], 0, i978, 'activeObj')
  return i978
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i980 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i981 = data
  request.r(i981[0], i981[1], 0, i980, 'm_ObjectArgument')
  i980.m_ObjectArgumentAssemblyTypeName = i981[2]
  i980.m_IntArgument = i981[3]
  i980.m_FloatArgument = i981[4]
  i980.m_StringArgument = i981[5]
  i980.m_BoolArgument = !!i981[6]
  return i980
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i982 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i983 = data
  i982.m_Spacing = i983[0]
  i982.m_ChildForceExpandWidth = !!i983[1]
  i982.m_ChildForceExpandHeight = !!i983[2]
  i982.m_ChildControlWidth = !!i983[3]
  i982.m_ChildControlHeight = !!i983[4]
  i982.m_ChildScaleWidth = !!i983[5]
  i982.m_ChildScaleHeight = !!i983[6]
  i982.m_ReverseArrangement = !!i983[7]
  i982.m_Padding = UnityEngine.RectOffset.FromPaddings(i983[8], i983[9], i983[10], i983[11])
  i982.m_ChildAlignment = i983[12]
  return i982
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i984 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i985 = data
  i984.m_HorizontalFit = i985[0]
  i984.m_VerticalFit = i985[1]
  return i984
}

Deserializers["CheatButton"] = function (request, data, root) {
  var i986 = root || request.c( 'CheatButton' )
  var i987 = data
  request.r(i987[0], i987[1], 0, i986, 'needOff')
  return i986
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i989 = data
  i988.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i989[0], i988.main)
  i988.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i989[1], i988.colorBySpeed)
  i988.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i989[2], i988.colorOverLifetime)
  i988.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i989[3], i988.emission)
  i988.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i989[4], i988.rotationBySpeed)
  i988.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i989[5], i988.rotationOverLifetime)
  i988.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i989[6], i988.shape)
  i988.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i989[7], i988.sizeBySpeed)
  i988.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i989[8], i988.sizeOverLifetime)
  i988.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i989[9], i988.textureSheetAnimation)
  i988.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i989[10], i988.velocityOverLifetime)
  i988.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i989[11], i988.noise)
  i988.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i989[12], i988.inheritVelocity)
  i988.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i989[13], i988.forceOverLifetime)
  i988.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i989[14], i988.limitVelocityOverLifetime)
  i988.useAutoRandomSeed = !!i989[15]
  i988.randomSeed = i989[16]
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i990 = root || new pc.ParticleSystemMain()
  var i991 = data
  i990.duration = i991[0]
  i990.loop = !!i991[1]
  i990.prewarm = !!i991[2]
  i990.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[3], i990.startDelay)
  i990.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[4], i990.startLifetime)
  i990.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[5], i990.startSpeed)
  i990.startSize3D = !!i991[6]
  i990.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[7], i990.startSizeX)
  i990.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[8], i990.startSizeY)
  i990.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[9], i990.startSizeZ)
  i990.startRotation3D = !!i991[10]
  i990.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[11], i990.startRotationX)
  i990.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[12], i990.startRotationY)
  i990.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[13], i990.startRotationZ)
  i990.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i991[14], i990.startColor)
  i990.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[15], i990.gravityModifier)
  i990.simulationSpace = i991[16]
  request.r(i991[17], i991[18], 0, i990, 'customSimulationSpace')
  i990.simulationSpeed = i991[19]
  i990.useUnscaledTime = !!i991[20]
  i990.scalingMode = i991[21]
  i990.playOnAwake = !!i991[22]
  i990.maxParticles = i991[23]
  i990.emitterVelocityMode = i991[24]
  i990.stopAction = i991[25]
  return i990
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i992 = root || new pc.MinMaxCurve()
  var i993 = data
  i992.mode = i993[0]
  i992.curveMin = new pc.AnimationCurve( { keys_flow: i993[1] } )
  i992.curveMax = new pc.AnimationCurve( { keys_flow: i993[2] } )
  i992.curveMultiplier = i993[3]
  i992.constantMin = i993[4]
  i992.constantMax = i993[5]
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i994 = root || new pc.MinMaxGradient()
  var i995 = data
  i994.mode = i995[0]
  i994.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i995[1], i994.gradientMin)
  i994.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i995[2], i994.gradientMax)
  i994.colorMin = new pc.Color(i995[3], i995[4], i995[5], i995[6])
  i994.colorMax = new pc.Color(i995[7], i995[8], i995[9], i995[10])
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i996 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i997 = data
  i996.mode = i997[0]
  var i999 = i997[1]
  var i998 = []
  for(var i = 0; i < i999.length; i += 1) {
    i998.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i999[i + 0]) );
  }
  i996.colorKeys = i998
  var i1001 = i997[2]
  var i1000 = []
  for(var i = 0; i < i1001.length; i += 1) {
    i1000.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i1001[i + 0]) );
  }
  i996.alphaKeys = i1000
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i1002 = root || new pc.ParticleSystemColorBySpeed()
  var i1003 = data
  i1002.enabled = !!i1003[0]
  i1002.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1003[1], i1002.color)
  i1002.range = new pc.Vec2( i1003[2], i1003[3] )
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i1006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i1007 = data
  i1006.color = new pc.Color(i1007[0], i1007[1], i1007[2], i1007[3])
  i1006.time = i1007[4]
  return i1006
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i1010 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i1011 = data
  i1010.alpha = i1011[0]
  i1010.time = i1011[1]
  return i1010
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i1012 = root || new pc.ParticleSystemColorOverLifetime()
  var i1013 = data
  i1012.enabled = !!i1013[0]
  i1012.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1013[1], i1012.color)
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i1014 = root || new pc.ParticleSystemEmitter()
  var i1015 = data
  i1014.enabled = !!i1015[0]
  i1014.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1015[1], i1014.rateOverTime)
  i1014.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1015[2], i1014.rateOverDistance)
  var i1017 = i1015[3]
  var i1016 = []
  for(var i = 0; i < i1017.length; i += 1) {
    i1016.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i1017[i + 0]) );
  }
  i1014.bursts = i1016
  return i1014
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i1020 = root || new pc.ParticleSystemBurst()
  var i1021 = data
  i1020.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1021[0], i1020.count)
  i1020.cycleCount = i1021[1]
  i1020.minCount = i1021[2]
  i1020.maxCount = i1021[3]
  i1020.repeatInterval = i1021[4]
  i1020.time = i1021[5]
  return i1020
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i1022 = root || new pc.ParticleSystemRotationBySpeed()
  var i1023 = data
  i1022.enabled = !!i1023[0]
  i1022.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[1], i1022.x)
  i1022.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[2], i1022.y)
  i1022.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[3], i1022.z)
  i1022.separateAxes = !!i1023[4]
  i1022.range = new pc.Vec2( i1023[5], i1023[6] )
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i1024 = root || new pc.ParticleSystemRotationOverLifetime()
  var i1025 = data
  i1024.enabled = !!i1025[0]
  i1024.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[1], i1024.x)
  i1024.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[2], i1024.y)
  i1024.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[3], i1024.z)
  i1024.separateAxes = !!i1025[4]
  return i1024
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i1026 = root || new pc.ParticleSystemShape()
  var i1027 = data
  i1026.enabled = !!i1027[0]
  i1026.shapeType = i1027[1]
  i1026.randomDirectionAmount = i1027[2]
  i1026.sphericalDirectionAmount = i1027[3]
  i1026.randomPositionAmount = i1027[4]
  i1026.alignToDirection = !!i1027[5]
  i1026.radius = i1027[6]
  i1026.radiusMode = i1027[7]
  i1026.radiusSpread = i1027[8]
  i1026.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[9], i1026.radiusSpeed)
  i1026.radiusThickness = i1027[10]
  i1026.angle = i1027[11]
  i1026.length = i1027[12]
  i1026.boxThickness = new pc.Vec3( i1027[13], i1027[14], i1027[15] )
  i1026.meshShapeType = i1027[16]
  request.r(i1027[17], i1027[18], 0, i1026, 'mesh')
  request.r(i1027[19], i1027[20], 0, i1026, 'meshRenderer')
  request.r(i1027[21], i1027[22], 0, i1026, 'skinnedMeshRenderer')
  i1026.useMeshMaterialIndex = !!i1027[23]
  i1026.meshMaterialIndex = i1027[24]
  i1026.useMeshColors = !!i1027[25]
  i1026.normalOffset = i1027[26]
  i1026.arc = i1027[27]
  i1026.arcMode = i1027[28]
  i1026.arcSpread = i1027[29]
  i1026.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[30], i1026.arcSpeed)
  i1026.donutRadius = i1027[31]
  i1026.position = new pc.Vec3( i1027[32], i1027[33], i1027[34] )
  i1026.rotation = new pc.Vec3( i1027[35], i1027[36], i1027[37] )
  i1026.scale = new pc.Vec3( i1027[38], i1027[39], i1027[40] )
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i1028 = root || new pc.ParticleSystemSizeBySpeed()
  var i1029 = data
  i1028.enabled = !!i1029[0]
  i1028.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[1], i1028.x)
  i1028.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[2], i1028.y)
  i1028.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[3], i1028.z)
  i1028.separateAxes = !!i1029[4]
  i1028.range = new pc.Vec2( i1029[5], i1029[6] )
  return i1028
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i1030 = root || new pc.ParticleSystemSizeOverLifetime()
  var i1031 = data
  i1030.enabled = !!i1031[0]
  i1030.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[1], i1030.x)
  i1030.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[2], i1030.y)
  i1030.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[3], i1030.z)
  i1030.separateAxes = !!i1031[4]
  return i1030
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i1032 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i1033 = data
  i1032.enabled = !!i1033[0]
  i1032.mode = i1033[1]
  i1032.animation = i1033[2]
  i1032.numTilesX = i1033[3]
  i1032.numTilesY = i1033[4]
  i1032.useRandomRow = !!i1033[5]
  i1032.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1033[6], i1032.frameOverTime)
  i1032.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1033[7], i1032.startFrame)
  i1032.cycleCount = i1033[8]
  i1032.rowIndex = i1033[9]
  i1032.flipU = i1033[10]
  i1032.flipV = i1033[11]
  i1032.spriteCount = i1033[12]
  var i1035 = i1033[13]
  var i1034 = []
  for(var i = 0; i < i1035.length; i += 2) {
  request.r(i1035[i + 0], i1035[i + 1], 2, i1034, '')
  }
  i1032.sprites = i1034
  return i1032
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i1038 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i1039 = data
  i1038.enabled = !!i1039[0]
  i1038.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[1], i1038.x)
  i1038.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[2], i1038.y)
  i1038.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[3], i1038.z)
  i1038.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[4], i1038.radial)
  i1038.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[5], i1038.speedModifier)
  i1038.space = i1039[6]
  i1038.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[7], i1038.orbitalX)
  i1038.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[8], i1038.orbitalY)
  i1038.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[9], i1038.orbitalZ)
  i1038.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[10], i1038.orbitalOffsetX)
  i1038.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[11], i1038.orbitalOffsetY)
  i1038.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[12], i1038.orbitalOffsetZ)
  return i1038
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i1040 = root || new pc.ParticleSystemNoise()
  var i1041 = data
  i1040.enabled = !!i1041[0]
  i1040.separateAxes = !!i1041[1]
  i1040.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[2], i1040.strengthX)
  i1040.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[3], i1040.strengthY)
  i1040.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[4], i1040.strengthZ)
  i1040.frequency = i1041[5]
  i1040.damping = !!i1041[6]
  i1040.octaveCount = i1041[7]
  i1040.octaveMultiplier = i1041[8]
  i1040.octaveScale = i1041[9]
  i1040.quality = i1041[10]
  i1040.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[11], i1040.scrollSpeed)
  i1040.scrollSpeedMultiplier = i1041[12]
  i1040.remapEnabled = !!i1041[13]
  i1040.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[14], i1040.remapX)
  i1040.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[15], i1040.remapY)
  i1040.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[16], i1040.remapZ)
  i1040.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[17], i1040.positionAmount)
  i1040.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[18], i1040.rotationAmount)
  i1040.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[19], i1040.sizeAmount)
  return i1040
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i1042 = root || new pc.ParticleSystemInheritVelocity()
  var i1043 = data
  i1042.enabled = !!i1043[0]
  i1042.mode = i1043[1]
  i1042.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[2], i1042.curve)
  return i1042
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i1044 = root || new pc.ParticleSystemForceOverLifetime()
  var i1045 = data
  i1044.enabled = !!i1045[0]
  i1044.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[1], i1044.x)
  i1044.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[2], i1044.y)
  i1044.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[3], i1044.z)
  i1044.space = i1045[4]
  i1044.randomized = !!i1045[5]
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i1046 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i1047 = data
  i1046.enabled = !!i1047[0]
  i1046.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[1], i1046.limit)
  i1046.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[2], i1046.limitX)
  i1046.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[3], i1046.limitY)
  i1046.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[4], i1046.limitZ)
  i1046.dampen = i1047[5]
  i1046.separateAxes = !!i1047[6]
  i1046.space = i1047[7]
  i1046.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[8], i1046.drag)
  i1046.multiplyDragByParticleSize = !!i1047[9]
  i1046.multiplyDragByParticleVelocity = !!i1047[10]
  return i1046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i1048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i1049 = data
  request.r(i1049[0], i1049[1], 0, i1048, 'mesh')
  i1048.meshCount = i1049[2]
  i1048.activeVertexStreamsCount = i1049[3]
  i1048.alignment = i1049[4]
  i1048.renderMode = i1049[5]
  i1048.sortMode = i1049[6]
  i1048.lengthScale = i1049[7]
  i1048.velocityScale = i1049[8]
  i1048.cameraVelocityScale = i1049[9]
  i1048.normalDirection = i1049[10]
  i1048.sortingFudge = i1049[11]
  i1048.minParticleSize = i1049[12]
  i1048.maxParticleSize = i1049[13]
  i1048.pivot = new pc.Vec3( i1049[14], i1049[15], i1049[16] )
  request.r(i1049[17], i1049[18], 0, i1048, 'trailMaterial')
  i1048.applyActiveColorSpace = !!i1049[19]
  i1048.enabled = !!i1049[20]
  request.r(i1049[21], i1049[22], 0, i1048, 'sharedMaterial')
  var i1051 = i1049[23]
  var i1050 = []
  for(var i = 0; i < i1051.length; i += 2) {
  request.r(i1051[i + 0], i1051[i + 1], 2, i1050, '')
  }
  i1048.sharedMaterials = i1050
  i1048.receiveShadows = !!i1049[24]
  i1048.shadowCastingMode = i1049[25]
  i1048.sortingLayerID = i1049[26]
  i1048.sortingOrder = i1049[27]
  i1048.lightmapIndex = i1049[28]
  i1048.lightmapSceneIndex = i1049[29]
  i1048.lightmapScaleOffset = new pc.Vec4( i1049[30], i1049[31], i1049[32], i1049[33] )
  i1048.lightProbeUsage = i1049[34]
  i1048.reflectionProbeUsage = i1049[35]
  return i1048
}

Deserializers["Coffee.UIExtensions.UIParticle"] = function (request, data, root) {
  var i1052 = root || request.c( 'Coffee.UIExtensions.UIParticle' )
  var i1053 = data
  i1052.m_IsTrail = !!i1053[0]
  i1052.m_IgnoreCanvasScaler = !!i1053[1]
  i1052.m_AbsoluteMode = !!i1053[2]
  i1052.m_Scale3D = new pc.Vec3( i1053[3], i1053[4], i1053[5] )
  var i1055 = i1053[6]
  var i1054 = []
  for(var i = 0; i < i1055.length; i += 1) {
    i1054.push( request.d('Coffee.UIExtensions.AnimatableProperty', i1055[i + 0]) );
  }
  i1052.m_AnimatableProperties = i1054
  var i1057 = i1053[7]
  var i1056 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.ParticleSystem')))
  for(var i = 0; i < i1057.length; i += 2) {
  request.r(i1057[i + 0], i1057[i + 1], 1, i1056, '')
  }
  i1052.m_Particles = i1056
  i1052.m_MeshSharing = i1053[8]
  i1052.m_GroupId = i1053[9]
  i1052.m_GroupMaxId = i1053[10]
  i1052.m_PositionMode = i1053[11]
  i1052.m_AutoScaling = !!i1053[12]
  i1052.m_AutoScalingMode = i1053[13]
  i1052.m_UseCustomView = !!i1053[14]
  i1052.m_CustomViewSize = i1053[15]
  i1052.m_TimeScaleMultiplier = i1053[16]
  request.r(i1053[17], i1053[18], 0, i1052, 'm_Material')
  i1052.m_Maskable = !!i1053[19]
  i1052.m_Color = new pc.Color(i1053[20], i1053[21], i1053[22], i1053[23])
  i1052.m_RaycastTarget = !!i1053[24]
  i1052.m_RaycastPadding = new pc.Vec4( i1053[25], i1053[26], i1053[27], i1053[28] )
  return i1052
}

Deserializers["Coffee.UIExtensions.AnimatableProperty"] = function (request, data, root) {
  var i1060 = root || request.c( 'Coffee.UIExtensions.AnimatableProperty' )
  var i1061 = data
  i1060.m_Name = i1061[0]
  i1060.m_Type = i1061[1]
  return i1060
}

Deserializers["EmojiSlot"] = function (request, data, root) {
  var i1064 = root || request.c( 'EmojiSlot' )
  var i1065 = data
  request.r(i1065[0], i1065[1], 0, i1064, 'emojiPrefab')
  return i1064
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i1066 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i1067 = data
  request.r(i1067[0], i1067[1], 0, i1066, 'animatorController')
  request.r(i1067[2], i1067[3], 0, i1066, 'avatar')
  i1066.updateMode = i1067[4]
  i1066.hasTransformHierarchy = !!i1067[5]
  i1066.applyRootMotion = !!i1067[6]
  var i1069 = i1067[7]
  var i1068 = []
  for(var i = 0; i < i1069.length; i += 2) {
  request.r(i1069[i + 0], i1069[i + 1], 2, i1068, '')
  }
  i1066.humanBones = i1068
  i1066.enabled = !!i1067[8]
  return i1066
}

Deserializers["Smiles.ParentFitter"] = function (request, data, root) {
  var i1072 = root || request.c( 'Smiles.ParentFitter' )
  var i1073 = data
  return i1072
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1074 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1075 = data
  i1074.center = new pc.Vec3( i1075[0], i1075[1], i1075[2] )
  i1074.size = new pc.Vec3( i1075[3], i1075[4], i1075[5] )
  i1074.enabled = !!i1075[6]
  i1074.isTrigger = !!i1075[7]
  request.r(i1075[8], i1075[9], 0, i1074, 'material')
  return i1074
}

Deserializers["DualDirectionEffect"] = function (request, data, root) {
  var i1076 = root || request.c( 'DualDirectionEffect' )
  var i1077 = data
  var i1079 = i1077[0]
  var i1078 = []
  for(var i = 0; i < i1079.length; i += 2) {
  request.r(i1079[i + 0], i1079[i + 1], 2, i1078, '')
  }
  i1076._renderers = i1078
  var i1081 = i1077[1]
  var i1080 = []
  for(var i = 0; i < i1081.length; i += 2) {
  request.r(i1081[i + 0], i1081[i + 1], 2, i1080, '')
  }
  i1076.particleSystems = i1080
  return i1076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1087 = data
  i1086.name = i1087[0]
  i1086.atlasId = i1087[1]
  i1086.mipmapCount = i1087[2]
  i1086.hdr = !!i1087[3]
  i1086.size = i1087[4]
  i1086.anisoLevel = i1087[5]
  i1086.filterMode = i1087[6]
  var i1089 = i1087[7]
  var i1088 = []
  for(var i = 0; i < i1089.length; i += 4) {
    i1088.push( UnityEngine.Rect.MinMaxRect(i1089[i + 0], i1089[i + 1], i1089[i + 2], i1089[i + 3]) );
  }
  i1086.rects = i1088
  i1086.wrapU = i1087[8]
  i1086.wrapV = i1087[9]
  return i1086
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1092 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1093 = data
  i1092.name = i1093[0]
  i1092.index = i1093[1]
  i1092.startup = !!i1093[2]
  return i1092
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1094 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1095 = data
  i1094.aspect = i1095[0]
  i1094.orthographic = !!i1095[1]
  i1094.orthographicSize = i1095[2]
  i1094.backgroundColor = new pc.Color(i1095[3], i1095[4], i1095[5], i1095[6])
  i1094.nearClipPlane = i1095[7]
  i1094.farClipPlane = i1095[8]
  i1094.fieldOfView = i1095[9]
  i1094.depth = i1095[10]
  i1094.clearFlags = i1095[11]
  i1094.cullingMask = i1095[12]
  i1094.rect = i1095[13]
  request.r(i1095[14], i1095[15], 0, i1094, 'targetTexture')
  i1094.usePhysicalProperties = !!i1095[16]
  i1094.focalLength = i1095[17]
  i1094.sensorSize = new pc.Vec2( i1095[18], i1095[19] )
  i1094.lensShift = new pc.Vec2( i1095[20], i1095[21] )
  i1094.gateFit = i1095[22]
  i1094.commandBufferCount = i1095[23]
  i1094.cameraType = i1095[24]
  i1094.enabled = !!i1095[25]
  return i1094
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalCameraData"] = function (request, data, root) {
  var i1096 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalCameraData' )
  var i1097 = data
  i1096.m_RenderShadows = !!i1097[0]
  i1096.m_RequiresDepthTextureOption = i1097[1]
  i1096.m_RequiresOpaqueTextureOption = i1097[2]
  i1096.m_CameraType = i1097[3]
  var i1099 = i1097[4]
  var i1098 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Camera')))
  for(var i = 0; i < i1099.length; i += 2) {
  request.r(i1099[i + 0], i1099[i + 1], 1, i1098, '')
  }
  i1096.m_Cameras = i1098
  i1096.m_RendererIndex = i1097[5]
  i1096.m_VolumeLayerMask = UnityEngine.LayerMask.FromIntegerValue( i1097[6] )
  request.r(i1097[7], i1097[8], 0, i1096, 'm_VolumeTrigger')
  i1096.m_VolumeFrameworkUpdateModeOption = i1097[9]
  i1096.m_RenderPostProcessing = !!i1097[10]
  i1096.m_Antialiasing = i1097[11]
  i1096.m_AntialiasingQuality = i1097[12]
  i1096.m_StopNaN = !!i1097[13]
  i1096.m_Dithering = !!i1097[14]
  i1096.m_ClearDepth = !!i1097[15]
  i1096.m_AllowXRRendering = !!i1097[16]
  i1096.m_AllowHDROutput = !!i1097[17]
  i1096.m_UseScreenCoordOverride = !!i1097[18]
  i1096.m_ScreenSizeOverride = new pc.Vec4( i1097[19], i1097[20], i1097[21], i1097[22] )
  i1096.m_ScreenCoordScaleBias = new pc.Vec4( i1097[23], i1097[24], i1097[25], i1097[26] )
  i1096.m_RequiresDepthTexture = !!i1097[27]
  i1096.m_RequiresColorTexture = !!i1097[28]
  i1096.m_Version = i1097[29]
  i1096.m_TaaSettings = request.d('UnityEngine.Rendering.Universal.TemporalAA+Settings', i1097[30], i1096.m_TaaSettings)
  return i1096
}

Deserializers["UnityEngine.Rendering.Universal.TemporalAA+Settings"] = function (request, data, root) {
  var i1102 = root || request.c( 'UnityEngine.Rendering.Universal.TemporalAA+Settings' )
  var i1103 = data
  i1102.m_Quality = i1103[0]
  i1102.m_FrameInfluence = i1103[1]
  i1102.m_JitterScale = i1103[2]
  i1102.m_MipBias = i1103[3]
  i1102.m_VarianceClampScale = i1103[4]
  i1102.m_ContrastAdaptiveSharpening = i1103[5]
  return i1102
}

Deserializers["CameraResponsive"] = function (request, data, root) {
  var i1104 = root || request.c( 'CameraResponsive' )
  var i1105 = data
  i1104.orthoSizeV = i1105[0]
  i1104.orthoSizeVTall = i1105[1]
  i1104.orthoSizeH = i1105[2]
  i1104.orthoSizeTab = i1105[3]
  return i1104
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1106 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1107 = data
  i1106.type = i1107[0]
  i1106.color = new pc.Color(i1107[1], i1107[2], i1107[3], i1107[4])
  i1106.cullingMask = i1107[5]
  i1106.intensity = i1107[6]
  i1106.range = i1107[7]
  i1106.spotAngle = i1107[8]
  i1106.shadows = i1107[9]
  i1106.shadowNormalBias = i1107[10]
  i1106.shadowBias = i1107[11]
  i1106.shadowStrength = i1107[12]
  i1106.shadowResolution = i1107[13]
  i1106.lightmapBakeType = i1107[14]
  i1106.renderMode = i1107[15]
  request.r(i1107[16], i1107[17], 0, i1106, 'cookie')
  i1106.cookieSize = i1107[18]
  i1106.shadowNearPlane = i1107[19]
  i1106.enabled = !!i1107[20]
  return i1106
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i1108 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i1109 = data
  i1108.m_Version = i1109[0]
  i1108.m_UsePipelineSettings = !!i1109[1]
  i1108.m_AdditionalLightsShadowResolutionTier = i1109[2]
  i1108.m_LightLayerMask = i1109[3]
  i1108.m_RenderingLayers = i1109[4]
  i1108.m_CustomShadowLayers = !!i1109[5]
  i1108.m_ShadowLayerMask = i1109[6]
  i1108.m_ShadowRenderingLayers = i1109[7]
  i1108.m_LightCookieSize = new pc.Vec2( i1109[8], i1109[9] )
  i1108.m_LightCookieOffset = new pc.Vec2( i1109[10], i1109[11] )
  i1108.m_SoftShadowQuality = i1109[12]
  return i1108
}

Deserializers["TowerHeightController"] = function (request, data, root) {
  var i1110 = root || request.c( 'TowerHeightController' )
  var i1111 = data
  return i1110
}

Deserializers["TowerController"] = function (request, data, root) {
  var i1112 = root || request.c( 'TowerController' )
  var i1113 = data
  request.r(i1113[0], i1113[1], 0, i1112, 'spawner')
  request.r(i1113[2], i1113[3], 0, i1112, 'rotator')
  request.r(i1113[4], i1113[5], 0, i1112, 'towerContainer')
  request.r(i1113[6], i1113[7], 0, i1112, 'activeBlock')
  request.r(i1113[8], i1113[9], 0, i1112, 'heightController')
  request.r(i1113[10], i1113[11], 0, i1112, 'limitLine')
  return i1112
}

Deserializers["TowerRotator"] = function (request, data, root) {
  var i1114 = root || request.c( 'TowerRotator' )
  var i1115 = data
  return i1114
}

Deserializers["BlockSpawner"] = function (request, data, root) {
  var i1116 = root || request.c( 'BlockSpawner' )
  var i1117 = data
  return i1116
}

Deserializers["GhostBlockController"] = function (request, data, root) {
  var i1118 = root || request.c( 'GhostBlockController' )
  var i1119 = data
  request.r(i1119[0], i1119[1], 0, i1118, 'existingBlock')
  request.r(i1119[2], i1119[3], 0, i1118, 'CurrentShape')
  request.r(i1119[4], i1119[5], 0, i1118, 'cellPrefab')
  request.r(i1119[6], i1119[7], 0, i1118, 'meshLibrary')
  var i1121 = i1119[8]
  var i1120 = new (System.Collections.Generic.List$1(Bridge.ns('BlockVisual')))
  for(var i = 0; i < i1121.length; i += 2) {
  request.r(i1121[i + 0], i1121[i + 1], 1, i1120, '')
  }
  i1118.blockVisuals = i1120
  request.r(i1119[9], i1119[10], 0, i1118, 'palette')
  return i1118
}

Deserializers["ActiveBlockController"] = function (request, data, root) {
  var i1124 = root || request.c( 'ActiveBlockController' )
  var i1125 = data
  request.r(i1125[0], i1125[1], 0, i1124, 'CurrentShape')
  request.r(i1125[2], i1125[3], 0, i1124, 'cellPrefab')
  request.r(i1125[4], i1125[5], 0, i1124, 'meshLibrary')
  var i1127 = i1125[6]
  var i1126 = new (System.Collections.Generic.List$1(Bridge.ns('BlockVisual')))
  for(var i = 0; i < i1127.length; i += 2) {
  request.r(i1127[i + 0], i1127[i + 1], 1, i1126, '')
  }
  i1124.blockVisuals = i1126
  i1124.faceSwitchThreshold = i1125[7]
  request.r(i1125[8], i1125[9], 0, i1124, 'floodIcon')
  return i1124
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1128 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1129 = data
  i1128.m_UiScaleMode = i1129[0]
  i1128.m_ReferencePixelsPerUnit = i1129[1]
  i1128.m_ScaleFactor = i1129[2]
  i1128.m_ReferenceResolution = new pc.Vec2( i1129[3], i1129[4] )
  i1128.m_ScreenMatchMode = i1129[5]
  i1128.m_MatchWidthOrHeight = i1129[6]
  i1128.m_PhysicalUnit = i1129[7]
  i1128.m_FallbackScreenDPI = i1129[8]
  i1128.m_DefaultSpriteDPI = i1129[9]
  i1128.m_DynamicPixelsPerUnit = i1129[10]
  i1128.m_PresetInfoIsWorld = !!i1129[11]
  return i1128
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1130 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1131 = data
  i1130.m_IgnoreReversedGraphics = !!i1131[0]
  i1130.m_BlockingObjects = i1131[1]
  i1130.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1131[2] )
  return i1130
}

Deserializers["SonatFramework.Scripts.UIModule.SafeArea"] = function (request, data, root) {
  var i1132 = root || request.c( 'SonatFramework.Scripts.UIModule.SafeArea' )
  var i1133 = data
  i1132.ConformX = !!i1133[0]
  i1132.ConformY = !!i1133[1]
  i1132.topIg = i1133[2]
  i1132.Logging = !!i1133[3]
  return i1132
}

Deserializers["GameHUD"] = function (request, data, root) {
  var i1134 = root || request.c( 'GameHUD' )
  var i1135 = data
  request.r(i1135[0], i1135[1], 0, i1134, 'levelText')
  request.r(i1135[2], i1135[3], 0, i1134, 'scoreText')
  request.r(i1135[4], i1135[5], 0, i1134, 'scoreFillImage')
  return i1134
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut"] = function (request, data, root) {
  var i1136 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut' )
  var i1137 = data
  i1136.panelOpenName = i1137[0]
  i1136.tracking = i1137[1]
  return i1136
}

Deserializers["ButtonRestart"] = function (request, data, root) {
  var i1138 = root || request.c( 'ButtonRestart' )
  var i1139 = data
  return i1138
}

Deserializers["NextBlockUI"] = function (request, data, root) {
  var i1140 = root || request.c( 'NextBlockUI' )
  var i1141 = data
  request.r(i1141[0], i1141[1], 0, i1140, 'blockImage')
  request.r(i1141[2], i1141[3], 0, i1140, 'slideDirectionIcon')
  return i1140
}

Deserializers["FloodProgressUI"] = function (request, data, root) {
  var i1142 = root || request.c( 'FloodProgressUI' )
  var i1143 = data
  request.r(i1143[0], i1143[1], 0, i1142, 'fillImage')
  request.r(i1143[2], i1143[3], 0, i1142, 'canvasGroup')
  i1142.fillDuration = i1143[4]
  i1142.hideDelay = i1143[5]
  return i1142
}

Deserializers["TimerUI"] = function (request, data, root) {
  var i1144 = root || request.c( 'TimerUI' )
  var i1145 = data
  request.r(i1145[0], i1145[1], 0, i1144, 'timerText')
  request.r(i1145[2], i1145[3], 0, i1144, 'containerImage')
  i1144.flashDuration = i1145[4]
  i1144.maxSaturation = i1145[5]
  i1144.urgentThreshold = i1145[6]
  i1144.urgentTextColor = new pc.Color(i1145[7], i1145[8], i1145[9], i1145[10])
  return i1144
}

Deserializers["BtnNoAds"] = function (request, data, root) {
  var i1146 = root || request.c( 'BtnNoAds' )
  var i1147 = data
  return i1146
}

Deserializers["RotateButtonHandler"] = function (request, data, root) {
  var i1148 = root || request.c( 'RotateButtonHandler' )
  var i1149 = data
  i1148.direction = i1149[0]
  return i1148
}

Deserializers["RotateLoadingIndicator"] = function (request, data, root) {
  var i1150 = root || request.c( 'RotateLoadingIndicator' )
  var i1151 = data
  i1150._direction = i1151[0]
  return i1150
}

Deserializers["GameHistorySystem"] = function (request, data, root) {
  var i1152 = root || request.c( 'GameHistorySystem' )
  var i1153 = data
  i1152.snapshotCount = i1153[0]
  return i1152
}

Deserializers["UIBoosterUndo"] = function (request, data, root) {
  var i1154 = root || request.c( 'UIBoosterUndo' )
  var i1155 = data
  i1154.countPerLevel = i1155[0]
  i1154.boosterType = i1155[1]
  i1154.unlockLevel = i1155[2]
  request.r(i1155[3], i1155[4], 0, i1154, 'button')
  request.r(i1155[5], i1155[6], 0, i1154, 'txtCount')
  request.r(i1155[7], i1155[8], 0, i1154, 'normalIcon')
  request.r(i1155[9], i1155[10], 0, i1154, 'adsIcon')
  return i1154
}

Deserializers["UnityEngine.UI.LayoutElement"] = function (request, data, root) {
  var i1156 = root || request.c( 'UnityEngine.UI.LayoutElement' )
  var i1157 = data
  i1156.m_IgnoreLayout = !!i1157[0]
  i1156.m_MinWidth = i1157[1]
  i1156.m_MinHeight = i1157[2]
  i1156.m_PreferredWidth = i1157[3]
  i1156.m_PreferredHeight = i1157[4]
  i1156.m_FlexibleWidth = i1157[5]
  i1156.m_FlexibleHeight = i1157[6]
  i1156.m_LayoutPriority = i1157[7]
  return i1156
}

Deserializers["SonatFramework.Scripts.UIModule.PanelManager"] = function (request, data, root) {
  var i1158 = root || request.c( 'SonatFramework.Scripts.UIModule.PanelManager' )
  var i1159 = data
  i1158.OnPanelsUpdated = request.d('System.Action', i1159[0], i1158.OnPanelsUpdated)
  return i1158
}

Deserializers["TextScale"] = function (request, data, root) {
  var i1160 = root || request.c( 'TextScale' )
  var i1161 = data
  i1160.scaleUp = i1161[0]
  i1160.duration = i1161[1]
  return i1160
}

Deserializers["GameManager"] = function (request, data, root) {
  var i1162 = root || request.c( 'GameManager' )
  var i1163 = data
  request.r(i1163[0], i1163[1], 0, i1162, 'ecWin')
  request.r(i1163[2], i1163[3], 0, i1162, 'ecLose')
  i1162.isGameWin = !!i1163[4]
  request.r(i1163[5], i1163[6], 0, i1162, 'CurrentLevelData')
  request.r(i1163[7], i1163[8], 0, i1162, 'manualLevelData')
  request.r(i1163[9], i1163[10], 0, i1162, 'gameConfig')
  i1162.CurrentLevelIndex = i1163[11]
  return i1162
}

Deserializers["CheatManager"] = function (request, data, root) {
  var i1164 = root || request.c( 'CheatManager' )
  var i1165 = data
  return i1164
}

Deserializers["GridManager"] = function (request, data, root) {
  var i1166 = root || request.c( 'GridManager' )
  var i1167 = data
  request.r(i1167[0], i1167[1], 0, i1166, 'config')
  request.r(i1167[2], i1167[3], 0, i1166, 'breakEffectPrefab')
  request.r(i1167[4], i1167[5], 0, i1166, 'meshLibrary')
  i1166.gridData = request.d('GridData', i1167[6], i1166.gridData)
  request.r(i1167[7], i1167[8], 0, i1166, 'vfx')
  return i1166
}

Deserializers["GridData"] = function (request, data, root) {
  var i1168 = root || request.c( 'GridData' )
  var i1169 = data
  return i1168
}

Deserializers["ScoreManager"] = function (request, data, root) {
  var i1170 = root || request.c( 'ScoreManager' )
  var i1171 = data
  return i1170
}

Deserializers["InputManager"] = function (request, data, root) {
  var i1172 = root || request.c( 'InputManager' )
  var i1173 = data
  request.r(i1173[0], i1173[1], 0, i1172, 'gameConfig')
  return i1172
}

Deserializers["Booster.HammerInputHandler"] = function (request, data, root) {
  var i1174 = root || request.c( 'Booster.HammerInputHandler' )
  var i1175 = data
  i1174.holdTimeToConfirm = i1175[0]
  request.r(i1175[1], i1175[2], 0, i1174, 'highlightMaterial')
  request.r(i1175[3], i1175[4], 0, i1174, 'mainCamera')
  return i1174
}

Deserializers["TimeManager"] = function (request, data, root) {
  var i1176 = root || request.c( 'TimeManager' )
  var i1177 = data
  request.r(i1177[0], i1177[1], 0, i1176, 'textTimer')
  request.r(i1177[2], i1177[3], 0, i1176, 'warningImage')
  i1176.startTime = i1177[4]
  i1176.timeWarning = i1177[5]
  return i1176
}

Deserializers["ObjectPoolManager"] = function (request, data, root) {
  var i1178 = root || request.c( 'ObjectPoolManager' )
  var i1179 = data
  return i1178
}

Deserializers["BlockFactory"] = function (request, data, root) {
  var i1180 = root || request.c( 'BlockFactory' )
  var i1181 = data
  request.r(i1181[0], i1181[1], 0, i1180, 'singleBlockPrefab')
  return i1180
}

Deserializers["AudioManager"] = function (request, data, root) {
  var i1182 = root || request.c( 'AudioManager' )
  var i1183 = data
  request.r(i1183[0], i1183[1], 0, i1182, 'bgmSource')
  request.r(i1183[2], i1183[3], 0, i1182, 'sfxSource')
  request.r(i1183[4], i1183[5], 0, i1182, 'bgm')
  request.r(i1183[6], i1183[7], 0, i1182, 'merge')
  request.r(i1183[8], i1183[9], 0, i1182, 'warning')
  request.r(i1183[10], i1183[11], 0, i1182, 'gameLose')
  request.r(i1183[12], i1183[13], 0, i1182, 'gameWin')
  return i1182
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1184 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1185 = data
  request.r(i1185[0], i1185[1], 0, i1184, 'clip')
  request.r(i1185[2], i1185[3], 0, i1184, 'outputAudioMixerGroup')
  i1184.playOnAwake = !!i1185[4]
  i1184.loop = !!i1185[5]
  i1184.time = i1185[6]
  i1184.volume = i1185[7]
  i1184.pitch = i1185[8]
  i1184.enabled = !!i1185[9]
  return i1184
}

Deserializers["Difficulty.DifficultyManager"] = function (request, data, root) {
  var i1186 = root || request.c( 'Difficulty.DifficultyManager' )
  var i1187 = data
  request.r(i1187[0], i1187[1], 0, i1186, 'defaultConfig')
  request.r(i1187[2], i1187[3], 0, i1186, 'defaultShapePool')
  return i1186
}

Deserializers["TutorialManager"] = function (request, data, root) {
  var i1188 = root || request.c( 'TutorialManager' )
  var i1189 = data
  request.r(i1189[0], i1189[1], 0, i1188, 'textTutorial')
  request.r(i1189[2], i1189[3], 0, i1188, 'handTutorial')
  request.r(i1189[4], i1189[5], 0, i1188, 'tut')
  i1188.scaleUp = i1189[6]
  i1188.duration = i1189[7]
  i1188.moveDistance = i1189[8]
  i1188.moveDuration = i1189[9]
  return i1188
}

Deserializers["ResponsiveManager"] = function (request, data, root) {
  var i1190 = root || request.c( 'ResponsiveManager' )
  var i1191 = data
  i1190.screenType = i1191[0]
  return i1190
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1192 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1193 = data
  request.r(i1193[0], i1193[1], 0, i1192, 'm_FirstSelected')
  i1192.m_sendNavigationEvents = !!i1193[2]
  i1192.m_DragThreshold = i1193[3]
  return i1192
}

Deserializers["UnityEngine.InputSystem.UI.InputSystemUIInputModule"] = function (request, data, root) {
  var i1194 = root || request.c( 'UnityEngine.InputSystem.UI.InputSystemUIInputModule' )
  var i1195 = data
  i1194.m_MoveRepeatDelay = i1195[0]
  i1194.m_MoveRepeatRate = i1195[1]
  request.r(i1195[2], i1195[3], 0, i1194, 'm_XRTrackingOrigin')
  request.r(i1195[4], i1195[5], 0, i1194, 'm_ActionsAsset')
  request.r(i1195[6], i1195[7], 0, i1194, 'm_PointAction')
  request.r(i1195[8], i1195[9], 0, i1194, 'm_MoveAction')
  request.r(i1195[10], i1195[11], 0, i1194, 'm_SubmitAction')
  request.r(i1195[12], i1195[13], 0, i1194, 'm_CancelAction')
  request.r(i1195[14], i1195[15], 0, i1194, 'm_LeftClickAction')
  request.r(i1195[16], i1195[17], 0, i1194, 'm_MiddleClickAction')
  request.r(i1195[18], i1195[19], 0, i1194, 'm_RightClickAction')
  request.r(i1195[20], i1195[21], 0, i1194, 'm_ScrollWheelAction')
  request.r(i1195[22], i1195[23], 0, i1194, 'm_TrackedDevicePositionAction')
  request.r(i1195[24], i1195[25], 0, i1194, 'm_TrackedDeviceOrientationAction')
  i1194.m_DeselectOnBackgroundClick = !!i1195[26]
  i1194.m_PointerBehavior = i1195[27]
  i1194.m_CursorLockBehavior = i1195[28]
  i1194.m_ScrollDeltaPerTick = i1195[29]
  i1194.m_SendPointerHoverToParent = !!i1195[30]
  return i1194
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1196 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1197 = data
  i1196.ambientIntensity = i1197[0]
  i1196.reflectionIntensity = i1197[1]
  i1196.ambientMode = i1197[2]
  i1196.ambientLight = new pc.Color(i1197[3], i1197[4], i1197[5], i1197[6])
  i1196.ambientSkyColor = new pc.Color(i1197[7], i1197[8], i1197[9], i1197[10])
  i1196.ambientGroundColor = new pc.Color(i1197[11], i1197[12], i1197[13], i1197[14])
  i1196.ambientEquatorColor = new pc.Color(i1197[15], i1197[16], i1197[17], i1197[18])
  i1196.fogColor = new pc.Color(i1197[19], i1197[20], i1197[21], i1197[22])
  i1196.fogEndDistance = i1197[23]
  i1196.fogStartDistance = i1197[24]
  i1196.fogDensity = i1197[25]
  i1196.fog = !!i1197[26]
  request.r(i1197[27], i1197[28], 0, i1196, 'skybox')
  i1196.fogMode = i1197[29]
  var i1199 = i1197[30]
  var i1198 = []
  for(var i = 0; i < i1199.length; i += 1) {
    i1198.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1199[i + 0]) );
  }
  i1196.lightmaps = i1198
  i1196.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1197[31], i1196.lightProbes)
  i1196.lightmapsMode = i1197[32]
  i1196.mixedBakeMode = i1197[33]
  i1196.environmentLightingMode = i1197[34]
  i1196.ambientProbe = new pc.SphericalHarmonicsL2(i1197[35])
  i1196.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i1197[36])
  i1196.useReferenceAmbientProbe = !!i1197[37]
  request.r(i1197[38], i1197[39], 0, i1196, 'customReflection')
  request.r(i1197[40], i1197[41], 0, i1196, 'defaultReflection')
  i1196.defaultReflectionMode = i1197[42]
  i1196.defaultReflectionResolution = i1197[43]
  i1196.sunLightObjectId = i1197[44]
  i1196.pixelLightCount = i1197[45]
  i1196.defaultReflectionHDR = !!i1197[46]
  i1196.hasLightDataAsset = !!i1197[47]
  i1196.hasManualGenerate = !!i1197[48]
  return i1196
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1202 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1203 = data
  request.r(i1203[0], i1203[1], 0, i1202, 'lightmapColor')
  request.r(i1203[2], i1203[3], 0, i1202, 'lightmapDirection')
  return i1202
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1204 = root || new UnityEngine.LightProbes()
  var i1205 = data
  return i1204
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1212 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1213 = data
  var i1215 = i1213[0]
  var i1214 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1215.length; i += 1) {
    i1214.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1215[i + 0]));
  }
  i1212.ShaderCompilationErrors = i1214
  i1212.name = i1213[1]
  i1212.guid = i1213[2]
  var i1217 = i1213[3]
  var i1216 = []
  for(var i = 0; i < i1217.length; i += 1) {
    i1216.push( i1217[i + 0] );
  }
  i1212.shaderDefinedKeywords = i1216
  var i1219 = i1213[4]
  var i1218 = []
  for(var i = 0; i < i1219.length; i += 1) {
    i1218.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1219[i + 0]) );
  }
  i1212.passes = i1218
  var i1221 = i1213[5]
  var i1220 = []
  for(var i = 0; i < i1221.length; i += 1) {
    i1220.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1221[i + 0]) );
  }
  i1212.usePasses = i1220
  var i1223 = i1213[6]
  var i1222 = []
  for(var i = 0; i < i1223.length; i += 1) {
    i1222.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1223[i + 0]) );
  }
  i1212.defaultParameterValues = i1222
  request.r(i1213[7], i1213[8], 0, i1212, 'unityFallbackShader')
  i1212.readDepth = !!i1213[9]
  i1212.hasDepthOnlyPass = !!i1213[10]
  i1212.isCreatedByShaderGraph = !!i1213[11]
  i1212.disableBatching = !!i1213[12]
  i1212.compiled = !!i1213[13]
  return i1212
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1226 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1227 = data
  i1226.shaderName = i1227[0]
  i1226.errorMessage = i1227[1]
  return i1226
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1232 = root || new pc.UnityShaderPass()
  var i1233 = data
  i1232.id = i1233[0]
  i1232.subShaderIndex = i1233[1]
  i1232.name = i1233[2]
  i1232.passType = i1233[3]
  i1232.grabPassTextureName = i1233[4]
  i1232.usePass = !!i1233[5]
  i1232.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[6], i1232.zTest)
  i1232.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[7], i1232.zWrite)
  i1232.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[8], i1232.culling)
  i1232.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1233[9], i1232.blending)
  i1232.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1233[10], i1232.alphaBlending)
  i1232.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[11], i1232.colorWriteMask)
  i1232.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[12], i1232.offsetUnits)
  i1232.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[13], i1232.offsetFactor)
  i1232.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[14], i1232.stencilRef)
  i1232.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[15], i1232.stencilReadMask)
  i1232.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1233[16], i1232.stencilWriteMask)
  i1232.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1233[17], i1232.stencilOp)
  i1232.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1233[18], i1232.stencilOpFront)
  i1232.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1233[19], i1232.stencilOpBack)
  var i1235 = i1233[20]
  var i1234 = []
  for(var i = 0; i < i1235.length; i += 1) {
    i1234.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1235[i + 0]) );
  }
  i1232.tags = i1234
  var i1237 = i1233[21]
  var i1236 = []
  for(var i = 0; i < i1237.length; i += 1) {
    i1236.push( i1237[i + 0] );
  }
  i1232.passDefinedKeywords = i1236
  var i1239 = i1233[22]
  var i1238 = []
  for(var i = 0; i < i1239.length; i += 1) {
    i1238.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1239[i + 0]) );
  }
  i1232.passDefinedKeywordGroups = i1238
  var i1241 = i1233[23]
  var i1240 = []
  for(var i = 0; i < i1241.length; i += 1) {
    i1240.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1241[i + 0]) );
  }
  i1232.variants = i1240
  var i1243 = i1233[24]
  var i1242 = []
  for(var i = 0; i < i1243.length; i += 1) {
    i1242.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1243[i + 0]) );
  }
  i1232.excludedVariants = i1242
  i1232.hasDepthReader = !!i1233[25]
  return i1232
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1245 = data
  i1244.val = i1245[0]
  i1244.name = i1245[1]
  return i1244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1247 = data
  i1246.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1247[0], i1246.src)
  i1246.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1247[1], i1246.dst)
  i1246.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1247[2], i1246.op)
  return i1246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1248 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1249 = data
  i1248.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1249[0], i1248.pass)
  i1248.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1249[1], i1248.fail)
  i1248.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1249[2], i1248.zFail)
  i1248.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1249[3], i1248.comp)
  return i1248
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1252 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1253 = data
  i1252.name = i1253[0]
  i1252.value = i1253[1]
  return i1252
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1256 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1257 = data
  var i1259 = i1257[0]
  var i1258 = []
  for(var i = 0; i < i1259.length; i += 1) {
    i1258.push( i1259[i + 0] );
  }
  i1256.keywords = i1258
  i1256.hasDiscard = !!i1257[1]
  return i1256
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1262 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1263 = data
  i1262.passId = i1263[0]
  i1262.subShaderIndex = i1263[1]
  var i1265 = i1263[2]
  var i1264 = []
  for(var i = 0; i < i1265.length; i += 1) {
    i1264.push( i1265[i + 0] );
  }
  i1262.keywords = i1264
  i1262.vertexProgram = i1263[3]
  i1262.fragmentProgram = i1263[4]
  i1262.exportedForWebGl2 = !!i1263[5]
  i1262.readDepth = !!i1263[6]
  return i1262
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1269 = data
  request.r(i1269[0], i1269[1], 0, i1268, 'shader')
  i1268.pass = i1269[2]
  return i1268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1272 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1273 = data
  i1272.name = i1273[0]
  i1272.type = i1273[1]
  i1272.value = new pc.Vec4( i1273[2], i1273[3], i1273[4], i1273[5] )
  i1272.textureValue = i1273[6]
  i1272.shaderPropertyFlag = i1273[7]
  return i1272
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1275 = data
  i1274.name = i1275[0]
  request.r(i1275[1], i1275[2], 0, i1274, 'texture')
  i1274.aabb = i1275[3]
  i1274.vertices = i1275[4]
  i1274.triangles = i1275[5]
  i1274.textureRect = UnityEngine.Rect.MinMaxRect(i1275[6], i1275[7], i1275[8], i1275[9])
  i1274.packedRect = UnityEngine.Rect.MinMaxRect(i1275[10], i1275[11], i1275[12], i1275[13])
  i1274.border = new pc.Vec4( i1275[14], i1275[15], i1275[16], i1275[17] )
  i1274.transparency = i1275[18]
  i1274.bounds = i1275[19]
  i1274.pixelsPerUnit = i1275[20]
  i1274.textureWidth = i1275[21]
  i1274.textureHeight = i1275[22]
  i1274.nativeSize = new pc.Vec2( i1275[23], i1275[24] )
  i1274.pivot = new pc.Vec2( i1275[25], i1275[26] )
  i1274.textureRectOffset = new pc.Vec2( i1275[27], i1275[28] )
  return i1274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1277 = data
  i1276.name = i1277[0]
  return i1276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1279 = data
  i1278.name = i1279[0]
  i1278.wrapMode = i1279[1]
  i1278.isLooping = !!i1279[2]
  i1278.length = i1279[3]
  var i1281 = i1279[4]
  var i1280 = []
  for(var i = 0; i < i1281.length; i += 1) {
    i1280.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1281[i + 0]) );
  }
  i1278.curves = i1280
  var i1283 = i1279[5]
  var i1282 = []
  for(var i = 0; i < i1283.length; i += 1) {
    i1282.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1283[i + 0]) );
  }
  i1278.events = i1282
  i1278.halfPrecision = !!i1279[6]
  i1278._frameRate = i1279[7]
  i1278.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1279[8], i1278.localBounds)
  i1278.hasMuscleCurves = !!i1279[9]
  var i1285 = i1279[10]
  var i1284 = []
  for(var i = 0; i < i1285.length; i += 1) {
    i1284.push( i1285[i + 0] );
  }
  i1278.clipMuscleConstant = i1284
  i1278.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1279[11], i1278.clipBindingConstant)
  return i1278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1288 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1289 = data
  i1288.path = i1289[0]
  i1288.hash = i1289[1]
  i1288.componentType = i1289[2]
  i1288.property = i1289[3]
  i1288.keys = i1289[4]
  var i1291 = i1289[5]
  var i1290 = []
  for(var i = 0; i < i1291.length; i += 1) {
    i1290.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1291[i + 0]) );
  }
  i1288.objectReferenceKeys = i1290
  return i1288
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1295 = data
  i1294.time = i1295[0]
  request.r(i1295[1], i1295[2], 0, i1294, 'value')
  return i1294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1299 = data
  i1298.functionName = i1299[0]
  i1298.floatParameter = i1299[1]
  i1298.intParameter = i1299[2]
  i1298.stringParameter = i1299[3]
  request.r(i1299[4], i1299[5], 0, i1298, 'objectReferenceParameter')
  i1298.time = i1299[6]
  return i1298
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1300 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1301 = data
  i1300.center = new pc.Vec3( i1301[0], i1301[1], i1301[2] )
  i1300.extends = new pc.Vec3( i1301[3], i1301[4], i1301[5] )
  return i1300
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1305 = data
  var i1307 = i1305[0]
  var i1306 = []
  for(var i = 0; i < i1307.length; i += 1) {
    i1306.push( i1307[i + 0] );
  }
  i1304.genericBindings = i1306
  var i1309 = i1305[1]
  var i1308 = []
  for(var i = 0; i < i1309.length; i += 1) {
    i1308.push( i1309[i + 0] );
  }
  i1304.pptrCurveMapping = i1308
  return i1304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1310 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1311 = data
  i1310.name = i1311[0]
  i1310.ascent = i1311[1]
  i1310.originalLineHeight = i1311[2]
  i1310.fontSize = i1311[3]
  var i1313 = i1311[4]
  var i1312 = []
  for(var i = 0; i < i1313.length; i += 1) {
    i1312.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1313[i + 0]) );
  }
  i1310.characterInfo = i1312
  request.r(i1311[5], i1311[6], 0, i1310, 'texture')
  i1310.originalFontSize = i1311[7]
  return i1310
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1316 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1317 = data
  i1316.index = i1317[0]
  i1316.advance = i1317[1]
  i1316.bearing = i1317[2]
  i1316.glyphWidth = i1317[3]
  i1316.glyphHeight = i1317[4]
  i1316.minX = i1317[5]
  i1316.maxX = i1317[6]
  i1316.minY = i1317[7]
  i1316.maxY = i1317[8]
  i1316.uvBottomLeftX = i1317[9]
  i1316.uvBottomLeftY = i1317[10]
  i1316.uvBottomRightX = i1317[11]
  i1316.uvBottomRightY = i1317[12]
  i1316.uvTopLeftX = i1317[13]
  i1316.uvTopLeftY = i1317[14]
  i1316.uvTopRightX = i1317[15]
  i1316.uvTopRightY = i1317[16]
  return i1316
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i1318 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i1319 = data
  i1318.name = i1319[0]
  var i1321 = i1319[1]
  var i1320 = []
  for(var i = 0; i < i1321.length; i += 1) {
    i1320.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i1321[i + 0]) );
  }
  i1318.layers = i1320
  var i1323 = i1319[2]
  var i1322 = []
  for(var i = 0; i < i1323.length; i += 1) {
    i1322.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1323[i + 0]) );
  }
  i1318.parameters = i1322
  i1318.animationClips = i1319[3]
  i1318.avatarUnsupported = i1319[4]
  return i1318
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1327 = data
  i1326.name = i1327[0]
  i1326.defaultWeight = i1327[1]
  i1326.blendingMode = i1327[2]
  i1326.avatarMask = i1327[3]
  i1326.syncedLayerIndex = i1327[4]
  i1326.syncedLayerAffectsTiming = !!i1327[5]
  i1326.syncedLayers = i1327[6]
  i1326.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1327[7], i1326.stateMachine)
  return i1326
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1328 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1329 = data
  i1328.id = i1329[0]
  i1328.name = i1329[1]
  i1328.path = i1329[2]
  var i1331 = i1329[3]
  var i1330 = []
  for(var i = 0; i < i1331.length; i += 1) {
    i1330.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1331[i + 0]) );
  }
  i1328.states = i1330
  var i1333 = i1329[4]
  var i1332 = []
  for(var i = 0; i < i1333.length; i += 1) {
    i1332.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1333[i + 0]) );
  }
  i1328.machines = i1332
  var i1335 = i1329[5]
  var i1334 = []
  for(var i = 0; i < i1335.length; i += 1) {
    i1334.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1335[i + 0]) );
  }
  i1328.entryStateTransitions = i1334
  var i1337 = i1329[6]
  var i1336 = []
  for(var i = 0; i < i1337.length; i += 1) {
    i1336.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1337[i + 0]) );
  }
  i1328.exitStateTransitions = i1336
  var i1339 = i1329[7]
  var i1338 = []
  for(var i = 0; i < i1339.length; i += 1) {
    i1338.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1339[i + 0]) );
  }
  i1328.anyStateTransitions = i1338
  i1328.defaultStateId = i1329[8]
  return i1328
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1342 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1343 = data
  i1342.id = i1343[0]
  i1342.name = i1343[1]
  i1342.cycleOffset = i1343[2]
  i1342.cycleOffsetParameter = i1343[3]
  i1342.cycleOffsetParameterActive = !!i1343[4]
  i1342.mirror = !!i1343[5]
  i1342.mirrorParameter = i1343[6]
  i1342.mirrorParameterActive = !!i1343[7]
  i1342.motionId = i1343[8]
  i1342.nameHash = i1343[9]
  i1342.fullPathHash = i1343[10]
  i1342.speed = i1343[11]
  i1342.speedParameter = i1343[12]
  i1342.speedParameterActive = !!i1343[13]
  i1342.tag = i1343[14]
  i1342.tagHash = i1343[15]
  i1342.writeDefaultValues = !!i1343[16]
  var i1345 = i1343[17]
  var i1344 = []
  for(var i = 0; i < i1345.length; i += 2) {
  request.r(i1345[i + 0], i1345[i + 1], 2, i1344, '')
  }
  i1342.behaviours = i1344
  var i1347 = i1343[18]
  var i1346 = []
  for(var i = 0; i < i1347.length; i += 1) {
    i1346.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1347[i + 0]) );
  }
  i1342.transitions = i1346
  return i1342
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1352 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1353 = data
  i1352.fullPath = i1353[0]
  i1352.canTransitionToSelf = !!i1353[1]
  i1352.duration = i1353[2]
  i1352.exitTime = i1353[3]
  i1352.hasExitTime = !!i1353[4]
  i1352.hasFixedDuration = !!i1353[5]
  i1352.interruptionSource = i1353[6]
  i1352.offset = i1353[7]
  i1352.orderedInterruption = !!i1353[8]
  i1352.destinationStateId = i1353[9]
  i1352.isExit = !!i1353[10]
  i1352.mute = !!i1353[11]
  i1352.solo = !!i1353[12]
  var i1355 = i1353[13]
  var i1354 = []
  for(var i = 0; i < i1355.length; i += 1) {
    i1354.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1355[i + 0]) );
  }
  i1352.conditions = i1354
  return i1352
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1360 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1361 = data
  i1360.destinationStateId = i1361[0]
  i1360.isExit = !!i1361[1]
  i1360.mute = !!i1361[2]
  i1360.solo = !!i1361[3]
  var i1363 = i1361[4]
  var i1362 = []
  for(var i = 0; i < i1363.length; i += 1) {
    i1362.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1363[i + 0]) );
  }
  i1360.conditions = i1362
  return i1360
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1366 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1367 = data
  i1366.defaultBool = !!i1367[0]
  i1366.defaultFloat = i1367[1]
  i1366.defaultInt = i1367[2]
  i1366.name = i1367[3]
  i1366.nameHash = i1367[4]
  i1366.type = i1367[5]
  return i1366
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1368 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1369 = data
  i1368.name = i1369[0]
  i1368.bytes64 = i1369[1]
  i1368.data = i1369[2]
  return i1368
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1370 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1371 = data
  request.r(i1371[0], i1371[1], 0, i1370, 'atlas')
  i1370.normalStyle = i1371[2]
  i1370.normalSpacingOffset = i1371[3]
  i1370.boldStyle = i1371[4]
  i1370.boldSpacing = i1371[5]
  i1370.italicStyle = i1371[6]
  i1370.tabSize = i1371[7]
  i1370.hashCode = i1371[8]
  request.r(i1371[9], i1371[10], 0, i1370, 'material')
  i1370.materialHashCode = i1371[11]
  i1370.m_Version = i1371[12]
  i1370.m_SourceFontFileGUID = i1371[13]
  request.r(i1371[14], i1371[15], 0, i1370, 'm_SourceFontFile_EditorRef')
  request.r(i1371[16], i1371[17], 0, i1370, 'm_SourceFontFile')
  i1370.m_AtlasPopulationMode = i1371[18]
  i1370.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1371[19], i1370.m_FaceInfo)
  var i1373 = i1371[20]
  var i1372 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1373.length; i += 1) {
    i1372.add(request.d('UnityEngine.TextCore.Glyph', i1373[i + 0]));
  }
  i1370.m_GlyphTable = i1372
  var i1375 = i1371[21]
  var i1374 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1375.length; i += 1) {
    i1374.add(request.d('TMPro.TMP_Character', i1375[i + 0]));
  }
  i1370.m_CharacterTable = i1374
  var i1377 = i1371[22]
  var i1376 = []
  for(var i = 0; i < i1377.length; i += 2) {
  request.r(i1377[i + 0], i1377[i + 1], 2, i1376, '')
  }
  i1370.m_AtlasTextures = i1376
  i1370.m_AtlasTextureIndex = i1371[23]
  i1370.m_IsMultiAtlasTexturesEnabled = !!i1371[24]
  i1370.m_ClearDynamicDataOnBuild = !!i1371[25]
  var i1379 = i1371[26]
  var i1378 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1379.length; i += 1) {
    i1378.add(request.d('UnityEngine.TextCore.GlyphRect', i1379[i + 0]));
  }
  i1370.m_UsedGlyphRects = i1378
  var i1381 = i1371[27]
  var i1380 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1381.length; i += 1) {
    i1380.add(request.d('UnityEngine.TextCore.GlyphRect', i1381[i + 0]));
  }
  i1370.m_FreeGlyphRects = i1380
  i1370.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1371[28], i1370.m_fontInfo)
  i1370.m_AtlasWidth = i1371[29]
  i1370.m_AtlasHeight = i1371[30]
  i1370.m_AtlasPadding = i1371[31]
  i1370.m_AtlasRenderMode = i1371[32]
  var i1383 = i1371[33]
  var i1382 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1383.length; i += 1) {
    i1382.add(request.d('TMPro.TMP_Glyph', i1383[i + 0]));
  }
  i1370.m_glyphInfoList = i1382
  i1370.m_KerningTable = request.d('TMPro.KerningTable', i1371[34], i1370.m_KerningTable)
  i1370.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1371[35], i1370.m_FontFeatureTable)
  var i1385 = i1371[36]
  var i1384 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1385.length; i += 2) {
  request.r(i1385[i + 0], i1385[i + 1], 1, i1384, '')
  }
  i1370.fallbackFontAssets = i1384
  var i1387 = i1371[37]
  var i1386 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1387.length; i += 2) {
  request.r(i1387[i + 0], i1387[i + 1], 1, i1386, '')
  }
  i1370.m_FallbackFontAssetTable = i1386
  i1370.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1371[38], i1370.m_CreationSettings)
  var i1389 = i1371[39]
  var i1388 = []
  for(var i = 0; i < i1389.length; i += 1) {
    i1388.push( request.d('TMPro.TMP_FontWeightPair', i1389[i + 0]) );
  }
  i1370.m_FontWeightTable = i1388
  var i1391 = i1371[40]
  var i1390 = []
  for(var i = 0; i < i1391.length; i += 1) {
    i1390.push( request.d('TMPro.TMP_FontWeightPair', i1391[i + 0]) );
  }
  i1370.fontWeights = i1390
  return i1370
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1392 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1393 = data
  i1392.m_FaceIndex = i1393[0]
  i1392.m_FamilyName = i1393[1]
  i1392.m_StyleName = i1393[2]
  i1392.m_PointSize = i1393[3]
  i1392.m_Scale = i1393[4]
  i1392.m_UnitsPerEM = i1393[5]
  i1392.m_LineHeight = i1393[6]
  i1392.m_AscentLine = i1393[7]
  i1392.m_CapLine = i1393[8]
  i1392.m_MeanLine = i1393[9]
  i1392.m_Baseline = i1393[10]
  i1392.m_DescentLine = i1393[11]
  i1392.m_SuperscriptOffset = i1393[12]
  i1392.m_SuperscriptSize = i1393[13]
  i1392.m_SubscriptOffset = i1393[14]
  i1392.m_SubscriptSize = i1393[15]
  i1392.m_UnderlineOffset = i1393[16]
  i1392.m_UnderlineThickness = i1393[17]
  i1392.m_StrikethroughOffset = i1393[18]
  i1392.m_StrikethroughThickness = i1393[19]
  i1392.m_TabWidth = i1393[20]
  return i1392
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1396 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1397 = data
  i1396.m_Index = i1397[0]
  i1396.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1397[1], i1396.m_Metrics)
  i1396.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1397[2], i1396.m_GlyphRect)
  i1396.m_Scale = i1397[3]
  i1396.m_AtlasIndex = i1397[4]
  i1396.m_ClassDefinitionType = i1397[5]
  return i1396
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1400 = root || request.c( 'TMPro.TMP_Character' )
  var i1401 = data
  i1400.m_ElementType = i1401[0]
  i1400.m_Unicode = i1401[1]
  i1400.m_GlyphIndex = i1401[2]
  i1400.m_Scale = i1401[3]
  return i1400
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1406 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1407 = data
  i1406.m_X = i1407[0]
  i1406.m_Y = i1407[1]
  i1406.m_Width = i1407[2]
  i1406.m_Height = i1407[3]
  return i1406
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1408 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1409 = data
  i1408.Name = i1409[0]
  i1408.PointSize = i1409[1]
  i1408.Scale = i1409[2]
  i1408.CharacterCount = i1409[3]
  i1408.LineHeight = i1409[4]
  i1408.Baseline = i1409[5]
  i1408.Ascender = i1409[6]
  i1408.CapHeight = i1409[7]
  i1408.Descender = i1409[8]
  i1408.CenterLine = i1409[9]
  i1408.SuperscriptOffset = i1409[10]
  i1408.SubscriptOffset = i1409[11]
  i1408.SubSize = i1409[12]
  i1408.Underline = i1409[13]
  i1408.UnderlineThickness = i1409[14]
  i1408.strikethrough = i1409[15]
  i1408.strikethroughThickness = i1409[16]
  i1408.TabWidth = i1409[17]
  i1408.Padding = i1409[18]
  i1408.AtlasWidth = i1409[19]
  i1408.AtlasHeight = i1409[20]
  return i1408
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1412 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1413 = data
  i1412.id = i1413[0]
  i1412.x = i1413[1]
  i1412.y = i1413[2]
  i1412.width = i1413[3]
  i1412.height = i1413[4]
  i1412.xOffset = i1413[5]
  i1412.yOffset = i1413[6]
  i1412.xAdvance = i1413[7]
  i1412.scale = i1413[8]
  return i1412
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1414 = root || request.c( 'TMPro.KerningTable' )
  var i1415 = data
  var i1417 = i1415[0]
  var i1416 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1417.length; i += 1) {
    i1416.add(request.d('TMPro.KerningPair', i1417[i + 0]));
  }
  i1414.kerningPairs = i1416
  return i1414
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1420 = root || request.c( 'TMPro.KerningPair' )
  var i1421 = data
  i1420.xOffset = i1421[0]
  i1420.m_FirstGlyph = i1421[1]
  i1420.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1421[2], i1420.m_FirstGlyphAdjustments)
  i1420.m_SecondGlyph = i1421[3]
  i1420.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1421[4], i1420.m_SecondGlyphAdjustments)
  i1420.m_IgnoreSpacingAdjustments = !!i1421[5]
  return i1420
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1422 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1423 = data
  var i1425 = i1423[0]
  var i1424 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1425.length; i += 1) {
    i1424.add(request.d('TMPro.TMP_GlyphPairAdjustmentRecord', i1425[i + 0]));
  }
  i1422.m_GlyphPairAdjustmentRecords = i1424
  return i1422
}

Deserializers["TMPro.TMP_GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1428 = root || request.c( 'TMPro.TMP_GlyphPairAdjustmentRecord' )
  var i1429 = data
  i1428.m_FirstAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i1429[0], i1428.m_FirstAdjustmentRecord)
  i1428.m_SecondAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i1429[1], i1428.m_SecondAdjustmentRecord)
  i1428.m_FeatureLookupFlags = i1429[2]
  return i1428
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1432 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1433 = data
  i1432.sourceFontFileName = i1433[0]
  i1432.sourceFontFileGUID = i1433[1]
  i1432.pointSizeSamplingMode = i1433[2]
  i1432.pointSize = i1433[3]
  i1432.padding = i1433[4]
  i1432.packingMode = i1433[5]
  i1432.atlasWidth = i1433[6]
  i1432.atlasHeight = i1433[7]
  i1432.characterSetSelectionMode = i1433[8]
  i1432.characterSequence = i1433[9]
  i1432.referencedFontAssetGUID = i1433[10]
  i1432.referencedTextAssetGUID = i1433[11]
  i1432.fontStyle = i1433[12]
  i1432.fontStyleModifier = i1433[13]
  i1432.renderMode = i1433[14]
  i1432.includeFontFeatures = !!i1433[15]
  return i1432
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1436 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1437 = data
  request.r(i1437[0], i1437[1], 0, i1436, 'regularTypeface')
  request.r(i1437[2], i1437[3], 0, i1436, 'italicTypeface')
  return i1436
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1438 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1439 = data
  i1438.m_Width = i1439[0]
  i1438.m_Height = i1439[1]
  i1438.m_HorizontalBearingX = i1439[2]
  i1438.m_HorizontalBearingY = i1439[3]
  i1438.m_HorizontalAdvance = i1439[4]
  return i1438
}

Deserializers["TMPro.TMP_GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1440 = root || request.c( 'TMPro.TMP_GlyphAdjustmentRecord' )
  var i1441 = data
  i1440.m_GlyphIndex = i1441[0]
  i1440.m_GlyphValueRecord = request.d('TMPro.TMP_GlyphValueRecord', i1441[1], i1440.m_GlyphValueRecord)
  return i1440
}

Deserializers["TMPro.TMP_GlyphValueRecord"] = function (request, data, root) {
  var i1442 = root || request.c( 'TMPro.TMP_GlyphValueRecord' )
  var i1443 = data
  i1442.m_XPlacement = i1443[0]
  i1442.m_YPlacement = i1443[1]
  i1442.m_XAdvance = i1443[2]
  i1442.m_YAdvance = i1443[3]
  return i1442
}

Deserializers["BlockShapeSO"] = function (request, data, root) {
  var i1444 = root || request.c( 'BlockShapeSO' )
  var i1445 = data
  i1444.width = i1445[0]
  i1444.height = i1445[1]
  i1444.minX = i1445[2]
  i1444.maxX = i1445[3]
  i1444.maxY = i1445[4]
  var i1447 = i1445[5]
  var i1446 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Vector2Int')))
  for(var i = 0; i < i1447.length; i += 2) {
    i1446.add(new pc.Vec2( i1447[i + 0], i1447[i + 1] ));
  }
  i1444.structuralOffsets = i1446
  request.r(i1445[6], i1445[7], 0, i1444, 'uiIcon')
  request.r(i1445[8], i1445[9], 0, i1444, 'blockMaterial')
  request.r(i1445[10], i1445[11], 0, i1444, 'innerMaterial')
  request.r(i1445[12], i1445[13], 0, i1444, 'specialIcon')
  i1444.slideDirection = new pc.Vec2( i1445[14], i1445[15] )
  i1444.defaultLayers = i1445[16]
  request.r(i1445[17], i1445[18], 0, i1444, 'innerMesh')
  i1444.innerScale = new pc.Vec3( i1445[19], i1445[20], i1445[21] )
  i1444.innerOffset = new pc.Vec3( i1445[22], i1445[23], i1445[24] )
  return i1444
}

Deserializers["CellMeshLibrary"] = function (request, data, root) {
  var i1450 = root || request.c( 'CellMeshLibrary' )
  var i1451 = data
  request.r(i1451[0], i1451[1], 0, i1450, 'full')
  request.r(i1451[2], i1451[3], 0, i1450, 'straightVer')
  request.r(i1451[4], i1451[5], 0, i1450, 'straightHor')
  request.r(i1451[6], i1451[7], 0, i1450, 'center')
  request.r(i1451[8], i1451[9], 0, i1450, 'edgeTop')
  request.r(i1451[10], i1451[11], 0, i1450, 'edgeBottom')
  request.r(i1451[12], i1451[13], 0, i1450, 'edgeLeft')
  request.r(i1451[14], i1451[15], 0, i1450, 'edgeRight')
  request.r(i1451[16], i1451[17], 0, i1450, 'cornerTL')
  request.r(i1451[18], i1451[19], 0, i1450, 'cornerTR')
  request.r(i1451[20], i1451[21], 0, i1450, 'cornerBL')
  request.r(i1451[22], i1451[23], 0, i1450, 'cornerBR')
  request.r(i1451[24], i1451[25], 0, i1450, 'tripleTop')
  request.r(i1451[26], i1451[27], 0, i1450, 'tripleBottom')
  request.r(i1451[28], i1451[29], 0, i1450, 'tripleLeft')
  request.r(i1451[30], i1451[31], 0, i1450, 'tripleRight')
  return i1450
}

Deserializers["BlockPaletteSO"] = function (request, data, root) {
  var i1452 = root || request.c( 'BlockPaletteSO' )
  var i1453 = data
  var i1455 = i1453[0]
  var i1454 = []
  for(var i = 0; i < i1455.length; i += 2) {
  request.r(i1455[i + 0], i1455[i + 1], 2, i1454, '')
  }
  i1452.blockMaterials = i1454
  request.r(i1453[1], i1453[2], 0, i1452, 'ghostMaterial')
  request.r(i1453[3], i1453[4], 0, i1452, 'floodMaterial')
  request.r(i1453[5], i1453[6], 0, i1452, 'previewOverlayMaterial')
  return i1452
}

Deserializers["SonatFramework.Systems.AudioManagement.SonatAudioService"] = function (request, data, root) {
  var i1456 = root || request.c( 'SonatFramework.Systems.AudioManagement.SonatAudioService' )
  var i1457 = data
  return i1456
}

Deserializers["SonatFramework.Scripts.UIModule.TweenConfigSO"] = function (request, data, root) {
  var i1458 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenConfigSO' )
  var i1459 = data
  i1458.config = request.d('SonatFramework.Scripts.UIModule.TweenConfig', i1459[0], i1458.config)
  return i1458
}

Deserializers["SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync"] = function (request, data, root) {
  var i1460 = root || request.c( 'SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync' )
  var i1461 = data
  i1460.path = i1461[0]
  request.r(i1461[1], i1461[2], 0, i1460, 'fallbackService')
  return i1460
}

Deserializers["LevelDataSO"] = function (request, data, root) {
  var i1462 = root || request.c( 'LevelDataSO' )
  var i1463 = data
  i1462.levelID = i1463[0]
  i1462.displayName = i1463[1]
  i1462.gameMode = i1463[2]
  i1462.difficulty = i1463[3]
  i1462.targetGoal = i1463[4]
  i1462.timeLimit = i1463[5]
  i1462.floodStartInterval = i1463[6]
  i1462.floodIntervalIncrease = i1463[7]
  request.r(i1463[8], i1463[9], 0, i1462, 'gameConfig')
  i1462.levelWidth = i1463[10]
  request.r(i1463[11], i1463[12], 0, i1462, 'floorPrefab')
  var i1465 = i1463[13]
  var i1464 = new (System.Collections.Generic.List$1(Bridge.ns('PreplacedBlockData')))
  for(var i = 0; i < i1465.length; i += 1) {
    i1464.add(request.d('PreplacedBlockData', i1465[i + 0]));
  }
  i1462.mapData = i1464
  request.r(i1463[14], i1463[15], 0, i1462, 'difficultyConfig')
  request.r(i1463[16], i1463[17], 0, i1462, 'shapePool')
  var i1467 = i1463[18]
  var i1466 = new (System.Collections.Generic.List$1(Bridge.ns('BlockShapeSO')))
  for(var i = 0; i < i1467.length; i += 2) {
  request.r(i1467[i + 0], i1467[i + 1], 1, i1466, '')
  }
  i1462.fixedStartSequence = i1466
  return i1462
}

Deserializers["PreplacedBlockData"] = function (request, data, root) {
  var i1470 = root || request.c( 'PreplacedBlockData' )
  var i1471 = data
  i1470.faceIndex = i1471[0]
  i1470.localX = i1471[1]
  i1470.y = i1471[2]
  request.r(i1471[3], i1471[4], 0, i1470, 'blockShapeRef')
  i1470.colorIndex = i1471[5]
  return i1470
}

Deserializers["GameConfig"] = function (request, data, root) {
  var i1474 = root || request.c( 'GameConfig' )
  var i1475 = data
  i1474.towerHeightThreshold = i1475[0]
  i1474.towerHeightRatio = i1475[1]
  i1474.towerDropAdjustDuration = i1475[2]
  i1474.towerHeightSmoothDuration = i1475[3]
  i1474.towerHeightEase = i1475[4]
  i1474.edgeRotateDelay = i1475[5]
  i1474.dragHoldTime = i1475[6]
  i1474.blockDragSensitivity = i1475[7]
  i1474.useAbsolutePositioning = !!i1475[8]
  i1474.absolutePositionSmoothing = i1475[9]
  i1474.edgeScrollThreshold = i1475[10]
  i1474.edgeScrollSpeed = i1475[11]
  i1474.baseSmoothTime = i1475[12]
  i1474.fastSmoothTime = i1475[13]
  i1474.deadzoneAngle = i1475[14]
  i1474.buttonRotateDuration = i1475[15]
  i1474.buttonRotateEase = i1475[16]
  i1474.towerSnapDuration = i1475[17]
  i1474.towerSnapEase = i1475[18]
  i1474.dropDuration = i1475[19]
  i1474.dropEase = i1475[20]
  request.r(i1475[21], i1475[22], 0, i1474, 'blockPalette')
  i1474.ghostAlpha = i1475[23]
  i1474.faceWidth = i1475[24]
  i1474.height = i1475[25]
  i1474.tileSize = i1475[26]
  i1474.spawnY = i1475[27]
  i1474.score1Line = i1475[28]
  i1474.score2Lines = i1475[29]
  i1474.score3Lines = i1475[30]
  i1474.score4Lines = i1475[31]
  i1474.pointsPerRow = i1475[32]
  i1474.useMultiLineBonus = !!i1475[33]
  i1474.multiLineMultiplier = i1475[34]
  i1474.maxHeight = i1475[35]
  i1474.warningThreshold = i1475[36]
  i1474.totalLevelCount = i1475[37]
  i1474.warningColor = new pc.Color(i1475[38], i1475[39], i1475[40], i1475[41])
  i1474.gameOverColor = new pc.Color(i1475[42], i1475[43], i1475[44], i1475[45])
  i1474.pulseDuration = i1475[46]
  i1474.winReward = request.d('SonatFramework.Systems.InventoryManagement.GameResources.ResourceData', i1475[47], i1474.winReward)
  i1474.playOnPrice = request.d('SonatFramework.Systems.InventoryManagement.GameResources.ResourceData', i1475[48], i1474.playOnPrice)
  return i1474
}

Deserializers["SonatFramework.Systems.InventoryManagement.GameResources.ResourceData"] = function (request, data, root) {
  var i1476 = root || request.c( 'SonatFramework.Systems.InventoryManagement.GameResources.ResourceData' )
  var i1477 = data
  i1476.gameResource = i1477[0]
  i1476.id = i1477[1]
  i1476.quantity = i1477[2]
  i1476.seconds = System.Int64(i1477[3])
  i1476.timestamp = System.Int64(i1477[4])
  i1476.onUpdate = request.d('System.Action', i1477[5], i1476.onUpdate)
  return i1476
}

Deserializers["Difficulty.DifficultyConfig"] = function (request, data, root) {
  var i1478 = root || request.c( 'Difficulty.DifficultyConfig' )
  var i1479 = data
  i1478.mercyTokensMin = i1479[0]
  i1478.mercyTokensMax = i1479[1]
  i1478.mercyTensionThreshold = i1479[2]
  i1478.mercyStreakRequired = i1479[3]
  i1478.mercyChance = i1479[4]
  i1478.mercyCooldownMin = i1479[5]
  i1478.mercyCooldownMax = i1479[6]
  i1478.rescueWeight_1x1 = i1479[7]
  i1478.rescueWeight_1x2 = i1479[8]
  i1478.rescueWeight_2x1 = i1479[9]
  i1478.warningThreshold = i1479[10]
  i1478.dangerThreshold = i1479[11]
  i1478.criticalThreshold = i1479[12]
  i1478.autoRefillBag = !!i1479[13]
  return i1478
}

Deserializers["Difficulty.ShapePoolSO"] = function (request, data, root) {
  var i1480 = root || request.c( 'Difficulty.ShapePoolSO' )
  var i1481 = data
  var i1483 = i1481[0]
  var i1482 = new (System.Collections.Generic.List$1(Bridge.ns('Difficulty.ShapeWeightEntry')))
  for(var i = 0; i < i1483.length; i += 1) {
    i1482.add(request.d('Difficulty.ShapeWeightEntry', i1483[i + 0]));
  }
  i1480.entries = i1482
  return i1480
}

Deserializers["Difficulty.ShapeWeightEntry"] = function (request, data, root) {
  var i1486 = root || request.c( 'Difficulty.ShapeWeightEntry' )
  var i1487 = data
  request.r(i1487[0], i1487[1], 0, i1486, 'shape')
  i1486.weight = i1487[2]
  i1486.category = i1487[3]
  i1486.isRescueShape = !!i1487[4]
  return i1486
}

Deserializers["UnityEngine.InputSystem.InputActionAsset"] = function (request, data, root) {
  var i1488 = root || request.c( 'UnityEngine.InputSystem.InputActionAsset' )
  var i1489 = data
  var i1491 = i1489[0]
  var i1490 = []
  for(var i = 0; i < i1491.length; i += 1) {
    i1490.push( request.d('UnityEngine.InputSystem.InputActionMap', i1491[i + 0]) );
  }
  i1488.m_ActionMaps = i1490
  var i1493 = i1489[1]
  var i1492 = []
  for(var i = 0; i < i1493.length; i += 1) {
    i1492.push( request.d('UnityEngine.InputSystem.InputControlScheme', i1493[i + 0]) );
  }
  i1488.m_ControlSchemes = i1492
  i1488.m_IsProjectWide = !!i1489[2]
  return i1488
}

Deserializers["UnityEngine.InputSystem.InputActionMap"] = function (request, data, root) {
  var i1496 = root || request.c( 'UnityEngine.InputSystem.InputActionMap' )
  var i1497 = data
  i1496.m_Name = i1497[0]
  i1496.m_Id = i1497[1]
  request.r(i1497[2], i1497[3], 0, i1496, 'm_Asset')
  var i1499 = i1497[4]
  var i1498 = []
  for(var i = 0; i < i1499.length; i += 1) {
    i1498.push( request.d('UnityEngine.InputSystem.InputAction', i1499[i + 0]) );
  }
  i1496.m_Actions = i1498
  var i1501 = i1497[5]
  var i1500 = []
  for(var i = 0; i < i1501.length; i += 1) {
    i1500.push( request.d('UnityEngine.InputSystem.InputBinding', i1501[i + 0]) );
  }
  i1496.m_Bindings = i1500
  return i1496
}

Deserializers["UnityEngine.InputSystem.InputAction"] = function (request, data, root) {
  var i1504 = root || request.c( 'UnityEngine.InputSystem.InputAction' )
  var i1505 = data
  i1504.m_Name = i1505[0]
  i1504.m_Type = i1505[1]
  i1504.m_ExpectedControlType = i1505[2]
  i1504.m_Id = i1505[3]
  i1504.m_Processors = i1505[4]
  i1504.m_Interactions = i1505[5]
  var i1507 = i1505[6]
  var i1506 = []
  for(var i = 0; i < i1507.length; i += 1) {
    i1506.push( request.d('UnityEngine.InputSystem.InputBinding', i1507[i + 0]) );
  }
  i1504.m_SingletonActionBindings = i1506
  i1504.m_Flags = i1505[7]
  return i1504
}

Deserializers["UnityEngine.InputSystem.InputBinding"] = function (request, data, root) {
  var i1510 = root || request.c( 'UnityEngine.InputSystem.InputBinding' )
  var i1511 = data
  i1510.m_Name = i1511[0]
  i1510.m_Id = i1511[1]
  i1510.m_Path = i1511[2]
  i1510.m_Interactions = i1511[3]
  i1510.m_Processors = i1511[4]
  i1510.m_Groups = i1511[5]
  i1510.m_Action = i1511[6]
  i1510.m_Flags = i1511[7]
  return i1510
}

Deserializers["UnityEngine.InputSystem.InputControlScheme"] = function (request, data, root) {
  var i1514 = root || request.c( 'UnityEngine.InputSystem.InputControlScheme' )
  var i1515 = data
  i1514.m_Name = i1515[0]
  i1514.m_BindingGroup = i1515[1]
  var i1517 = i1515[2]
  var i1516 = []
  for(var i = 0; i < i1517.length; i += 1) {
    i1516.push( request.d('UnityEngine.InputSystem.InputControlScheme+DeviceRequirement', i1517[i + 0]) );
  }
  i1514.m_DeviceRequirements = i1516
  return i1514
}

Deserializers["UnityEngine.InputSystem.InputControlScheme+DeviceRequirement"] = function (request, data, root) {
  var i1520 = root || request.c( 'UnityEngine.InputSystem.InputControlScheme+DeviceRequirement' )
  var i1521 = data
  i1520.m_ControlPath = i1521[0]
  i1520.m_Flags = i1521[1]
  return i1520
}

Deserializers["UnityEngine.InputSystem.InputActionReference"] = function (request, data, root) {
  var i1522 = root || request.c( 'UnityEngine.InputSystem.InputActionReference' )
  var i1523 = data
  request.r(i1523[0], i1523[1], 0, i1522, 'm_Asset')
  i1522.m_ActionId = i1523[2]
  return i1522
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1524 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1525 = data
  i1524.useSafeMode = !!i1525[0]
  i1524.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1525[1], i1524.safeModeOptions)
  i1524.timeScale = i1525[2]
  i1524.unscaledTimeScale = i1525[3]
  i1524.useSmoothDeltaTime = !!i1525[4]
  i1524.maxSmoothUnscaledTime = i1525[5]
  i1524.rewindCallbackMode = i1525[6]
  i1524.showUnityEditorReport = !!i1525[7]
  i1524.logBehaviour = i1525[8]
  i1524.drawGizmos = !!i1525[9]
  i1524.defaultRecyclable = !!i1525[10]
  i1524.defaultAutoPlay = i1525[11]
  i1524.defaultUpdateType = i1525[12]
  i1524.defaultTimeScaleIndependent = !!i1525[13]
  i1524.defaultEaseType = i1525[14]
  i1524.defaultEaseOvershootOrAmplitude = i1525[15]
  i1524.defaultEasePeriod = i1525[16]
  i1524.defaultAutoKill = !!i1525[17]
  i1524.defaultLoopType = i1525[18]
  i1524.debugMode = !!i1525[19]
  i1524.debugStoreTargetId = !!i1525[20]
  i1524.showPreviewPanel = !!i1525[21]
  i1524.storeSettingsLocation = i1525[22]
  i1524.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1525[23], i1524.modules)
  i1524.createASMDEF = !!i1525[24]
  i1524.showPlayingTweens = !!i1525[25]
  i1524.showPausedTweens = !!i1525[26]
  return i1524
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1526 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1527 = data
  i1526.logBehaviour = i1527[0]
  i1526.nestedTweenFailureBehaviour = i1527[1]
  return i1526
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1528 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1529 = data
  i1528.showPanel = !!i1529[0]
  i1528.audioEnabled = !!i1529[1]
  i1528.physicsEnabled = !!i1529[2]
  i1528.physics2DEnabled = !!i1529[3]
  i1528.spriteEnabled = !!i1529[4]
  i1528.uiEnabled = !!i1529[5]
  i1528.textMeshProEnabled = !!i1529[6]
  i1528.tk2DEnabled = !!i1529[7]
  i1528.deAudioEnabled = !!i1529[8]
  i1528.deUnityExtendedEnabled = !!i1529[9]
  i1528.epoOutlineEnabled = !!i1529[10]
  return i1528
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1530 = root || request.c( 'TMPro.TMP_Settings' )
  var i1531 = data
  i1530.m_enableWordWrapping = !!i1531[0]
  i1530.m_enableKerning = !!i1531[1]
  i1530.m_enableExtraPadding = !!i1531[2]
  i1530.m_enableTintAllSprites = !!i1531[3]
  i1530.m_enableParseEscapeCharacters = !!i1531[4]
  i1530.m_EnableRaycastTarget = !!i1531[5]
  i1530.m_GetFontFeaturesAtRuntime = !!i1531[6]
  i1530.m_missingGlyphCharacter = i1531[7]
  i1530.m_warningsDisabled = !!i1531[8]
  request.r(i1531[9], i1531[10], 0, i1530, 'm_defaultFontAsset')
  i1530.m_defaultFontAssetPath = i1531[11]
  i1530.m_defaultFontSize = i1531[12]
  i1530.m_defaultAutoSizeMinRatio = i1531[13]
  i1530.m_defaultAutoSizeMaxRatio = i1531[14]
  i1530.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1531[15], i1531[16] )
  i1530.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1531[17], i1531[18] )
  i1530.m_autoSizeTextContainer = !!i1531[19]
  i1530.m_IsTextObjectScaleStatic = !!i1531[20]
  var i1533 = i1531[21]
  var i1532 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1533.length; i += 2) {
  request.r(i1533[i + 0], i1533[i + 1], 1, i1532, '')
  }
  i1530.m_fallbackFontAssets = i1532
  i1530.m_matchMaterialPreset = !!i1531[22]
  request.r(i1531[23], i1531[24], 0, i1530, 'm_defaultSpriteAsset')
  i1530.m_defaultSpriteAssetPath = i1531[25]
  i1530.m_enableEmojiSupport = !!i1531[26]
  i1530.m_MissingCharacterSpriteUnicode = i1531[27]
  i1530.m_defaultColorGradientPresetsPath = i1531[28]
  request.r(i1531[29], i1531[30], 0, i1530, 'm_defaultStyleSheet')
  i1530.m_StyleSheetsResourcePath = i1531[31]
  request.r(i1531[32], i1531[33], 0, i1530, 'm_leadingCharacters')
  request.r(i1531[34], i1531[35], 0, i1530, 'm_followingCharacters')
  i1530.m_UseModernHangulLineBreakingRules = !!i1531[36]
  return i1530
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1534 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1535 = data
  request.r(i1535[0], i1535[1], 0, i1534, 'spriteSheet')
  var i1537 = i1535[2]
  var i1536 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1537.length; i += 1) {
    i1536.add(request.d('TMPro.TMP_Sprite', i1537[i + 0]));
  }
  i1534.spriteInfoList = i1536
  var i1539 = i1535[3]
  var i1538 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1539.length; i += 2) {
  request.r(i1539[i + 0], i1539[i + 1], 1, i1538, '')
  }
  i1534.fallbackSpriteAssets = i1538
  i1534.hashCode = i1535[4]
  request.r(i1535[5], i1535[6], 0, i1534, 'material')
  i1534.materialHashCode = i1535[7]
  i1534.m_Version = i1535[8]
  i1534.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1535[9], i1534.m_FaceInfo)
  var i1541 = i1535[10]
  var i1540 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1541.length; i += 1) {
    i1540.add(request.d('TMPro.TMP_SpriteCharacter', i1541[i + 0]));
  }
  i1534.m_SpriteCharacterTable = i1540
  var i1543 = i1535[11]
  var i1542 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1543.length; i += 1) {
    i1542.add(request.d('TMPro.TMP_SpriteGlyph', i1543[i + 0]));
  }
  i1534.m_SpriteGlyphTable = i1542
  return i1534
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1546 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1547 = data
  i1546.name = i1547[0]
  i1546.hashCode = i1547[1]
  i1546.unicode = i1547[2]
  i1546.pivot = new pc.Vec2( i1547[3], i1547[4] )
  request.r(i1547[5], i1547[6], 0, i1546, 'sprite')
  i1546.id = i1547[7]
  i1546.x = i1547[8]
  i1546.y = i1547[9]
  i1546.width = i1547[10]
  i1546.height = i1547[11]
  i1546.xOffset = i1547[12]
  i1546.yOffset = i1547[13]
  i1546.xAdvance = i1547[14]
  i1546.scale = i1547[15]
  return i1546
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1552 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1553 = data
  i1552.m_Name = i1553[0]
  i1552.m_HashCode = i1553[1]
  i1552.m_ElementType = i1553[2]
  i1552.m_Unicode = i1553[3]
  i1552.m_GlyphIndex = i1553[4]
  i1552.m_Scale = i1553[5]
  return i1552
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1556 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1557 = data
  request.r(i1557[0], i1557[1], 0, i1556, 'sprite')
  i1556.m_Index = i1557[2]
  i1556.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1557[3], i1556.m_Metrics)
  i1556.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1557[4], i1556.m_GlyphRect)
  i1556.m_Scale = i1557[5]
  i1556.m_AtlasIndex = i1557[6]
  i1556.m_ClassDefinitionType = i1557[7]
  return i1556
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1558 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1559 = data
  var i1561 = i1559[0]
  var i1560 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1561.length; i += 1) {
    i1560.add(request.d('TMPro.TMP_Style', i1561[i + 0]));
  }
  i1558.m_StyleList = i1560
  return i1558
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1564 = root || request.c( 'TMPro.TMP_Style' )
  var i1565 = data
  i1564.m_Name = i1565[0]
  i1564.m_HashCode = i1565[1]
  i1564.m_OpeningDefinition = i1565[2]
  i1564.m_ClosingDefinition = i1565[3]
  i1564.m_OpeningTagArray = i1565[4]
  i1564.m_ClosingTagArray = i1565[5]
  i1564.m_OpeningTagUnicodeArray = i1565[6]
  i1564.m_ClosingTagUnicodeArray = i1565[7]
  return i1564
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1567 = data
  var i1569 = i1567[0]
  var i1568 = []
  for(var i = 0; i < i1569.length; i += 1) {
    i1568.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1569[i + 0]) );
  }
  i1566.files = i1568
  i1566.componentToPrefabIds = i1567[1]
  return i1566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1573 = data
  i1572.path = i1573[0]
  request.r(i1573[1], i1573[2], 0, i1572, 'unityObject')
  return i1572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1575 = data
  var i1577 = i1575[0]
  var i1576 = []
  for(var i = 0; i < i1577.length; i += 1) {
    i1576.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1577[i + 0]) );
  }
  i1574.scriptsExecutionOrder = i1576
  var i1579 = i1575[1]
  var i1578 = []
  for(var i = 0; i < i1579.length; i += 1) {
    i1578.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1579[i + 0]) );
  }
  i1574.sortingLayers = i1578
  var i1581 = i1575[2]
  var i1580 = []
  for(var i = 0; i < i1581.length; i += 1) {
    i1580.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1581[i + 0]) );
  }
  i1574.cullingLayers = i1580
  i1574.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1575[3], i1574.timeSettings)
  i1574.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1575[4], i1574.physicsSettings)
  i1574.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1575[5], i1574.physics2DSettings)
  i1574.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1575[6], i1574.qualitySettings)
  i1574.enableRealtimeShadows = !!i1575[7]
  i1574.enableAutoInstancing = !!i1575[8]
  i1574.enableStaticBatching = !!i1575[9]
  i1574.enableDynamicBatching = !!i1575[10]
  i1574.lightmapEncodingQuality = i1575[11]
  i1574.desiredColorSpace = i1575[12]
  var i1583 = i1575[13]
  var i1582 = []
  for(var i = 0; i < i1583.length; i += 1) {
    i1582.push( i1583[i + 0] );
  }
  i1574.allTags = i1582
  return i1574
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1586 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1587 = data
  i1586.name = i1587[0]
  i1586.value = i1587[1]
  return i1586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1591 = data
  i1590.id = i1591[0]
  i1590.name = i1591[1]
  i1590.value = i1591[2]
  return i1590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1595 = data
  i1594.id = i1595[0]
  i1594.name = i1595[1]
  return i1594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1597 = data
  i1596.fixedDeltaTime = i1597[0]
  i1596.maximumDeltaTime = i1597[1]
  i1596.timeScale = i1597[2]
  i1596.maximumParticleTimestep = i1597[3]
  return i1596
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1599 = data
  i1598.gravity = new pc.Vec3( i1599[0], i1599[1], i1599[2] )
  i1598.defaultSolverIterations = i1599[3]
  i1598.bounceThreshold = i1599[4]
  i1598.autoSyncTransforms = !!i1599[5]
  i1598.autoSimulation = !!i1599[6]
  var i1601 = i1599[7]
  var i1600 = []
  for(var i = 0; i < i1601.length; i += 1) {
    i1600.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1601[i + 0]) );
  }
  i1598.collisionMatrix = i1600
  return i1598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1604 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1605 = data
  i1604.enabled = !!i1605[0]
  i1604.layerId = i1605[1]
  i1604.otherLayerId = i1605[2]
  return i1604
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1607 = data
  request.r(i1607[0], i1607[1], 0, i1606, 'material')
  i1606.gravity = new pc.Vec2( i1607[2], i1607[3] )
  i1606.positionIterations = i1607[4]
  i1606.velocityIterations = i1607[5]
  i1606.velocityThreshold = i1607[6]
  i1606.maxLinearCorrection = i1607[7]
  i1606.maxAngularCorrection = i1607[8]
  i1606.maxTranslationSpeed = i1607[9]
  i1606.maxRotationSpeed = i1607[10]
  i1606.baumgarteScale = i1607[11]
  i1606.baumgarteTOIScale = i1607[12]
  i1606.timeToSleep = i1607[13]
  i1606.linearSleepTolerance = i1607[14]
  i1606.angularSleepTolerance = i1607[15]
  i1606.defaultContactOffset = i1607[16]
  i1606.autoSimulation = !!i1607[17]
  i1606.queriesHitTriggers = !!i1607[18]
  i1606.queriesStartInColliders = !!i1607[19]
  i1606.callbacksOnDisable = !!i1607[20]
  i1606.reuseCollisionCallbacks = !!i1607[21]
  i1606.autoSyncTransforms = !!i1607[22]
  var i1609 = i1607[23]
  var i1608 = []
  for(var i = 0; i < i1609.length; i += 1) {
    i1608.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1609[i + 0]) );
  }
  i1606.collisionMatrix = i1608
  return i1606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1613 = data
  i1612.enabled = !!i1613[0]
  i1612.layerId = i1613[1]
  i1612.otherLayerId = i1613[2]
  return i1612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1615 = data
  var i1617 = i1615[0]
  var i1616 = []
  for(var i = 0; i < i1617.length; i += 1) {
    i1616.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1617[i + 0]) );
  }
  i1614.qualityLevels = i1616
  var i1619 = i1615[1]
  var i1618 = []
  for(var i = 0; i < i1619.length; i += 1) {
    i1618.push( i1619[i + 0] );
  }
  i1614.names = i1618
  i1614.shadows = i1615[2]
  i1614.anisotropicFiltering = i1615[3]
  i1614.antiAliasing = i1615[4]
  i1614.lodBias = i1615[5]
  i1614.shadowCascades = i1615[6]
  i1614.shadowDistance = i1615[7]
  i1614.shadowmaskMode = i1615[8]
  i1614.shadowProjection = i1615[9]
  i1614.shadowResolution = i1615[10]
  i1614.softParticles = !!i1615[11]
  i1614.softVegetation = !!i1615[12]
  i1614.activeColorSpace = i1615[13]
  i1614.desiredColorSpace = i1615[14]
  i1614.masterTextureLimit = i1615[15]
  i1614.maxQueuedFrames = i1615[16]
  i1614.particleRaycastBudget = i1615[17]
  i1614.pixelLightCount = i1615[18]
  i1614.realtimeReflectionProbes = !!i1615[19]
  i1614.shadowCascade2Split = i1615[20]
  i1614.shadowCascade4Split = new pc.Vec3( i1615[21], i1615[22], i1615[23] )
  i1614.streamingMipmapsActive = !!i1615[24]
  i1614.vSyncCount = i1615[25]
  i1614.asyncUploadBufferSize = i1615[26]
  i1614.asyncUploadTimeSlice = i1615[27]
  i1614.billboardsFaceCameraPosition = !!i1615[28]
  i1614.shadowNearPlaneOffset = i1615[29]
  i1614.streamingMipmapsMemoryBudget = i1615[30]
  i1614.maximumLODLevel = i1615[31]
  i1614.streamingMipmapsAddAllCameras = !!i1615[32]
  i1614.streamingMipmapsMaxLevelReduction = i1615[33]
  i1614.streamingMipmapsRenderersPerFrame = i1615[34]
  i1614.resolutionScalingFixedDPIFactor = i1615[35]
  i1614.streamingMipmapsMaxFileIORequests = i1615[36]
  i1614.currentQualityLevel = i1615[37]
  return i1614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1625 = data
  i1624.weight = i1625[0]
  i1624.vertices = i1625[1]
  i1624.normals = i1625[2]
  i1624.tangents = i1625[3]
  return i1624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1628 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1629 = data
  i1628.mode = i1629[0]
  i1628.parameter = i1629[1]
  i1628.threshold = i1629[2]
  return i1628
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1630 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1631 = data
  i1630.xPlacement = i1631[0]
  i1630.yPlacement = i1631[1]
  i1630.xAdvance = i1631[2]
  i1630.yAdvance = i1631[3]
  return i1630
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"enabled":20},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"106":[107],"108":[107],"109":[107],"110":[107],"111":[107],"112":[107],"113":[114],"115":[42],"116":[117],"118":[117],"119":[117],"120":[117],"121":[117],"122":[117],"123":[117],"124":[125],"126":[125],"127":[125],"128":[125],"129":[125],"130":[125],"131":[125],"132":[125],"133":[125],"134":[125],"135":[125],"136":[125],"137":[125],"138":[42],"139":[16],"140":[141],"142":[141],"20":[2],"53":[15,16],"143":[3],"144":[3],"145":[3],"146":[3],"147":[3],"148":[3],"149":[3],"150":[3],"151":[3],"152":[3],"153":[3],"62":[11],"154":[3],"155":[3],"156":[3],"157":[3],"158":[3],"159":[3],"160":[3],"161":[3],"162":[3],"22":[3],"163":[3],"164":[3],"165":[3],"166":[3],"167":[3],"168":[3],"169":[26],"170":[3],"28":[26],"171":[3],"172":[3],"173":[3],"174":[3],"175":[3],"176":[3],"177":[3],"178":[3],"179":[3],"180":[3],"181":[3],"182":[3],"183":[3],"184":[3],"185":[7],"186":[3],"187":[7],"61":[11],"188":[3],"189":[2],"190":[191],"192":[86],"193":[2],"194":[195],"196":[93],"197":[2],"198":[4,2],"199":[16],"191":[4,2],"200":[37,16],"201":[16],"202":[16,15],"203":[117],"204":[125],"205":[206],"207":[208],"35":[2,4],"209":[2],"210":[16,2],"8":[2,4],"211":[2],"212":[4,2],"213":[16],"214":[4,2],"215":[2],"216":[11],"217":[42],"44":[42],"47":[46],"218":[219],"220":[201],"221":[16,15],"222":[191],"223":[201],"224":[225],"226":[201],"227":[201],"228":[208],"229":[208],"230":[201],"231":[195],"232":[2],"233":[2],"58":[20],"7":[4,2],"234":[2],"57":[20],"31":[2],"235":[2],"24":[2],"236":[2],"71":[2],"237":[2],"30":[2],"6":[2],"238":[2],"239":[4,2],"240":[2],"241":[2],"242":[2],"243":[2],"244":[4,2],"26":[2],"245":[93],"246":[93],"247":[93],"248":[93],"249":[42],"250":[42],"94":[93],"251":[20],"252":[42],"253":[195]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasGroup","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Mask","UnityEngine.UI.Image","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.UI.Button","UnityEngine.Transform","UnityEngine.MonoBehaviour","BlockVisual","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","UnityEngine.Mesh","UnityEngine.MeshCollider","LimitLineController","UnityEngine.Canvas","UnityEngine.Sprite","PopupSettings","SonatFramework.Scripts.UIModule.TweenConfigSO","UnityEngine.UI.HorizontalLayoutGroup","SonatFramework.Systems.SettingsManagement.SettingsElement","UnityEngine.UI.Toggle","ButtonScale","UIToggleExtension","UnityEngine.GameObject","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","CheatButton","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","Coffee.UIExtensions.UIParticle","EmojiSlot","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","Smiles.ParentFitter","UnityEngine.BoxCollider","DualDirectionEffect","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","CameraResponsive","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","TowerHeightController","TowerController","BlockSpawner","TowerRotator","ActiveBlockController","GhostBlockController","BlockShapeSO","CellMeshLibrary","BlockPaletteSO","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","SonatFramework.Scripts.UIModule.SafeArea","GameHUD","SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut","ButtonRestart","NextBlockUI","FloodProgressUI","TimerUI","BtnNoAds","RotateButtonHandler","RotateLoadingIndicator","GameHistorySystem","UIBoosterUndo","UnityEngine.UI.LayoutElement","SonatFramework.Scripts.UIModule.PanelManager","TextScale","GameManager","LevelDataSO","GameConfig","CheatManager","GridManager","ScoreManager","InputManager","Booster.HammerInputHandler","TimeManager","ObjectPoolManager","BlockFactory","AudioManager","UnityEngine.AudioSource","UnityEngine.AudioClip","Difficulty.DifficultyManager","Difficulty.DifficultyConfig","Difficulty.ShapePoolSO","TutorialManager","ResponsiveManager","UnityEngine.EventSystems.EventSystem","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.InputActionAsset","UnityEngine.InputSystem.InputActionReference","UnityEngine.Cubemap","UnityEngine.Font","SonatFramework.Systems.AudioManagement.SonatAudioService","SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.ConstantForce","UnityEngine.Rigidbody","UnityEngine.Joint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.FixedJoint","UnityEngine.CharacterJoint","UnityEngine.ConfigurableJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","CheatPanel","PopupAdsBreak","PopupBoosterTutorial","PopupUseBlock","PopupUseFreeze","PopupUseHammer","PopupUseUndo","TutDragPanel","TutorialPanelBase","TutRotatePanel","TutUndoPanel","HomePanel","ConfirmPanel","LosePanel","NotifyPanel","PopupBuyBooster","PopupContinue","PopupLives","PopupLose","PopupNoInternet","PopupTimerWarning","PopupWaitAdsBreak","PopupWaiting","PopupWaitingIap","PopupWin","WinPanel","ToggleSwitchVisual","PopupLoadingIap","TestPanel","ConfirmPanelBase","LosePanelBase","NotifyPanelBase","PopupAdsBreakBase","PopupContinueBase","PopupNoInternetBase","PopupSettingsBase","PopupToast","PopupWaitingBase","WinPanelBase","SonatFramework.Templates.UI.ScriptBase.PopupBuyBoosterBase","SonatFramework.Templates.UI.ScriptBase.PopupLivesBase","SonatFramework.Templates.UI.ScriptBase.PopupWaitAdsBreakBase","SonatFramework.Scripts.UIModule.DarkTransition","SonatFramework.Scripts.UIModule.Panel","SonatFramework.Scripts.UIModule.UIElements.FixedImageRatio","SonatFramework.Scripts.Feature.Shop.UI.ShopPanelBase","SonatFramework.Scripts.Feature.ChestRewardProgress.ChestDisplayUIController","SonatFramework.Scripts.Feature.ChestRewardProgress.ChestSpineUIAnimationHandler","Spine.Unity.SkeletonGraphic","SonatFramework.Systems.AudioManagement.AudioUnit","UnityEngine.Rendering.UI.UIFoldout","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.Variables","AppLovinMax.Scripts.MaxEventSystemChecker","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","Spine.Unity.SkeletonAnimation","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.ISkeletonAnimation","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.Purchasing.IAPButton","UnityEngine.Experimental.Rendering.Universal.PixelPerfectCamera","Spine.Unity.Examples.BasicPlatformerController","UnityEngine.CharacterController","Spine.Unity.Examples.SkeletonGhost","Spine.Unity.Examples.RenderExistingMesh","Spine.Unity.Examples.SkeletonGraphicRenderTexture","Spine.Unity.Examples.SkeletonRenderTexture","Spine.Unity.Examples.SkeletonRenderTextureFadeout","Spine.Unity.Examples.SkeletonRenderTextureBase","Spine.Unity.Examples.SkeletonRagdoll","Spine.Unity.Examples.SkeletonRagdoll2D","Spine.Unity.Examples.SkeletonUtilityEyeConstraint","Spine.Unity.Examples.SkeletonUtilityGroundConstraint","Spine.Unity.Examples.SpineGauge","Unity.VisualScripting.SceneVariables","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","ToonyColorsPro.Runtime.TCP2_CameraDepth","Unity.VisualScripting.StateMachine"]

Deserializers.unityVersion = "2022.3.62f3";

Deserializers.productName = "Block Merge 360";

Deserializers.lunaInitializationTime = "02/25/2026 07:54:33";

Deserializers.lunaDaysRunning = "1.0";

Deserializers.lunaVersion = "7.0.0";

Deserializers.lunaSHA = "3bcc3e343f23b4c67e768a811a8d088c7f7adbc5";

Deserializers.creativeName = "";

Deserializers.lunaAppID = "36791";

Deserializers.projectId = "15d5b0607dad2fe46bcff63b1ecfccbc";

Deserializers.packagesInfo = "com.unity.inputsystem: 1.16.0\ncom.unity.nuget.newtonsoft-json: 3.2.2\ncom.unity.render-pipelines.universal: 17.3.0\ncom.unity.shadergraph: 17.3.0\ncom.unity.textmeshpro: 3.0.7\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "False";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "2588";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4010";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, reflection, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isReferenceAmbientProbeBaked = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "sonat";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.DefaultCompany.3D-Project";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 28;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "8d11c52e-4283-4a4e-81e2-fc32fa465af5";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Purchasing","CodelessIAPStoreListener","InitializeCodelessPurchasingOnLoad"],["MaxSdkUnityEditor","InitializeMaxSdkUnityEditorOnLoad"],["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Coffee","UIParticleInternal","UIExtraCallbacks","InitializeOnLoad"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["UnityEngine","Purchasing","StoreManagerFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","Registration","IapCoreInitializeCallback","Register"],["UnityEngine","Purchasing","ProductServiceDependencyFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","PurchaseServiceDependencyFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","StoreServiceDependencyFactoryInjector","SetStoreManagerFactory"],["I2","Loc","LocalizeTarget_UnityUI_Text","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_MeshRenderer","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_VideoPlayer","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_Prefab","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_SpriteRenderer","AutoRegister"],["SonatFramework","Systems","EventBus","EventBusUtil","Initialize"],["I2","Loc","LocalizeTarget_UnityStandard_AudioSource","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_TextMesh","AutoRegister"],["I2","Loc","LocalizeTarget_TextMeshPro_Label","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_Child","AutoRegister"],["I2","Loc","LocalizeTarget_TextMeshPro_UGUI","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_RawImage","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_Image","AutoRegister"]],[["Cysharp","Threading","Tasks","PlayerLoopHelper","Init"],["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"],["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["UnityEngine","InputSystem","UI","InputSystemUIInputModule","ResetDefaultActions"],["Uniject","UnityThreadUtils","CaptureUnityThreadInfo"],["Coffee","UIParticleInternal","MaterialRepository","Clear"],["Coffee","UIParticleInternal","FrameCache","Clear"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"],["MaxSdkCallbacks","ResetOnDomainReload"],["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","ResourceManagement","ResourceProviders","AssetBundleProvider","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

