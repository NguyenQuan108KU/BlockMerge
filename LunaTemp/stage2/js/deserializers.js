var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i818 = root || request.c( 'UnityEngine.JointSpring' )
  var i819 = data
  i818.spring = i819[0]
  i818.damper = i819[1]
  i818.targetPosition = i819[2]
  return i818
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i820 = root || request.c( 'UnityEngine.JointMotor' )
  var i821 = data
  i820.m_TargetVelocity = i821[0]
  i820.m_Force = i821[1]
  i820.m_FreeSpin = i821[2]
  return i820
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i822 = root || request.c( 'UnityEngine.JointLimits' )
  var i823 = data
  i822.m_Min = i823[0]
  i822.m_Max = i823[1]
  i822.m_Bounciness = i823[2]
  i822.m_BounceMinVelocity = i823[3]
  i822.m_ContactDistance = i823[4]
  i822.minBounce = i823[5]
  i822.maxBounce = i823[6]
  return i822
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i824 = root || request.c( 'UnityEngine.JointDrive' )
  var i825 = data
  i824.m_PositionSpring = i825[0]
  i824.m_PositionDamper = i825[1]
  i824.m_MaximumForce = i825[2]
  i824.m_UseAcceleration = i825[3]
  return i824
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i826 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i827 = data
  i826.m_Spring = i827[0]
  i826.m_Damper = i827[1]
  return i826
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i828 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i829 = data
  i828.m_Limit = i829[0]
  i828.m_Bounciness = i829[1]
  i828.m_ContactDistance = i829[2]
  return i828
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i830 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i831 = data
  i830.m_ExtremumSlip = i831[0]
  i830.m_ExtremumValue = i831[1]
  i830.m_AsymptoteSlip = i831[2]
  i830.m_AsymptoteValue = i831[3]
  i830.m_Stiffness = i831[4]
  return i830
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i832 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i833 = data
  i832.m_LowerAngle = i833[0]
  i832.m_UpperAngle = i833[1]
  return i832
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i834 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i835 = data
  i834.m_MotorSpeed = i835[0]
  i834.m_MaximumMotorTorque = i835[1]
  return i834
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i836 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i837 = data
  i836.m_DampingRatio = i837[0]
  i836.m_Frequency = i837[1]
  i836.m_Angle = i837[2]
  return i836
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i838 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i839 = data
  i838.m_LowerTranslation = i839[0]
  i838.m_UpperTranslation = i839[1]
  return i838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i841 = data
  i840.name = i841[0]
  i840.width = i841[1]
  i840.height = i841[2]
  i840.mipmapCount = i841[3]
  i840.anisoLevel = i841[4]
  i840.filterMode = i841[5]
  i840.hdr = !!i841[6]
  i840.format = i841[7]
  i840.wrapMode = i841[8]
  i840.alphaIsTransparency = !!i841[9]
  i840.alphaSource = i841[10]
  i840.graphicsFormat = i841[11]
  i840.sRGBTexture = !!i841[12]
  i840.desiredColorSpace = i841[13]
  i840.wrapU = i841[14]
  i840.wrapV = i841[15]
  return i840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i842 = root || new pc.UnityMaterial()
  var i843 = data
  i842.name = i843[0]
  request.r(i843[1], i843[2], 0, i842, 'shader')
  i842.renderQueue = i843[3]
  i842.enableInstancing = !!i843[4]
  var i845 = i843[5]
  var i844 = []
  for(var i = 0; i < i845.length; i += 1) {
    i844.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i845[i + 0]) );
  }
  i842.floatParameters = i844
  var i847 = i843[6]
  var i846 = []
  for(var i = 0; i < i847.length; i += 1) {
    i846.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i847[i + 0]) );
  }
  i842.colorParameters = i846
  var i849 = i843[7]
  var i848 = []
  for(var i = 0; i < i849.length; i += 1) {
    i848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i849[i + 0]) );
  }
  i842.vectorParameters = i848
  var i851 = i843[8]
  var i850 = []
  for(var i = 0; i < i851.length; i += 1) {
    i850.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i851[i + 0]) );
  }
  i842.textureParameters = i850
  var i853 = i843[9]
  var i852 = []
  for(var i = 0; i < i853.length; i += 1) {
    i852.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i853[i + 0]) );
  }
  i842.materialFlags = i852
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i856 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i857 = data
  i856.name = i857[0]
  i856.value = i857[1]
  return i856
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i861 = data
  i860.name = i861[0]
  i860.value = new pc.Color(i861[1], i861[2], i861[3], i861[4])
  return i860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i864 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i865 = data
  i864.name = i865[0]
  i864.value = new pc.Vec4( i865[1], i865[2], i865[3], i865[4] )
  return i864
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i868 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i869 = data
  i868.name = i869[0]
  request.r(i869[1], i869[2], 0, i868, 'value')
  return i868
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i873 = data
  i872.name = i873[0]
  i872.enabled = !!i873[1]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i875 = data
  i874.pivot = new pc.Vec2( i875[0], i875[1] )
  i874.anchorMin = new pc.Vec2( i875[2], i875[3] )
  i874.anchorMax = new pc.Vec2( i875[4], i875[5] )
  i874.sizeDelta = new pc.Vec2( i875[6], i875[7] )
  i874.anchoredPosition3D = new pc.Vec3( i875[8], i875[9], i875[10] )
  i874.rotation = new pc.Quat(i875[11], i875[12], i875[13], i875[14])
  i874.scale = new pc.Vec3( i875[15], i875[16], i875[17] )
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i877 = data
  i876.m_Alpha = i877[0]
  i876.m_Interactable = !!i877[1]
  i876.m_BlocksRaycasts = !!i877[2]
  i876.m_IgnoreParentGroups = !!i877[3]
  i876.enabled = !!i877[4]
  return i876
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i879 = data
  i878.cullTransparentMesh = !!i879[0]
  return i878
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i880 = root || request.c( 'UnityEngine.UI.Mask' )
  var i881 = data
  i880.m_ShowMaskGraphic = !!i881[0]
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i883 = data
  i882.name = i883[0]
  i882.tagId = i883[1]
  i882.enabled = !!i883[2]
  i882.isStatic = !!i883[3]
  i882.layer = i883[4]
  return i882
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i884 = root || request.c( 'UnityEngine.UI.Image' )
  var i885 = data
  request.r(i885[0], i885[1], 0, i884, 'm_Sprite')
  i884.m_Type = i885[2]
  i884.m_PreserveAspect = !!i885[3]
  i884.m_FillCenter = !!i885[4]
  i884.m_FillMethod = i885[5]
  i884.m_FillAmount = i885[6]
  i884.m_FillClockwise = !!i885[7]
  i884.m_FillOrigin = i885[8]
  i884.m_UseSpriteMesh = !!i885[9]
  i884.m_PixelsPerUnitMultiplier = i885[10]
  request.r(i885[11], i885[12], 0, i884, 'm_Material')
  i884.m_Maskable = !!i885[13]
  i884.m_Color = new pc.Color(i885[14], i885[15], i885[16], i885[17])
  i884.m_RaycastTarget = !!i885[18]
  i884.m_RaycastPadding = new pc.Vec4( i885[19], i885[20], i885[21], i885[22] )
  return i884
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i886 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i887 = data
  i886.m_hasFontAssetChanged = !!i887[0]
  request.r(i887[1], i887[2], 0, i886, 'm_baseMaterial')
  i886.m_maskOffset = new pc.Vec4( i887[3], i887[4], i887[5], i887[6] )
  i886.m_text = i887[7]
  i886.m_isRightToLeft = !!i887[8]
  request.r(i887[9], i887[10], 0, i886, 'm_fontAsset')
  request.r(i887[11], i887[12], 0, i886, 'm_sharedMaterial')
  var i889 = i887[13]
  var i888 = []
  for(var i = 0; i < i889.length; i += 2) {
  request.r(i889[i + 0], i889[i + 1], 2, i888, '')
  }
  i886.m_fontSharedMaterials = i888
  request.r(i887[14], i887[15], 0, i886, 'm_fontMaterial')
  var i891 = i887[16]
  var i890 = []
  for(var i = 0; i < i891.length; i += 2) {
  request.r(i891[i + 0], i891[i + 1], 2, i890, '')
  }
  i886.m_fontMaterials = i890
  i886.m_fontColor32 = UnityEngine.Color32.ConstructColor(i887[17], i887[18], i887[19], i887[20])
  i886.m_fontColor = new pc.Color(i887[21], i887[22], i887[23], i887[24])
  i886.m_enableVertexGradient = !!i887[25]
  i886.m_colorMode = i887[26]
  i886.m_fontColorGradient = request.d('TMPro.VertexGradient', i887[27], i886.m_fontColorGradient)
  request.r(i887[28], i887[29], 0, i886, 'm_fontColorGradientPreset')
  request.r(i887[30], i887[31], 0, i886, 'm_spriteAsset')
  i886.m_tintAllSprites = !!i887[32]
  request.r(i887[33], i887[34], 0, i886, 'm_StyleSheet')
  i886.m_TextStyleHashCode = i887[35]
  i886.m_overrideHtmlColors = !!i887[36]
  i886.m_faceColor = UnityEngine.Color32.ConstructColor(i887[37], i887[38], i887[39], i887[40])
  i886.m_fontSize = i887[41]
  i886.m_fontSizeBase = i887[42]
  i886.m_fontWeight = i887[43]
  i886.m_enableAutoSizing = !!i887[44]
  i886.m_fontSizeMin = i887[45]
  i886.m_fontSizeMax = i887[46]
  i886.m_fontStyle = i887[47]
  i886.m_HorizontalAlignment = i887[48]
  i886.m_VerticalAlignment = i887[49]
  i886.m_textAlignment = i887[50]
  i886.m_characterSpacing = i887[51]
  i886.m_wordSpacing = i887[52]
  i886.m_lineSpacing = i887[53]
  i886.m_lineSpacingMax = i887[54]
  i886.m_paragraphSpacing = i887[55]
  i886.m_charWidthMaxAdj = i887[56]
  i886.m_enableWordWrapping = !!i887[57]
  i886.m_wordWrappingRatios = i887[58]
  i886.m_overflowMode = i887[59]
  request.r(i887[60], i887[61], 0, i886, 'm_linkedTextComponent')
  request.r(i887[62], i887[63], 0, i886, 'parentLinkedComponent')
  i886.m_enableKerning = !!i887[64]
  i886.m_enableExtraPadding = !!i887[65]
  i886.checkPaddingRequired = !!i887[66]
  i886.m_isRichText = !!i887[67]
  i886.m_parseCtrlCharacters = !!i887[68]
  i886.m_isOrthographic = !!i887[69]
  i886.m_isCullingEnabled = !!i887[70]
  i886.m_horizontalMapping = i887[71]
  i886.m_verticalMapping = i887[72]
  i886.m_uvLineOffset = i887[73]
  i886.m_geometrySortingOrder = i887[74]
  i886.m_IsTextObjectScaleStatic = !!i887[75]
  i886.m_VertexBufferAutoSizeReduction = !!i887[76]
  i886.m_useMaxVisibleDescender = !!i887[77]
  i886.m_pageToDisplay = i887[78]
  i886.m_margin = new pc.Vec4( i887[79], i887[80], i887[81], i887[82] )
  i886.m_isUsingLegacyAnimationComponent = !!i887[83]
  i886.m_isVolumetricText = !!i887[84]
  request.r(i887[85], i887[86], 0, i886, 'm_Material')
  i886.m_Maskable = !!i887[87]
  i886.m_Color = new pc.Color(i887[88], i887[89], i887[90], i887[91])
  i886.m_RaycastTarget = !!i887[92]
  i886.m_RaycastPadding = new pc.Vec4( i887[93], i887[94], i887[95], i887[96] )
  return i886
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i894 = root || request.c( 'TMPro.VertexGradient' )
  var i895 = data
  i894.topLeft = new pc.Color(i895[0], i895[1], i895[2], i895[3])
  i894.topRight = new pc.Color(i895[4], i895[5], i895[6], i895[7])
  i894.bottomLeft = new pc.Color(i895[8], i895[9], i895[10], i895[11])
  i894.bottomRight = new pc.Color(i895[12], i895[13], i895[14], i895[15])
  return i894
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i896 = root || request.c( 'UnityEngine.UI.Button' )
  var i897 = data
  i896.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i897[0], i896.m_OnClick)
  i896.m_Navigation = request.d('UnityEngine.UI.Navigation', i897[1], i896.m_Navigation)
  i896.m_Transition = i897[2]
  i896.m_Colors = request.d('UnityEngine.UI.ColorBlock', i897[3], i896.m_Colors)
  i896.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i897[4], i896.m_SpriteState)
  i896.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i897[5], i896.m_AnimationTriggers)
  i896.m_Interactable = !!i897[6]
  request.r(i897[7], i897[8], 0, i896, 'm_TargetGraphic')
  return i896
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i898 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i899 = data
  i898.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i899[0], i898.m_PersistentCalls)
  return i898
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i900 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i901 = data
  var i903 = i901[0]
  var i902 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i903.length; i += 1) {
    i902.add(request.d('UnityEngine.Events.PersistentCall', i903[i + 0]));
  }
  i900.m_Calls = i902
  return i900
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i906 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i907 = data
  request.r(i907[0], i907[1], 0, i906, 'm_Target')
  i906.m_TargetAssemblyTypeName = i907[2]
  i906.m_MethodName = i907[3]
  i906.m_Mode = i907[4]
  i906.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i907[5], i906.m_Arguments)
  i906.m_CallState = i907[6]
  return i906
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i908 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i909 = data
  i908.m_Mode = i909[0]
  i908.m_WrapAround = !!i909[1]
  request.r(i909[2], i909[3], 0, i908, 'm_SelectOnUp')
  request.r(i909[4], i909[5], 0, i908, 'm_SelectOnDown')
  request.r(i909[6], i909[7], 0, i908, 'm_SelectOnLeft')
  request.r(i909[8], i909[9], 0, i908, 'm_SelectOnRight')
  return i908
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i910 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i911 = data
  i910.m_NormalColor = new pc.Color(i911[0], i911[1], i911[2], i911[3])
  i910.m_HighlightedColor = new pc.Color(i911[4], i911[5], i911[6], i911[7])
  i910.m_PressedColor = new pc.Color(i911[8], i911[9], i911[10], i911[11])
  i910.m_SelectedColor = new pc.Color(i911[12], i911[13], i911[14], i911[15])
  i910.m_DisabledColor = new pc.Color(i911[16], i911[17], i911[18], i911[19])
  i910.m_ColorMultiplier = i911[20]
  i910.m_FadeDuration = i911[21]
  return i910
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i912 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i913 = data
  request.r(i913[0], i913[1], 0, i912, 'm_HighlightedSprite')
  request.r(i913[2], i913[3], 0, i912, 'm_PressedSprite')
  request.r(i913[4], i913[5], 0, i912, 'm_SelectedSprite')
  request.r(i913[6], i913[7], 0, i912, 'm_DisabledSprite')
  return i912
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i914 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i915 = data
  i914.m_NormalTrigger = i915[0]
  i914.m_HighlightedTrigger = i915[1]
  i914.m_PressedTrigger = i915[2]
  i914.m_SelectedTrigger = i915[3]
  i914.m_DisabledTrigger = i915[4]
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i916 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i917 = data
  i916.position = new pc.Vec3( i917[0], i917[1], i917[2] )
  i916.scale = new pc.Vec3( i917[3], i917[4], i917[5] )
  i916.rotation = new pc.Quat(i917[6], i917[7], i917[8], i917[9])
  return i916
}

Deserializers["BlockVisual"] = function (request, data, root) {
  var i918 = root || request.c( 'BlockVisual' )
  var i919 = data
  request.r(i919[0], i919[1], 0, i918, '_visualOuter')
  request.r(i919[2], i919[3], 0, i918, '_visualInner')
  return i918
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i921 = data
  request.r(i921[0], i921[1], 0, i920, 'sharedMesh')
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i923 = data
  request.r(i923[0], i923[1], 0, i922, 'additionalVertexStreams')
  i922.enabled = !!i923[2]
  request.r(i923[3], i923[4], 0, i922, 'sharedMaterial')
  var i925 = i923[5]
  var i924 = []
  for(var i = 0; i < i925.length; i += 2) {
  request.r(i925[i + 0], i925[i + 1], 2, i924, '')
  }
  i922.sharedMaterials = i924
  i922.receiveShadows = !!i923[6]
  i922.shadowCastingMode = i923[7]
  i922.sortingLayerID = i923[8]
  i922.sortingOrder = i923[9]
  i922.lightmapIndex = i923[10]
  i922.lightmapSceneIndex = i923[11]
  i922.lightmapScaleOffset = new pc.Vec4( i923[12], i923[13], i923[14], i923[15] )
  i922.lightProbeUsage = i923[16]
  i922.reflectionProbeUsage = i923[17]
  return i922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i927 = data
  i926.name = i927[0]
  i926.halfPrecision = !!i927[1]
  i926.useSimplification = !!i927[2]
  i926.useUInt32IndexFormat = !!i927[3]
  i926.vertexCount = i927[4]
  i926.aabb = i927[5]
  var i929 = i927[6]
  var i928 = []
  for(var i = 0; i < i929.length; i += 1) {
    i928.push( !!i929[i + 0] );
  }
  i926.streams = i928
  i926.vertices = i927[7]
  var i931 = i927[8]
  var i930 = []
  for(var i = 0; i < i931.length; i += 1) {
    i930.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i931[i + 0]) );
  }
  i926.subMeshes = i930
  var i933 = i927[9]
  var i932 = []
  for(var i = 0; i < i933.length; i += 16) {
    i932.push( new pc.Mat4().setData(i933[i + 0], i933[i + 1], i933[i + 2], i933[i + 3],  i933[i + 4], i933[i + 5], i933[i + 6], i933[i + 7],  i933[i + 8], i933[i + 9], i933[i + 10], i933[i + 11],  i933[i + 12], i933[i + 13], i933[i + 14], i933[i + 15]) );
  }
  i926.bindposes = i932
  var i935 = i927[10]
  var i934 = []
  for(var i = 0; i < i935.length; i += 1) {
    i934.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i935[i + 0]) );
  }
  i926.blendShapes = i934
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i941 = data
  i940.triangles = i941[0]
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i947 = data
  i946.name = i947[0]
  var i949 = i947[1]
  var i948 = []
  for(var i = 0; i < i949.length; i += 1) {
    i948.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i949[i + 0]) );
  }
  i946.frames = i948
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i950 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i951 = data
  request.r(i951[0], i951[1], 0, i950, 'sharedMesh')
  i950.convex = !!i951[2]
  i950.enabled = !!i951[3]
  i950.isTrigger = !!i951[4]
  request.r(i951[5], i951[6], 0, i950, 'material')
  return i950
}

Deserializers["LimitLineController"] = function (request, data, root) {
  var i952 = root || request.c( 'LimitLineController' )
  var i953 = data
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i954 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i955 = data
  i954.planeDistance = i955[0]
  i954.referencePixelsPerUnit = i955[1]
  i954.isFallbackOverlay = !!i955[2]
  i954.renderMode = i955[3]
  i954.renderOrder = i955[4]
  i954.sortingLayerName = i955[5]
  i954.sortingOrder = i955[6]
  i954.scaleFactor = i955[7]
  request.r(i955[8], i955[9], 0, i954, 'worldCamera')
  i954.overrideSorting = !!i955[10]
  i954.pixelPerfect = !!i955[11]
  i954.targetDisplay = i955[12]
  i954.overridePixelPerfect = !!i955[13]
  i954.enabled = !!i955[14]
  return i954
}

Deserializers["PopupSettings"] = function (request, data, root) {
  var i956 = root || request.c( 'PopupSettings' )
  var i957 = data
  var i959 = i957[0]
  var i958 = []
  for(var i = 0; i < i959.length; i += 1) {
    i958.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i959[i + 0]) );
  }
  i956.openTween = i958
  var i961 = i957[1]
  var i960 = []
  for(var i = 0; i < i961.length; i += 1) {
    i960.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i961[i + 0]) );
  }
  i956.closeTween = i960
  i956.keepCached = !!i957[2]
  i956.pauseGame = !!i957[3]
  i956.ignoreTracking = !!i957[4]
  request.r(i957[5], i957[6], 0, i956, 'toggleSoundVisual')
  request.r(i957[7], i957[8], 0, i956, 'toggleMusicVisual')
  request.r(i957[9], i957[10], 0, i956, 'toggleVibrationVisual')
  request.r(i957[11], i957[12], 0, i956, 'btnResume')
  request.r(i957[13], i957[14], 0, i956, 'btnClose')
  request.r(i957[15], i957[16], 0, i956, 'btnRestart')
  i956.trackingName = i957[17]
  return i956
}

Deserializers["SonatFramework.Scripts.UIModule.TweenData"] = function (request, data, root) {
  var i964 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenData' )
  var i965 = data
  request.r(i965[0], i965[1], 0, i964, 'target')
  request.r(i965[2], i965[3], 0, i964, 'configSO')
  i964.custom = !!i965[4]
  i964.config = request.d('SonatFramework.Scripts.UIModule.TweenConfig', i965[5], i964.config)
  i964.OnCompleted = request.d('System.Action', i965[6], i964.OnCompleted)
  return i964
}

Deserializers["SonatFramework.Scripts.UIModule.TweenConfig"] = function (request, data, root) {
  var i966 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenConfig' )
  var i967 = data
  i966.tweenType = i967[0]
  i966.from = i967[1]
  i966.to = i967[2]
  i966.mFrom = new pc.Vec3( i967[3], i967[4], i967[5] )
  i966.mTo = new pc.Vec3( i967[6], i967[7], i967[8] )
  i966.duration = i967[9]
  i966.delay = i967[10]
  i966.curve = new pc.AnimationCurve( { keys_flow: i967[11] } )
  return i966
}

Deserializers["System.Action"] = function (request, data, root) {
  var i968 = root || request.c( 'System.Action' )
  var i969 = data
  return i968
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i970 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i971 = data
  i970.m_Spacing = i971[0]
  i970.m_ChildForceExpandWidth = !!i971[1]
  i970.m_ChildForceExpandHeight = !!i971[2]
  i970.m_ChildControlWidth = !!i971[3]
  i970.m_ChildControlHeight = !!i971[4]
  i970.m_ChildScaleWidth = !!i971[5]
  i970.m_ChildScaleHeight = !!i971[6]
  i970.m_ReverseArrangement = !!i971[7]
  i970.m_Padding = UnityEngine.RectOffset.FromPaddings(i971[8], i971[9], i971[10], i971[11])
  i970.m_ChildAlignment = i971[12]
  return i970
}

Deserializers["SonatFramework.Systems.SettingsManagement.SettingsElement"] = function (request, data, root) {
  var i972 = root || request.c( 'SonatFramework.Systems.SettingsManagement.SettingsElement' )
  var i973 = data
  request.r(i973[0], i973[1], 0, i972, 'musicToggle')
  request.r(i973[2], i973[3], 0, i972, 'soundToggle')
  request.r(i973[4], i973[5], 0, i972, 'vibrateToggle')
  return i972
}

Deserializers["ButtonScale"] = function (request, data, root) {
  var i974 = root || request.c( 'ButtonScale' )
  var i975 = data
  i974.hoverScale = i975[0]
  i974.clickScale = i975[1]
  i974.duration = i975[2]
  i974.baseScale = new pc.Vec3( i975[3], i975[4], i975[5] )
  return i974
}

Deserializers["UnityEngine.UI.Toggle"] = function (request, data, root) {
  var i976 = root || request.c( 'UnityEngine.UI.Toggle' )
  var i977 = data
  i976.toggleTransition = i977[0]
  request.r(i977[1], i977[2], 0, i976, 'graphic')
  i976.onValueChanged = request.d('UnityEngine.UI.Toggle+ToggleEvent', i977[3], i976.onValueChanged)
  request.r(i977[4], i977[5], 0, i976, 'm_Group')
  i976.m_IsOn = !!i977[6]
  i976.m_Navigation = request.d('UnityEngine.UI.Navigation', i977[7], i976.m_Navigation)
  i976.m_Transition = i977[8]
  i976.m_Colors = request.d('UnityEngine.UI.ColorBlock', i977[9], i976.m_Colors)
  i976.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i977[10], i976.m_SpriteState)
  i976.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i977[11], i976.m_AnimationTriggers)
  i976.m_Interactable = !!i977[12]
  request.r(i977[13], i977[14], 0, i976, 'm_TargetGraphic')
  return i976
}

Deserializers["UnityEngine.UI.Toggle+ToggleEvent"] = function (request, data, root) {
  var i978 = root || request.c( 'UnityEngine.UI.Toggle+ToggleEvent' )
  var i979 = data
  i978.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i979[0], i978.m_PersistentCalls)
  return i978
}

Deserializers["UIToggleExtension"] = function (request, data, root) {
  var i980 = root || request.c( 'UIToggleExtension' )
  var i981 = data
  request.r(i981[0], i981[1], 0, i980, 'deactiveObj')
  request.r(i981[2], i981[3], 0, i980, 'activeObj')
  return i980
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i982 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i983 = data
  request.r(i983[0], i983[1], 0, i982, 'm_ObjectArgument')
  i982.m_ObjectArgumentAssemblyTypeName = i983[2]
  i982.m_IntArgument = i983[3]
  i982.m_FloatArgument = i983[4]
  i982.m_StringArgument = i983[5]
  i982.m_BoolArgument = !!i983[6]
  return i982
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i984 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i985 = data
  i984.m_Spacing = i985[0]
  i984.m_ChildForceExpandWidth = !!i985[1]
  i984.m_ChildForceExpandHeight = !!i985[2]
  i984.m_ChildControlWidth = !!i985[3]
  i984.m_ChildControlHeight = !!i985[4]
  i984.m_ChildScaleWidth = !!i985[5]
  i984.m_ChildScaleHeight = !!i985[6]
  i984.m_ReverseArrangement = !!i985[7]
  i984.m_Padding = UnityEngine.RectOffset.FromPaddings(i985[8], i985[9], i985[10], i985[11])
  i984.m_ChildAlignment = i985[12]
  return i984
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i986 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i987 = data
  i986.m_HorizontalFit = i987[0]
  i986.m_VerticalFit = i987[1]
  return i986
}

Deserializers["CheatButton"] = function (request, data, root) {
  var i988 = root || request.c( 'CheatButton' )
  var i989 = data
  request.r(i989[0], i989[1], 0, i988, 'needOff')
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i991 = data
  i990.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i991[0], i990.main)
  i990.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i991[1], i990.colorBySpeed)
  i990.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i991[2], i990.colorOverLifetime)
  i990.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i991[3], i990.emission)
  i990.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i991[4], i990.rotationBySpeed)
  i990.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i991[5], i990.rotationOverLifetime)
  i990.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i991[6], i990.shape)
  i990.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i991[7], i990.sizeBySpeed)
  i990.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i991[8], i990.sizeOverLifetime)
  i990.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i991[9], i990.textureSheetAnimation)
  i990.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i991[10], i990.velocityOverLifetime)
  i990.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i991[11], i990.noise)
  i990.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i991[12], i990.inheritVelocity)
  i990.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i991[13], i990.forceOverLifetime)
  i990.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i991[14], i990.limitVelocityOverLifetime)
  i990.useAutoRandomSeed = !!i991[15]
  i990.randomSeed = i991[16]
  return i990
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i992 = root || new pc.ParticleSystemMain()
  var i993 = data
  i992.duration = i993[0]
  i992.loop = !!i993[1]
  i992.prewarm = !!i993[2]
  i992.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[3], i992.startDelay)
  i992.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[4], i992.startLifetime)
  i992.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[5], i992.startSpeed)
  i992.startSize3D = !!i993[6]
  i992.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[7], i992.startSizeX)
  i992.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[8], i992.startSizeY)
  i992.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[9], i992.startSizeZ)
  i992.startRotation3D = !!i993[10]
  i992.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[11], i992.startRotationX)
  i992.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[12], i992.startRotationY)
  i992.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[13], i992.startRotationZ)
  i992.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i993[14], i992.startColor)
  i992.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i993[15], i992.gravityModifier)
  i992.simulationSpace = i993[16]
  request.r(i993[17], i993[18], 0, i992, 'customSimulationSpace')
  i992.simulationSpeed = i993[19]
  i992.useUnscaledTime = !!i993[20]
  i992.scalingMode = i993[21]
  i992.playOnAwake = !!i993[22]
  i992.maxParticles = i993[23]
  i992.emitterVelocityMode = i993[24]
  i992.stopAction = i993[25]
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i994 = root || new pc.MinMaxCurve()
  var i995 = data
  i994.mode = i995[0]
  i994.curveMin = new pc.AnimationCurve( { keys_flow: i995[1] } )
  i994.curveMax = new pc.AnimationCurve( { keys_flow: i995[2] } )
  i994.curveMultiplier = i995[3]
  i994.constantMin = i995[4]
  i994.constantMax = i995[5]
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i996 = root || new pc.MinMaxGradient()
  var i997 = data
  i996.mode = i997[0]
  i996.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i997[1], i996.gradientMin)
  i996.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i997[2], i996.gradientMax)
  i996.colorMin = new pc.Color(i997[3], i997[4], i997[5], i997[6])
  i996.colorMax = new pc.Color(i997[7], i997[8], i997[9], i997[10])
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i998 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i999 = data
  i998.mode = i999[0]
  var i1001 = i999[1]
  var i1000 = []
  for(var i = 0; i < i1001.length; i += 1) {
    i1000.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i1001[i + 0]) );
  }
  i998.colorKeys = i1000
  var i1003 = i999[2]
  var i1002 = []
  for(var i = 0; i < i1003.length; i += 1) {
    i1002.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i1003[i + 0]) );
  }
  i998.alphaKeys = i1002
  return i998
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i1004 = root || new pc.ParticleSystemColorBySpeed()
  var i1005 = data
  i1004.enabled = !!i1005[0]
  i1004.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1005[1], i1004.color)
  i1004.range = new pc.Vec2( i1005[2], i1005[3] )
  return i1004
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i1008 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i1009 = data
  i1008.color = new pc.Color(i1009[0], i1009[1], i1009[2], i1009[3])
  i1008.time = i1009[4]
  return i1008
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i1012 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i1013 = data
  i1012.alpha = i1013[0]
  i1012.time = i1013[1]
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i1014 = root || new pc.ParticleSystemColorOverLifetime()
  var i1015 = data
  i1014.enabled = !!i1015[0]
  i1014.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1015[1], i1014.color)
  return i1014
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i1016 = root || new pc.ParticleSystemEmitter()
  var i1017 = data
  i1016.enabled = !!i1017[0]
  i1016.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1017[1], i1016.rateOverTime)
  i1016.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1017[2], i1016.rateOverDistance)
  var i1019 = i1017[3]
  var i1018 = []
  for(var i = 0; i < i1019.length; i += 1) {
    i1018.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i1019[i + 0]) );
  }
  i1016.bursts = i1018
  return i1016
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i1022 = root || new pc.ParticleSystemBurst()
  var i1023 = data
  i1022.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[0], i1022.count)
  i1022.cycleCount = i1023[1]
  i1022.minCount = i1023[2]
  i1022.maxCount = i1023[3]
  i1022.repeatInterval = i1023[4]
  i1022.time = i1023[5]
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i1024 = root || new pc.ParticleSystemRotationBySpeed()
  var i1025 = data
  i1024.enabled = !!i1025[0]
  i1024.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[1], i1024.x)
  i1024.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[2], i1024.y)
  i1024.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[3], i1024.z)
  i1024.separateAxes = !!i1025[4]
  i1024.range = new pc.Vec2( i1025[5], i1025[6] )
  return i1024
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i1026 = root || new pc.ParticleSystemRotationOverLifetime()
  var i1027 = data
  i1026.enabled = !!i1027[0]
  i1026.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[1], i1026.x)
  i1026.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[2], i1026.y)
  i1026.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[3], i1026.z)
  i1026.separateAxes = !!i1027[4]
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i1028 = root || new pc.ParticleSystemShape()
  var i1029 = data
  i1028.enabled = !!i1029[0]
  i1028.shapeType = i1029[1]
  i1028.randomDirectionAmount = i1029[2]
  i1028.sphericalDirectionAmount = i1029[3]
  i1028.randomPositionAmount = i1029[4]
  i1028.alignToDirection = !!i1029[5]
  i1028.radius = i1029[6]
  i1028.radiusMode = i1029[7]
  i1028.radiusSpread = i1029[8]
  i1028.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[9], i1028.radiusSpeed)
  i1028.radiusThickness = i1029[10]
  i1028.angle = i1029[11]
  i1028.length = i1029[12]
  i1028.boxThickness = new pc.Vec3( i1029[13], i1029[14], i1029[15] )
  i1028.meshShapeType = i1029[16]
  request.r(i1029[17], i1029[18], 0, i1028, 'mesh')
  request.r(i1029[19], i1029[20], 0, i1028, 'meshRenderer')
  request.r(i1029[21], i1029[22], 0, i1028, 'skinnedMeshRenderer')
  i1028.useMeshMaterialIndex = !!i1029[23]
  i1028.meshMaterialIndex = i1029[24]
  i1028.useMeshColors = !!i1029[25]
  i1028.normalOffset = i1029[26]
  i1028.arc = i1029[27]
  i1028.arcMode = i1029[28]
  i1028.arcSpread = i1029[29]
  i1028.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[30], i1028.arcSpeed)
  i1028.donutRadius = i1029[31]
  i1028.position = new pc.Vec3( i1029[32], i1029[33], i1029[34] )
  i1028.rotation = new pc.Vec3( i1029[35], i1029[36], i1029[37] )
  i1028.scale = new pc.Vec3( i1029[38], i1029[39], i1029[40] )
  return i1028
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i1030 = root || new pc.ParticleSystemSizeBySpeed()
  var i1031 = data
  i1030.enabled = !!i1031[0]
  i1030.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[1], i1030.x)
  i1030.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[2], i1030.y)
  i1030.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[3], i1030.z)
  i1030.separateAxes = !!i1031[4]
  i1030.range = new pc.Vec2( i1031[5], i1031[6] )
  return i1030
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i1032 = root || new pc.ParticleSystemSizeOverLifetime()
  var i1033 = data
  i1032.enabled = !!i1033[0]
  i1032.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1033[1], i1032.x)
  i1032.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1033[2], i1032.y)
  i1032.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1033[3], i1032.z)
  i1032.separateAxes = !!i1033[4]
  return i1032
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i1034 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i1035 = data
  i1034.enabled = !!i1035[0]
  i1034.mode = i1035[1]
  i1034.animation = i1035[2]
  i1034.numTilesX = i1035[3]
  i1034.numTilesY = i1035[4]
  i1034.useRandomRow = !!i1035[5]
  i1034.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[6], i1034.frameOverTime)
  i1034.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[7], i1034.startFrame)
  i1034.cycleCount = i1035[8]
  i1034.rowIndex = i1035[9]
  i1034.flipU = i1035[10]
  i1034.flipV = i1035[11]
  i1034.spriteCount = i1035[12]
  var i1037 = i1035[13]
  var i1036 = []
  for(var i = 0; i < i1037.length; i += 2) {
  request.r(i1037[i + 0], i1037[i + 1], 2, i1036, '')
  }
  i1034.sprites = i1036
  return i1034
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i1040 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i1041 = data
  i1040.enabled = !!i1041[0]
  i1040.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[1], i1040.x)
  i1040.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[2], i1040.y)
  i1040.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[3], i1040.z)
  i1040.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[4], i1040.radial)
  i1040.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[5], i1040.speedModifier)
  i1040.space = i1041[6]
  i1040.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[7], i1040.orbitalX)
  i1040.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[8], i1040.orbitalY)
  i1040.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[9], i1040.orbitalZ)
  i1040.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[10], i1040.orbitalOffsetX)
  i1040.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[11], i1040.orbitalOffsetY)
  i1040.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[12], i1040.orbitalOffsetZ)
  return i1040
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i1042 = root || new pc.ParticleSystemNoise()
  var i1043 = data
  i1042.enabled = !!i1043[0]
  i1042.separateAxes = !!i1043[1]
  i1042.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[2], i1042.strengthX)
  i1042.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[3], i1042.strengthY)
  i1042.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[4], i1042.strengthZ)
  i1042.frequency = i1043[5]
  i1042.damping = !!i1043[6]
  i1042.octaveCount = i1043[7]
  i1042.octaveMultiplier = i1043[8]
  i1042.octaveScale = i1043[9]
  i1042.quality = i1043[10]
  i1042.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[11], i1042.scrollSpeed)
  i1042.scrollSpeedMultiplier = i1043[12]
  i1042.remapEnabled = !!i1043[13]
  i1042.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[14], i1042.remapX)
  i1042.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[15], i1042.remapY)
  i1042.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[16], i1042.remapZ)
  i1042.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[17], i1042.positionAmount)
  i1042.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[18], i1042.rotationAmount)
  i1042.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[19], i1042.sizeAmount)
  return i1042
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i1044 = root || new pc.ParticleSystemInheritVelocity()
  var i1045 = data
  i1044.enabled = !!i1045[0]
  i1044.mode = i1045[1]
  i1044.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[2], i1044.curve)
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i1046 = root || new pc.ParticleSystemForceOverLifetime()
  var i1047 = data
  i1046.enabled = !!i1047[0]
  i1046.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[1], i1046.x)
  i1046.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[2], i1046.y)
  i1046.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[3], i1046.z)
  i1046.space = i1047[4]
  i1046.randomized = !!i1047[5]
  return i1046
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i1048 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i1049 = data
  i1048.enabled = !!i1049[0]
  i1048.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1049[1], i1048.limit)
  i1048.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1049[2], i1048.limitX)
  i1048.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1049[3], i1048.limitY)
  i1048.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1049[4], i1048.limitZ)
  i1048.dampen = i1049[5]
  i1048.separateAxes = !!i1049[6]
  i1048.space = i1049[7]
  i1048.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1049[8], i1048.drag)
  i1048.multiplyDragByParticleSize = !!i1049[9]
  i1048.multiplyDragByParticleVelocity = !!i1049[10]
  return i1048
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i1050 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i1051 = data
  request.r(i1051[0], i1051[1], 0, i1050, 'mesh')
  i1050.meshCount = i1051[2]
  i1050.activeVertexStreamsCount = i1051[3]
  i1050.alignment = i1051[4]
  i1050.renderMode = i1051[5]
  i1050.sortMode = i1051[6]
  i1050.lengthScale = i1051[7]
  i1050.velocityScale = i1051[8]
  i1050.cameraVelocityScale = i1051[9]
  i1050.normalDirection = i1051[10]
  i1050.sortingFudge = i1051[11]
  i1050.minParticleSize = i1051[12]
  i1050.maxParticleSize = i1051[13]
  i1050.pivot = new pc.Vec3( i1051[14], i1051[15], i1051[16] )
  request.r(i1051[17], i1051[18], 0, i1050, 'trailMaterial')
  i1050.applyActiveColorSpace = !!i1051[19]
  i1050.enabled = !!i1051[20]
  request.r(i1051[21], i1051[22], 0, i1050, 'sharedMaterial')
  var i1053 = i1051[23]
  var i1052 = []
  for(var i = 0; i < i1053.length; i += 2) {
  request.r(i1053[i + 0], i1053[i + 1], 2, i1052, '')
  }
  i1050.sharedMaterials = i1052
  i1050.receiveShadows = !!i1051[24]
  i1050.shadowCastingMode = i1051[25]
  i1050.sortingLayerID = i1051[26]
  i1050.sortingOrder = i1051[27]
  i1050.lightmapIndex = i1051[28]
  i1050.lightmapSceneIndex = i1051[29]
  i1050.lightmapScaleOffset = new pc.Vec4( i1051[30], i1051[31], i1051[32], i1051[33] )
  i1050.lightProbeUsage = i1051[34]
  i1050.reflectionProbeUsage = i1051[35]
  return i1050
}

Deserializers["Coffee.UIExtensions.UIParticle"] = function (request, data, root) {
  var i1054 = root || request.c( 'Coffee.UIExtensions.UIParticle' )
  var i1055 = data
  i1054.m_IsTrail = !!i1055[0]
  i1054.m_IgnoreCanvasScaler = !!i1055[1]
  i1054.m_AbsoluteMode = !!i1055[2]
  i1054.m_Scale3D = new pc.Vec3( i1055[3], i1055[4], i1055[5] )
  var i1057 = i1055[6]
  var i1056 = []
  for(var i = 0; i < i1057.length; i += 1) {
    i1056.push( request.d('Coffee.UIExtensions.AnimatableProperty', i1057[i + 0]) );
  }
  i1054.m_AnimatableProperties = i1056
  var i1059 = i1055[7]
  var i1058 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.ParticleSystem')))
  for(var i = 0; i < i1059.length; i += 2) {
  request.r(i1059[i + 0], i1059[i + 1], 1, i1058, '')
  }
  i1054.m_Particles = i1058
  i1054.m_MeshSharing = i1055[8]
  i1054.m_GroupId = i1055[9]
  i1054.m_GroupMaxId = i1055[10]
  i1054.m_PositionMode = i1055[11]
  i1054.m_AutoScaling = !!i1055[12]
  i1054.m_AutoScalingMode = i1055[13]
  i1054.m_UseCustomView = !!i1055[14]
  i1054.m_CustomViewSize = i1055[15]
  i1054.m_TimeScaleMultiplier = i1055[16]
  request.r(i1055[17], i1055[18], 0, i1054, 'm_Material')
  i1054.m_Maskable = !!i1055[19]
  i1054.m_Color = new pc.Color(i1055[20], i1055[21], i1055[22], i1055[23])
  i1054.m_RaycastTarget = !!i1055[24]
  i1054.m_RaycastPadding = new pc.Vec4( i1055[25], i1055[26], i1055[27], i1055[28] )
  return i1054
}

Deserializers["Coffee.UIExtensions.AnimatableProperty"] = function (request, data, root) {
  var i1062 = root || request.c( 'Coffee.UIExtensions.AnimatableProperty' )
  var i1063 = data
  i1062.m_Name = i1063[0]
  i1062.m_Type = i1063[1]
  return i1062
}

Deserializers["EmojiSlot"] = function (request, data, root) {
  var i1066 = root || request.c( 'EmojiSlot' )
  var i1067 = data
  request.r(i1067[0], i1067[1], 0, i1066, 'emojiPrefab')
  return i1066
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i1068 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i1069 = data
  request.r(i1069[0], i1069[1], 0, i1068, 'animatorController')
  request.r(i1069[2], i1069[3], 0, i1068, 'avatar')
  i1068.updateMode = i1069[4]
  i1068.hasTransformHierarchy = !!i1069[5]
  i1068.applyRootMotion = !!i1069[6]
  var i1071 = i1069[7]
  var i1070 = []
  for(var i = 0; i < i1071.length; i += 2) {
  request.r(i1071[i + 0], i1071[i + 1], 2, i1070, '')
  }
  i1068.humanBones = i1070
  i1068.enabled = !!i1069[8]
  return i1068
}

Deserializers["Smiles.ParentFitter"] = function (request, data, root) {
  var i1074 = root || request.c( 'Smiles.ParentFitter' )
  var i1075 = data
  return i1074
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1077 = data
  i1076.center = new pc.Vec3( i1077[0], i1077[1], i1077[2] )
  i1076.size = new pc.Vec3( i1077[3], i1077[4], i1077[5] )
  i1076.enabled = !!i1077[6]
  i1076.isTrigger = !!i1077[7]
  request.r(i1077[8], i1077[9], 0, i1076, 'material')
  return i1076
}

Deserializers["DualDirectionEffect"] = function (request, data, root) {
  var i1078 = root || request.c( 'DualDirectionEffect' )
  var i1079 = data
  var i1081 = i1079[0]
  var i1080 = []
  for(var i = 0; i < i1081.length; i += 2) {
  request.r(i1081[i + 0], i1081[i + 1], 2, i1080, '')
  }
  i1078._renderers = i1080
  var i1083 = i1079[1]
  var i1082 = []
  for(var i = 0; i < i1083.length; i += 2) {
  request.r(i1083[i + 0], i1083[i + 1], 2, i1082, '')
  }
  i1078.particleSystems = i1082
  return i1078
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1088 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1089 = data
  i1088.name = i1089[0]
  i1088.atlasId = i1089[1]
  i1088.mipmapCount = i1089[2]
  i1088.hdr = !!i1089[3]
  i1088.size = i1089[4]
  i1088.anisoLevel = i1089[5]
  i1088.filterMode = i1089[6]
  var i1091 = i1089[7]
  var i1090 = []
  for(var i = 0; i < i1091.length; i += 4) {
    i1090.push( UnityEngine.Rect.MinMaxRect(i1091[i + 0], i1091[i + 1], i1091[i + 2], i1091[i + 3]) );
  }
  i1088.rects = i1090
  i1088.wrapU = i1089[8]
  i1088.wrapV = i1089[9]
  return i1088
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1094 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1095 = data
  i1094.name = i1095[0]
  i1094.index = i1095[1]
  i1094.startup = !!i1095[2]
  return i1094
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1096 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1097 = data
  i1096.aspect = i1097[0]
  i1096.orthographic = !!i1097[1]
  i1096.orthographicSize = i1097[2]
  i1096.backgroundColor = new pc.Color(i1097[3], i1097[4], i1097[5], i1097[6])
  i1096.nearClipPlane = i1097[7]
  i1096.farClipPlane = i1097[8]
  i1096.fieldOfView = i1097[9]
  i1096.depth = i1097[10]
  i1096.clearFlags = i1097[11]
  i1096.cullingMask = i1097[12]
  i1096.rect = i1097[13]
  request.r(i1097[14], i1097[15], 0, i1096, 'targetTexture')
  i1096.usePhysicalProperties = !!i1097[16]
  i1096.focalLength = i1097[17]
  i1096.sensorSize = new pc.Vec2( i1097[18], i1097[19] )
  i1096.lensShift = new pc.Vec2( i1097[20], i1097[21] )
  i1096.gateFit = i1097[22]
  i1096.commandBufferCount = i1097[23]
  i1096.cameraType = i1097[24]
  i1096.enabled = !!i1097[25]
  return i1096
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalCameraData"] = function (request, data, root) {
  var i1098 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalCameraData' )
  var i1099 = data
  i1098.m_RenderShadows = !!i1099[0]
  i1098.m_RequiresDepthTextureOption = i1099[1]
  i1098.m_RequiresOpaqueTextureOption = i1099[2]
  i1098.m_CameraType = i1099[3]
  var i1101 = i1099[4]
  var i1100 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Camera')))
  for(var i = 0; i < i1101.length; i += 2) {
  request.r(i1101[i + 0], i1101[i + 1], 1, i1100, '')
  }
  i1098.m_Cameras = i1100
  i1098.m_RendererIndex = i1099[5]
  i1098.m_VolumeLayerMask = UnityEngine.LayerMask.FromIntegerValue( i1099[6] )
  request.r(i1099[7], i1099[8], 0, i1098, 'm_VolumeTrigger')
  i1098.m_VolumeFrameworkUpdateModeOption = i1099[9]
  i1098.m_RenderPostProcessing = !!i1099[10]
  i1098.m_Antialiasing = i1099[11]
  i1098.m_AntialiasingQuality = i1099[12]
  i1098.m_StopNaN = !!i1099[13]
  i1098.m_Dithering = !!i1099[14]
  i1098.m_ClearDepth = !!i1099[15]
  i1098.m_AllowXRRendering = !!i1099[16]
  i1098.m_AllowHDROutput = !!i1099[17]
  i1098.m_UseScreenCoordOverride = !!i1099[18]
  i1098.m_ScreenSizeOverride = new pc.Vec4( i1099[19], i1099[20], i1099[21], i1099[22] )
  i1098.m_ScreenCoordScaleBias = new pc.Vec4( i1099[23], i1099[24], i1099[25], i1099[26] )
  i1098.m_RequiresDepthTexture = !!i1099[27]
  i1098.m_RequiresColorTexture = !!i1099[28]
  i1098.m_Version = i1099[29]
  i1098.m_TaaSettings = request.d('UnityEngine.Rendering.Universal.TemporalAA+Settings', i1099[30], i1098.m_TaaSettings)
  return i1098
}

Deserializers["UnityEngine.Rendering.Universal.TemporalAA+Settings"] = function (request, data, root) {
  var i1104 = root || request.c( 'UnityEngine.Rendering.Universal.TemporalAA+Settings' )
  var i1105 = data
  i1104.m_Quality = i1105[0]
  i1104.m_FrameInfluence = i1105[1]
  i1104.m_JitterScale = i1105[2]
  i1104.m_MipBias = i1105[3]
  i1104.m_VarianceClampScale = i1105[4]
  i1104.m_ContrastAdaptiveSharpening = i1105[5]
  return i1104
}

Deserializers["CameraResponsive"] = function (request, data, root) {
  var i1106 = root || request.c( 'CameraResponsive' )
  var i1107 = data
  i1106.orthoSizeV = i1107[0]
  i1106.orthoSizeVTall = i1107[1]
  i1106.orthoSizeH = i1107[2]
  i1106.orthoSizeTab = i1107[3]
  return i1106
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1108 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1109 = data
  i1108.type = i1109[0]
  i1108.color = new pc.Color(i1109[1], i1109[2], i1109[3], i1109[4])
  i1108.cullingMask = i1109[5]
  i1108.intensity = i1109[6]
  i1108.range = i1109[7]
  i1108.spotAngle = i1109[8]
  i1108.shadows = i1109[9]
  i1108.shadowNormalBias = i1109[10]
  i1108.shadowBias = i1109[11]
  i1108.shadowStrength = i1109[12]
  i1108.shadowResolution = i1109[13]
  i1108.lightmapBakeType = i1109[14]
  i1108.renderMode = i1109[15]
  request.r(i1109[16], i1109[17], 0, i1108, 'cookie')
  i1108.cookieSize = i1109[18]
  i1108.shadowNearPlane = i1109[19]
  i1108.enabled = !!i1109[20]
  return i1108
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i1110 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i1111 = data
  i1110.m_Version = i1111[0]
  i1110.m_UsePipelineSettings = !!i1111[1]
  i1110.m_AdditionalLightsShadowResolutionTier = i1111[2]
  i1110.m_LightLayerMask = i1111[3]
  i1110.m_RenderingLayers = i1111[4]
  i1110.m_CustomShadowLayers = !!i1111[5]
  i1110.m_ShadowLayerMask = i1111[6]
  i1110.m_ShadowRenderingLayers = i1111[7]
  i1110.m_LightCookieSize = new pc.Vec2( i1111[8], i1111[9] )
  i1110.m_LightCookieOffset = new pc.Vec2( i1111[10], i1111[11] )
  i1110.m_SoftShadowQuality = i1111[12]
  return i1110
}

Deserializers["TowerHeightController"] = function (request, data, root) {
  var i1112 = root || request.c( 'TowerHeightController' )
  var i1113 = data
  return i1112
}

Deserializers["TowerController"] = function (request, data, root) {
  var i1114 = root || request.c( 'TowerController' )
  var i1115 = data
  request.r(i1115[0], i1115[1], 0, i1114, 'spawner')
  request.r(i1115[2], i1115[3], 0, i1114, 'rotator')
  request.r(i1115[4], i1115[5], 0, i1114, 'towerContainer')
  request.r(i1115[6], i1115[7], 0, i1114, 'activeBlock')
  request.r(i1115[8], i1115[9], 0, i1114, 'heightController')
  request.r(i1115[10], i1115[11], 0, i1114, 'limitLine')
  return i1114
}

Deserializers["TowerRotator"] = function (request, data, root) {
  var i1116 = root || request.c( 'TowerRotator' )
  var i1117 = data
  return i1116
}

Deserializers["BlockSpawner"] = function (request, data, root) {
  var i1118 = root || request.c( 'BlockSpawner' )
  var i1119 = data
  return i1118
}

Deserializers["GhostBlockController"] = function (request, data, root) {
  var i1120 = root || request.c( 'GhostBlockController' )
  var i1121 = data
  request.r(i1121[0], i1121[1], 0, i1120, 'CurrentShape')
  request.r(i1121[2], i1121[3], 0, i1120, 'cellPrefab')
  request.r(i1121[4], i1121[5], 0, i1120, 'meshLibrary')
  var i1123 = i1121[6]
  var i1122 = new (System.Collections.Generic.List$1(Bridge.ns('BlockVisual')))
  for(var i = 0; i < i1123.length; i += 2) {
  request.r(i1123[i + 0], i1123[i + 1], 1, i1122, '')
  }
  i1120.blockVisuals = i1122
  request.r(i1121[7], i1121[8], 0, i1120, 'palette')
  return i1120
}

Deserializers["ActiveBlockController"] = function (request, data, root) {
  var i1126 = root || request.c( 'ActiveBlockController' )
  var i1127 = data
  request.r(i1127[0], i1127[1], 0, i1126, 'CurrentShape')
  request.r(i1127[2], i1127[3], 0, i1126, 'cellPrefab')
  request.r(i1127[4], i1127[5], 0, i1126, 'meshLibrary')
  var i1129 = i1127[6]
  var i1128 = new (System.Collections.Generic.List$1(Bridge.ns('BlockVisual')))
  for(var i = 0; i < i1129.length; i += 2) {
  request.r(i1129[i + 0], i1129[i + 1], 1, i1128, '')
  }
  i1126.blockVisuals = i1128
  i1126.faceSwitchThreshold = i1127[7]
  request.r(i1127[8], i1127[9], 0, i1126, 'floodIcon')
  return i1126
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1130 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1131 = data
  i1130.m_UiScaleMode = i1131[0]
  i1130.m_ReferencePixelsPerUnit = i1131[1]
  i1130.m_ScaleFactor = i1131[2]
  i1130.m_ReferenceResolution = new pc.Vec2( i1131[3], i1131[4] )
  i1130.m_ScreenMatchMode = i1131[5]
  i1130.m_MatchWidthOrHeight = i1131[6]
  i1130.m_PhysicalUnit = i1131[7]
  i1130.m_FallbackScreenDPI = i1131[8]
  i1130.m_DefaultSpriteDPI = i1131[9]
  i1130.m_DynamicPixelsPerUnit = i1131[10]
  i1130.m_PresetInfoIsWorld = !!i1131[11]
  return i1130
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1132 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1133 = data
  i1132.m_IgnoreReversedGraphics = !!i1133[0]
  i1132.m_BlockingObjects = i1133[1]
  i1132.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1133[2] )
  return i1132
}

Deserializers["SonatFramework.Scripts.UIModule.SafeArea"] = function (request, data, root) {
  var i1134 = root || request.c( 'SonatFramework.Scripts.UIModule.SafeArea' )
  var i1135 = data
  i1134.ConformX = !!i1135[0]
  i1134.ConformY = !!i1135[1]
  i1134.topIg = i1135[2]
  i1134.Logging = !!i1135[3]
  return i1134
}

Deserializers["GameHUD"] = function (request, data, root) {
  var i1136 = root || request.c( 'GameHUD' )
  var i1137 = data
  request.r(i1137[0], i1137[1], 0, i1136, 'levelText')
  request.r(i1137[2], i1137[3], 0, i1136, 'scoreText')
  request.r(i1137[4], i1137[5], 0, i1136, 'scoreFillImage')
  return i1136
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut"] = function (request, data, root) {
  var i1138 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut' )
  var i1139 = data
  i1138.panelOpenName = i1139[0]
  i1138.tracking = i1139[1]
  return i1138
}

Deserializers["ButtonRestart"] = function (request, data, root) {
  var i1140 = root || request.c( 'ButtonRestart' )
  var i1141 = data
  return i1140
}

Deserializers["NextBlockUI"] = function (request, data, root) {
  var i1142 = root || request.c( 'NextBlockUI' )
  var i1143 = data
  request.r(i1143[0], i1143[1], 0, i1142, 'blockImage')
  request.r(i1143[2], i1143[3], 0, i1142, 'slideDirectionIcon')
  return i1142
}

Deserializers["FloodProgressUI"] = function (request, data, root) {
  var i1144 = root || request.c( 'FloodProgressUI' )
  var i1145 = data
  request.r(i1145[0], i1145[1], 0, i1144, 'fillImage')
  request.r(i1145[2], i1145[3], 0, i1144, 'canvasGroup')
  i1144.fillDuration = i1145[4]
  i1144.hideDelay = i1145[5]
  return i1144
}

Deserializers["TimerUI"] = function (request, data, root) {
  var i1146 = root || request.c( 'TimerUI' )
  var i1147 = data
  request.r(i1147[0], i1147[1], 0, i1146, 'timerText')
  request.r(i1147[2], i1147[3], 0, i1146, 'containerImage')
  i1146.flashDuration = i1147[4]
  i1146.maxSaturation = i1147[5]
  i1146.urgentThreshold = i1147[6]
  i1146.urgentTextColor = new pc.Color(i1147[7], i1147[8], i1147[9], i1147[10])
  return i1146
}

Deserializers["BtnNoAds"] = function (request, data, root) {
  var i1148 = root || request.c( 'BtnNoAds' )
  var i1149 = data
  return i1148
}

Deserializers["RotateButtonHandler"] = function (request, data, root) {
  var i1150 = root || request.c( 'RotateButtonHandler' )
  var i1151 = data
  i1150.direction = i1151[0]
  return i1150
}

Deserializers["RotateLoadingIndicator"] = function (request, data, root) {
  var i1152 = root || request.c( 'RotateLoadingIndicator' )
  var i1153 = data
  i1152._direction = i1153[0]
  return i1152
}

Deserializers["GameHistorySystem"] = function (request, data, root) {
  var i1154 = root || request.c( 'GameHistorySystem' )
  var i1155 = data
  i1154.snapshotCount = i1155[0]
  return i1154
}

Deserializers["UIBoosterUndo"] = function (request, data, root) {
  var i1156 = root || request.c( 'UIBoosterUndo' )
  var i1157 = data
  i1156.countPerLevel = i1157[0]
  i1156.boosterType = i1157[1]
  i1156.unlockLevel = i1157[2]
  request.r(i1157[3], i1157[4], 0, i1156, 'button')
  request.r(i1157[5], i1157[6], 0, i1156, 'txtCount')
  request.r(i1157[7], i1157[8], 0, i1156, 'normalIcon')
  request.r(i1157[9], i1157[10], 0, i1156, 'adsIcon')
  return i1156
}

Deserializers["UnityEngine.UI.LayoutElement"] = function (request, data, root) {
  var i1158 = root || request.c( 'UnityEngine.UI.LayoutElement' )
  var i1159 = data
  i1158.m_IgnoreLayout = !!i1159[0]
  i1158.m_MinWidth = i1159[1]
  i1158.m_MinHeight = i1159[2]
  i1158.m_PreferredWidth = i1159[3]
  i1158.m_PreferredHeight = i1159[4]
  i1158.m_FlexibleWidth = i1159[5]
  i1158.m_FlexibleHeight = i1159[6]
  i1158.m_LayoutPriority = i1159[7]
  return i1158
}

Deserializers["SonatFramework.Scripts.UIModule.PanelManager"] = function (request, data, root) {
  var i1160 = root || request.c( 'SonatFramework.Scripts.UIModule.PanelManager' )
  var i1161 = data
  i1160.OnPanelsUpdated = request.d('System.Action', i1161[0], i1160.OnPanelsUpdated)
  return i1160
}

Deserializers["TextScale"] = function (request, data, root) {
  var i1162 = root || request.c( 'TextScale' )
  var i1163 = data
  i1162.scaleUp = i1163[0]
  i1162.duration = i1163[1]
  return i1162
}

Deserializers["GameManager"] = function (request, data, root) {
  var i1164 = root || request.c( 'GameManager' )
  var i1165 = data
  request.r(i1165[0], i1165[1], 0, i1164, 'ecWin')
  request.r(i1165[2], i1165[3], 0, i1164, 'ecLose')
  i1164.isGameWin = !!i1165[4]
  request.r(i1165[5], i1165[6], 0, i1164, 'CurrentLevelData')
  request.r(i1165[7], i1165[8], 0, i1164, 'manualLevelData')
  request.r(i1165[9], i1165[10], 0, i1164, 'gameConfig')
  i1164.CurrentLevelIndex = i1165[11]
  return i1164
}

Deserializers["CheatManager"] = function (request, data, root) {
  var i1166 = root || request.c( 'CheatManager' )
  var i1167 = data
  return i1166
}

Deserializers["GridManager"] = function (request, data, root) {
  var i1168 = root || request.c( 'GridManager' )
  var i1169 = data
  request.r(i1169[0], i1169[1], 0, i1168, 'config')
  request.r(i1169[2], i1169[3], 0, i1168, 'breakEffectPrefab')
  request.r(i1169[4], i1169[5], 0, i1168, 'meshLibrary')
  i1168.gridData = request.d('GridData', i1169[6], i1168.gridData)
  request.r(i1169[7], i1169[8], 0, i1168, 'vfx')
  return i1168
}

Deserializers["GridData"] = function (request, data, root) {
  var i1170 = root || request.c( 'GridData' )
  var i1171 = data
  return i1170
}

Deserializers["ScoreManager"] = function (request, data, root) {
  var i1172 = root || request.c( 'ScoreManager' )
  var i1173 = data
  return i1172
}

Deserializers["InputManager"] = function (request, data, root) {
  var i1174 = root || request.c( 'InputManager' )
  var i1175 = data
  request.r(i1175[0], i1175[1], 0, i1174, 'gameConfig')
  return i1174
}

Deserializers["Booster.HammerInputHandler"] = function (request, data, root) {
  var i1176 = root || request.c( 'Booster.HammerInputHandler' )
  var i1177 = data
  i1176.holdTimeToConfirm = i1177[0]
  request.r(i1177[1], i1177[2], 0, i1176, 'highlightMaterial')
  request.r(i1177[3], i1177[4], 0, i1176, 'mainCamera')
  return i1176
}

Deserializers["TimeManager"] = function (request, data, root) {
  var i1178 = root || request.c( 'TimeManager' )
  var i1179 = data
  request.r(i1179[0], i1179[1], 0, i1178, 'textTimer')
  request.r(i1179[2], i1179[3], 0, i1178, 'warningImage')
  i1178.startTime = i1179[4]
  i1178.timeWarning = i1179[5]
  return i1178
}

Deserializers["ObjectPoolManager"] = function (request, data, root) {
  var i1180 = root || request.c( 'ObjectPoolManager' )
  var i1181 = data
  return i1180
}

Deserializers["BlockFactory"] = function (request, data, root) {
  var i1182 = root || request.c( 'BlockFactory' )
  var i1183 = data
  request.r(i1183[0], i1183[1], 0, i1182, 'singleBlockPrefab')
  return i1182
}

Deserializers["AudioManager"] = function (request, data, root) {
  var i1184 = root || request.c( 'AudioManager' )
  var i1185 = data
  request.r(i1185[0], i1185[1], 0, i1184, 'bgmSource')
  request.r(i1185[2], i1185[3], 0, i1184, 'sfxSource')
  request.r(i1185[4], i1185[5], 0, i1184, 'bgm')
  request.r(i1185[6], i1185[7], 0, i1184, 'merge')
  request.r(i1185[8], i1185[9], 0, i1184, 'warning')
  request.r(i1185[10], i1185[11], 0, i1184, 'gameLose')
  request.r(i1185[12], i1185[13], 0, i1184, 'gameWin')
  return i1184
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1186 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1187 = data
  request.r(i1187[0], i1187[1], 0, i1186, 'clip')
  request.r(i1187[2], i1187[3], 0, i1186, 'outputAudioMixerGroup')
  i1186.playOnAwake = !!i1187[4]
  i1186.loop = !!i1187[5]
  i1186.time = i1187[6]
  i1186.volume = i1187[7]
  i1186.pitch = i1187[8]
  i1186.enabled = !!i1187[9]
  return i1186
}

Deserializers["Difficulty.DifficultyManager"] = function (request, data, root) {
  var i1188 = root || request.c( 'Difficulty.DifficultyManager' )
  var i1189 = data
  request.r(i1189[0], i1189[1], 0, i1188, 'defaultConfig')
  request.r(i1189[2], i1189[3], 0, i1188, 'defaultShapePool')
  return i1188
}

Deserializers["TutorialManager"] = function (request, data, root) {
  var i1190 = root || request.c( 'TutorialManager' )
  var i1191 = data
  request.r(i1191[0], i1191[1], 0, i1190, 'textTutorial')
  request.r(i1191[2], i1191[3], 0, i1190, 'handTutorial')
  request.r(i1191[4], i1191[5], 0, i1190, 'tut')
  i1190.scaleUp = i1191[6]
  i1190.duration = i1191[7]
  i1190.moveDistance = i1191[8]
  i1190.moveDuration = i1191[9]
  return i1190
}

Deserializers["ResponsiveManager"] = function (request, data, root) {
  var i1192 = root || request.c( 'ResponsiveManager' )
  var i1193 = data
  i1192.screenType = i1193[0]
  return i1192
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1194 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1195 = data
  request.r(i1195[0], i1195[1], 0, i1194, 'm_FirstSelected')
  i1194.m_sendNavigationEvents = !!i1195[2]
  i1194.m_DragThreshold = i1195[3]
  return i1194
}

Deserializers["UnityEngine.InputSystem.UI.InputSystemUIInputModule"] = function (request, data, root) {
  var i1196 = root || request.c( 'UnityEngine.InputSystem.UI.InputSystemUIInputModule' )
  var i1197 = data
  i1196.m_MoveRepeatDelay = i1197[0]
  i1196.m_MoveRepeatRate = i1197[1]
  request.r(i1197[2], i1197[3], 0, i1196, 'm_XRTrackingOrigin')
  request.r(i1197[4], i1197[5], 0, i1196, 'm_ActionsAsset')
  request.r(i1197[6], i1197[7], 0, i1196, 'm_PointAction')
  request.r(i1197[8], i1197[9], 0, i1196, 'm_MoveAction')
  request.r(i1197[10], i1197[11], 0, i1196, 'm_SubmitAction')
  request.r(i1197[12], i1197[13], 0, i1196, 'm_CancelAction')
  request.r(i1197[14], i1197[15], 0, i1196, 'm_LeftClickAction')
  request.r(i1197[16], i1197[17], 0, i1196, 'm_MiddleClickAction')
  request.r(i1197[18], i1197[19], 0, i1196, 'm_RightClickAction')
  request.r(i1197[20], i1197[21], 0, i1196, 'm_ScrollWheelAction')
  request.r(i1197[22], i1197[23], 0, i1196, 'm_TrackedDevicePositionAction')
  request.r(i1197[24], i1197[25], 0, i1196, 'm_TrackedDeviceOrientationAction')
  i1196.m_DeselectOnBackgroundClick = !!i1197[26]
  i1196.m_PointerBehavior = i1197[27]
  i1196.m_CursorLockBehavior = i1197[28]
  i1196.m_ScrollDeltaPerTick = i1197[29]
  i1196.m_SendPointerHoverToParent = !!i1197[30]
  return i1196
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1198 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1199 = data
  i1198.ambientIntensity = i1199[0]
  i1198.reflectionIntensity = i1199[1]
  i1198.ambientMode = i1199[2]
  i1198.ambientLight = new pc.Color(i1199[3], i1199[4], i1199[5], i1199[6])
  i1198.ambientSkyColor = new pc.Color(i1199[7], i1199[8], i1199[9], i1199[10])
  i1198.ambientGroundColor = new pc.Color(i1199[11], i1199[12], i1199[13], i1199[14])
  i1198.ambientEquatorColor = new pc.Color(i1199[15], i1199[16], i1199[17], i1199[18])
  i1198.fogColor = new pc.Color(i1199[19], i1199[20], i1199[21], i1199[22])
  i1198.fogEndDistance = i1199[23]
  i1198.fogStartDistance = i1199[24]
  i1198.fogDensity = i1199[25]
  i1198.fog = !!i1199[26]
  request.r(i1199[27], i1199[28], 0, i1198, 'skybox')
  i1198.fogMode = i1199[29]
  var i1201 = i1199[30]
  var i1200 = []
  for(var i = 0; i < i1201.length; i += 1) {
    i1200.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1201[i + 0]) );
  }
  i1198.lightmaps = i1200
  i1198.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1199[31], i1198.lightProbes)
  i1198.lightmapsMode = i1199[32]
  i1198.mixedBakeMode = i1199[33]
  i1198.environmentLightingMode = i1199[34]
  i1198.ambientProbe = new pc.SphericalHarmonicsL2(i1199[35])
  i1198.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i1199[36])
  i1198.useReferenceAmbientProbe = !!i1199[37]
  request.r(i1199[38], i1199[39], 0, i1198, 'customReflection')
  request.r(i1199[40], i1199[41], 0, i1198, 'defaultReflection')
  i1198.defaultReflectionMode = i1199[42]
  i1198.defaultReflectionResolution = i1199[43]
  i1198.sunLightObjectId = i1199[44]
  i1198.pixelLightCount = i1199[45]
  i1198.defaultReflectionHDR = !!i1199[46]
  i1198.hasLightDataAsset = !!i1199[47]
  i1198.hasManualGenerate = !!i1199[48]
  return i1198
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1204 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1205 = data
  request.r(i1205[0], i1205[1], 0, i1204, 'lightmapColor')
  request.r(i1205[2], i1205[3], 0, i1204, 'lightmapDirection')
  return i1204
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1206 = root || new UnityEngine.LightProbes()
  var i1207 = data
  return i1206
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1214 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1215 = data
  var i1217 = i1215[0]
  var i1216 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1217.length; i += 1) {
    i1216.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1217[i + 0]));
  }
  i1214.ShaderCompilationErrors = i1216
  i1214.name = i1215[1]
  i1214.guid = i1215[2]
  var i1219 = i1215[3]
  var i1218 = []
  for(var i = 0; i < i1219.length; i += 1) {
    i1218.push( i1219[i + 0] );
  }
  i1214.shaderDefinedKeywords = i1218
  var i1221 = i1215[4]
  var i1220 = []
  for(var i = 0; i < i1221.length; i += 1) {
    i1220.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1221[i + 0]) );
  }
  i1214.passes = i1220
  var i1223 = i1215[5]
  var i1222 = []
  for(var i = 0; i < i1223.length; i += 1) {
    i1222.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1223[i + 0]) );
  }
  i1214.usePasses = i1222
  var i1225 = i1215[6]
  var i1224 = []
  for(var i = 0; i < i1225.length; i += 1) {
    i1224.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1225[i + 0]) );
  }
  i1214.defaultParameterValues = i1224
  request.r(i1215[7], i1215[8], 0, i1214, 'unityFallbackShader')
  i1214.readDepth = !!i1215[9]
  i1214.hasDepthOnlyPass = !!i1215[10]
  i1214.isCreatedByShaderGraph = !!i1215[11]
  i1214.disableBatching = !!i1215[12]
  i1214.compiled = !!i1215[13]
  return i1214
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1228 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1229 = data
  i1228.shaderName = i1229[0]
  i1228.errorMessage = i1229[1]
  return i1228
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1234 = root || new pc.UnityShaderPass()
  var i1235 = data
  i1234.id = i1235[0]
  i1234.subShaderIndex = i1235[1]
  i1234.name = i1235[2]
  i1234.passType = i1235[3]
  i1234.grabPassTextureName = i1235[4]
  i1234.usePass = !!i1235[5]
  i1234.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[6], i1234.zTest)
  i1234.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[7], i1234.zWrite)
  i1234.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[8], i1234.culling)
  i1234.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1235[9], i1234.blending)
  i1234.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1235[10], i1234.alphaBlending)
  i1234.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[11], i1234.colorWriteMask)
  i1234.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[12], i1234.offsetUnits)
  i1234.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[13], i1234.offsetFactor)
  i1234.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[14], i1234.stencilRef)
  i1234.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[15], i1234.stencilReadMask)
  i1234.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1235[16], i1234.stencilWriteMask)
  i1234.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1235[17], i1234.stencilOp)
  i1234.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1235[18], i1234.stencilOpFront)
  i1234.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1235[19], i1234.stencilOpBack)
  var i1237 = i1235[20]
  var i1236 = []
  for(var i = 0; i < i1237.length; i += 1) {
    i1236.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1237[i + 0]) );
  }
  i1234.tags = i1236
  var i1239 = i1235[21]
  var i1238 = []
  for(var i = 0; i < i1239.length; i += 1) {
    i1238.push( i1239[i + 0] );
  }
  i1234.passDefinedKeywords = i1238
  var i1241 = i1235[22]
  var i1240 = []
  for(var i = 0; i < i1241.length; i += 1) {
    i1240.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1241[i + 0]) );
  }
  i1234.passDefinedKeywordGroups = i1240
  var i1243 = i1235[23]
  var i1242 = []
  for(var i = 0; i < i1243.length; i += 1) {
    i1242.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1243[i + 0]) );
  }
  i1234.variants = i1242
  var i1245 = i1235[24]
  var i1244 = []
  for(var i = 0; i < i1245.length; i += 1) {
    i1244.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1245[i + 0]) );
  }
  i1234.excludedVariants = i1244
  i1234.hasDepthReader = !!i1235[25]
  return i1234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1247 = data
  i1246.val = i1247[0]
  i1246.name = i1247[1]
  return i1246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1248 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1249 = data
  i1248.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1249[0], i1248.src)
  i1248.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1249[1], i1248.dst)
  i1248.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1249[2], i1248.op)
  return i1248
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1250 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1251 = data
  i1250.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1251[0], i1250.pass)
  i1250.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1251[1], i1250.fail)
  i1250.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1251[2], i1250.zFail)
  i1250.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1251[3], i1250.comp)
  return i1250
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1254 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1255 = data
  i1254.name = i1255[0]
  i1254.value = i1255[1]
  return i1254
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1258 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1259 = data
  var i1261 = i1259[0]
  var i1260 = []
  for(var i = 0; i < i1261.length; i += 1) {
    i1260.push( i1261[i + 0] );
  }
  i1258.keywords = i1260
  i1258.hasDiscard = !!i1259[1]
  return i1258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1264 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1265 = data
  i1264.passId = i1265[0]
  i1264.subShaderIndex = i1265[1]
  var i1267 = i1265[2]
  var i1266 = []
  for(var i = 0; i < i1267.length; i += 1) {
    i1266.push( i1267[i + 0] );
  }
  i1264.keywords = i1266
  i1264.vertexProgram = i1265[3]
  i1264.fragmentProgram = i1265[4]
  i1264.exportedForWebGl2 = !!i1265[5]
  i1264.readDepth = !!i1265[6]
  return i1264
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1270 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1271 = data
  request.r(i1271[0], i1271[1], 0, i1270, 'shader')
  i1270.pass = i1271[2]
  return i1270
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1275 = data
  i1274.name = i1275[0]
  i1274.type = i1275[1]
  i1274.value = new pc.Vec4( i1275[2], i1275[3], i1275[4], i1275[5] )
  i1274.textureValue = i1275[6]
  i1274.shaderPropertyFlag = i1275[7]
  return i1274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1277 = data
  i1276.name = i1277[0]
  request.r(i1277[1], i1277[2], 0, i1276, 'texture')
  i1276.aabb = i1277[3]
  i1276.vertices = i1277[4]
  i1276.triangles = i1277[5]
  i1276.textureRect = UnityEngine.Rect.MinMaxRect(i1277[6], i1277[7], i1277[8], i1277[9])
  i1276.packedRect = UnityEngine.Rect.MinMaxRect(i1277[10], i1277[11], i1277[12], i1277[13])
  i1276.border = new pc.Vec4( i1277[14], i1277[15], i1277[16], i1277[17] )
  i1276.transparency = i1277[18]
  i1276.bounds = i1277[19]
  i1276.pixelsPerUnit = i1277[20]
  i1276.textureWidth = i1277[21]
  i1276.textureHeight = i1277[22]
  i1276.nativeSize = new pc.Vec2( i1277[23], i1277[24] )
  i1276.pivot = new pc.Vec2( i1277[25], i1277[26] )
  i1276.textureRectOffset = new pc.Vec2( i1277[27], i1277[28] )
  return i1276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1279 = data
  i1278.name = i1279[0]
  return i1278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1280 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1281 = data
  i1280.name = i1281[0]
  i1280.wrapMode = i1281[1]
  i1280.isLooping = !!i1281[2]
  i1280.length = i1281[3]
  var i1283 = i1281[4]
  var i1282 = []
  for(var i = 0; i < i1283.length; i += 1) {
    i1282.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1283[i + 0]) );
  }
  i1280.curves = i1282
  var i1285 = i1281[5]
  var i1284 = []
  for(var i = 0; i < i1285.length; i += 1) {
    i1284.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1285[i + 0]) );
  }
  i1280.events = i1284
  i1280.halfPrecision = !!i1281[6]
  i1280._frameRate = i1281[7]
  i1280.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1281[8], i1280.localBounds)
  i1280.hasMuscleCurves = !!i1281[9]
  var i1287 = i1281[10]
  var i1286 = []
  for(var i = 0; i < i1287.length; i += 1) {
    i1286.push( i1287[i + 0] );
  }
  i1280.clipMuscleConstant = i1286
  i1280.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1281[11], i1280.clipBindingConstant)
  return i1280
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1290 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1291 = data
  i1290.path = i1291[0]
  i1290.hash = i1291[1]
  i1290.componentType = i1291[2]
  i1290.property = i1291[3]
  i1290.keys = i1291[4]
  var i1293 = i1291[5]
  var i1292 = []
  for(var i = 0; i < i1293.length; i += 1) {
    i1292.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1293[i + 0]) );
  }
  i1290.objectReferenceKeys = i1292
  return i1290
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1296 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1297 = data
  i1296.time = i1297[0]
  request.r(i1297[1], i1297[2], 0, i1296, 'value')
  return i1296
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1300 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1301 = data
  i1300.functionName = i1301[0]
  i1300.floatParameter = i1301[1]
  i1300.intParameter = i1301[2]
  i1300.stringParameter = i1301[3]
  request.r(i1301[4], i1301[5], 0, i1300, 'objectReferenceParameter')
  i1300.time = i1301[6]
  return i1300
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1303 = data
  i1302.center = new pc.Vec3( i1303[0], i1303[1], i1303[2] )
  i1302.extends = new pc.Vec3( i1303[3], i1303[4], i1303[5] )
  return i1302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1307 = data
  var i1309 = i1307[0]
  var i1308 = []
  for(var i = 0; i < i1309.length; i += 1) {
    i1308.push( i1309[i + 0] );
  }
  i1306.genericBindings = i1308
  var i1311 = i1307[1]
  var i1310 = []
  for(var i = 0; i < i1311.length; i += 1) {
    i1310.push( i1311[i + 0] );
  }
  i1306.pptrCurveMapping = i1310
  return i1306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1313 = data
  i1312.name = i1313[0]
  i1312.ascent = i1313[1]
  i1312.originalLineHeight = i1313[2]
  i1312.fontSize = i1313[3]
  var i1315 = i1313[4]
  var i1314 = []
  for(var i = 0; i < i1315.length; i += 1) {
    i1314.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1315[i + 0]) );
  }
  i1312.characterInfo = i1314
  request.r(i1313[5], i1313[6], 0, i1312, 'texture')
  i1312.originalFontSize = i1313[7]
  return i1312
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1318 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1319 = data
  i1318.index = i1319[0]
  i1318.advance = i1319[1]
  i1318.bearing = i1319[2]
  i1318.glyphWidth = i1319[3]
  i1318.glyphHeight = i1319[4]
  i1318.minX = i1319[5]
  i1318.maxX = i1319[6]
  i1318.minY = i1319[7]
  i1318.maxY = i1319[8]
  i1318.uvBottomLeftX = i1319[9]
  i1318.uvBottomLeftY = i1319[10]
  i1318.uvBottomRightX = i1319[11]
  i1318.uvBottomRightY = i1319[12]
  i1318.uvTopLeftX = i1319[13]
  i1318.uvTopLeftY = i1319[14]
  i1318.uvTopRightX = i1319[15]
  i1318.uvTopRightY = i1319[16]
  return i1318
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i1320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i1321 = data
  i1320.name = i1321[0]
  var i1323 = i1321[1]
  var i1322 = []
  for(var i = 0; i < i1323.length; i += 1) {
    i1322.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i1323[i + 0]) );
  }
  i1320.layers = i1322
  var i1325 = i1321[2]
  var i1324 = []
  for(var i = 0; i < i1325.length; i += 1) {
    i1324.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1325[i + 0]) );
  }
  i1320.parameters = i1324
  i1320.animationClips = i1321[3]
  i1320.avatarUnsupported = i1321[4]
  return i1320
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1328 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1329 = data
  i1328.name = i1329[0]
  i1328.defaultWeight = i1329[1]
  i1328.blendingMode = i1329[2]
  i1328.avatarMask = i1329[3]
  i1328.syncedLayerIndex = i1329[4]
  i1328.syncedLayerAffectsTiming = !!i1329[5]
  i1328.syncedLayers = i1329[6]
  i1328.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1329[7], i1328.stateMachine)
  return i1328
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1331 = data
  i1330.id = i1331[0]
  i1330.name = i1331[1]
  i1330.path = i1331[2]
  var i1333 = i1331[3]
  var i1332 = []
  for(var i = 0; i < i1333.length; i += 1) {
    i1332.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1333[i + 0]) );
  }
  i1330.states = i1332
  var i1335 = i1331[4]
  var i1334 = []
  for(var i = 0; i < i1335.length; i += 1) {
    i1334.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1335[i + 0]) );
  }
  i1330.machines = i1334
  var i1337 = i1331[5]
  var i1336 = []
  for(var i = 0; i < i1337.length; i += 1) {
    i1336.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1337[i + 0]) );
  }
  i1330.entryStateTransitions = i1336
  var i1339 = i1331[6]
  var i1338 = []
  for(var i = 0; i < i1339.length; i += 1) {
    i1338.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1339[i + 0]) );
  }
  i1330.exitStateTransitions = i1338
  var i1341 = i1331[7]
  var i1340 = []
  for(var i = 0; i < i1341.length; i += 1) {
    i1340.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1341[i + 0]) );
  }
  i1330.anyStateTransitions = i1340
  i1330.defaultStateId = i1331[8]
  return i1330
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1344 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1345 = data
  i1344.id = i1345[0]
  i1344.name = i1345[1]
  i1344.cycleOffset = i1345[2]
  i1344.cycleOffsetParameter = i1345[3]
  i1344.cycleOffsetParameterActive = !!i1345[4]
  i1344.mirror = !!i1345[5]
  i1344.mirrorParameter = i1345[6]
  i1344.mirrorParameterActive = !!i1345[7]
  i1344.motionId = i1345[8]
  i1344.nameHash = i1345[9]
  i1344.fullPathHash = i1345[10]
  i1344.speed = i1345[11]
  i1344.speedParameter = i1345[12]
  i1344.speedParameterActive = !!i1345[13]
  i1344.tag = i1345[14]
  i1344.tagHash = i1345[15]
  i1344.writeDefaultValues = !!i1345[16]
  var i1347 = i1345[17]
  var i1346 = []
  for(var i = 0; i < i1347.length; i += 2) {
  request.r(i1347[i + 0], i1347[i + 1], 2, i1346, '')
  }
  i1344.behaviours = i1346
  var i1349 = i1345[18]
  var i1348 = []
  for(var i = 0; i < i1349.length; i += 1) {
    i1348.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1349[i + 0]) );
  }
  i1344.transitions = i1348
  return i1344
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1354 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1355 = data
  i1354.fullPath = i1355[0]
  i1354.canTransitionToSelf = !!i1355[1]
  i1354.duration = i1355[2]
  i1354.exitTime = i1355[3]
  i1354.hasExitTime = !!i1355[4]
  i1354.hasFixedDuration = !!i1355[5]
  i1354.interruptionSource = i1355[6]
  i1354.offset = i1355[7]
  i1354.orderedInterruption = !!i1355[8]
  i1354.destinationStateId = i1355[9]
  i1354.isExit = !!i1355[10]
  i1354.mute = !!i1355[11]
  i1354.solo = !!i1355[12]
  var i1357 = i1355[13]
  var i1356 = []
  for(var i = 0; i < i1357.length; i += 1) {
    i1356.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1357[i + 0]) );
  }
  i1354.conditions = i1356
  return i1354
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1362 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1363 = data
  i1362.destinationStateId = i1363[0]
  i1362.isExit = !!i1363[1]
  i1362.mute = !!i1363[2]
  i1362.solo = !!i1363[3]
  var i1365 = i1363[4]
  var i1364 = []
  for(var i = 0; i < i1365.length; i += 1) {
    i1364.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1365[i + 0]) );
  }
  i1362.conditions = i1364
  return i1362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1368 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1369 = data
  i1368.defaultBool = !!i1369[0]
  i1368.defaultFloat = i1369[1]
  i1368.defaultInt = i1369[2]
  i1368.name = i1369[3]
  i1368.nameHash = i1369[4]
  i1368.type = i1369[5]
  return i1368
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1370 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1371 = data
  i1370.name = i1371[0]
  i1370.bytes64 = i1371[1]
  i1370.data = i1371[2]
  return i1370
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1372 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1373 = data
  request.r(i1373[0], i1373[1], 0, i1372, 'atlas')
  i1372.normalStyle = i1373[2]
  i1372.normalSpacingOffset = i1373[3]
  i1372.boldStyle = i1373[4]
  i1372.boldSpacing = i1373[5]
  i1372.italicStyle = i1373[6]
  i1372.tabSize = i1373[7]
  i1372.hashCode = i1373[8]
  request.r(i1373[9], i1373[10], 0, i1372, 'material')
  i1372.materialHashCode = i1373[11]
  i1372.m_Version = i1373[12]
  i1372.m_SourceFontFileGUID = i1373[13]
  request.r(i1373[14], i1373[15], 0, i1372, 'm_SourceFontFile_EditorRef')
  request.r(i1373[16], i1373[17], 0, i1372, 'm_SourceFontFile')
  i1372.m_AtlasPopulationMode = i1373[18]
  i1372.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1373[19], i1372.m_FaceInfo)
  var i1375 = i1373[20]
  var i1374 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1375.length; i += 1) {
    i1374.add(request.d('UnityEngine.TextCore.Glyph', i1375[i + 0]));
  }
  i1372.m_GlyphTable = i1374
  var i1377 = i1373[21]
  var i1376 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1377.length; i += 1) {
    i1376.add(request.d('TMPro.TMP_Character', i1377[i + 0]));
  }
  i1372.m_CharacterTable = i1376
  var i1379 = i1373[22]
  var i1378 = []
  for(var i = 0; i < i1379.length; i += 2) {
  request.r(i1379[i + 0], i1379[i + 1], 2, i1378, '')
  }
  i1372.m_AtlasTextures = i1378
  i1372.m_AtlasTextureIndex = i1373[23]
  i1372.m_IsMultiAtlasTexturesEnabled = !!i1373[24]
  i1372.m_ClearDynamicDataOnBuild = !!i1373[25]
  var i1381 = i1373[26]
  var i1380 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1381.length; i += 1) {
    i1380.add(request.d('UnityEngine.TextCore.GlyphRect', i1381[i + 0]));
  }
  i1372.m_UsedGlyphRects = i1380
  var i1383 = i1373[27]
  var i1382 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1383.length; i += 1) {
    i1382.add(request.d('UnityEngine.TextCore.GlyphRect', i1383[i + 0]));
  }
  i1372.m_FreeGlyphRects = i1382
  i1372.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1373[28], i1372.m_fontInfo)
  i1372.m_AtlasWidth = i1373[29]
  i1372.m_AtlasHeight = i1373[30]
  i1372.m_AtlasPadding = i1373[31]
  i1372.m_AtlasRenderMode = i1373[32]
  var i1385 = i1373[33]
  var i1384 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1385.length; i += 1) {
    i1384.add(request.d('TMPro.TMP_Glyph', i1385[i + 0]));
  }
  i1372.m_glyphInfoList = i1384
  i1372.m_KerningTable = request.d('TMPro.KerningTable', i1373[34], i1372.m_KerningTable)
  i1372.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1373[35], i1372.m_FontFeatureTable)
  var i1387 = i1373[36]
  var i1386 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1387.length; i += 2) {
  request.r(i1387[i + 0], i1387[i + 1], 1, i1386, '')
  }
  i1372.fallbackFontAssets = i1386
  var i1389 = i1373[37]
  var i1388 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1389.length; i += 2) {
  request.r(i1389[i + 0], i1389[i + 1], 1, i1388, '')
  }
  i1372.m_FallbackFontAssetTable = i1388
  i1372.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1373[38], i1372.m_CreationSettings)
  var i1391 = i1373[39]
  var i1390 = []
  for(var i = 0; i < i1391.length; i += 1) {
    i1390.push( request.d('TMPro.TMP_FontWeightPair', i1391[i + 0]) );
  }
  i1372.m_FontWeightTable = i1390
  var i1393 = i1373[40]
  var i1392 = []
  for(var i = 0; i < i1393.length; i += 1) {
    i1392.push( request.d('TMPro.TMP_FontWeightPair', i1393[i + 0]) );
  }
  i1372.fontWeights = i1392
  return i1372
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1394 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1395 = data
  i1394.m_FaceIndex = i1395[0]
  i1394.m_FamilyName = i1395[1]
  i1394.m_StyleName = i1395[2]
  i1394.m_PointSize = i1395[3]
  i1394.m_Scale = i1395[4]
  i1394.m_UnitsPerEM = i1395[5]
  i1394.m_LineHeight = i1395[6]
  i1394.m_AscentLine = i1395[7]
  i1394.m_CapLine = i1395[8]
  i1394.m_MeanLine = i1395[9]
  i1394.m_Baseline = i1395[10]
  i1394.m_DescentLine = i1395[11]
  i1394.m_SuperscriptOffset = i1395[12]
  i1394.m_SuperscriptSize = i1395[13]
  i1394.m_SubscriptOffset = i1395[14]
  i1394.m_SubscriptSize = i1395[15]
  i1394.m_UnderlineOffset = i1395[16]
  i1394.m_UnderlineThickness = i1395[17]
  i1394.m_StrikethroughOffset = i1395[18]
  i1394.m_StrikethroughThickness = i1395[19]
  i1394.m_TabWidth = i1395[20]
  return i1394
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1398 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1399 = data
  i1398.m_Index = i1399[0]
  i1398.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1399[1], i1398.m_Metrics)
  i1398.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1399[2], i1398.m_GlyphRect)
  i1398.m_Scale = i1399[3]
  i1398.m_AtlasIndex = i1399[4]
  i1398.m_ClassDefinitionType = i1399[5]
  return i1398
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1402 = root || request.c( 'TMPro.TMP_Character' )
  var i1403 = data
  i1402.m_ElementType = i1403[0]
  i1402.m_Unicode = i1403[1]
  i1402.m_GlyphIndex = i1403[2]
  i1402.m_Scale = i1403[3]
  return i1402
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1408 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1409 = data
  i1408.m_X = i1409[0]
  i1408.m_Y = i1409[1]
  i1408.m_Width = i1409[2]
  i1408.m_Height = i1409[3]
  return i1408
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1410 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1411 = data
  i1410.Name = i1411[0]
  i1410.PointSize = i1411[1]
  i1410.Scale = i1411[2]
  i1410.CharacterCount = i1411[3]
  i1410.LineHeight = i1411[4]
  i1410.Baseline = i1411[5]
  i1410.Ascender = i1411[6]
  i1410.CapHeight = i1411[7]
  i1410.Descender = i1411[8]
  i1410.CenterLine = i1411[9]
  i1410.SuperscriptOffset = i1411[10]
  i1410.SubscriptOffset = i1411[11]
  i1410.SubSize = i1411[12]
  i1410.Underline = i1411[13]
  i1410.UnderlineThickness = i1411[14]
  i1410.strikethrough = i1411[15]
  i1410.strikethroughThickness = i1411[16]
  i1410.TabWidth = i1411[17]
  i1410.Padding = i1411[18]
  i1410.AtlasWidth = i1411[19]
  i1410.AtlasHeight = i1411[20]
  return i1410
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1414 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1415 = data
  i1414.id = i1415[0]
  i1414.x = i1415[1]
  i1414.y = i1415[2]
  i1414.width = i1415[3]
  i1414.height = i1415[4]
  i1414.xOffset = i1415[5]
  i1414.yOffset = i1415[6]
  i1414.xAdvance = i1415[7]
  i1414.scale = i1415[8]
  return i1414
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1416 = root || request.c( 'TMPro.KerningTable' )
  var i1417 = data
  var i1419 = i1417[0]
  var i1418 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1419.length; i += 1) {
    i1418.add(request.d('TMPro.KerningPair', i1419[i + 0]));
  }
  i1416.kerningPairs = i1418
  return i1416
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1422 = root || request.c( 'TMPro.KerningPair' )
  var i1423 = data
  i1422.xOffset = i1423[0]
  i1422.m_FirstGlyph = i1423[1]
  i1422.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1423[2], i1422.m_FirstGlyphAdjustments)
  i1422.m_SecondGlyph = i1423[3]
  i1422.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1423[4], i1422.m_SecondGlyphAdjustments)
  i1422.m_IgnoreSpacingAdjustments = !!i1423[5]
  return i1422
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1424 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1425 = data
  var i1427 = i1425[0]
  var i1426 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1427.length; i += 1) {
    i1426.add(request.d('TMPro.TMP_GlyphPairAdjustmentRecord', i1427[i + 0]));
  }
  i1424.m_GlyphPairAdjustmentRecords = i1426
  return i1424
}

Deserializers["TMPro.TMP_GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1430 = root || request.c( 'TMPro.TMP_GlyphPairAdjustmentRecord' )
  var i1431 = data
  i1430.m_FirstAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i1431[0], i1430.m_FirstAdjustmentRecord)
  i1430.m_SecondAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i1431[1], i1430.m_SecondAdjustmentRecord)
  i1430.m_FeatureLookupFlags = i1431[2]
  return i1430
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1434 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1435 = data
  i1434.sourceFontFileName = i1435[0]
  i1434.sourceFontFileGUID = i1435[1]
  i1434.pointSizeSamplingMode = i1435[2]
  i1434.pointSize = i1435[3]
  i1434.padding = i1435[4]
  i1434.packingMode = i1435[5]
  i1434.atlasWidth = i1435[6]
  i1434.atlasHeight = i1435[7]
  i1434.characterSetSelectionMode = i1435[8]
  i1434.characterSequence = i1435[9]
  i1434.referencedFontAssetGUID = i1435[10]
  i1434.referencedTextAssetGUID = i1435[11]
  i1434.fontStyle = i1435[12]
  i1434.fontStyleModifier = i1435[13]
  i1434.renderMode = i1435[14]
  i1434.includeFontFeatures = !!i1435[15]
  return i1434
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1438 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1439 = data
  request.r(i1439[0], i1439[1], 0, i1438, 'regularTypeface')
  request.r(i1439[2], i1439[3], 0, i1438, 'italicTypeface')
  return i1438
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1440 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1441 = data
  i1440.m_Width = i1441[0]
  i1440.m_Height = i1441[1]
  i1440.m_HorizontalBearingX = i1441[2]
  i1440.m_HorizontalBearingY = i1441[3]
  i1440.m_HorizontalAdvance = i1441[4]
  return i1440
}

Deserializers["TMPro.TMP_GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1442 = root || request.c( 'TMPro.TMP_GlyphAdjustmentRecord' )
  var i1443 = data
  i1442.m_GlyphIndex = i1443[0]
  i1442.m_GlyphValueRecord = request.d('TMPro.TMP_GlyphValueRecord', i1443[1], i1442.m_GlyphValueRecord)
  return i1442
}

Deserializers["TMPro.TMP_GlyphValueRecord"] = function (request, data, root) {
  var i1444 = root || request.c( 'TMPro.TMP_GlyphValueRecord' )
  var i1445 = data
  i1444.m_XPlacement = i1445[0]
  i1444.m_YPlacement = i1445[1]
  i1444.m_XAdvance = i1445[2]
  i1444.m_YAdvance = i1445[3]
  return i1444
}

Deserializers["BlockShapeSO"] = function (request, data, root) {
  var i1446 = root || request.c( 'BlockShapeSO' )
  var i1447 = data
  i1446.width = i1447[0]
  i1446.height = i1447[1]
  i1446.minX = i1447[2]
  i1446.maxX = i1447[3]
  i1446.maxY = i1447[4]
  var i1449 = i1447[5]
  var i1448 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Vector2Int')))
  for(var i = 0; i < i1449.length; i += 2) {
    i1448.add(new pc.Vec2( i1449[i + 0], i1449[i + 1] ));
  }
  i1446.structuralOffsets = i1448
  request.r(i1447[6], i1447[7], 0, i1446, 'uiIcon')
  request.r(i1447[8], i1447[9], 0, i1446, 'blockMaterial')
  request.r(i1447[10], i1447[11], 0, i1446, 'innerMaterial')
  request.r(i1447[12], i1447[13], 0, i1446, 'specialIcon')
  i1446.slideDirection = new pc.Vec2( i1447[14], i1447[15] )
  i1446.defaultLayers = i1447[16]
  request.r(i1447[17], i1447[18], 0, i1446, 'innerMesh')
  i1446.innerScale = new pc.Vec3( i1447[19], i1447[20], i1447[21] )
  i1446.innerOffset = new pc.Vec3( i1447[22], i1447[23], i1447[24] )
  return i1446
}

Deserializers["CellMeshLibrary"] = function (request, data, root) {
  var i1452 = root || request.c( 'CellMeshLibrary' )
  var i1453 = data
  request.r(i1453[0], i1453[1], 0, i1452, 'full')
  request.r(i1453[2], i1453[3], 0, i1452, 'straightVer')
  request.r(i1453[4], i1453[5], 0, i1452, 'straightHor')
  request.r(i1453[6], i1453[7], 0, i1452, 'center')
  request.r(i1453[8], i1453[9], 0, i1452, 'edgeTop')
  request.r(i1453[10], i1453[11], 0, i1452, 'edgeBottom')
  request.r(i1453[12], i1453[13], 0, i1452, 'edgeLeft')
  request.r(i1453[14], i1453[15], 0, i1452, 'edgeRight')
  request.r(i1453[16], i1453[17], 0, i1452, 'cornerTL')
  request.r(i1453[18], i1453[19], 0, i1452, 'cornerTR')
  request.r(i1453[20], i1453[21], 0, i1452, 'cornerBL')
  request.r(i1453[22], i1453[23], 0, i1452, 'cornerBR')
  request.r(i1453[24], i1453[25], 0, i1452, 'tripleTop')
  request.r(i1453[26], i1453[27], 0, i1452, 'tripleBottom')
  request.r(i1453[28], i1453[29], 0, i1452, 'tripleLeft')
  request.r(i1453[30], i1453[31], 0, i1452, 'tripleRight')
  return i1452
}

Deserializers["BlockPaletteSO"] = function (request, data, root) {
  var i1454 = root || request.c( 'BlockPaletteSO' )
  var i1455 = data
  var i1457 = i1455[0]
  var i1456 = []
  for(var i = 0; i < i1457.length; i += 2) {
  request.r(i1457[i + 0], i1457[i + 1], 2, i1456, '')
  }
  i1454.blockMaterials = i1456
  request.r(i1455[1], i1455[2], 0, i1454, 'ghostMaterial')
  request.r(i1455[3], i1455[4], 0, i1454, 'floodMaterial')
  request.r(i1455[5], i1455[6], 0, i1454, 'previewOverlayMaterial')
  return i1454
}

Deserializers["SonatFramework.Systems.AudioManagement.SonatAudioService"] = function (request, data, root) {
  var i1458 = root || request.c( 'SonatFramework.Systems.AudioManagement.SonatAudioService' )
  var i1459 = data
  return i1458
}

Deserializers["SonatFramework.Scripts.UIModule.TweenConfigSO"] = function (request, data, root) {
  var i1460 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenConfigSO' )
  var i1461 = data
  i1460.config = request.d('SonatFramework.Scripts.UIModule.TweenConfig', i1461[0], i1460.config)
  return i1460
}

Deserializers["SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync"] = function (request, data, root) {
  var i1462 = root || request.c( 'SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync' )
  var i1463 = data
  i1462.path = i1463[0]
  request.r(i1463[1], i1463[2], 0, i1462, 'fallbackService')
  return i1462
}

Deserializers["LevelDataSO"] = function (request, data, root) {
  var i1464 = root || request.c( 'LevelDataSO' )
  var i1465 = data
  i1464.levelID = i1465[0]
  i1464.displayName = i1465[1]
  i1464.gameMode = i1465[2]
  i1464.difficulty = i1465[3]
  i1464.targetGoal = i1465[4]
  i1464.timeLimit = i1465[5]
  i1464.floodStartInterval = i1465[6]
  i1464.floodIntervalIncrease = i1465[7]
  request.r(i1465[8], i1465[9], 0, i1464, 'gameConfig')
  i1464.levelWidth = i1465[10]
  request.r(i1465[11], i1465[12], 0, i1464, 'floorPrefab')
  var i1467 = i1465[13]
  var i1466 = new (System.Collections.Generic.List$1(Bridge.ns('PreplacedBlockData')))
  for(var i = 0; i < i1467.length; i += 1) {
    i1466.add(request.d('PreplacedBlockData', i1467[i + 0]));
  }
  i1464.mapData = i1466
  request.r(i1465[14], i1465[15], 0, i1464, 'difficultyConfig')
  request.r(i1465[16], i1465[17], 0, i1464, 'shapePool')
  var i1469 = i1465[18]
  var i1468 = new (System.Collections.Generic.List$1(Bridge.ns('BlockShapeSO')))
  for(var i = 0; i < i1469.length; i += 2) {
  request.r(i1469[i + 0], i1469[i + 1], 1, i1468, '')
  }
  i1464.fixedStartSequence = i1468
  return i1464
}

Deserializers["PreplacedBlockData"] = function (request, data, root) {
  var i1472 = root || request.c( 'PreplacedBlockData' )
  var i1473 = data
  i1472.faceIndex = i1473[0]
  i1472.localX = i1473[1]
  i1472.y = i1473[2]
  i1472.blockShapeRef = request.d('UnityEngine.AddressableAssets.AssetReference', i1473[3], i1472.blockShapeRef)
  i1472.colorIndex = i1473[4]
  return i1472
}

Deserializers["UnityEngine.AddressableAssets.AssetReference"] = function (request, data, root) {
  var i1474 = root || request.c( 'UnityEngine.AddressableAssets.AssetReference' )
  var i1475 = data
  i1474.m_AssetGUID = i1475[0]
  i1474.m_SubObjectName = i1475[1]
  i1474.m_SubObjectType = i1475[2]
  i1474.m_SubObjectGUID = i1475[3]
  i1474.m_EditorAssetChanged = !!i1475[4]
  return i1474
}

Deserializers["GameConfig"] = function (request, data, root) {
  var i1478 = root || request.c( 'GameConfig' )
  var i1479 = data
  i1478.towerHeightThreshold = i1479[0]
  i1478.towerHeightRatio = i1479[1]
  i1478.towerDropAdjustDuration = i1479[2]
  i1478.towerHeightSmoothDuration = i1479[3]
  i1478.towerHeightEase = i1479[4]
  i1478.edgeRotateDelay = i1479[5]
  i1478.dragHoldTime = i1479[6]
  i1478.blockDragSensitivity = i1479[7]
  i1478.useAbsolutePositioning = !!i1479[8]
  i1478.absolutePositionSmoothing = i1479[9]
  i1478.edgeScrollThreshold = i1479[10]
  i1478.edgeScrollSpeed = i1479[11]
  i1478.baseSmoothTime = i1479[12]
  i1478.fastSmoothTime = i1479[13]
  i1478.deadzoneAngle = i1479[14]
  i1478.buttonRotateDuration = i1479[15]
  i1478.buttonRotateEase = i1479[16]
  i1478.towerSnapDuration = i1479[17]
  i1478.towerSnapEase = i1479[18]
  i1478.dropDuration = i1479[19]
  i1478.dropEase = i1479[20]
  request.r(i1479[21], i1479[22], 0, i1478, 'blockPalette')
  i1478.ghostAlpha = i1479[23]
  i1478.faceWidth = i1479[24]
  i1478.height = i1479[25]
  i1478.tileSize = i1479[26]
  i1478.spawnY = i1479[27]
  i1478.score1Line = i1479[28]
  i1478.score2Lines = i1479[29]
  i1478.score3Lines = i1479[30]
  i1478.score4Lines = i1479[31]
  i1478.pointsPerRow = i1479[32]
  i1478.useMultiLineBonus = !!i1479[33]
  i1478.multiLineMultiplier = i1479[34]
  i1478.maxHeight = i1479[35]
  i1478.warningThreshold = i1479[36]
  i1478.totalLevelCount = i1479[37]
  i1478.warningColor = new pc.Color(i1479[38], i1479[39], i1479[40], i1479[41])
  i1478.gameOverColor = new pc.Color(i1479[42], i1479[43], i1479[44], i1479[45])
  i1478.pulseDuration = i1479[46]
  i1478.winReward = request.d('SonatFramework.Systems.InventoryManagement.GameResources.ResourceData', i1479[47], i1478.winReward)
  i1478.playOnPrice = request.d('SonatFramework.Systems.InventoryManagement.GameResources.ResourceData', i1479[48], i1478.playOnPrice)
  return i1478
}

Deserializers["SonatFramework.Systems.InventoryManagement.GameResources.ResourceData"] = function (request, data, root) {
  var i1480 = root || request.c( 'SonatFramework.Systems.InventoryManagement.GameResources.ResourceData' )
  var i1481 = data
  i1480.gameResource = i1481[0]
  i1480.id = i1481[1]
  i1480.quantity = i1481[2]
  i1480.seconds = System.Int64(i1481[3])
  i1480.timestamp = System.Int64(i1481[4])
  i1480.onUpdate = request.d('System.Action', i1481[5], i1480.onUpdate)
  return i1480
}

Deserializers["Difficulty.DifficultyConfig"] = function (request, data, root) {
  var i1482 = root || request.c( 'Difficulty.DifficultyConfig' )
  var i1483 = data
  i1482.mercyTokensMin = i1483[0]
  i1482.mercyTokensMax = i1483[1]
  i1482.mercyTensionThreshold = i1483[2]
  i1482.mercyStreakRequired = i1483[3]
  i1482.mercyChance = i1483[4]
  i1482.mercyCooldownMin = i1483[5]
  i1482.mercyCooldownMax = i1483[6]
  i1482.rescueWeight_1x1 = i1483[7]
  i1482.rescueWeight_1x2 = i1483[8]
  i1482.rescueWeight_2x1 = i1483[9]
  i1482.warningThreshold = i1483[10]
  i1482.dangerThreshold = i1483[11]
  i1482.criticalThreshold = i1483[12]
  i1482.autoRefillBag = !!i1483[13]
  return i1482
}

Deserializers["Difficulty.ShapePoolSO"] = function (request, data, root) {
  var i1484 = root || request.c( 'Difficulty.ShapePoolSO' )
  var i1485 = data
  var i1487 = i1485[0]
  var i1486 = new (System.Collections.Generic.List$1(Bridge.ns('Difficulty.ShapeWeightEntry')))
  for(var i = 0; i < i1487.length; i += 1) {
    i1486.add(request.d('Difficulty.ShapeWeightEntry', i1487[i + 0]));
  }
  i1484.entries = i1486
  return i1484
}

Deserializers["Difficulty.ShapeWeightEntry"] = function (request, data, root) {
  var i1490 = root || request.c( 'Difficulty.ShapeWeightEntry' )
  var i1491 = data
  request.r(i1491[0], i1491[1], 0, i1490, 'shape')
  i1490.weight = i1491[2]
  i1490.category = i1491[3]
  i1490.isRescueShape = !!i1491[4]
  return i1490
}

Deserializers["UnityEngine.InputSystem.InputActionAsset"] = function (request, data, root) {
  var i1492 = root || request.c( 'UnityEngine.InputSystem.InputActionAsset' )
  var i1493 = data
  var i1495 = i1493[0]
  var i1494 = []
  for(var i = 0; i < i1495.length; i += 1) {
    i1494.push( request.d('UnityEngine.InputSystem.InputActionMap', i1495[i + 0]) );
  }
  i1492.m_ActionMaps = i1494
  var i1497 = i1493[1]
  var i1496 = []
  for(var i = 0; i < i1497.length; i += 1) {
    i1496.push( request.d('UnityEngine.InputSystem.InputControlScheme', i1497[i + 0]) );
  }
  i1492.m_ControlSchemes = i1496
  i1492.m_IsProjectWide = !!i1493[2]
  return i1492
}

Deserializers["UnityEngine.InputSystem.InputActionMap"] = function (request, data, root) {
  var i1500 = root || request.c( 'UnityEngine.InputSystem.InputActionMap' )
  var i1501 = data
  i1500.m_Name = i1501[0]
  i1500.m_Id = i1501[1]
  request.r(i1501[2], i1501[3], 0, i1500, 'm_Asset')
  var i1503 = i1501[4]
  var i1502 = []
  for(var i = 0; i < i1503.length; i += 1) {
    i1502.push( request.d('UnityEngine.InputSystem.InputAction', i1503[i + 0]) );
  }
  i1500.m_Actions = i1502
  var i1505 = i1501[5]
  var i1504 = []
  for(var i = 0; i < i1505.length; i += 1) {
    i1504.push( request.d('UnityEngine.InputSystem.InputBinding', i1505[i + 0]) );
  }
  i1500.m_Bindings = i1504
  return i1500
}

Deserializers["UnityEngine.InputSystem.InputAction"] = function (request, data, root) {
  var i1508 = root || request.c( 'UnityEngine.InputSystem.InputAction' )
  var i1509 = data
  i1508.m_Name = i1509[0]
  i1508.m_Type = i1509[1]
  i1508.m_ExpectedControlType = i1509[2]
  i1508.m_Id = i1509[3]
  i1508.m_Processors = i1509[4]
  i1508.m_Interactions = i1509[5]
  var i1511 = i1509[6]
  var i1510 = []
  for(var i = 0; i < i1511.length; i += 1) {
    i1510.push( request.d('UnityEngine.InputSystem.InputBinding', i1511[i + 0]) );
  }
  i1508.m_SingletonActionBindings = i1510
  i1508.m_Flags = i1509[7]
  return i1508
}

Deserializers["UnityEngine.InputSystem.InputBinding"] = function (request, data, root) {
  var i1514 = root || request.c( 'UnityEngine.InputSystem.InputBinding' )
  var i1515 = data
  i1514.m_Name = i1515[0]
  i1514.m_Id = i1515[1]
  i1514.m_Path = i1515[2]
  i1514.m_Interactions = i1515[3]
  i1514.m_Processors = i1515[4]
  i1514.m_Groups = i1515[5]
  i1514.m_Action = i1515[6]
  i1514.m_Flags = i1515[7]
  return i1514
}

Deserializers["UnityEngine.InputSystem.InputControlScheme"] = function (request, data, root) {
  var i1518 = root || request.c( 'UnityEngine.InputSystem.InputControlScheme' )
  var i1519 = data
  i1518.m_Name = i1519[0]
  i1518.m_BindingGroup = i1519[1]
  var i1521 = i1519[2]
  var i1520 = []
  for(var i = 0; i < i1521.length; i += 1) {
    i1520.push( request.d('UnityEngine.InputSystem.InputControlScheme+DeviceRequirement', i1521[i + 0]) );
  }
  i1518.m_DeviceRequirements = i1520
  return i1518
}

Deserializers["UnityEngine.InputSystem.InputControlScheme+DeviceRequirement"] = function (request, data, root) {
  var i1524 = root || request.c( 'UnityEngine.InputSystem.InputControlScheme+DeviceRequirement' )
  var i1525 = data
  i1524.m_ControlPath = i1525[0]
  i1524.m_Flags = i1525[1]
  return i1524
}

Deserializers["UnityEngine.InputSystem.InputActionReference"] = function (request, data, root) {
  var i1526 = root || request.c( 'UnityEngine.InputSystem.InputActionReference' )
  var i1527 = data
  request.r(i1527[0], i1527[1], 0, i1526, 'm_Asset')
  i1526.m_ActionId = i1527[2]
  return i1526
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1528 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1529 = data
  i1528.useSafeMode = !!i1529[0]
  i1528.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1529[1], i1528.safeModeOptions)
  i1528.timeScale = i1529[2]
  i1528.unscaledTimeScale = i1529[3]
  i1528.useSmoothDeltaTime = !!i1529[4]
  i1528.maxSmoothUnscaledTime = i1529[5]
  i1528.rewindCallbackMode = i1529[6]
  i1528.showUnityEditorReport = !!i1529[7]
  i1528.logBehaviour = i1529[8]
  i1528.drawGizmos = !!i1529[9]
  i1528.defaultRecyclable = !!i1529[10]
  i1528.defaultAutoPlay = i1529[11]
  i1528.defaultUpdateType = i1529[12]
  i1528.defaultTimeScaleIndependent = !!i1529[13]
  i1528.defaultEaseType = i1529[14]
  i1528.defaultEaseOvershootOrAmplitude = i1529[15]
  i1528.defaultEasePeriod = i1529[16]
  i1528.defaultAutoKill = !!i1529[17]
  i1528.defaultLoopType = i1529[18]
  i1528.debugMode = !!i1529[19]
  i1528.debugStoreTargetId = !!i1529[20]
  i1528.showPreviewPanel = !!i1529[21]
  i1528.storeSettingsLocation = i1529[22]
  i1528.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1529[23], i1528.modules)
  i1528.createASMDEF = !!i1529[24]
  i1528.showPlayingTweens = !!i1529[25]
  i1528.showPausedTweens = !!i1529[26]
  return i1528
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1530 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1531 = data
  i1530.logBehaviour = i1531[0]
  i1530.nestedTweenFailureBehaviour = i1531[1]
  return i1530
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1532 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1533 = data
  i1532.showPanel = !!i1533[0]
  i1532.audioEnabled = !!i1533[1]
  i1532.physicsEnabled = !!i1533[2]
  i1532.physics2DEnabled = !!i1533[3]
  i1532.spriteEnabled = !!i1533[4]
  i1532.uiEnabled = !!i1533[5]
  i1532.textMeshProEnabled = !!i1533[6]
  i1532.tk2DEnabled = !!i1533[7]
  i1532.deAudioEnabled = !!i1533[8]
  i1532.deUnityExtendedEnabled = !!i1533[9]
  i1532.epoOutlineEnabled = !!i1533[10]
  return i1532
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1534 = root || request.c( 'TMPro.TMP_Settings' )
  var i1535 = data
  i1534.m_enableWordWrapping = !!i1535[0]
  i1534.m_enableKerning = !!i1535[1]
  i1534.m_enableExtraPadding = !!i1535[2]
  i1534.m_enableTintAllSprites = !!i1535[3]
  i1534.m_enableParseEscapeCharacters = !!i1535[4]
  i1534.m_EnableRaycastTarget = !!i1535[5]
  i1534.m_GetFontFeaturesAtRuntime = !!i1535[6]
  i1534.m_missingGlyphCharacter = i1535[7]
  i1534.m_warningsDisabled = !!i1535[8]
  request.r(i1535[9], i1535[10], 0, i1534, 'm_defaultFontAsset')
  i1534.m_defaultFontAssetPath = i1535[11]
  i1534.m_defaultFontSize = i1535[12]
  i1534.m_defaultAutoSizeMinRatio = i1535[13]
  i1534.m_defaultAutoSizeMaxRatio = i1535[14]
  i1534.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1535[15], i1535[16] )
  i1534.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1535[17], i1535[18] )
  i1534.m_autoSizeTextContainer = !!i1535[19]
  i1534.m_IsTextObjectScaleStatic = !!i1535[20]
  var i1537 = i1535[21]
  var i1536 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1537.length; i += 2) {
  request.r(i1537[i + 0], i1537[i + 1], 1, i1536, '')
  }
  i1534.m_fallbackFontAssets = i1536
  i1534.m_matchMaterialPreset = !!i1535[22]
  request.r(i1535[23], i1535[24], 0, i1534, 'm_defaultSpriteAsset')
  i1534.m_defaultSpriteAssetPath = i1535[25]
  i1534.m_enableEmojiSupport = !!i1535[26]
  i1534.m_MissingCharacterSpriteUnicode = i1535[27]
  i1534.m_defaultColorGradientPresetsPath = i1535[28]
  request.r(i1535[29], i1535[30], 0, i1534, 'm_defaultStyleSheet')
  i1534.m_StyleSheetsResourcePath = i1535[31]
  request.r(i1535[32], i1535[33], 0, i1534, 'm_leadingCharacters')
  request.r(i1535[34], i1535[35], 0, i1534, 'm_followingCharacters')
  i1534.m_UseModernHangulLineBreakingRules = !!i1535[36]
  return i1534
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1538 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1539 = data
  request.r(i1539[0], i1539[1], 0, i1538, 'spriteSheet')
  var i1541 = i1539[2]
  var i1540 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1541.length; i += 1) {
    i1540.add(request.d('TMPro.TMP_Sprite', i1541[i + 0]));
  }
  i1538.spriteInfoList = i1540
  var i1543 = i1539[3]
  var i1542 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1543.length; i += 2) {
  request.r(i1543[i + 0], i1543[i + 1], 1, i1542, '')
  }
  i1538.fallbackSpriteAssets = i1542
  i1538.hashCode = i1539[4]
  request.r(i1539[5], i1539[6], 0, i1538, 'material')
  i1538.materialHashCode = i1539[7]
  i1538.m_Version = i1539[8]
  i1538.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1539[9], i1538.m_FaceInfo)
  var i1545 = i1539[10]
  var i1544 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1545.length; i += 1) {
    i1544.add(request.d('TMPro.TMP_SpriteCharacter', i1545[i + 0]));
  }
  i1538.m_SpriteCharacterTable = i1544
  var i1547 = i1539[11]
  var i1546 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1547.length; i += 1) {
    i1546.add(request.d('TMPro.TMP_SpriteGlyph', i1547[i + 0]));
  }
  i1538.m_SpriteGlyphTable = i1546
  return i1538
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1550 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1551 = data
  i1550.name = i1551[0]
  i1550.hashCode = i1551[1]
  i1550.unicode = i1551[2]
  i1550.pivot = new pc.Vec2( i1551[3], i1551[4] )
  request.r(i1551[5], i1551[6], 0, i1550, 'sprite')
  i1550.id = i1551[7]
  i1550.x = i1551[8]
  i1550.y = i1551[9]
  i1550.width = i1551[10]
  i1550.height = i1551[11]
  i1550.xOffset = i1551[12]
  i1550.yOffset = i1551[13]
  i1550.xAdvance = i1551[14]
  i1550.scale = i1551[15]
  return i1550
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1556 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1557 = data
  i1556.m_Name = i1557[0]
  i1556.m_HashCode = i1557[1]
  i1556.m_ElementType = i1557[2]
  i1556.m_Unicode = i1557[3]
  i1556.m_GlyphIndex = i1557[4]
  i1556.m_Scale = i1557[5]
  return i1556
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1560 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1561 = data
  request.r(i1561[0], i1561[1], 0, i1560, 'sprite')
  i1560.m_Index = i1561[2]
  i1560.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1561[3], i1560.m_Metrics)
  i1560.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1561[4], i1560.m_GlyphRect)
  i1560.m_Scale = i1561[5]
  i1560.m_AtlasIndex = i1561[6]
  i1560.m_ClassDefinitionType = i1561[7]
  return i1560
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1562 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1563 = data
  var i1565 = i1563[0]
  var i1564 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1565.length; i += 1) {
    i1564.add(request.d('TMPro.TMP_Style', i1565[i + 0]));
  }
  i1562.m_StyleList = i1564
  return i1562
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1568 = root || request.c( 'TMPro.TMP_Style' )
  var i1569 = data
  i1568.m_Name = i1569[0]
  i1568.m_HashCode = i1569[1]
  i1568.m_OpeningDefinition = i1569[2]
  i1568.m_ClosingDefinition = i1569[3]
  i1568.m_OpeningTagArray = i1569[4]
  i1568.m_ClosingTagArray = i1569[5]
  i1568.m_OpeningTagUnicodeArray = i1569[6]
  i1568.m_ClosingTagUnicodeArray = i1569[7]
  return i1568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1571 = data
  var i1573 = i1571[0]
  var i1572 = []
  for(var i = 0; i < i1573.length; i += 1) {
    i1572.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1573[i + 0]) );
  }
  i1570.files = i1572
  i1570.componentToPrefabIds = i1571[1]
  return i1570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1577 = data
  i1576.path = i1577[0]
  request.r(i1577[1], i1577[2], 0, i1576, 'unityObject')
  return i1576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1579 = data
  var i1581 = i1579[0]
  var i1580 = []
  for(var i = 0; i < i1581.length; i += 1) {
    i1580.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1581[i + 0]) );
  }
  i1578.scriptsExecutionOrder = i1580
  var i1583 = i1579[1]
  var i1582 = []
  for(var i = 0; i < i1583.length; i += 1) {
    i1582.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1583[i + 0]) );
  }
  i1578.sortingLayers = i1582
  var i1585 = i1579[2]
  var i1584 = []
  for(var i = 0; i < i1585.length; i += 1) {
    i1584.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1585[i + 0]) );
  }
  i1578.cullingLayers = i1584
  i1578.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1579[3], i1578.timeSettings)
  i1578.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1579[4], i1578.physicsSettings)
  i1578.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1579[5], i1578.physics2DSettings)
  i1578.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1579[6], i1578.qualitySettings)
  i1578.enableRealtimeShadows = !!i1579[7]
  i1578.enableAutoInstancing = !!i1579[8]
  i1578.enableStaticBatching = !!i1579[9]
  i1578.enableDynamicBatching = !!i1579[10]
  i1578.lightmapEncodingQuality = i1579[11]
  i1578.desiredColorSpace = i1579[12]
  var i1587 = i1579[13]
  var i1586 = []
  for(var i = 0; i < i1587.length; i += 1) {
    i1586.push( i1587[i + 0] );
  }
  i1578.allTags = i1586
  return i1578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1591 = data
  i1590.name = i1591[0]
  i1590.value = i1591[1]
  return i1590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1595 = data
  i1594.id = i1595[0]
  i1594.name = i1595[1]
  i1594.value = i1595[2]
  return i1594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1599 = data
  i1598.id = i1599[0]
  i1598.name = i1599[1]
  return i1598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1601 = data
  i1600.fixedDeltaTime = i1601[0]
  i1600.maximumDeltaTime = i1601[1]
  i1600.timeScale = i1601[2]
  i1600.maximumParticleTimestep = i1601[3]
  return i1600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1603 = data
  i1602.gravity = new pc.Vec3( i1603[0], i1603[1], i1603[2] )
  i1602.defaultSolverIterations = i1603[3]
  i1602.bounceThreshold = i1603[4]
  i1602.autoSyncTransforms = !!i1603[5]
  i1602.autoSimulation = !!i1603[6]
  var i1605 = i1603[7]
  var i1604 = []
  for(var i = 0; i < i1605.length; i += 1) {
    i1604.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1605[i + 0]) );
  }
  i1602.collisionMatrix = i1604
  return i1602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1609 = data
  i1608.enabled = !!i1609[0]
  i1608.layerId = i1609[1]
  i1608.otherLayerId = i1609[2]
  return i1608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1610 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1611 = data
  request.r(i1611[0], i1611[1], 0, i1610, 'material')
  i1610.gravity = new pc.Vec2( i1611[2], i1611[3] )
  i1610.positionIterations = i1611[4]
  i1610.velocityIterations = i1611[5]
  i1610.velocityThreshold = i1611[6]
  i1610.maxLinearCorrection = i1611[7]
  i1610.maxAngularCorrection = i1611[8]
  i1610.maxTranslationSpeed = i1611[9]
  i1610.maxRotationSpeed = i1611[10]
  i1610.baumgarteScale = i1611[11]
  i1610.baumgarteTOIScale = i1611[12]
  i1610.timeToSleep = i1611[13]
  i1610.linearSleepTolerance = i1611[14]
  i1610.angularSleepTolerance = i1611[15]
  i1610.defaultContactOffset = i1611[16]
  i1610.autoSimulation = !!i1611[17]
  i1610.queriesHitTriggers = !!i1611[18]
  i1610.queriesStartInColliders = !!i1611[19]
  i1610.callbacksOnDisable = !!i1611[20]
  i1610.reuseCollisionCallbacks = !!i1611[21]
  i1610.autoSyncTransforms = !!i1611[22]
  var i1613 = i1611[23]
  var i1612 = []
  for(var i = 0; i < i1613.length; i += 1) {
    i1612.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1613[i + 0]) );
  }
  i1610.collisionMatrix = i1612
  return i1610
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1617 = data
  i1616.enabled = !!i1617[0]
  i1616.layerId = i1617[1]
  i1616.otherLayerId = i1617[2]
  return i1616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1619 = data
  var i1621 = i1619[0]
  var i1620 = []
  for(var i = 0; i < i1621.length; i += 1) {
    i1620.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1621[i + 0]) );
  }
  i1618.qualityLevels = i1620
  var i1623 = i1619[1]
  var i1622 = []
  for(var i = 0; i < i1623.length; i += 1) {
    i1622.push( i1623[i + 0] );
  }
  i1618.names = i1622
  i1618.shadows = i1619[2]
  i1618.anisotropicFiltering = i1619[3]
  i1618.antiAliasing = i1619[4]
  i1618.lodBias = i1619[5]
  i1618.shadowCascades = i1619[6]
  i1618.shadowDistance = i1619[7]
  i1618.shadowmaskMode = i1619[8]
  i1618.shadowProjection = i1619[9]
  i1618.shadowResolution = i1619[10]
  i1618.softParticles = !!i1619[11]
  i1618.softVegetation = !!i1619[12]
  i1618.activeColorSpace = i1619[13]
  i1618.desiredColorSpace = i1619[14]
  i1618.masterTextureLimit = i1619[15]
  i1618.maxQueuedFrames = i1619[16]
  i1618.particleRaycastBudget = i1619[17]
  i1618.pixelLightCount = i1619[18]
  i1618.realtimeReflectionProbes = !!i1619[19]
  i1618.shadowCascade2Split = i1619[20]
  i1618.shadowCascade4Split = new pc.Vec3( i1619[21], i1619[22], i1619[23] )
  i1618.streamingMipmapsActive = !!i1619[24]
  i1618.vSyncCount = i1619[25]
  i1618.asyncUploadBufferSize = i1619[26]
  i1618.asyncUploadTimeSlice = i1619[27]
  i1618.billboardsFaceCameraPosition = !!i1619[28]
  i1618.shadowNearPlaneOffset = i1619[29]
  i1618.streamingMipmapsMemoryBudget = i1619[30]
  i1618.maximumLODLevel = i1619[31]
  i1618.streamingMipmapsAddAllCameras = !!i1619[32]
  i1618.streamingMipmapsMaxLevelReduction = i1619[33]
  i1618.streamingMipmapsRenderersPerFrame = i1619[34]
  i1618.resolutionScalingFixedDPIFactor = i1619[35]
  i1618.streamingMipmapsMaxFileIORequests = i1619[36]
  i1618.currentQualityLevel = i1619[37]
  return i1618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1628 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1629 = data
  i1628.weight = i1629[0]
  i1628.vertices = i1629[1]
  i1628.normals = i1629[2]
  i1628.tangents = i1629[3]
  return i1628
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1633 = data
  i1632.mode = i1633[0]
  i1632.parameter = i1633[1]
  i1632.threshold = i1633[2]
  return i1632
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1634 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1635 = data
  i1634.xPlacement = i1635[0]
  i1634.yPlacement = i1635[1]
  i1634.xAdvance = i1635[2]
  i1634.yAdvance = i1635[3]
  return i1634
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"enabled":20},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"106":[107],"108":[107],"109":[107],"110":[107],"111":[107],"112":[107],"113":[114],"115":[42],"116":[117],"118":[117],"119":[117],"120":[117],"121":[117],"122":[117],"123":[117],"124":[125],"126":[125],"127":[125],"128":[125],"129":[125],"130":[125],"131":[125],"132":[125],"133":[125],"134":[125],"135":[125],"136":[125],"137":[125],"138":[42],"139":[16],"140":[141],"142":[141],"20":[2],"53":[15,16],"143":[3],"144":[3],"145":[3],"146":[3],"147":[3],"148":[3],"149":[3],"150":[3],"151":[3],"152":[3],"153":[3],"62":[11],"154":[3],"155":[3],"156":[3],"157":[3],"158":[3],"159":[3],"160":[3],"161":[3],"162":[3],"22":[3],"163":[3],"164":[3],"165":[3],"166":[3],"167":[3],"168":[3],"169":[26],"170":[3],"28":[26],"171":[3],"172":[3],"173":[3],"174":[3],"175":[3],"176":[3],"177":[3],"178":[3],"179":[3],"180":[3],"181":[3],"182":[3],"183":[3],"184":[3],"185":[7],"186":[3],"187":[7],"61":[11],"188":[3],"189":[2],"190":[191],"192":[86],"193":[2],"194":[195],"196":[93],"197":[2],"198":[4,2],"199":[16],"191":[4,2],"200":[37,16],"201":[16],"202":[16,15],"203":[117],"204":[125],"205":[206],"207":[208],"35":[2,4],"209":[2],"210":[16,2],"8":[2,4],"211":[2],"212":[4,2],"213":[16],"214":[4,2],"215":[2],"216":[11],"217":[42],"44":[42],"47":[46],"218":[219],"220":[201],"221":[16,15],"222":[191],"223":[201],"224":[225],"226":[201],"227":[201],"228":[208],"229":[208],"230":[201],"231":[195],"232":[2],"233":[2],"58":[20],"7":[4,2],"234":[2],"57":[20],"31":[2],"235":[2],"24":[2],"236":[2],"71":[2],"237":[2],"30":[2],"6":[2],"238":[2],"239":[4,2],"240":[2],"241":[2],"242":[2],"243":[2],"244":[4,2],"26":[2],"245":[93],"246":[93],"247":[93],"248":[93],"249":[42],"250":[42],"94":[93],"251":[20],"252":[42],"253":[195]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasGroup","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Mask","UnityEngine.UI.Image","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.UI.Button","UnityEngine.Transform","UnityEngine.MonoBehaviour","BlockVisual","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","UnityEngine.Mesh","UnityEngine.MeshCollider","LimitLineController","UnityEngine.Canvas","UnityEngine.Sprite","PopupSettings","SonatFramework.Scripts.UIModule.TweenConfigSO","UnityEngine.UI.HorizontalLayoutGroup","SonatFramework.Systems.SettingsManagement.SettingsElement","UnityEngine.UI.Toggle","ButtonScale","UIToggleExtension","UnityEngine.GameObject","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","CheatButton","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","Coffee.UIExtensions.UIParticle","EmojiSlot","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","Smiles.ParentFitter","UnityEngine.BoxCollider","DualDirectionEffect","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","CameraResponsive","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","TowerHeightController","TowerController","BlockSpawner","TowerRotator","ActiveBlockController","GhostBlockController","BlockShapeSO","CellMeshLibrary","BlockPaletteSO","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","SonatFramework.Scripts.UIModule.SafeArea","GameHUD","SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut","ButtonRestart","NextBlockUI","FloodProgressUI","TimerUI","BtnNoAds","RotateButtonHandler","RotateLoadingIndicator","GameHistorySystem","UIBoosterUndo","UnityEngine.UI.LayoutElement","SonatFramework.Scripts.UIModule.PanelManager","TextScale","GameManager","LevelDataSO","GameConfig","CheatManager","GridManager","ScoreManager","InputManager","Booster.HammerInputHandler","TimeManager","ObjectPoolManager","BlockFactory","AudioManager","UnityEngine.AudioSource","UnityEngine.AudioClip","Difficulty.DifficultyManager","Difficulty.DifficultyConfig","Difficulty.ShapePoolSO","TutorialManager","ResponsiveManager","UnityEngine.EventSystems.EventSystem","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.InputActionAsset","UnityEngine.InputSystem.InputActionReference","UnityEngine.Cubemap","UnityEngine.Font","SonatFramework.Systems.AudioManagement.SonatAudioService","SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.ConstantForce","UnityEngine.Rigidbody","UnityEngine.Joint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.FixedJoint","UnityEngine.CharacterJoint","UnityEngine.ConfigurableJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","CheatPanel","PopupAdsBreak","PopupBoosterTutorial","PopupUseBlock","PopupUseFreeze","PopupUseHammer","PopupUseUndo","TutDragPanel","TutorialPanelBase","TutRotatePanel","TutUndoPanel","HomePanel","ConfirmPanel","LosePanel","NotifyPanel","PopupBuyBooster","PopupContinue","PopupLives","PopupLose","PopupNoInternet","PopupTimerWarning","PopupWaitAdsBreak","PopupWaiting","PopupWaitingIap","PopupWin","WinPanel","ToggleSwitchVisual","PopupLoadingIap","TestPanel","ConfirmPanelBase","LosePanelBase","NotifyPanelBase","PopupAdsBreakBase","PopupContinueBase","PopupNoInternetBase","PopupSettingsBase","PopupToast","PopupWaitingBase","WinPanelBase","SonatFramework.Templates.UI.ScriptBase.PopupBuyBoosterBase","SonatFramework.Templates.UI.ScriptBase.PopupLivesBase","SonatFramework.Templates.UI.ScriptBase.PopupWaitAdsBreakBase","SonatFramework.Scripts.UIModule.DarkTransition","SonatFramework.Scripts.UIModule.Panel","SonatFramework.Scripts.UIModule.UIElements.FixedImageRatio","SonatFramework.Scripts.Feature.Shop.UI.ShopPanelBase","SonatFramework.Scripts.Feature.ChestRewardProgress.ChestDisplayUIController","SonatFramework.Scripts.Feature.ChestRewardProgress.ChestSpineUIAnimationHandler","Spine.Unity.SkeletonGraphic","SonatFramework.Systems.AudioManagement.AudioUnit","UnityEngine.Rendering.UI.UIFoldout","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.Variables","AppLovinMax.Scripts.MaxEventSystemChecker","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","Spine.Unity.SkeletonAnimation","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.ISkeletonAnimation","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.Purchasing.IAPButton","UnityEngine.Experimental.Rendering.Universal.PixelPerfectCamera","Spine.Unity.Examples.BasicPlatformerController","UnityEngine.CharacterController","Spine.Unity.Examples.SkeletonGhost","Spine.Unity.Examples.RenderExistingMesh","Spine.Unity.Examples.SkeletonGraphicRenderTexture","Spine.Unity.Examples.SkeletonRenderTexture","Spine.Unity.Examples.SkeletonRenderTextureFadeout","Spine.Unity.Examples.SkeletonRenderTextureBase","Spine.Unity.Examples.SkeletonRagdoll","Spine.Unity.Examples.SkeletonRagdoll2D","Spine.Unity.Examples.SkeletonUtilityEyeConstraint","Spine.Unity.Examples.SkeletonUtilityGroundConstraint","Spine.Unity.Examples.SpineGauge","Unity.VisualScripting.SceneVariables","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","ToonyColorsPro.Runtime.TCP2_CameraDepth","Unity.VisualScripting.StateMachine"]

Deserializers.unityVersion = "2022.3.62f3";

Deserializers.productName = "Block Merge 360";

Deserializers.lunaInitializationTime = "02/25/2026 13:24:59";

Deserializers.lunaDaysRunning = "0.1";

Deserializers.lunaVersion = "7.0.0";

Deserializers.lunaSHA = "3bcc3e343f23b4c67e768a811a8d088c7f7adbc5";

Deserializers.creativeName = "";

Deserializers.lunaAppID = "36791";

Deserializers.projectId = "15d5b0607dad2fe46bcff63b1ecfccbc";

Deserializers.packagesInfo = "com.unity.inputsystem: 1.16.0\ncom.unity.nuget.newtonsoft-json: 3.2.2\ncom.unity.render-pipelines.universal: 17.3.0\ncom.unity.shadergraph: 17.3.0\ncom.unity.textmeshpro: 3.0.9\ncom.unity.timeline: 1.8.9\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "False";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "0";

Deserializers.runtimeAnalysisExcludedMethodsCount = "0";

Deserializers.runtimeAnalysisExcludedModules = "";

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

Deserializers.buildID = "c9bb5042-d1d3-499d-9f44-a69aa01f974c";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Purchasing","CodelessIAPStoreListener","InitializeCodelessPurchasingOnLoad"],["MaxSdkUnityEditor","InitializeMaxSdkUnityEditorOnLoad"],["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Coffee","UIParticleInternal","UIExtraCallbacks","InitializeOnLoad"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["UnityEngine","Purchasing","StoreManagerFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","Registration","IapCoreInitializeCallback","Register"],["UnityEngine","Purchasing","ProductServiceDependencyFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","PurchaseServiceDependencyFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","StoreServiceDependencyFactoryInjector","SetStoreManagerFactory"],["I2","Loc","LocalizeTarget_UnityUI_Text","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_VideoPlayer","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_Child","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_AudioSource","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_Image","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_SpriteRenderer","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_TextMesh","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_RawImage","AutoRegister"],["I2","Loc","LocalizeTarget_TextMeshPro_UGUI","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_Prefab","AutoRegister"],["SonatFramework","Systems","EventBus","EventBusUtil","Initialize"],["I2","Loc","LocalizeTarget_TextMeshPro_Label","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_MeshRenderer","AutoRegister"]],[["Cysharp","Threading","Tasks","PlayerLoopHelper","Init"],["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"],["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["UnityEngine","InputSystem","UI","InputSystemUIInputModule","ResetDefaultActions"],["Uniject","UnityThreadUtils","CaptureUnityThreadInfo"],["Coffee","UIParticleInternal","MaterialRepository","Clear"],["Coffee","UIParticleInternal","FrameCache","Clear"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"],["MaxSdkCallbacks","ResetOnDomainReload"],["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","ResourceManagement","ResourceProviders","AssetBundleProvider","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

