var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i830 = root || request.c( 'UnityEngine.JointSpring' )
  var i831 = data
  i830.spring = i831[0]
  i830.damper = i831[1]
  i830.targetPosition = i831[2]
  return i830
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i832 = root || request.c( 'UnityEngine.JointMotor' )
  var i833 = data
  i832.m_TargetVelocity = i833[0]
  i832.m_Force = i833[1]
  i832.m_FreeSpin = i833[2]
  return i832
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i834 = root || request.c( 'UnityEngine.JointLimits' )
  var i835 = data
  i834.m_Min = i835[0]
  i834.m_Max = i835[1]
  i834.m_Bounciness = i835[2]
  i834.m_BounceMinVelocity = i835[3]
  i834.m_ContactDistance = i835[4]
  i834.minBounce = i835[5]
  i834.maxBounce = i835[6]
  return i834
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i836 = root || request.c( 'UnityEngine.JointDrive' )
  var i837 = data
  i836.m_PositionSpring = i837[0]
  i836.m_PositionDamper = i837[1]
  i836.m_MaximumForce = i837[2]
  i836.m_UseAcceleration = i837[3]
  return i836
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i838 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i839 = data
  i838.m_Spring = i839[0]
  i838.m_Damper = i839[1]
  return i838
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i840 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i841 = data
  i840.m_Limit = i841[0]
  i840.m_Bounciness = i841[1]
  i840.m_ContactDistance = i841[2]
  return i840
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i842 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i843 = data
  i842.m_ExtremumSlip = i843[0]
  i842.m_ExtremumValue = i843[1]
  i842.m_AsymptoteSlip = i843[2]
  i842.m_AsymptoteValue = i843[3]
  i842.m_Stiffness = i843[4]
  return i842
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i844 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i845 = data
  i844.m_LowerAngle = i845[0]
  i844.m_UpperAngle = i845[1]
  return i844
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i846 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i847 = data
  i846.m_MotorSpeed = i847[0]
  i846.m_MaximumMotorTorque = i847[1]
  return i846
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i848 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i849 = data
  i848.m_DampingRatio = i849[0]
  i848.m_Frequency = i849[1]
  i848.m_Angle = i849[2]
  return i848
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i850 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i851 = data
  i850.m_LowerTranslation = i851[0]
  i850.m_UpperTranslation = i851[1]
  return i850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i852 = root || new pc.UnityMaterial()
  var i853 = data
  i852.name = i853[0]
  request.r(i853[1], i853[2], 0, i852, 'shader')
  i852.renderQueue = i853[3]
  i852.enableInstancing = !!i853[4]
  var i855 = i853[5]
  var i854 = []
  for(var i = 0; i < i855.length; i += 1) {
    i854.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i855[i + 0]) );
  }
  i852.floatParameters = i854
  var i857 = i853[6]
  var i856 = []
  for(var i = 0; i < i857.length; i += 1) {
    i856.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i857[i + 0]) );
  }
  i852.colorParameters = i856
  var i859 = i853[7]
  var i858 = []
  for(var i = 0; i < i859.length; i += 1) {
    i858.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i859[i + 0]) );
  }
  i852.vectorParameters = i858
  var i861 = i853[8]
  var i860 = []
  for(var i = 0; i < i861.length; i += 1) {
    i860.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i861[i + 0]) );
  }
  i852.textureParameters = i860
  var i863 = i853[9]
  var i862 = []
  for(var i = 0; i < i863.length; i += 1) {
    i862.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i863[i + 0]) );
  }
  i852.materialFlags = i862
  return i852
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i867 = data
  i866.name = i867[0]
  i866.value = i867[1]
  return i866
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i870 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i871 = data
  i870.name = i871[0]
  i870.value = new pc.Color(i871[1], i871[2], i871[3], i871[4])
  return i870
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i875 = data
  i874.name = i875[0]
  i874.value = new pc.Vec4( i875[1], i875[2], i875[3], i875[4] )
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i879 = data
  i878.name = i879[0]
  request.r(i879[1], i879[2], 0, i878, 'value')
  return i878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i883 = data
  i882.name = i883[0]
  i882.enabled = !!i883[1]
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i884 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i885 = data
  i884.name = i885[0]
  i884.width = i885[1]
  i884.height = i885[2]
  i884.mipmapCount = i885[3]
  i884.anisoLevel = i885[4]
  i884.filterMode = i885[5]
  i884.hdr = !!i885[6]
  i884.format = i885[7]
  i884.wrapMode = i885[8]
  i884.alphaIsTransparency = !!i885[9]
  i884.alphaSource = i885[10]
  i884.graphicsFormat = i885[11]
  i884.sRGBTexture = !!i885[12]
  i884.desiredColorSpace = i885[13]
  i884.wrapU = i885[14]
  i884.wrapV = i885[15]
  return i884
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i886 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i887 = data
  i886.pivot = new pc.Vec2( i887[0], i887[1] )
  i886.anchorMin = new pc.Vec2( i887[2], i887[3] )
  i886.anchorMax = new pc.Vec2( i887[4], i887[5] )
  i886.sizeDelta = new pc.Vec2( i887[6], i887[7] )
  i886.anchoredPosition3D = new pc.Vec3( i887[8], i887[9], i887[10] )
  i886.rotation = new pc.Quat(i887[11], i887[12], i887[13], i887[14])
  i886.scale = new pc.Vec3( i887[15], i887[16], i887[17] )
  return i886
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i889 = data
  i888.m_Alpha = i889[0]
  i888.m_Interactable = !!i889[1]
  i888.m_BlocksRaycasts = !!i889[2]
  i888.m_IgnoreParentGroups = !!i889[3]
  i888.enabled = !!i889[4]
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i891 = data
  i890.cullTransparentMesh = !!i891[0]
  return i890
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i892 = root || request.c( 'UnityEngine.UI.Mask' )
  var i893 = data
  i892.m_ShowMaskGraphic = !!i893[0]
  return i892
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i895 = data
  i894.name = i895[0]
  i894.tagId = i895[1]
  i894.enabled = !!i895[2]
  i894.isStatic = !!i895[3]
  i894.layer = i895[4]
  return i894
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i896 = root || request.c( 'UnityEngine.UI.Image' )
  var i897 = data
  request.r(i897[0], i897[1], 0, i896, 'm_Sprite')
  i896.m_Type = i897[2]
  i896.m_PreserveAspect = !!i897[3]
  i896.m_FillCenter = !!i897[4]
  i896.m_FillMethod = i897[5]
  i896.m_FillAmount = i897[6]
  i896.m_FillClockwise = !!i897[7]
  i896.m_FillOrigin = i897[8]
  i896.m_UseSpriteMesh = !!i897[9]
  i896.m_PixelsPerUnitMultiplier = i897[10]
  i896.m_Maskable = !!i897[11]
  request.r(i897[12], i897[13], 0, i896, 'm_Material')
  i896.m_Color = new pc.Color(i897[14], i897[15], i897[16], i897[17])
  i896.m_RaycastTarget = !!i897[18]
  i896.m_RaycastPadding = new pc.Vec4( i897[19], i897[20], i897[21], i897[22] )
  return i896
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i898 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i899 = data
  i898.m_hasFontAssetChanged = !!i899[0]
  request.r(i899[1], i899[2], 0, i898, 'm_baseMaterial')
  i898.m_maskOffset = new pc.Vec4( i899[3], i899[4], i899[5], i899[6] )
  i898.m_text = i899[7]
  i898.m_isRightToLeft = !!i899[8]
  request.r(i899[9], i899[10], 0, i898, 'm_fontAsset')
  request.r(i899[11], i899[12], 0, i898, 'm_sharedMaterial')
  var i901 = i899[13]
  var i900 = []
  for(var i = 0; i < i901.length; i += 2) {
  request.r(i901[i + 0], i901[i + 1], 2, i900, '')
  }
  i898.m_fontSharedMaterials = i900
  request.r(i899[14], i899[15], 0, i898, 'm_fontMaterial')
  var i903 = i899[16]
  var i902 = []
  for(var i = 0; i < i903.length; i += 2) {
  request.r(i903[i + 0], i903[i + 1], 2, i902, '')
  }
  i898.m_fontMaterials = i902
  i898.m_fontColor32 = UnityEngine.Color32.ConstructColor(i899[17], i899[18], i899[19], i899[20])
  i898.m_fontColor = new pc.Color(i899[21], i899[22], i899[23], i899[24])
  i898.m_enableVertexGradient = !!i899[25]
  i898.m_colorMode = i899[26]
  i898.m_fontColorGradient = request.d('TMPro.VertexGradient', i899[27], i898.m_fontColorGradient)
  request.r(i899[28], i899[29], 0, i898, 'm_fontColorGradientPreset')
  request.r(i899[30], i899[31], 0, i898, 'm_spriteAsset')
  i898.m_tintAllSprites = !!i899[32]
  request.r(i899[33], i899[34], 0, i898, 'm_StyleSheet')
  i898.m_TextStyleHashCode = i899[35]
  i898.m_overrideHtmlColors = !!i899[36]
  i898.m_faceColor = UnityEngine.Color32.ConstructColor(i899[37], i899[38], i899[39], i899[40])
  i898.m_fontSize = i899[41]
  i898.m_fontSizeBase = i899[42]
  i898.m_fontWeight = i899[43]
  i898.m_enableAutoSizing = !!i899[44]
  i898.m_fontSizeMin = i899[45]
  i898.m_fontSizeMax = i899[46]
  i898.m_fontStyle = i899[47]
  i898.m_HorizontalAlignment = i899[48]
  i898.m_VerticalAlignment = i899[49]
  i898.m_textAlignment = i899[50]
  i898.m_characterSpacing = i899[51]
  i898.m_wordSpacing = i899[52]
  i898.m_lineSpacing = i899[53]
  i898.m_lineSpacingMax = i899[54]
  i898.m_paragraphSpacing = i899[55]
  i898.m_charWidthMaxAdj = i899[56]
  i898.m_enableWordWrapping = !!i899[57]
  i898.m_wordWrappingRatios = i899[58]
  i898.m_overflowMode = i899[59]
  request.r(i899[60], i899[61], 0, i898, 'm_linkedTextComponent')
  request.r(i899[62], i899[63], 0, i898, 'parentLinkedComponent')
  i898.m_enableKerning = !!i899[64]
  i898.m_enableExtraPadding = !!i899[65]
  i898.checkPaddingRequired = !!i899[66]
  i898.m_isRichText = !!i899[67]
  i898.m_parseCtrlCharacters = !!i899[68]
  i898.m_isOrthographic = !!i899[69]
  i898.m_isCullingEnabled = !!i899[70]
  i898.m_horizontalMapping = i899[71]
  i898.m_verticalMapping = i899[72]
  i898.m_uvLineOffset = i899[73]
  i898.m_geometrySortingOrder = i899[74]
  i898.m_IsTextObjectScaleStatic = !!i899[75]
  i898.m_VertexBufferAutoSizeReduction = !!i899[76]
  i898.m_useMaxVisibleDescender = !!i899[77]
  i898.m_pageToDisplay = i899[78]
  i898.m_margin = new pc.Vec4( i899[79], i899[80], i899[81], i899[82] )
  i898.m_isUsingLegacyAnimationComponent = !!i899[83]
  i898.m_isVolumetricText = !!i899[84]
  i898.m_Maskable = !!i899[85]
  request.r(i899[86], i899[87], 0, i898, 'm_Material')
  i898.m_Color = new pc.Color(i899[88], i899[89], i899[90], i899[91])
  i898.m_RaycastTarget = !!i899[92]
  i898.m_RaycastPadding = new pc.Vec4( i899[93], i899[94], i899[95], i899[96] )
  return i898
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i906 = root || request.c( 'TMPro.VertexGradient' )
  var i907 = data
  i906.topLeft = new pc.Color(i907[0], i907[1], i907[2], i907[3])
  i906.topRight = new pc.Color(i907[4], i907[5], i907[6], i907[7])
  i906.bottomLeft = new pc.Color(i907[8], i907[9], i907[10], i907[11])
  i906.bottomRight = new pc.Color(i907[12], i907[13], i907[14], i907[15])
  return i906
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i908 = root || request.c( 'UnityEngine.UI.Button' )
  var i909 = data
  i908.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i909[0], i908.m_OnClick)
  i908.m_Navigation = request.d('UnityEngine.UI.Navigation', i909[1], i908.m_Navigation)
  i908.m_Transition = i909[2]
  i908.m_Colors = request.d('UnityEngine.UI.ColorBlock', i909[3], i908.m_Colors)
  i908.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i909[4], i908.m_SpriteState)
  i908.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i909[5], i908.m_AnimationTriggers)
  i908.m_Interactable = !!i909[6]
  request.r(i909[7], i909[8], 0, i908, 'm_TargetGraphic')
  return i908
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i910 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i911 = data
  i910.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i911[0], i910.m_PersistentCalls)
  return i910
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i912 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i913 = data
  var i915 = i913[0]
  var i914 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i915.length; i += 1) {
    i914.add(request.d('UnityEngine.Events.PersistentCall', i915[i + 0]));
  }
  i912.m_Calls = i914
  return i912
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i918 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i919 = data
  request.r(i919[0], i919[1], 0, i918, 'm_Target')
  i918.m_TargetAssemblyTypeName = i919[2]
  i918.m_MethodName = i919[3]
  i918.m_Mode = i919[4]
  i918.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i919[5], i918.m_Arguments)
  i918.m_CallState = i919[6]
  return i918
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i920 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i921 = data
  i920.m_Mode = i921[0]
  i920.m_WrapAround = !!i921[1]
  request.r(i921[2], i921[3], 0, i920, 'm_SelectOnUp')
  request.r(i921[4], i921[5], 0, i920, 'm_SelectOnDown')
  request.r(i921[6], i921[7], 0, i920, 'm_SelectOnLeft')
  request.r(i921[8], i921[9], 0, i920, 'm_SelectOnRight')
  return i920
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i922 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i923 = data
  i922.m_NormalColor = new pc.Color(i923[0], i923[1], i923[2], i923[3])
  i922.m_HighlightedColor = new pc.Color(i923[4], i923[5], i923[6], i923[7])
  i922.m_PressedColor = new pc.Color(i923[8], i923[9], i923[10], i923[11])
  i922.m_SelectedColor = new pc.Color(i923[12], i923[13], i923[14], i923[15])
  i922.m_DisabledColor = new pc.Color(i923[16], i923[17], i923[18], i923[19])
  i922.m_ColorMultiplier = i923[20]
  i922.m_FadeDuration = i923[21]
  return i922
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i924 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i925 = data
  request.r(i925[0], i925[1], 0, i924, 'm_HighlightedSprite')
  request.r(i925[2], i925[3], 0, i924, 'm_PressedSprite')
  request.r(i925[4], i925[5], 0, i924, 'm_SelectedSprite')
  request.r(i925[6], i925[7], 0, i924, 'm_DisabledSprite')
  return i924
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i926 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i927 = data
  i926.m_NormalTrigger = i927[0]
  i926.m_HighlightedTrigger = i927[1]
  i926.m_PressedTrigger = i927[2]
  i926.m_SelectedTrigger = i927[3]
  i926.m_DisabledTrigger = i927[4]
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i928 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i929 = data
  i928.position = new pc.Vec3( i929[0], i929[1], i929[2] )
  i928.scale = new pc.Vec3( i929[3], i929[4], i929[5] )
  i928.rotation = new pc.Quat(i929[6], i929[7], i929[8], i929[9])
  return i928
}

Deserializers["BlockVisual"] = function (request, data, root) {
  var i930 = root || request.c( 'BlockVisual' )
  var i931 = data
  request.r(i931[0], i931[1], 0, i930, '_visualOuter')
  request.r(i931[2], i931[3], 0, i930, '_visualInner')
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i933 = data
  request.r(i933[0], i933[1], 0, i932, 'sharedMesh')
  return i932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i934 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i935 = data
  request.r(i935[0], i935[1], 0, i934, 'additionalVertexStreams')
  i934.enabled = !!i935[2]
  request.r(i935[3], i935[4], 0, i934, 'sharedMaterial')
  var i937 = i935[5]
  var i936 = []
  for(var i = 0; i < i937.length; i += 2) {
  request.r(i937[i + 0], i937[i + 1], 2, i936, '')
  }
  i934.sharedMaterials = i936
  i934.receiveShadows = !!i935[6]
  i934.shadowCastingMode = i935[7]
  i934.sortingLayerID = i935[8]
  i934.sortingOrder = i935[9]
  i934.lightmapIndex = i935[10]
  i934.lightmapSceneIndex = i935[11]
  i934.lightmapScaleOffset = new pc.Vec4( i935[12], i935[13], i935[14], i935[15] )
  i934.lightProbeUsage = i935[16]
  i934.reflectionProbeUsage = i935[17]
  return i934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i939 = data
  i938.name = i939[0]
  i938.halfPrecision = !!i939[1]
  i938.useUInt32IndexFormat = !!i939[2]
  i938.vertexCount = i939[3]
  i938.aabb = i939[4]
  var i941 = i939[5]
  var i940 = []
  for(var i = 0; i < i941.length; i += 1) {
    i940.push( !!i941[i + 0] );
  }
  i938.streams = i940
  i938.vertices = i939[6]
  var i943 = i939[7]
  var i942 = []
  for(var i = 0; i < i943.length; i += 1) {
    i942.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i943[i + 0]) );
  }
  i938.subMeshes = i942
  var i945 = i939[8]
  var i944 = []
  for(var i = 0; i < i945.length; i += 16) {
    i944.push( new pc.Mat4().setData(i945[i + 0], i945[i + 1], i945[i + 2], i945[i + 3],  i945[i + 4], i945[i + 5], i945[i + 6], i945[i + 7],  i945[i + 8], i945[i + 9], i945[i + 10], i945[i + 11],  i945[i + 12], i945[i + 13], i945[i + 14], i945[i + 15]) );
  }
  i938.bindposes = i944
  var i947 = i939[9]
  var i946 = []
  for(var i = 0; i < i947.length; i += 1) {
    i946.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i947[i + 0]) );
  }
  i938.blendShapes = i946
  return i938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i953 = data
  i952.triangles = i953[0]
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i959 = data
  i958.name = i959[0]
  var i961 = i959[1]
  var i960 = []
  for(var i = 0; i < i961.length; i += 1) {
    i960.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i961[i + 0]) );
  }
  i958.frames = i960
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i963 = data
  request.r(i963[0], i963[1], 0, i962, 'sharedMesh')
  i962.convex = !!i963[2]
  i962.enabled = !!i963[3]
  i962.isTrigger = !!i963[4]
  request.r(i963[5], i963[6], 0, i962, 'material')
  return i962
}

Deserializers["LimitLineController"] = function (request, data, root) {
  var i964 = root || request.c( 'LimitLineController' )
  var i965 = data
  return i964
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i966 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i967 = data
  i966.planeDistance = i967[0]
  i966.referencePixelsPerUnit = i967[1]
  i966.isFallbackOverlay = !!i967[2]
  i966.renderMode = i967[3]
  i966.renderOrder = i967[4]
  i966.sortingLayerName = i967[5]
  i966.sortingOrder = i967[6]
  i966.scaleFactor = i967[7]
  request.r(i967[8], i967[9], 0, i966, 'worldCamera')
  i966.overrideSorting = !!i967[10]
  i966.pixelPerfect = !!i967[11]
  i966.targetDisplay = i967[12]
  i966.overridePixelPerfect = !!i967[13]
  i966.enabled = !!i967[14]
  return i966
}

Deserializers["PopupSettings"] = function (request, data, root) {
  var i968 = root || request.c( 'PopupSettings' )
  var i969 = data
  var i971 = i969[0]
  var i970 = []
  for(var i = 0; i < i971.length; i += 1) {
    i970.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i971[i + 0]) );
  }
  i968.openTween = i970
  var i973 = i969[1]
  var i972 = []
  for(var i = 0; i < i973.length; i += 1) {
    i972.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i973[i + 0]) );
  }
  i968.closeTween = i972
  i968.keepCached = !!i969[2]
  i968.pauseGame = !!i969[3]
  i968.ignoreTracking = !!i969[4]
  request.r(i969[5], i969[6], 0, i968, 'toggleSoundVisual')
  request.r(i969[7], i969[8], 0, i968, 'toggleMusicVisual')
  request.r(i969[9], i969[10], 0, i968, 'toggleVibrationVisual')
  request.r(i969[11], i969[12], 0, i968, 'btnResume')
  request.r(i969[13], i969[14], 0, i968, 'btnClose')
  request.r(i969[15], i969[16], 0, i968, 'btnRestart')
  i968.trackingName = i969[17]
  return i968
}

Deserializers["SonatFramework.Scripts.UIModule.TweenData"] = function (request, data, root) {
  var i976 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenData' )
  var i977 = data
  request.r(i977[0], i977[1], 0, i976, 'target')
  request.r(i977[2], i977[3], 0, i976, 'configSO')
  i976.custom = !!i977[4]
  i976.config = request.d('SonatFramework.Scripts.UIModule.TweenConfig', i977[5], i976.config)
  i976.OnCompleted = request.d('System.Action', i977[6], i976.OnCompleted)
  return i976
}

Deserializers["SonatFramework.Scripts.UIModule.TweenConfig"] = function (request, data, root) {
  var i978 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenConfig' )
  var i979 = data
  i978.tweenType = i979[0]
  i978.from = i979[1]
  i978.to = i979[2]
  i978.mFrom = new pc.Vec3( i979[3], i979[4], i979[5] )
  i978.mTo = new pc.Vec3( i979[6], i979[7], i979[8] )
  i978.duration = i979[9]
  i978.delay = i979[10]
  i978.curve = new pc.AnimationCurve( { keys_flow: i979[11] } )
  return i978
}

Deserializers["System.Action"] = function (request, data, root) {
  var i980 = root || request.c( 'System.Action' )
  var i981 = data
  return i980
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i982 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
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

Deserializers["SonatFramework.Systems.SettingsManagement.SettingsElement"] = function (request, data, root) {
  var i984 = root || request.c( 'SonatFramework.Systems.SettingsManagement.SettingsElement' )
  var i985 = data
  request.r(i985[0], i985[1], 0, i984, 'musicToggle')
  request.r(i985[2], i985[3], 0, i984, 'soundToggle')
  request.r(i985[4], i985[5], 0, i984, 'vibrateToggle')
  return i984
}

Deserializers["ButtonScale"] = function (request, data, root) {
  var i986 = root || request.c( 'ButtonScale' )
  var i987 = data
  i986.hoverScale = i987[0]
  i986.clickScale = i987[1]
  i986.duration = i987[2]
  i986.baseScale = new pc.Vec3( i987[3], i987[4], i987[5] )
  return i986
}

Deserializers["UnityEngine.UI.Toggle"] = function (request, data, root) {
  var i988 = root || request.c( 'UnityEngine.UI.Toggle' )
  var i989 = data
  i988.toggleTransition = i989[0]
  request.r(i989[1], i989[2], 0, i988, 'graphic')
  i988.onValueChanged = request.d('UnityEngine.UI.Toggle+ToggleEvent', i989[3], i988.onValueChanged)
  request.r(i989[4], i989[5], 0, i988, 'm_Group')
  i988.m_IsOn = !!i989[6]
  i988.m_Navigation = request.d('UnityEngine.UI.Navigation', i989[7], i988.m_Navigation)
  i988.m_Transition = i989[8]
  i988.m_Colors = request.d('UnityEngine.UI.ColorBlock', i989[9], i988.m_Colors)
  i988.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i989[10], i988.m_SpriteState)
  i988.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i989[11], i988.m_AnimationTriggers)
  i988.m_Interactable = !!i989[12]
  request.r(i989[13], i989[14], 0, i988, 'm_TargetGraphic')
  return i988
}

Deserializers["UnityEngine.UI.Toggle+ToggleEvent"] = function (request, data, root) {
  var i990 = root || request.c( 'UnityEngine.UI.Toggle+ToggleEvent' )
  var i991 = data
  i990.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i991[0], i990.m_PersistentCalls)
  return i990
}

Deserializers["UIToggleExtension"] = function (request, data, root) {
  var i992 = root || request.c( 'UIToggleExtension' )
  var i993 = data
  request.r(i993[0], i993[1], 0, i992, 'deactiveObj')
  request.r(i993[2], i993[3], 0, i992, 'activeObj')
  return i992
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i994 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i995 = data
  request.r(i995[0], i995[1], 0, i994, 'm_ObjectArgument')
  i994.m_ObjectArgumentAssemblyTypeName = i995[2]
  i994.m_IntArgument = i995[3]
  i994.m_FloatArgument = i995[4]
  i994.m_StringArgument = i995[5]
  i994.m_BoolArgument = !!i995[6]
  return i994
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i996 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i997 = data
  i996.m_Spacing = i997[0]
  i996.m_ChildForceExpandWidth = !!i997[1]
  i996.m_ChildForceExpandHeight = !!i997[2]
  i996.m_ChildControlWidth = !!i997[3]
  i996.m_ChildControlHeight = !!i997[4]
  i996.m_ChildScaleWidth = !!i997[5]
  i996.m_ChildScaleHeight = !!i997[6]
  i996.m_ReverseArrangement = !!i997[7]
  i996.m_Padding = UnityEngine.RectOffset.FromPaddings(i997[8], i997[9], i997[10], i997[11])
  i996.m_ChildAlignment = i997[12]
  return i996
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i998 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i999 = data
  i998.m_HorizontalFit = i999[0]
  i998.m_VerticalFit = i999[1]
  return i998
}

Deserializers["CheatButton"] = function (request, data, root) {
  var i1000 = root || request.c( 'CheatButton' )
  var i1001 = data
  request.r(i1001[0], i1001[1], 0, i1000, 'needOff')
  return i1000
}

Deserializers["PopupWin"] = function (request, data, root) {
  var i1002 = root || request.c( 'PopupWin' )
  var i1003 = data
  var i1005 = i1003[0]
  var i1004 = []
  for(var i = 0; i < i1005.length; i += 1) {
    i1004.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i1005[i + 0]) );
  }
  i1002.openTween = i1004
  var i1007 = i1003[1]
  var i1006 = []
  for(var i = 0; i < i1007.length; i += 1) {
    i1006.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i1007[i + 0]) );
  }
  i1002.closeTween = i1006
  i1002.keepCached = !!i1003[2]
  i1002.pauseGame = !!i1003[3]
  i1002.ignoreTracking = !!i1003[4]
  i1002.trackingName = i1003[5]
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i1008 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i1009 = data
  i1008.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i1009[0], i1008.main)
  i1008.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i1009[1], i1008.colorBySpeed)
  i1008.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i1009[2], i1008.colorOverLifetime)
  i1008.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i1009[3], i1008.emission)
  i1008.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i1009[4], i1008.rotationBySpeed)
  i1008.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i1009[5], i1008.rotationOverLifetime)
  i1008.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i1009[6], i1008.shape)
  i1008.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i1009[7], i1008.sizeBySpeed)
  i1008.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i1009[8], i1008.sizeOverLifetime)
  i1008.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i1009[9], i1008.textureSheetAnimation)
  i1008.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i1009[10], i1008.velocityOverLifetime)
  i1008.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i1009[11], i1008.noise)
  i1008.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i1009[12], i1008.inheritVelocity)
  i1008.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i1009[13], i1008.forceOverLifetime)
  i1008.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i1009[14], i1008.limitVelocityOverLifetime)
  i1008.useAutoRandomSeed = !!i1009[15]
  i1008.randomSeed = i1009[16]
  return i1008
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i1010 = root || new pc.ParticleSystemMain()
  var i1011 = data
  i1010.duration = i1011[0]
  i1010.loop = !!i1011[1]
  i1010.prewarm = !!i1011[2]
  i1010.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[3], i1010.startDelay)
  i1010.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[4], i1010.startLifetime)
  i1010.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[5], i1010.startSpeed)
  i1010.startSize3D = !!i1011[6]
  i1010.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[7], i1010.startSizeX)
  i1010.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[8], i1010.startSizeY)
  i1010.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[9], i1010.startSizeZ)
  i1010.startRotation3D = !!i1011[10]
  i1010.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[11], i1010.startRotationX)
  i1010.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[12], i1010.startRotationY)
  i1010.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[13], i1010.startRotationZ)
  i1010.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1011[14], i1010.startColor)
  i1010.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[15], i1010.gravityModifier)
  i1010.simulationSpace = i1011[16]
  request.r(i1011[17], i1011[18], 0, i1010, 'customSimulationSpace')
  i1010.simulationSpeed = i1011[19]
  i1010.useUnscaledTime = !!i1011[20]
  i1010.scalingMode = i1011[21]
  i1010.playOnAwake = !!i1011[22]
  i1010.maxParticles = i1011[23]
  i1010.emitterVelocityMode = i1011[24]
  i1010.stopAction = i1011[25]
  return i1010
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i1012 = root || new pc.MinMaxCurve()
  var i1013 = data
  i1012.mode = i1013[0]
  i1012.curveMin = new pc.AnimationCurve( { keys_flow: i1013[1] } )
  i1012.curveMax = new pc.AnimationCurve( { keys_flow: i1013[2] } )
  i1012.curveMultiplier = i1013[3]
  i1012.constantMin = i1013[4]
  i1012.constantMax = i1013[5]
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i1014 = root || new pc.MinMaxGradient()
  var i1015 = data
  i1014.mode = i1015[0]
  i1014.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i1015[1], i1014.gradientMin)
  i1014.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i1015[2], i1014.gradientMax)
  i1014.colorMin = new pc.Color(i1015[3], i1015[4], i1015[5], i1015[6])
  i1014.colorMax = new pc.Color(i1015[7], i1015[8], i1015[9], i1015[10])
  return i1014
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i1016 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i1017 = data
  i1016.mode = i1017[0]
  var i1019 = i1017[1]
  var i1018 = []
  for(var i = 0; i < i1019.length; i += 1) {
    i1018.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i1019[i + 0]) );
  }
  i1016.colorKeys = i1018
  var i1021 = i1017[2]
  var i1020 = []
  for(var i = 0; i < i1021.length; i += 1) {
    i1020.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i1021[i + 0]) );
  }
  i1016.alphaKeys = i1020
  return i1016
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i1022 = root || new pc.ParticleSystemColorBySpeed()
  var i1023 = data
  i1022.enabled = !!i1023[0]
  i1022.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1023[1], i1022.color)
  i1022.range = new pc.Vec2( i1023[2], i1023[3] )
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i1026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i1027 = data
  i1026.color = new pc.Color(i1027[0], i1027[1], i1027[2], i1027[3])
  i1026.time = i1027[4]
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i1030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i1031 = data
  i1030.alpha = i1031[0]
  i1030.time = i1031[1]
  return i1030
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i1032 = root || new pc.ParticleSystemColorOverLifetime()
  var i1033 = data
  i1032.enabled = !!i1033[0]
  i1032.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1033[1], i1032.color)
  return i1032
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i1034 = root || new pc.ParticleSystemEmitter()
  var i1035 = data
  i1034.enabled = !!i1035[0]
  i1034.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[1], i1034.rateOverTime)
  i1034.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[2], i1034.rateOverDistance)
  var i1037 = i1035[3]
  var i1036 = []
  for(var i = 0; i < i1037.length; i += 1) {
    i1036.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i1037[i + 0]) );
  }
  i1034.bursts = i1036
  return i1034
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i1040 = root || new pc.ParticleSystemBurst()
  var i1041 = data
  i1040.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[0], i1040.count)
  i1040.cycleCount = i1041[1]
  i1040.minCount = i1041[2]
  i1040.maxCount = i1041[3]
  i1040.repeatInterval = i1041[4]
  i1040.time = i1041[5]
  return i1040
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i1042 = root || new pc.ParticleSystemRotationBySpeed()
  var i1043 = data
  i1042.enabled = !!i1043[0]
  i1042.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[1], i1042.x)
  i1042.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[2], i1042.y)
  i1042.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[3], i1042.z)
  i1042.separateAxes = !!i1043[4]
  i1042.range = new pc.Vec2( i1043[5], i1043[6] )
  return i1042
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i1044 = root || new pc.ParticleSystemRotationOverLifetime()
  var i1045 = data
  i1044.enabled = !!i1045[0]
  i1044.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[1], i1044.x)
  i1044.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[2], i1044.y)
  i1044.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[3], i1044.z)
  i1044.separateAxes = !!i1045[4]
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i1046 = root || new pc.ParticleSystemShape()
  var i1047 = data
  i1046.enabled = !!i1047[0]
  i1046.shapeType = i1047[1]
  i1046.randomDirectionAmount = i1047[2]
  i1046.sphericalDirectionAmount = i1047[3]
  i1046.randomPositionAmount = i1047[4]
  i1046.alignToDirection = !!i1047[5]
  i1046.radius = i1047[6]
  i1046.radiusMode = i1047[7]
  i1046.radiusSpread = i1047[8]
  i1046.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[9], i1046.radiusSpeed)
  i1046.radiusThickness = i1047[10]
  i1046.angle = i1047[11]
  i1046.length = i1047[12]
  i1046.boxThickness = new pc.Vec3( i1047[13], i1047[14], i1047[15] )
  i1046.meshShapeType = i1047[16]
  request.r(i1047[17], i1047[18], 0, i1046, 'mesh')
  request.r(i1047[19], i1047[20], 0, i1046, 'meshRenderer')
  request.r(i1047[21], i1047[22], 0, i1046, 'skinnedMeshRenderer')
  i1046.useMeshMaterialIndex = !!i1047[23]
  i1046.meshMaterialIndex = i1047[24]
  i1046.useMeshColors = !!i1047[25]
  i1046.normalOffset = i1047[26]
  i1046.arc = i1047[27]
  i1046.arcMode = i1047[28]
  i1046.arcSpread = i1047[29]
  i1046.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[30], i1046.arcSpeed)
  i1046.donutRadius = i1047[31]
  i1046.position = new pc.Vec3( i1047[32], i1047[33], i1047[34] )
  i1046.rotation = new pc.Vec3( i1047[35], i1047[36], i1047[37] )
  i1046.scale = new pc.Vec3( i1047[38], i1047[39], i1047[40] )
  return i1046
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i1048 = root || new pc.ParticleSystemSizeBySpeed()
  var i1049 = data
  i1048.enabled = !!i1049[0]
  i1048.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1049[1], i1048.x)
  i1048.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1049[2], i1048.y)
  i1048.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1049[3], i1048.z)
  i1048.separateAxes = !!i1049[4]
  i1048.range = new pc.Vec2( i1049[5], i1049[6] )
  return i1048
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i1050 = root || new pc.ParticleSystemSizeOverLifetime()
  var i1051 = data
  i1050.enabled = !!i1051[0]
  i1050.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1051[1], i1050.x)
  i1050.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1051[2], i1050.y)
  i1050.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1051[3], i1050.z)
  i1050.separateAxes = !!i1051[4]
  return i1050
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i1052 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i1053 = data
  i1052.enabled = !!i1053[0]
  i1052.mode = i1053[1]
  i1052.animation = i1053[2]
  i1052.numTilesX = i1053[3]
  i1052.numTilesY = i1053[4]
  i1052.useRandomRow = !!i1053[5]
  i1052.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1053[6], i1052.frameOverTime)
  i1052.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1053[7], i1052.startFrame)
  i1052.cycleCount = i1053[8]
  i1052.rowIndex = i1053[9]
  i1052.flipU = i1053[10]
  i1052.flipV = i1053[11]
  i1052.spriteCount = i1053[12]
  var i1055 = i1053[13]
  var i1054 = []
  for(var i = 0; i < i1055.length; i += 2) {
  request.r(i1055[i + 0], i1055[i + 1], 2, i1054, '')
  }
  i1052.sprites = i1054
  return i1052
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i1058 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i1059 = data
  i1058.enabled = !!i1059[0]
  i1058.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[1], i1058.x)
  i1058.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[2], i1058.y)
  i1058.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[3], i1058.z)
  i1058.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[4], i1058.radial)
  i1058.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[5], i1058.speedModifier)
  i1058.space = i1059[6]
  i1058.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[7], i1058.orbitalX)
  i1058.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[8], i1058.orbitalY)
  i1058.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[9], i1058.orbitalZ)
  i1058.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[10], i1058.orbitalOffsetX)
  i1058.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[11], i1058.orbitalOffsetY)
  i1058.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1059[12], i1058.orbitalOffsetZ)
  return i1058
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i1060 = root || new pc.ParticleSystemNoise()
  var i1061 = data
  i1060.enabled = !!i1061[0]
  i1060.separateAxes = !!i1061[1]
  i1060.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[2], i1060.strengthX)
  i1060.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[3], i1060.strengthY)
  i1060.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[4], i1060.strengthZ)
  i1060.frequency = i1061[5]
  i1060.damping = !!i1061[6]
  i1060.octaveCount = i1061[7]
  i1060.octaveMultiplier = i1061[8]
  i1060.octaveScale = i1061[9]
  i1060.quality = i1061[10]
  i1060.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[11], i1060.scrollSpeed)
  i1060.scrollSpeedMultiplier = i1061[12]
  i1060.remapEnabled = !!i1061[13]
  i1060.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[14], i1060.remapX)
  i1060.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[15], i1060.remapY)
  i1060.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[16], i1060.remapZ)
  i1060.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[17], i1060.positionAmount)
  i1060.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[18], i1060.rotationAmount)
  i1060.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1061[19], i1060.sizeAmount)
  return i1060
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i1062 = root || new pc.ParticleSystemInheritVelocity()
  var i1063 = data
  i1062.enabled = !!i1063[0]
  i1062.mode = i1063[1]
  i1062.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1063[2], i1062.curve)
  return i1062
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i1064 = root || new pc.ParticleSystemForceOverLifetime()
  var i1065 = data
  i1064.enabled = !!i1065[0]
  i1064.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1065[1], i1064.x)
  i1064.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1065[2], i1064.y)
  i1064.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1065[3], i1064.z)
  i1064.space = i1065[4]
  i1064.randomized = !!i1065[5]
  return i1064
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i1066 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i1067 = data
  i1066.enabled = !!i1067[0]
  i1066.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1067[1], i1066.limit)
  i1066.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1067[2], i1066.limitX)
  i1066.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1067[3], i1066.limitY)
  i1066.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1067[4], i1066.limitZ)
  i1066.dampen = i1067[5]
  i1066.separateAxes = !!i1067[6]
  i1066.space = i1067[7]
  i1066.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1067[8], i1066.drag)
  i1066.multiplyDragByParticleSize = !!i1067[9]
  i1066.multiplyDragByParticleVelocity = !!i1067[10]
  return i1066
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i1068 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i1069 = data
  request.r(i1069[0], i1069[1], 0, i1068, 'mesh')
  i1068.meshCount = i1069[2]
  i1068.activeVertexStreamsCount = i1069[3]
  i1068.alignment = i1069[4]
  i1068.renderMode = i1069[5]
  i1068.sortMode = i1069[6]
  i1068.lengthScale = i1069[7]
  i1068.velocityScale = i1069[8]
  i1068.cameraVelocityScale = i1069[9]
  i1068.normalDirection = i1069[10]
  i1068.sortingFudge = i1069[11]
  i1068.minParticleSize = i1069[12]
  i1068.maxParticleSize = i1069[13]
  i1068.pivot = new pc.Vec3( i1069[14], i1069[15], i1069[16] )
  request.r(i1069[17], i1069[18], 0, i1068, 'trailMaterial')
  i1068.applyActiveColorSpace = !!i1069[19]
  i1068.enabled = !!i1069[20]
  request.r(i1069[21], i1069[22], 0, i1068, 'sharedMaterial')
  var i1071 = i1069[23]
  var i1070 = []
  for(var i = 0; i < i1071.length; i += 2) {
  request.r(i1071[i + 0], i1071[i + 1], 2, i1070, '')
  }
  i1068.sharedMaterials = i1070
  i1068.receiveShadows = !!i1069[24]
  i1068.shadowCastingMode = i1069[25]
  i1068.sortingLayerID = i1069[26]
  i1068.sortingOrder = i1069[27]
  i1068.lightmapIndex = i1069[28]
  i1068.lightmapSceneIndex = i1069[29]
  i1068.lightmapScaleOffset = new pc.Vec4( i1069[30], i1069[31], i1069[32], i1069[33] )
  i1068.lightProbeUsage = i1069[34]
  i1068.reflectionProbeUsage = i1069[35]
  return i1068
}

Deserializers["Coffee.UIExtensions.UIParticle"] = function (request, data, root) {
  var i1072 = root || request.c( 'Coffee.UIExtensions.UIParticle' )
  var i1073 = data
  i1072.m_IsTrail = !!i1073[0]
  i1072.m_IgnoreCanvasScaler = !!i1073[1]
  i1072.m_AbsoluteMode = !!i1073[2]
  i1072.m_Scale3D = new pc.Vec3( i1073[3], i1073[4], i1073[5] )
  var i1075 = i1073[6]
  var i1074 = []
  for(var i = 0; i < i1075.length; i += 1) {
    i1074.push( request.d('Coffee.UIExtensions.AnimatableProperty', i1075[i + 0]) );
  }
  i1072.m_AnimatableProperties = i1074
  var i1077 = i1073[7]
  var i1076 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.ParticleSystem')))
  for(var i = 0; i < i1077.length; i += 2) {
  request.r(i1077[i + 0], i1077[i + 1], 1, i1076, '')
  }
  i1072.m_Particles = i1076
  i1072.m_MeshSharing = i1073[8]
  i1072.m_GroupId = i1073[9]
  i1072.m_GroupMaxId = i1073[10]
  i1072.m_PositionMode = i1073[11]
  i1072.m_AutoScaling = !!i1073[12]
  i1072.m_AutoScalingMode = i1073[13]
  i1072.m_UseCustomView = !!i1073[14]
  i1072.m_CustomViewSize = i1073[15]
  i1072.m_TimeScaleMultiplier = i1073[16]
  i1072.m_Maskable = !!i1073[17]
  request.r(i1073[18], i1073[19], 0, i1072, 'm_Material')
  i1072.m_Color = new pc.Color(i1073[20], i1073[21], i1073[22], i1073[23])
  i1072.m_RaycastTarget = !!i1073[24]
  i1072.m_RaycastPadding = new pc.Vec4( i1073[25], i1073[26], i1073[27], i1073[28] )
  return i1072
}

Deserializers["Coffee.UIExtensions.AnimatableProperty"] = function (request, data, root) {
  var i1080 = root || request.c( 'Coffee.UIExtensions.AnimatableProperty' )
  var i1081 = data
  i1080.m_Name = i1081[0]
  i1080.m_Type = i1081[1]
  return i1080
}

Deserializers["EmojiSlot"] = function (request, data, root) {
  var i1084 = root || request.c( 'EmojiSlot' )
  var i1085 = data
  request.r(i1085[0], i1085[1], 0, i1084, 'emojiPrefab')
  return i1084
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i1086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i1087 = data
  request.r(i1087[0], i1087[1], 0, i1086, 'animatorController')
  request.r(i1087[2], i1087[3], 0, i1086, 'avatar')
  i1086.updateMode = i1087[4]
  i1086.hasTransformHierarchy = !!i1087[5]
  i1086.applyRootMotion = !!i1087[6]
  var i1089 = i1087[7]
  var i1088 = []
  for(var i = 0; i < i1089.length; i += 2) {
  request.r(i1089[i + 0], i1089[i + 1], 2, i1088, '')
  }
  i1086.humanBones = i1088
  i1086.enabled = !!i1087[8]
  return i1086
}

Deserializers["Smiles.ParentFitter"] = function (request, data, root) {
  var i1092 = root || request.c( 'Smiles.ParentFitter' )
  var i1093 = data
  return i1092
}

Deserializers["PopupLose"] = function (request, data, root) {
  var i1094 = root || request.c( 'PopupLose' )
  var i1095 = data
  var i1097 = i1095[0]
  var i1096 = []
  for(var i = 0; i < i1097.length; i += 1) {
    i1096.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i1097[i + 0]) );
  }
  i1094.openTween = i1096
  var i1099 = i1095[1]
  var i1098 = []
  for(var i = 0; i < i1099.length; i += 1) {
    i1098.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i1099[i + 0]) );
  }
  i1094.closeTween = i1098
  i1094.keepCached = !!i1095[2]
  i1094.pauseGame = !!i1095[3]
  i1094.ignoreTracking = !!i1095[4]
  request.r(i1095[5], i1095[6], 0, i1094, 'txtTitle')
  request.r(i1095[7], i1095[8], 0, i1094, 'txtReason')
  request.r(i1095[9], i1095[10], 0, i1094, 'btnAds')
  request.r(i1095[11], i1095[12], 0, i1094, 'txtBtnAds')
  request.r(i1095[13], i1095[14], 0, i1094, 'btnRetry')
  i1094.showNative = !!i1095[15]
  i1094.trackingName = i1095[16]
  return i1094
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1100 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1101 = data
  i1100.center = new pc.Vec3( i1101[0], i1101[1], i1101[2] )
  i1100.size = new pc.Vec3( i1101[3], i1101[4], i1101[5] )
  i1100.enabled = !!i1101[6]
  i1100.isTrigger = !!i1101[7]
  request.r(i1101[8], i1101[9], 0, i1100, 'material')
  return i1100
}

Deserializers["DualDirectionEffect"] = function (request, data, root) {
  var i1102 = root || request.c( 'DualDirectionEffect' )
  var i1103 = data
  var i1105 = i1103[0]
  var i1104 = []
  for(var i = 0; i < i1105.length; i += 2) {
  request.r(i1105[i + 0], i1105[i + 1], 2, i1104, '')
  }
  i1102._renderers = i1104
  var i1107 = i1103[1]
  var i1106 = []
  for(var i = 0; i < i1107.length; i += 2) {
  request.r(i1107[i + 0], i1107[i + 1], 2, i1106, '')
  }
  i1102.particleSystems = i1106
  return i1102
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1112 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1113 = data
  i1112.name = i1113[0]
  i1112.atlasId = i1113[1]
  i1112.mipmapCount = i1113[2]
  i1112.hdr = !!i1113[3]
  i1112.size = i1113[4]
  i1112.anisoLevel = i1113[5]
  i1112.filterMode = i1113[6]
  var i1115 = i1113[7]
  var i1114 = []
  for(var i = 0; i < i1115.length; i += 4) {
    i1114.push( UnityEngine.Rect.MinMaxRect(i1115[i + 0], i1115[i + 1], i1115[i + 2], i1115[i + 3]) );
  }
  i1112.rects = i1114
  i1112.wrapU = i1113[8]
  i1112.wrapV = i1113[9]
  return i1112
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1118 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1119 = data
  i1118.name = i1119[0]
  i1118.index = i1119[1]
  i1118.startup = !!i1119[2]
  return i1118
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1120 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1121 = data
  i1120.aspect = i1121[0]
  i1120.orthographic = !!i1121[1]
  i1120.orthographicSize = i1121[2]
  i1120.backgroundColor = new pc.Color(i1121[3], i1121[4], i1121[5], i1121[6])
  i1120.nearClipPlane = i1121[7]
  i1120.farClipPlane = i1121[8]
  i1120.fieldOfView = i1121[9]
  i1120.depth = i1121[10]
  i1120.clearFlags = i1121[11]
  i1120.cullingMask = i1121[12]
  i1120.rect = i1121[13]
  request.r(i1121[14], i1121[15], 0, i1120, 'targetTexture')
  i1120.usePhysicalProperties = !!i1121[16]
  i1120.focalLength = i1121[17]
  i1120.sensorSize = new pc.Vec2( i1121[18], i1121[19] )
  i1120.lensShift = new pc.Vec2( i1121[20], i1121[21] )
  i1120.gateFit = i1121[22]
  i1120.commandBufferCount = i1121[23]
  i1120.cameraType = i1121[24]
  i1120.enabled = !!i1121[25]
  return i1120
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalCameraData"] = function (request, data, root) {
  var i1122 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalCameraData' )
  var i1123 = data
  i1122.m_RenderShadows = !!i1123[0]
  i1122.m_RequiresDepthTextureOption = i1123[1]
  i1122.m_RequiresOpaqueTextureOption = i1123[2]
  i1122.m_CameraType = i1123[3]
  var i1125 = i1123[4]
  var i1124 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Camera')))
  for(var i = 0; i < i1125.length; i += 2) {
  request.r(i1125[i + 0], i1125[i + 1], 1, i1124, '')
  }
  i1122.m_Cameras = i1124
  i1122.m_RendererIndex = i1123[5]
  i1122.m_VolumeLayerMask = UnityEngine.LayerMask.FromIntegerValue( i1123[6] )
  request.r(i1123[7], i1123[8], 0, i1122, 'm_VolumeTrigger')
  i1122.m_VolumeFrameworkUpdateModeOption = i1123[9]
  i1122.m_RenderPostProcessing = !!i1123[10]
  i1122.m_Antialiasing = i1123[11]
  i1122.m_AntialiasingQuality = i1123[12]
  i1122.m_StopNaN = !!i1123[13]
  i1122.m_Dithering = !!i1123[14]
  i1122.m_ClearDepth = !!i1123[15]
  i1122.m_AllowXRRendering = !!i1123[16]
  i1122.m_AllowHDROutput = !!i1123[17]
  i1122.m_UseScreenCoordOverride = !!i1123[18]
  i1122.m_ScreenSizeOverride = new pc.Vec4( i1123[19], i1123[20], i1123[21], i1123[22] )
  i1122.m_ScreenCoordScaleBias = new pc.Vec4( i1123[23], i1123[24], i1123[25], i1123[26] )
  i1122.m_RequiresDepthTexture = !!i1123[27]
  i1122.m_RequiresColorTexture = !!i1123[28]
  i1122.m_Version = i1123[29]
  i1122.m_TaaSettings = request.d('UnityEngine.Rendering.Universal.TemporalAA+Settings', i1123[30], i1122.m_TaaSettings)
  return i1122
}

Deserializers["UnityEngine.Rendering.Universal.TemporalAA+Settings"] = function (request, data, root) {
  var i1128 = root || request.c( 'UnityEngine.Rendering.Universal.TemporalAA+Settings' )
  var i1129 = data
  i1128.m_Quality = i1129[0]
  i1128.m_FrameInfluence = i1129[1]
  i1128.m_JitterScale = i1129[2]
  i1128.m_MipBias = i1129[3]
  i1128.m_VarianceClampScale = i1129[4]
  i1128.m_ContrastAdaptiveSharpening = i1129[5]
  return i1128
}

Deserializers["CameraResponsive"] = function (request, data, root) {
  var i1130 = root || request.c( 'CameraResponsive' )
  var i1131 = data
  i1130.orthoSizeV = i1131[0]
  i1130.orthoSizeVTall = i1131[1]
  i1130.orthoSizeH = i1131[2]
  i1130.orthoSizeTab = i1131[3]
  return i1130
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1132 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1133 = data
  i1132.type = i1133[0]
  i1132.color = new pc.Color(i1133[1], i1133[2], i1133[3], i1133[4])
  i1132.cullingMask = i1133[5]
  i1132.intensity = i1133[6]
  i1132.range = i1133[7]
  i1132.spotAngle = i1133[8]
  i1132.shadows = i1133[9]
  i1132.shadowNormalBias = i1133[10]
  i1132.shadowBias = i1133[11]
  i1132.shadowStrength = i1133[12]
  i1132.shadowResolution = i1133[13]
  i1132.lightmapBakeType = i1133[14]
  i1132.renderMode = i1133[15]
  request.r(i1133[16], i1133[17], 0, i1132, 'cookie')
  i1132.cookieSize = i1133[18]
  i1132.enabled = !!i1133[19]
  return i1132
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i1134 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i1135 = data
  i1134.m_Version = i1135[0]
  i1134.m_UsePipelineSettings = !!i1135[1]
  i1134.m_AdditionalLightsShadowResolutionTier = i1135[2]
  i1134.m_LightLayerMask = i1135[3]
  i1134.m_RenderingLayers = i1135[4]
  i1134.m_CustomShadowLayers = !!i1135[5]
  i1134.m_ShadowLayerMask = i1135[6]
  i1134.m_ShadowRenderingLayers = i1135[7]
  i1134.m_LightCookieSize = new pc.Vec2( i1135[8], i1135[9] )
  i1134.m_LightCookieOffset = new pc.Vec2( i1135[10], i1135[11] )
  i1134.m_SoftShadowQuality = i1135[12]
  return i1134
}

Deserializers["TowerHeightController"] = function (request, data, root) {
  var i1136 = root || request.c( 'TowerHeightController' )
  var i1137 = data
  return i1136
}

Deserializers["TowerController"] = function (request, data, root) {
  var i1138 = root || request.c( 'TowerController' )
  var i1139 = data
  request.r(i1139[0], i1139[1], 0, i1138, 'spawner')
  request.r(i1139[2], i1139[3], 0, i1138, 'rotator')
  request.r(i1139[4], i1139[5], 0, i1138, 'towerContainer')
  request.r(i1139[6], i1139[7], 0, i1138, 'activeBlock')
  request.r(i1139[8], i1139[9], 0, i1138, 'heightController')
  request.r(i1139[10], i1139[11], 0, i1138, 'limitLine')
  return i1138
}

Deserializers["TowerRotator"] = function (request, data, root) {
  var i1140 = root || request.c( 'TowerRotator' )
  var i1141 = data
  return i1140
}

Deserializers["BlockSpawner"] = function (request, data, root) {
  var i1142 = root || request.c( 'BlockSpawner' )
  var i1143 = data
  return i1142
}

Deserializers["GhostBlockController"] = function (request, data, root) {
  var i1144 = root || request.c( 'GhostBlockController' )
  var i1145 = data
  request.r(i1145[0], i1145[1], 0, i1144, 'CurrentShape')
  request.r(i1145[2], i1145[3], 0, i1144, 'cellPrefab')
  request.r(i1145[4], i1145[5], 0, i1144, 'meshLibrary')
  var i1147 = i1145[6]
  var i1146 = new (System.Collections.Generic.List$1(Bridge.ns('BlockVisual')))
  for(var i = 0; i < i1147.length; i += 2) {
  request.r(i1147[i + 0], i1147[i + 1], 1, i1146, '')
  }
  i1144.blockVisuals = i1146
  request.r(i1145[7], i1145[8], 0, i1144, 'palette')
  return i1144
}

Deserializers["ActiveBlockController"] = function (request, data, root) {
  var i1150 = root || request.c( 'ActiveBlockController' )
  var i1151 = data
  request.r(i1151[0], i1151[1], 0, i1150, 'CurrentShape')
  request.r(i1151[2], i1151[3], 0, i1150, 'cellPrefab')
  request.r(i1151[4], i1151[5], 0, i1150, 'meshLibrary')
  var i1153 = i1151[6]
  var i1152 = new (System.Collections.Generic.List$1(Bridge.ns('BlockVisual')))
  for(var i = 0; i < i1153.length; i += 2) {
  request.r(i1153[i + 0], i1153[i + 1], 1, i1152, '')
  }
  i1150.blockVisuals = i1152
  i1150.faceSwitchThreshold = i1151[7]
  request.r(i1151[8], i1151[9], 0, i1150, 'floodIcon')
  return i1150
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1154 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1155 = data
  i1154.m_UiScaleMode = i1155[0]
  i1154.m_ReferencePixelsPerUnit = i1155[1]
  i1154.m_ScaleFactor = i1155[2]
  i1154.m_ReferenceResolution = new pc.Vec2( i1155[3], i1155[4] )
  i1154.m_ScreenMatchMode = i1155[5]
  i1154.m_MatchWidthOrHeight = i1155[6]
  i1154.m_PhysicalUnit = i1155[7]
  i1154.m_FallbackScreenDPI = i1155[8]
  i1154.m_DefaultSpriteDPI = i1155[9]
  i1154.m_DynamicPixelsPerUnit = i1155[10]
  i1154.m_PresetInfoIsWorld = !!i1155[11]
  return i1154
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1156 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1157 = data
  i1156.m_IgnoreReversedGraphics = !!i1157[0]
  i1156.m_BlockingObjects = i1157[1]
  i1156.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1157[2] )
  return i1156
}

Deserializers["SonatFramework.Scripts.UIModule.SafeArea"] = function (request, data, root) {
  var i1158 = root || request.c( 'SonatFramework.Scripts.UIModule.SafeArea' )
  var i1159 = data
  i1158.ConformX = !!i1159[0]
  i1158.ConformY = !!i1159[1]
  i1158.topIg = i1159[2]
  i1158.Logging = !!i1159[3]
  return i1158
}

Deserializers["GameHUD"] = function (request, data, root) {
  var i1160 = root || request.c( 'GameHUD' )
  var i1161 = data
  request.r(i1161[0], i1161[1], 0, i1160, 'levelText')
  request.r(i1161[2], i1161[3], 0, i1160, 'scoreText')
  request.r(i1161[4], i1161[5], 0, i1160, 'scoreFillImage')
  return i1160
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut"] = function (request, data, root) {
  var i1162 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut' )
  var i1163 = data
  i1162.panelOpenName = i1163[0]
  i1162.tracking = i1163[1]
  return i1162
}

Deserializers["ButtonRestart"] = function (request, data, root) {
  var i1164 = root || request.c( 'ButtonRestart' )
  var i1165 = data
  return i1164
}

Deserializers["NextBlockUI"] = function (request, data, root) {
  var i1166 = root || request.c( 'NextBlockUI' )
  var i1167 = data
  request.r(i1167[0], i1167[1], 0, i1166, 'blockImage')
  request.r(i1167[2], i1167[3], 0, i1166, 'slideDirectionIcon')
  return i1166
}

Deserializers["FloodProgressUI"] = function (request, data, root) {
  var i1168 = root || request.c( 'FloodProgressUI' )
  var i1169 = data
  request.r(i1169[0], i1169[1], 0, i1168, 'fillImage')
  request.r(i1169[2], i1169[3], 0, i1168, 'canvasGroup')
  i1168.fillDuration = i1169[4]
  i1168.hideDelay = i1169[5]
  return i1168
}

Deserializers["TimerUI"] = function (request, data, root) {
  var i1170 = root || request.c( 'TimerUI' )
  var i1171 = data
  request.r(i1171[0], i1171[1], 0, i1170, 'timerText')
  request.r(i1171[2], i1171[3], 0, i1170, 'containerImage')
  i1170.flashDuration = i1171[4]
  i1170.maxSaturation = i1171[5]
  i1170.urgentThreshold = i1171[6]
  i1170.urgentTextColor = new pc.Color(i1171[7], i1171[8], i1171[9], i1171[10])
  return i1170
}

Deserializers["BtnNoAds"] = function (request, data, root) {
  var i1172 = root || request.c( 'BtnNoAds' )
  var i1173 = data
  return i1172
}

Deserializers["RotateButtonHandler"] = function (request, data, root) {
  var i1174 = root || request.c( 'RotateButtonHandler' )
  var i1175 = data
  i1174.direction = i1175[0]
  return i1174
}

Deserializers["RotateLoadingIndicator"] = function (request, data, root) {
  var i1176 = root || request.c( 'RotateLoadingIndicator' )
  var i1177 = data
  i1176._direction = i1177[0]
  return i1176
}

Deserializers["GameHistorySystem"] = function (request, data, root) {
  var i1178 = root || request.c( 'GameHistorySystem' )
  var i1179 = data
  i1178.snapshotCount = i1179[0]
  return i1178
}

Deserializers["UIBoosterUndo"] = function (request, data, root) {
  var i1180 = root || request.c( 'UIBoosterUndo' )
  var i1181 = data
  i1180.countPerLevel = i1181[0]
  i1180.boosterType = i1181[1]
  i1180.unlockLevel = i1181[2]
  request.r(i1181[3], i1181[4], 0, i1180, 'button')
  request.r(i1181[5], i1181[6], 0, i1180, 'txtCount')
  request.r(i1181[7], i1181[8], 0, i1180, 'normalIcon')
  request.r(i1181[9], i1181[10], 0, i1180, 'adsIcon')
  return i1180
}

Deserializers["UnityEngine.UI.LayoutElement"] = function (request, data, root) {
  var i1182 = root || request.c( 'UnityEngine.UI.LayoutElement' )
  var i1183 = data
  i1182.m_IgnoreLayout = !!i1183[0]
  i1182.m_MinWidth = i1183[1]
  i1182.m_MinHeight = i1183[2]
  i1182.m_PreferredWidth = i1183[3]
  i1182.m_PreferredHeight = i1183[4]
  i1182.m_FlexibleWidth = i1183[5]
  i1182.m_FlexibleHeight = i1183[6]
  i1182.m_LayoutPriority = i1183[7]
  return i1182
}

Deserializers["SonatFramework.Scripts.UIModule.PanelManager"] = function (request, data, root) {
  var i1184 = root || request.c( 'SonatFramework.Scripts.UIModule.PanelManager' )
  var i1185 = data
  i1184.OnPanelsUpdated = request.d('System.Action', i1185[0], i1184.OnPanelsUpdated)
  return i1184
}

Deserializers["TextScale"] = function (request, data, root) {
  var i1186 = root || request.c( 'TextScale' )
  var i1187 = data
  i1186.scaleUp = i1187[0]
  i1186.duration = i1187[1]
  return i1186
}

Deserializers["GameManager"] = function (request, data, root) {
  var i1188 = root || request.c( 'GameManager' )
  var i1189 = data
  request.r(i1189[0], i1189[1], 0, i1188, 'ecWin')
  request.r(i1189[2], i1189[3], 0, i1188, 'ecLose')
  i1188.isGameWin = !!i1189[4]
  request.r(i1189[5], i1189[6], 0, i1188, 'CurrentLevelData')
  request.r(i1189[7], i1189[8], 0, i1188, 'manualLevelData')
  request.r(i1189[9], i1189[10], 0, i1188, 'gameConfig')
  i1188.CurrentLevelIndex = i1189[11]
  return i1188
}

Deserializers["CheatManager"] = function (request, data, root) {
  var i1190 = root || request.c( 'CheatManager' )
  var i1191 = data
  return i1190
}

Deserializers["GridManager"] = function (request, data, root) {
  var i1192 = root || request.c( 'GridManager' )
  var i1193 = data
  request.r(i1193[0], i1193[1], 0, i1192, 'config')
  request.r(i1193[2], i1193[3], 0, i1192, 'breakEffectPrefab')
  request.r(i1193[4], i1193[5], 0, i1192, 'meshLibrary')
  i1192.gridData = request.d('GridData', i1193[6], i1192.gridData)
  request.r(i1193[7], i1193[8], 0, i1192, 'vfx')
  return i1192
}

Deserializers["GridData"] = function (request, data, root) {
  var i1194 = root || request.c( 'GridData' )
  var i1195 = data
  return i1194
}

Deserializers["ScoreManager"] = function (request, data, root) {
  var i1196 = root || request.c( 'ScoreManager' )
  var i1197 = data
  return i1196
}

Deserializers["InputManager"] = function (request, data, root) {
  var i1198 = root || request.c( 'InputManager' )
  var i1199 = data
  request.r(i1199[0], i1199[1], 0, i1198, 'gameConfig')
  return i1198
}

Deserializers["Booster.HammerInputHandler"] = function (request, data, root) {
  var i1200 = root || request.c( 'Booster.HammerInputHandler' )
  var i1201 = data
  i1200.holdTimeToConfirm = i1201[0]
  request.r(i1201[1], i1201[2], 0, i1200, 'highlightMaterial')
  request.r(i1201[3], i1201[4], 0, i1200, 'mainCamera')
  return i1200
}

Deserializers["TimeManager"] = function (request, data, root) {
  var i1202 = root || request.c( 'TimeManager' )
  var i1203 = data
  request.r(i1203[0], i1203[1], 0, i1202, 'textTimer')
  request.r(i1203[2], i1203[3], 0, i1202, 'warningImage')
  i1202.startTime = i1203[4]
  i1202.timeWarning = i1203[5]
  return i1202
}

Deserializers["ObjectPoolManager"] = function (request, data, root) {
  var i1204 = root || request.c( 'ObjectPoolManager' )
  var i1205 = data
  return i1204
}

Deserializers["BlockFactory"] = function (request, data, root) {
  var i1206 = root || request.c( 'BlockFactory' )
  var i1207 = data
  request.r(i1207[0], i1207[1], 0, i1206, 'singleBlockPrefab')
  return i1206
}

Deserializers["AudioManager"] = function (request, data, root) {
  var i1208 = root || request.c( 'AudioManager' )
  var i1209 = data
  request.r(i1209[0], i1209[1], 0, i1208, 'bgmSource')
  request.r(i1209[2], i1209[3], 0, i1208, 'sfxSource')
  request.r(i1209[4], i1209[5], 0, i1208, 'bgm')
  request.r(i1209[6], i1209[7], 0, i1208, 'merge')
  request.r(i1209[8], i1209[9], 0, i1208, 'warning')
  request.r(i1209[10], i1209[11], 0, i1208, 'gameLose')
  request.r(i1209[12], i1209[13], 0, i1208, 'gameWin')
  return i1208
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1210 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1211 = data
  request.r(i1211[0], i1211[1], 0, i1210, 'clip')
  request.r(i1211[2], i1211[3], 0, i1210, 'outputAudioMixerGroup')
  i1210.playOnAwake = !!i1211[4]
  i1210.loop = !!i1211[5]
  i1210.time = i1211[6]
  i1210.volume = i1211[7]
  i1210.pitch = i1211[8]
  i1210.enabled = !!i1211[9]
  return i1210
}

Deserializers["Difficulty.DifficultyManager"] = function (request, data, root) {
  var i1212 = root || request.c( 'Difficulty.DifficultyManager' )
  var i1213 = data
  request.r(i1213[0], i1213[1], 0, i1212, 'defaultConfig')
  request.r(i1213[2], i1213[3], 0, i1212, 'defaultShapePool')
  return i1212
}

Deserializers["TutorialManager"] = function (request, data, root) {
  var i1214 = root || request.c( 'TutorialManager' )
  var i1215 = data
  request.r(i1215[0], i1215[1], 0, i1214, 'textTutorial')
  request.r(i1215[2], i1215[3], 0, i1214, 'handTutorial')
  request.r(i1215[4], i1215[5], 0, i1214, 'tut')
  i1214.scaleUp = i1215[6]
  i1214.duration = i1215[7]
  i1214.moveDistance = i1215[8]
  i1214.moveDuration = i1215[9]
  return i1214
}

Deserializers["ResponsiveManager"] = function (request, data, root) {
  var i1216 = root || request.c( 'ResponsiveManager' )
  var i1217 = data
  i1216.screenType = i1217[0]
  return i1216
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1218 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1219 = data
  request.r(i1219[0], i1219[1], 0, i1218, 'm_FirstSelected')
  i1218.m_sendNavigationEvents = !!i1219[2]
  i1218.m_DragThreshold = i1219[3]
  return i1218
}

Deserializers["UnityEngine.InputSystem.UI.InputSystemUIInputModule"] = function (request, data, root) {
  var i1220 = root || request.c( 'UnityEngine.InputSystem.UI.InputSystemUIInputModule' )
  var i1221 = data
  i1220.m_MoveRepeatDelay = i1221[0]
  i1220.m_MoveRepeatRate = i1221[1]
  request.r(i1221[2], i1221[3], 0, i1220, 'm_XRTrackingOrigin')
  request.r(i1221[4], i1221[5], 0, i1220, 'm_ActionsAsset')
  request.r(i1221[6], i1221[7], 0, i1220, 'm_PointAction')
  request.r(i1221[8], i1221[9], 0, i1220, 'm_MoveAction')
  request.r(i1221[10], i1221[11], 0, i1220, 'm_SubmitAction')
  request.r(i1221[12], i1221[13], 0, i1220, 'm_CancelAction')
  request.r(i1221[14], i1221[15], 0, i1220, 'm_LeftClickAction')
  request.r(i1221[16], i1221[17], 0, i1220, 'm_MiddleClickAction')
  request.r(i1221[18], i1221[19], 0, i1220, 'm_RightClickAction')
  request.r(i1221[20], i1221[21], 0, i1220, 'm_ScrollWheelAction')
  request.r(i1221[22], i1221[23], 0, i1220, 'm_TrackedDevicePositionAction')
  request.r(i1221[24], i1221[25], 0, i1220, 'm_TrackedDeviceOrientationAction')
  i1220.m_DeselectOnBackgroundClick = !!i1221[26]
  i1220.m_PointerBehavior = i1221[27]
  i1220.m_CursorLockBehavior = i1221[28]
  i1220.m_ScrollDeltaPerTick = i1221[29]
  i1220.m_SendPointerHoverToParent = !!i1221[30]
  return i1220
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1223 = data
  i1222.ambientIntensity = i1223[0]
  i1222.reflectionIntensity = i1223[1]
  i1222.ambientMode = i1223[2]
  i1222.ambientLight = new pc.Color(i1223[3], i1223[4], i1223[5], i1223[6])
  i1222.ambientSkyColor = new pc.Color(i1223[7], i1223[8], i1223[9], i1223[10])
  i1222.ambientGroundColor = new pc.Color(i1223[11], i1223[12], i1223[13], i1223[14])
  i1222.ambientEquatorColor = new pc.Color(i1223[15], i1223[16], i1223[17], i1223[18])
  i1222.fogColor = new pc.Color(i1223[19], i1223[20], i1223[21], i1223[22])
  i1222.fogEndDistance = i1223[23]
  i1222.fogStartDistance = i1223[24]
  i1222.fogDensity = i1223[25]
  i1222.fog = !!i1223[26]
  request.r(i1223[27], i1223[28], 0, i1222, 'skybox')
  i1222.fogMode = i1223[29]
  var i1225 = i1223[30]
  var i1224 = []
  for(var i = 0; i < i1225.length; i += 1) {
    i1224.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1225[i + 0]) );
  }
  i1222.lightmaps = i1224
  i1222.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1223[31], i1222.lightProbes)
  i1222.lightmapsMode = i1223[32]
  i1222.mixedBakeMode = i1223[33]
  i1222.environmentLightingMode = i1223[34]
  i1222.ambientProbe = new pc.SphericalHarmonicsL2(i1223[35])
  i1222.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i1223[36])
  i1222.useReferenceAmbientProbe = !!i1223[37]
  request.r(i1223[38], i1223[39], 0, i1222, 'customReflection')
  request.r(i1223[40], i1223[41], 0, i1222, 'defaultReflection')
  i1222.defaultReflectionMode = i1223[42]
  i1222.defaultReflectionResolution = i1223[43]
  i1222.sunLightObjectId = i1223[44]
  i1222.pixelLightCount = i1223[45]
  i1222.defaultReflectionHDR = !!i1223[46]
  i1222.hasLightDataAsset = !!i1223[47]
  i1222.hasManualGenerate = !!i1223[48]
  return i1222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1228 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1229 = data
  request.r(i1229[0], i1229[1], 0, i1228, 'lightmapColor')
  request.r(i1229[2], i1229[3], 0, i1228, 'lightmapDirection')
  return i1228
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1230 = root || new UnityEngine.LightProbes()
  var i1231 = data
  return i1230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1239 = data
  var i1241 = i1239[0]
  var i1240 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1241.length; i += 1) {
    i1240.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1241[i + 0]));
  }
  i1238.ShaderCompilationErrors = i1240
  i1238.name = i1239[1]
  i1238.guid = i1239[2]
  var i1243 = i1239[3]
  var i1242 = []
  for(var i = 0; i < i1243.length; i += 1) {
    i1242.push( i1243[i + 0] );
  }
  i1238.shaderDefinedKeywords = i1242
  var i1245 = i1239[4]
  var i1244 = []
  for(var i = 0; i < i1245.length; i += 1) {
    i1244.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1245[i + 0]) );
  }
  i1238.passes = i1244
  var i1247 = i1239[5]
  var i1246 = []
  for(var i = 0; i < i1247.length; i += 1) {
    i1246.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1247[i + 0]) );
  }
  i1238.usePasses = i1246
  var i1249 = i1239[6]
  var i1248 = []
  for(var i = 0; i < i1249.length; i += 1) {
    i1248.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1249[i + 0]) );
  }
  i1238.defaultParameterValues = i1248
  request.r(i1239[7], i1239[8], 0, i1238, 'unityFallbackShader')
  i1238.readDepth = !!i1239[9]
  i1238.isCreatedByShaderGraph = !!i1239[10]
  i1238.disableBatching = !!i1239[11]
  i1238.compiled = !!i1239[12]
  return i1238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1252 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1253 = data
  i1252.shaderName = i1253[0]
  i1252.errorMessage = i1253[1]
  return i1252
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1258 = root || new pc.UnityShaderPass()
  var i1259 = data
  i1258.id = i1259[0]
  i1258.subShaderIndex = i1259[1]
  i1258.name = i1259[2]
  i1258.passType = i1259[3]
  i1258.grabPassTextureName = i1259[4]
  i1258.usePass = !!i1259[5]
  i1258.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[6], i1258.zTest)
  i1258.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[7], i1258.zWrite)
  i1258.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[8], i1258.culling)
  i1258.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1259[9], i1258.blending)
  i1258.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1259[10], i1258.alphaBlending)
  i1258.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[11], i1258.colorWriteMask)
  i1258.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[12], i1258.offsetUnits)
  i1258.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[13], i1258.offsetFactor)
  i1258.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[14], i1258.stencilRef)
  i1258.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[15], i1258.stencilReadMask)
  i1258.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1259[16], i1258.stencilWriteMask)
  i1258.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1259[17], i1258.stencilOp)
  i1258.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1259[18], i1258.stencilOpFront)
  i1258.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1259[19], i1258.stencilOpBack)
  var i1261 = i1259[20]
  var i1260 = []
  for(var i = 0; i < i1261.length; i += 1) {
    i1260.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1261[i + 0]) );
  }
  i1258.tags = i1260
  var i1263 = i1259[21]
  var i1262 = []
  for(var i = 0; i < i1263.length; i += 1) {
    i1262.push( i1263[i + 0] );
  }
  i1258.passDefinedKeywords = i1262
  var i1265 = i1259[22]
  var i1264 = []
  for(var i = 0; i < i1265.length; i += 1) {
    i1264.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1265[i + 0]) );
  }
  i1258.passDefinedKeywordGroups = i1264
  var i1267 = i1259[23]
  var i1266 = []
  for(var i = 0; i < i1267.length; i += 1) {
    i1266.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1267[i + 0]) );
  }
  i1258.variants = i1266
  var i1269 = i1259[24]
  var i1268 = []
  for(var i = 0; i < i1269.length; i += 1) {
    i1268.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1269[i + 0]) );
  }
  i1258.excludedVariants = i1268
  i1258.hasDepthReader = !!i1259[25]
  return i1258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1270 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1271 = data
  i1270.val = i1271[0]
  i1270.name = i1271[1]
  return i1270
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1272 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1273 = data
  i1272.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1273[0], i1272.src)
  i1272.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1273[1], i1272.dst)
  i1272.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1273[2], i1272.op)
  return i1272
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1275 = data
  i1274.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1275[0], i1274.pass)
  i1274.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1275[1], i1274.fail)
  i1274.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1275[2], i1274.zFail)
  i1274.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1275[3], i1274.comp)
  return i1274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1279 = data
  i1278.name = i1279[0]
  i1278.value = i1279[1]
  return i1278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1282 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1283 = data
  var i1285 = i1283[0]
  var i1284 = []
  for(var i = 0; i < i1285.length; i += 1) {
    i1284.push( i1285[i + 0] );
  }
  i1282.keywords = i1284
  i1282.hasDiscard = !!i1283[1]
  return i1282
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1288 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1289 = data
  i1288.passId = i1289[0]
  i1288.subShaderIndex = i1289[1]
  var i1291 = i1289[2]
  var i1290 = []
  for(var i = 0; i < i1291.length; i += 1) {
    i1290.push( i1291[i + 0] );
  }
  i1288.keywords = i1290
  i1288.vertexProgram = i1289[3]
  i1288.fragmentProgram = i1289[4]
  i1288.exportedForWebGl2 = !!i1289[5]
  i1288.readDepth = !!i1289[6]
  return i1288
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1295 = data
  request.r(i1295[0], i1295[1], 0, i1294, 'shader')
  i1294.pass = i1295[2]
  return i1294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1299 = data
  i1298.name = i1299[0]
  i1298.type = i1299[1]
  i1298.value = new pc.Vec4( i1299[2], i1299[3], i1299[4], i1299[5] )
  i1298.textureValue = i1299[6]
  i1298.shaderPropertyFlag = i1299[7]
  return i1298
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1300 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1301 = data
  i1300.name = i1301[0]
  request.r(i1301[1], i1301[2], 0, i1300, 'texture')
  i1300.aabb = i1301[3]
  i1300.vertices = i1301[4]
  i1300.triangles = i1301[5]
  i1300.textureRect = UnityEngine.Rect.MinMaxRect(i1301[6], i1301[7], i1301[8], i1301[9])
  i1300.packedRect = UnityEngine.Rect.MinMaxRect(i1301[10], i1301[11], i1301[12], i1301[13])
  i1300.border = new pc.Vec4( i1301[14], i1301[15], i1301[16], i1301[17] )
  i1300.transparency = i1301[18]
  i1300.bounds = i1301[19]
  i1300.pixelsPerUnit = i1301[20]
  i1300.textureWidth = i1301[21]
  i1300.textureHeight = i1301[22]
  i1300.nativeSize = new pc.Vec2( i1301[23], i1301[24] )
  i1300.pivot = new pc.Vec2( i1301[25], i1301[26] )
  i1300.textureRectOffset = new pc.Vec2( i1301[27], i1301[28] )
  return i1300
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1303 = data
  i1302.name = i1303[0]
  return i1302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1305 = data
  i1304.name = i1305[0]
  i1304.wrapMode = i1305[1]
  i1304.isLooping = !!i1305[2]
  i1304.length = i1305[3]
  var i1307 = i1305[4]
  var i1306 = []
  for(var i = 0; i < i1307.length; i += 1) {
    i1306.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1307[i + 0]) );
  }
  i1304.curves = i1306
  var i1309 = i1305[5]
  var i1308 = []
  for(var i = 0; i < i1309.length; i += 1) {
    i1308.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1309[i + 0]) );
  }
  i1304.events = i1308
  i1304.halfPrecision = !!i1305[6]
  i1304._frameRate = i1305[7]
  i1304.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1305[8], i1304.localBounds)
  i1304.hasMuscleCurves = !!i1305[9]
  var i1311 = i1305[10]
  var i1310 = []
  for(var i = 0; i < i1311.length; i += 1) {
    i1310.push( i1311[i + 0] );
  }
  i1304.clipMuscleConstant = i1310
  i1304.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1305[11], i1304.clipBindingConstant)
  return i1304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1314 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1315 = data
  i1314.path = i1315[0]
  i1314.hash = i1315[1]
  i1314.componentType = i1315[2]
  i1314.property = i1315[3]
  i1314.keys = i1315[4]
  var i1317 = i1315[5]
  var i1316 = []
  for(var i = 0; i < i1317.length; i += 1) {
    i1316.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1317[i + 0]) );
  }
  i1314.objectReferenceKeys = i1316
  return i1314
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1321 = data
  i1320.time = i1321[0]
  request.r(i1321[1], i1321[2], 0, i1320, 'value')
  return i1320
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1324 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1325 = data
  i1324.functionName = i1325[0]
  i1324.floatParameter = i1325[1]
  i1324.intParameter = i1325[2]
  i1324.stringParameter = i1325[3]
  request.r(i1325[4], i1325[5], 0, i1324, 'objectReferenceParameter')
  i1324.time = i1325[6]
  return i1324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1327 = data
  i1326.center = new pc.Vec3( i1327[0], i1327[1], i1327[2] )
  i1326.extends = new pc.Vec3( i1327[3], i1327[4], i1327[5] )
  return i1326
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1331 = data
  var i1333 = i1331[0]
  var i1332 = []
  for(var i = 0; i < i1333.length; i += 1) {
    i1332.push( i1333[i + 0] );
  }
  i1330.genericBindings = i1332
  var i1335 = i1331[1]
  var i1334 = []
  for(var i = 0; i < i1335.length; i += 1) {
    i1334.push( i1335[i + 0] );
  }
  i1330.pptrCurveMapping = i1334
  return i1330
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1336 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1337 = data
  i1336.name = i1337[0]
  i1336.ascent = i1337[1]
  i1336.originalLineHeight = i1337[2]
  i1336.fontSize = i1337[3]
  var i1339 = i1337[4]
  var i1338 = []
  for(var i = 0; i < i1339.length; i += 1) {
    i1338.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1339[i + 0]) );
  }
  i1336.characterInfo = i1338
  request.r(i1337[5], i1337[6], 0, i1336, 'texture')
  i1336.originalFontSize = i1337[7]
  return i1336
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1342 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1343 = data
  i1342.index = i1343[0]
  i1342.advance = i1343[1]
  i1342.bearing = i1343[2]
  i1342.glyphWidth = i1343[3]
  i1342.glyphHeight = i1343[4]
  i1342.minX = i1343[5]
  i1342.maxX = i1343[6]
  i1342.minY = i1343[7]
  i1342.maxY = i1343[8]
  i1342.uvBottomLeftX = i1343[9]
  i1342.uvBottomLeftY = i1343[10]
  i1342.uvBottomRightX = i1343[11]
  i1342.uvBottomRightY = i1343[12]
  i1342.uvTopLeftX = i1343[13]
  i1342.uvTopLeftY = i1343[14]
  i1342.uvTopRightX = i1343[15]
  i1342.uvTopRightY = i1343[16]
  return i1342
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i1344 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i1345 = data
  i1344.name = i1345[0]
  var i1347 = i1345[1]
  var i1346 = []
  for(var i = 0; i < i1347.length; i += 1) {
    i1346.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i1347[i + 0]) );
  }
  i1344.layers = i1346
  var i1349 = i1345[2]
  var i1348 = []
  for(var i = 0; i < i1349.length; i += 1) {
    i1348.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1349[i + 0]) );
  }
  i1344.parameters = i1348
  i1344.animationClips = i1345[3]
  i1344.avatarUnsupported = i1345[4]
  return i1344
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1352 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1353 = data
  i1352.name = i1353[0]
  i1352.defaultWeight = i1353[1]
  i1352.blendingMode = i1353[2]
  i1352.avatarMask = i1353[3]
  i1352.syncedLayerIndex = i1353[4]
  i1352.syncedLayerAffectsTiming = !!i1353[5]
  i1352.syncedLayers = i1353[6]
  i1352.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1353[7], i1352.stateMachine)
  return i1352
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1354 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1355 = data
  i1354.id = i1355[0]
  i1354.name = i1355[1]
  i1354.path = i1355[2]
  var i1357 = i1355[3]
  var i1356 = []
  for(var i = 0; i < i1357.length; i += 1) {
    i1356.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1357[i + 0]) );
  }
  i1354.states = i1356
  var i1359 = i1355[4]
  var i1358 = []
  for(var i = 0; i < i1359.length; i += 1) {
    i1358.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1359[i + 0]) );
  }
  i1354.machines = i1358
  var i1361 = i1355[5]
  var i1360 = []
  for(var i = 0; i < i1361.length; i += 1) {
    i1360.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1361[i + 0]) );
  }
  i1354.entryStateTransitions = i1360
  var i1363 = i1355[6]
  var i1362 = []
  for(var i = 0; i < i1363.length; i += 1) {
    i1362.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1363[i + 0]) );
  }
  i1354.exitStateTransitions = i1362
  var i1365 = i1355[7]
  var i1364 = []
  for(var i = 0; i < i1365.length; i += 1) {
    i1364.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1365[i + 0]) );
  }
  i1354.anyStateTransitions = i1364
  i1354.defaultStateId = i1355[8]
  return i1354
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1368 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1369 = data
  i1368.id = i1369[0]
  i1368.name = i1369[1]
  i1368.cycleOffset = i1369[2]
  i1368.cycleOffsetParameter = i1369[3]
  i1368.cycleOffsetParameterActive = !!i1369[4]
  i1368.mirror = !!i1369[5]
  i1368.mirrorParameter = i1369[6]
  i1368.mirrorParameterActive = !!i1369[7]
  i1368.motionId = i1369[8]
  i1368.nameHash = i1369[9]
  i1368.fullPathHash = i1369[10]
  i1368.speed = i1369[11]
  i1368.speedParameter = i1369[12]
  i1368.speedParameterActive = !!i1369[13]
  i1368.tag = i1369[14]
  i1368.tagHash = i1369[15]
  i1368.writeDefaultValues = !!i1369[16]
  var i1371 = i1369[17]
  var i1370 = []
  for(var i = 0; i < i1371.length; i += 2) {
  request.r(i1371[i + 0], i1371[i + 1], 2, i1370, '')
  }
  i1368.behaviours = i1370
  var i1373 = i1369[18]
  var i1372 = []
  for(var i = 0; i < i1373.length; i += 1) {
    i1372.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1373[i + 0]) );
  }
  i1368.transitions = i1372
  return i1368
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1378 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1379 = data
  i1378.fullPath = i1379[0]
  i1378.canTransitionToSelf = !!i1379[1]
  i1378.duration = i1379[2]
  i1378.exitTime = i1379[3]
  i1378.hasExitTime = !!i1379[4]
  i1378.hasFixedDuration = !!i1379[5]
  i1378.interruptionSource = i1379[6]
  i1378.offset = i1379[7]
  i1378.orderedInterruption = !!i1379[8]
  i1378.destinationStateId = i1379[9]
  i1378.isExit = !!i1379[10]
  i1378.mute = !!i1379[11]
  i1378.solo = !!i1379[12]
  var i1381 = i1379[13]
  var i1380 = []
  for(var i = 0; i < i1381.length; i += 1) {
    i1380.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1381[i + 0]) );
  }
  i1378.conditions = i1380
  return i1378
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1386 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1387 = data
  i1386.destinationStateId = i1387[0]
  i1386.isExit = !!i1387[1]
  i1386.mute = !!i1387[2]
  i1386.solo = !!i1387[3]
  var i1389 = i1387[4]
  var i1388 = []
  for(var i = 0; i < i1389.length; i += 1) {
    i1388.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1389[i + 0]) );
  }
  i1386.conditions = i1388
  return i1386
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1393 = data
  i1392.defaultBool = !!i1393[0]
  i1392.defaultFloat = i1393[1]
  i1392.defaultInt = i1393[2]
  i1392.name = i1393[3]
  i1392.nameHash = i1393[4]
  i1392.type = i1393[5]
  return i1392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1394 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1395 = data
  i1394.name = i1395[0]
  i1394.bytes64 = i1395[1]
  i1394.data = i1395[2]
  return i1394
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1396 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1397 = data
  request.r(i1397[0], i1397[1], 0, i1396, 'atlas')
  i1396.normalStyle = i1397[2]
  i1396.normalSpacingOffset = i1397[3]
  i1396.boldStyle = i1397[4]
  i1396.boldSpacing = i1397[5]
  i1396.italicStyle = i1397[6]
  i1396.tabSize = i1397[7]
  i1396.hashCode = i1397[8]
  request.r(i1397[9], i1397[10], 0, i1396, 'material')
  i1396.materialHashCode = i1397[11]
  i1396.m_Version = i1397[12]
  i1396.m_SourceFontFileGUID = i1397[13]
  request.r(i1397[14], i1397[15], 0, i1396, 'm_SourceFontFile_EditorRef')
  request.r(i1397[16], i1397[17], 0, i1396, 'm_SourceFontFile')
  i1396.m_AtlasPopulationMode = i1397[18]
  i1396.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1397[19], i1396.m_FaceInfo)
  var i1399 = i1397[20]
  var i1398 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1399.length; i += 1) {
    i1398.add(request.d('UnityEngine.TextCore.Glyph', i1399[i + 0]));
  }
  i1396.m_GlyphTable = i1398
  var i1401 = i1397[21]
  var i1400 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1401.length; i += 1) {
    i1400.add(request.d('TMPro.TMP_Character', i1401[i + 0]));
  }
  i1396.m_CharacterTable = i1400
  var i1403 = i1397[22]
  var i1402 = []
  for(var i = 0; i < i1403.length; i += 2) {
  request.r(i1403[i + 0], i1403[i + 1], 2, i1402, '')
  }
  i1396.m_AtlasTextures = i1402
  i1396.m_AtlasTextureIndex = i1397[23]
  i1396.m_IsMultiAtlasTexturesEnabled = !!i1397[24]
  i1396.m_ClearDynamicDataOnBuild = !!i1397[25]
  var i1405 = i1397[26]
  var i1404 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1405.length; i += 1) {
    i1404.add(request.d('UnityEngine.TextCore.GlyphRect', i1405[i + 0]));
  }
  i1396.m_UsedGlyphRects = i1404
  var i1407 = i1397[27]
  var i1406 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1407.length; i += 1) {
    i1406.add(request.d('UnityEngine.TextCore.GlyphRect', i1407[i + 0]));
  }
  i1396.m_FreeGlyphRects = i1406
  i1396.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1397[28], i1396.m_fontInfo)
  i1396.m_AtlasWidth = i1397[29]
  i1396.m_AtlasHeight = i1397[30]
  i1396.m_AtlasPadding = i1397[31]
  i1396.m_AtlasRenderMode = i1397[32]
  var i1409 = i1397[33]
  var i1408 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1409.length; i += 1) {
    i1408.add(request.d('TMPro.TMP_Glyph', i1409[i + 0]));
  }
  i1396.m_glyphInfoList = i1408
  i1396.m_KerningTable = request.d('TMPro.KerningTable', i1397[34], i1396.m_KerningTable)
  i1396.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1397[35], i1396.m_FontFeatureTable)
  var i1411 = i1397[36]
  var i1410 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1411.length; i += 2) {
  request.r(i1411[i + 0], i1411[i + 1], 1, i1410, '')
  }
  i1396.fallbackFontAssets = i1410
  var i1413 = i1397[37]
  var i1412 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1413.length; i += 2) {
  request.r(i1413[i + 0], i1413[i + 1], 1, i1412, '')
  }
  i1396.m_FallbackFontAssetTable = i1412
  i1396.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1397[38], i1396.m_CreationSettings)
  var i1415 = i1397[39]
  var i1414 = []
  for(var i = 0; i < i1415.length; i += 1) {
    i1414.push( request.d('TMPro.TMP_FontWeightPair', i1415[i + 0]) );
  }
  i1396.m_FontWeightTable = i1414
  var i1417 = i1397[40]
  var i1416 = []
  for(var i = 0; i < i1417.length; i += 1) {
    i1416.push( request.d('TMPro.TMP_FontWeightPair', i1417[i + 0]) );
  }
  i1396.fontWeights = i1416
  return i1396
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1418 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1419 = data
  i1418.m_FaceIndex = i1419[0]
  i1418.m_FamilyName = i1419[1]
  i1418.m_StyleName = i1419[2]
  i1418.m_PointSize = i1419[3]
  i1418.m_Scale = i1419[4]
  i1418.m_UnitsPerEM = i1419[5]
  i1418.m_LineHeight = i1419[6]
  i1418.m_AscentLine = i1419[7]
  i1418.m_CapLine = i1419[8]
  i1418.m_MeanLine = i1419[9]
  i1418.m_Baseline = i1419[10]
  i1418.m_DescentLine = i1419[11]
  i1418.m_SuperscriptOffset = i1419[12]
  i1418.m_SuperscriptSize = i1419[13]
  i1418.m_SubscriptOffset = i1419[14]
  i1418.m_SubscriptSize = i1419[15]
  i1418.m_UnderlineOffset = i1419[16]
  i1418.m_UnderlineThickness = i1419[17]
  i1418.m_StrikethroughOffset = i1419[18]
  i1418.m_StrikethroughThickness = i1419[19]
  i1418.m_TabWidth = i1419[20]
  return i1418
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1422 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1423 = data
  i1422.m_Index = i1423[0]
  i1422.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1423[1], i1422.m_Metrics)
  i1422.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1423[2], i1422.m_GlyphRect)
  i1422.m_Scale = i1423[3]
  i1422.m_AtlasIndex = i1423[4]
  i1422.m_ClassDefinitionType = i1423[5]
  return i1422
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1426 = root || request.c( 'TMPro.TMP_Character' )
  var i1427 = data
  i1426.m_ElementType = i1427[0]
  i1426.m_Unicode = i1427[1]
  i1426.m_GlyphIndex = i1427[2]
  i1426.m_Scale = i1427[3]
  return i1426
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1432 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1433 = data
  i1432.m_X = i1433[0]
  i1432.m_Y = i1433[1]
  i1432.m_Width = i1433[2]
  i1432.m_Height = i1433[3]
  return i1432
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1434 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1435 = data
  i1434.Name = i1435[0]
  i1434.PointSize = i1435[1]
  i1434.Scale = i1435[2]
  i1434.CharacterCount = i1435[3]
  i1434.LineHeight = i1435[4]
  i1434.Baseline = i1435[5]
  i1434.Ascender = i1435[6]
  i1434.CapHeight = i1435[7]
  i1434.Descender = i1435[8]
  i1434.CenterLine = i1435[9]
  i1434.SuperscriptOffset = i1435[10]
  i1434.SubscriptOffset = i1435[11]
  i1434.SubSize = i1435[12]
  i1434.Underline = i1435[13]
  i1434.UnderlineThickness = i1435[14]
  i1434.strikethrough = i1435[15]
  i1434.strikethroughThickness = i1435[16]
  i1434.TabWidth = i1435[17]
  i1434.Padding = i1435[18]
  i1434.AtlasWidth = i1435[19]
  i1434.AtlasHeight = i1435[20]
  return i1434
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1438 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1439 = data
  i1438.id = i1439[0]
  i1438.x = i1439[1]
  i1438.y = i1439[2]
  i1438.width = i1439[3]
  i1438.height = i1439[4]
  i1438.xOffset = i1439[5]
  i1438.yOffset = i1439[6]
  i1438.xAdvance = i1439[7]
  i1438.scale = i1439[8]
  return i1438
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1440 = root || request.c( 'TMPro.KerningTable' )
  var i1441 = data
  var i1443 = i1441[0]
  var i1442 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1443.length; i += 1) {
    i1442.add(request.d('TMPro.KerningPair', i1443[i + 0]));
  }
  i1440.kerningPairs = i1442
  return i1440
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1446 = root || request.c( 'TMPro.KerningPair' )
  var i1447 = data
  i1446.xOffset = i1447[0]
  i1446.m_FirstGlyph = i1447[1]
  i1446.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1447[2], i1446.m_FirstGlyphAdjustments)
  i1446.m_SecondGlyph = i1447[3]
  i1446.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1447[4], i1446.m_SecondGlyphAdjustments)
  i1446.m_IgnoreSpacingAdjustments = !!i1447[5]
  return i1446
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1448 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1449 = data
  var i1451 = i1449[0]
  var i1450 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1451.length; i += 1) {
    i1450.add(request.d('TMPro.TMP_GlyphPairAdjustmentRecord', i1451[i + 0]));
  }
  i1448.m_GlyphPairAdjustmentRecords = i1450
  return i1448
}

Deserializers["TMPro.TMP_GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1454 = root || request.c( 'TMPro.TMP_GlyphPairAdjustmentRecord' )
  var i1455 = data
  i1454.m_FirstAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i1455[0], i1454.m_FirstAdjustmentRecord)
  i1454.m_SecondAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i1455[1], i1454.m_SecondAdjustmentRecord)
  i1454.m_FeatureLookupFlags = i1455[2]
  return i1454
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1458 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1459 = data
  i1458.sourceFontFileName = i1459[0]
  i1458.sourceFontFileGUID = i1459[1]
  i1458.pointSizeSamplingMode = i1459[2]
  i1458.pointSize = i1459[3]
  i1458.padding = i1459[4]
  i1458.packingMode = i1459[5]
  i1458.atlasWidth = i1459[6]
  i1458.atlasHeight = i1459[7]
  i1458.characterSetSelectionMode = i1459[8]
  i1458.characterSequence = i1459[9]
  i1458.referencedFontAssetGUID = i1459[10]
  i1458.referencedTextAssetGUID = i1459[11]
  i1458.fontStyle = i1459[12]
  i1458.fontStyleModifier = i1459[13]
  i1458.renderMode = i1459[14]
  i1458.includeFontFeatures = !!i1459[15]
  return i1458
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1462 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1463 = data
  request.r(i1463[0], i1463[1], 0, i1462, 'regularTypeface')
  request.r(i1463[2], i1463[3], 0, i1462, 'italicTypeface')
  return i1462
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1464 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1465 = data
  i1464.m_Width = i1465[0]
  i1464.m_Height = i1465[1]
  i1464.m_HorizontalBearingX = i1465[2]
  i1464.m_HorizontalBearingY = i1465[3]
  i1464.m_HorizontalAdvance = i1465[4]
  return i1464
}

Deserializers["TMPro.TMP_GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1466 = root || request.c( 'TMPro.TMP_GlyphAdjustmentRecord' )
  var i1467 = data
  i1466.m_GlyphIndex = i1467[0]
  i1466.m_GlyphValueRecord = request.d('TMPro.TMP_GlyphValueRecord', i1467[1], i1466.m_GlyphValueRecord)
  return i1466
}

Deserializers["TMPro.TMP_GlyphValueRecord"] = function (request, data, root) {
  var i1468 = root || request.c( 'TMPro.TMP_GlyphValueRecord' )
  var i1469 = data
  i1468.m_XPlacement = i1469[0]
  i1468.m_YPlacement = i1469[1]
  i1468.m_XAdvance = i1469[2]
  i1468.m_YAdvance = i1469[3]
  return i1468
}

Deserializers["BlockShapeSO"] = function (request, data, root) {
  var i1470 = root || request.c( 'BlockShapeSO' )
  var i1471 = data
  i1470.width = i1471[0]
  i1470.height = i1471[1]
  i1470.minX = i1471[2]
  i1470.maxX = i1471[3]
  i1470.maxY = i1471[4]
  var i1473 = i1471[5]
  var i1472 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Vector2Int')))
  for(var i = 0; i < i1473.length; i += 2) {
    i1472.add(new pc.Vec2( i1473[i + 0], i1473[i + 1] ));
  }
  i1470.structuralOffsets = i1472
  request.r(i1471[6], i1471[7], 0, i1470, 'uiIcon')
  request.r(i1471[8], i1471[9], 0, i1470, 'blockMaterial')
  request.r(i1471[10], i1471[11], 0, i1470, 'innerMaterial')
  request.r(i1471[12], i1471[13], 0, i1470, 'specialIcon')
  i1470.slideDirection = new pc.Vec2( i1471[14], i1471[15] )
  i1470.defaultLayers = i1471[16]
  request.r(i1471[17], i1471[18], 0, i1470, 'innerMesh')
  i1470.innerScale = new pc.Vec3( i1471[19], i1471[20], i1471[21] )
  i1470.innerOffset = new pc.Vec3( i1471[22], i1471[23], i1471[24] )
  return i1470
}

Deserializers["CellMeshLibrary"] = function (request, data, root) {
  var i1476 = root || request.c( 'CellMeshLibrary' )
  var i1477 = data
  request.r(i1477[0], i1477[1], 0, i1476, 'full')
  request.r(i1477[2], i1477[3], 0, i1476, 'straightVer')
  request.r(i1477[4], i1477[5], 0, i1476, 'straightHor')
  request.r(i1477[6], i1477[7], 0, i1476, 'center')
  request.r(i1477[8], i1477[9], 0, i1476, 'edgeTop')
  request.r(i1477[10], i1477[11], 0, i1476, 'edgeBottom')
  request.r(i1477[12], i1477[13], 0, i1476, 'edgeLeft')
  request.r(i1477[14], i1477[15], 0, i1476, 'edgeRight')
  request.r(i1477[16], i1477[17], 0, i1476, 'cornerTL')
  request.r(i1477[18], i1477[19], 0, i1476, 'cornerTR')
  request.r(i1477[20], i1477[21], 0, i1476, 'cornerBL')
  request.r(i1477[22], i1477[23], 0, i1476, 'cornerBR')
  request.r(i1477[24], i1477[25], 0, i1476, 'tripleTop')
  request.r(i1477[26], i1477[27], 0, i1476, 'tripleBottom')
  request.r(i1477[28], i1477[29], 0, i1476, 'tripleLeft')
  request.r(i1477[30], i1477[31], 0, i1476, 'tripleRight')
  return i1476
}

Deserializers["BlockPaletteSO"] = function (request, data, root) {
  var i1478 = root || request.c( 'BlockPaletteSO' )
  var i1479 = data
  var i1481 = i1479[0]
  var i1480 = []
  for(var i = 0; i < i1481.length; i += 2) {
  request.r(i1481[i + 0], i1481[i + 1], 2, i1480, '')
  }
  i1478.blockMaterials = i1480
  request.r(i1479[1], i1479[2], 0, i1478, 'ghostMaterial')
  request.r(i1479[3], i1479[4], 0, i1478, 'floodMaterial')
  request.r(i1479[5], i1479[6], 0, i1478, 'previewOverlayMaterial')
  return i1478
}

Deserializers["SonatFramework.Systems.AudioManagement.SonatAudioService"] = function (request, data, root) {
  var i1482 = root || request.c( 'SonatFramework.Systems.AudioManagement.SonatAudioService' )
  var i1483 = data
  i1482.volumeDefault = i1483[0]
  return i1482
}

Deserializers["SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync"] = function (request, data, root) {
  var i1484 = root || request.c( 'SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync' )
  var i1485 = data
  i1484.path = i1485[0]
  request.r(i1485[1], i1485[2], 0, i1484, 'fallbackService')
  return i1484
}

Deserializers["SonatFramework.Scripts.UIModule.TweenConfigSO"] = function (request, data, root) {
  var i1486 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenConfigSO' )
  var i1487 = data
  i1486.config = request.d('SonatFramework.Scripts.UIModule.TweenConfig', i1487[0], i1486.config)
  return i1486
}

Deserializers["LevelDataSO"] = function (request, data, root) {
  var i1488 = root || request.c( 'LevelDataSO' )
  var i1489 = data
  i1488.levelID = i1489[0]
  i1488.displayName = i1489[1]
  i1488.gameMode = i1489[2]
  i1488.difficulty = i1489[3]
  i1488.targetGoal = i1489[4]
  i1488.timeLimit = i1489[5]
  i1488.floodStartInterval = i1489[6]
  i1488.floodIntervalIncrease = i1489[7]
  request.r(i1489[8], i1489[9], 0, i1488, 'gameConfig')
  i1488.levelWidth = i1489[10]
  request.r(i1489[11], i1489[12], 0, i1488, 'floorPrefab')
  var i1491 = i1489[13]
  var i1490 = new (System.Collections.Generic.List$1(Bridge.ns('PreplacedBlockData')))
  for(var i = 0; i < i1491.length; i += 1) {
    i1490.add(request.d('PreplacedBlockData', i1491[i + 0]));
  }
  i1488.mapData = i1490
  request.r(i1489[14], i1489[15], 0, i1488, 'difficultyConfig')
  request.r(i1489[16], i1489[17], 0, i1488, 'shapePool')
  var i1493 = i1489[18]
  var i1492 = new (System.Collections.Generic.List$1(Bridge.ns('BlockShapeSO')))
  for(var i = 0; i < i1493.length; i += 2) {
  request.r(i1493[i + 0], i1493[i + 1], 1, i1492, '')
  }
  i1488.fixedStartSequence = i1492
  return i1488
}

Deserializers["PreplacedBlockData"] = function (request, data, root) {
  var i1496 = root || request.c( 'PreplacedBlockData' )
  var i1497 = data
  i1496.faceIndex = i1497[0]
  i1496.localX = i1497[1]
  i1496.y = i1497[2]
  i1496.blockShapeRef = request.d('UnityEngine.AddressableAssets.AssetReference', i1497[3], i1496.blockShapeRef)
  i1496.colorIndex = i1497[4]
  return i1496
}

Deserializers["UnityEngine.AddressableAssets.AssetReference"] = function (request, data, root) {
  var i1498 = root || request.c( 'UnityEngine.AddressableAssets.AssetReference' )
  var i1499 = data
  i1498.m_AssetGUID = i1499[0]
  i1498.m_SubObjectName = i1499[1]
  i1498.m_SubObjectType = i1499[2]
  i1498.m_SubObjectGUID = i1499[3]
  i1498.m_EditorAssetChanged = !!i1499[4]
  return i1498
}

Deserializers["GameConfig"] = function (request, data, root) {
  var i1502 = root || request.c( 'GameConfig' )
  var i1503 = data
  i1502.towerHeightThreshold = i1503[0]
  i1502.towerHeightRatio = i1503[1]
  i1502.towerDropAdjustDuration = i1503[2]
  i1502.towerHeightSmoothDuration = i1503[3]
  i1502.towerHeightEase = i1503[4]
  i1502.edgeRotateDelay = i1503[5]
  i1502.dragHoldTime = i1503[6]
  i1502.blockDragSensitivity = i1503[7]
  i1502.useAbsolutePositioning = !!i1503[8]
  i1502.absolutePositionSmoothing = i1503[9]
  i1502.edgeScrollThreshold = i1503[10]
  i1502.edgeScrollSpeed = i1503[11]
  i1502.baseSmoothTime = i1503[12]
  i1502.fastSmoothTime = i1503[13]
  i1502.deadzoneAngle = i1503[14]
  i1502.buttonRotateDuration = i1503[15]
  i1502.buttonRotateEase = i1503[16]
  i1502.towerSnapDuration = i1503[17]
  i1502.towerSnapEase = i1503[18]
  i1502.dropDuration = i1503[19]
  i1502.dropEase = i1503[20]
  request.r(i1503[21], i1503[22], 0, i1502, 'blockPalette')
  i1502.ghostAlpha = i1503[23]
  i1502.faceWidth = i1503[24]
  i1502.height = i1503[25]
  i1502.tileSize = i1503[26]
  i1502.spawnY = i1503[27]
  i1502.score1Line = i1503[28]
  i1502.score2Lines = i1503[29]
  i1502.score3Lines = i1503[30]
  i1502.score4Lines = i1503[31]
  i1502.pointsPerRow = i1503[32]
  i1502.useMultiLineBonus = !!i1503[33]
  i1502.multiLineMultiplier = i1503[34]
  i1502.maxHeight = i1503[35]
  i1502.warningThreshold = i1503[36]
  i1502.totalLevelCount = i1503[37]
  i1502.warningColor = new pc.Color(i1503[38], i1503[39], i1503[40], i1503[41])
  i1502.gameOverColor = new pc.Color(i1503[42], i1503[43], i1503[44], i1503[45])
  i1502.pulseDuration = i1503[46]
  i1502.winReward = request.d('SonatFramework.Systems.InventoryManagement.GameResources.ResourceData', i1503[47], i1502.winReward)
  i1502.playOnPrice = request.d('SonatFramework.Systems.InventoryManagement.GameResources.ResourceData', i1503[48], i1502.playOnPrice)
  return i1502
}

Deserializers["SonatFramework.Systems.InventoryManagement.GameResources.ResourceData"] = function (request, data, root) {
  var i1504 = root || request.c( 'SonatFramework.Systems.InventoryManagement.GameResources.ResourceData' )
  var i1505 = data
  i1504.gameResource = i1505[0]
  i1504.id = i1505[1]
  i1504.quantity = i1505[2]
  i1504.seconds = System.Int64(i1505[3])
  i1504.timestamp = System.Int64(i1505[4])
  i1504.onUpdate = request.d('System.Action', i1505[5], i1504.onUpdate)
  return i1504
}

Deserializers["Difficulty.DifficultyConfig"] = function (request, data, root) {
  var i1506 = root || request.c( 'Difficulty.DifficultyConfig' )
  var i1507 = data
  i1506.mercyTokensMin = i1507[0]
  i1506.mercyTokensMax = i1507[1]
  i1506.mercyTensionThreshold = i1507[2]
  i1506.mercyStreakRequired = i1507[3]
  i1506.mercyChance = i1507[4]
  i1506.mercyCooldownMin = i1507[5]
  i1506.mercyCooldownMax = i1507[6]
  i1506.rescueWeight_1x1 = i1507[7]
  i1506.rescueWeight_1x2 = i1507[8]
  i1506.rescueWeight_2x1 = i1507[9]
  i1506.warningThreshold = i1507[10]
  i1506.dangerThreshold = i1507[11]
  i1506.criticalThreshold = i1507[12]
  i1506.autoRefillBag = !!i1507[13]
  return i1506
}

Deserializers["Difficulty.ShapePoolSO"] = function (request, data, root) {
  var i1508 = root || request.c( 'Difficulty.ShapePoolSO' )
  var i1509 = data
  var i1511 = i1509[0]
  var i1510 = new (System.Collections.Generic.List$1(Bridge.ns('Difficulty.ShapeWeightEntry')))
  for(var i = 0; i < i1511.length; i += 1) {
    i1510.add(request.d('Difficulty.ShapeWeightEntry', i1511[i + 0]));
  }
  i1508.entries = i1510
  return i1508
}

Deserializers["Difficulty.ShapeWeightEntry"] = function (request, data, root) {
  var i1514 = root || request.c( 'Difficulty.ShapeWeightEntry' )
  var i1515 = data
  request.r(i1515[0], i1515[1], 0, i1514, 'shape')
  i1514.weight = i1515[2]
  i1514.category = i1515[3]
  i1514.isRescueShape = !!i1515[4]
  return i1514
}

Deserializers["UnityEngine.InputSystem.InputActionAsset"] = function (request, data, root) {
  var i1516 = root || request.c( 'UnityEngine.InputSystem.InputActionAsset' )
  var i1517 = data
  var i1519 = i1517[0]
  var i1518 = []
  for(var i = 0; i < i1519.length; i += 1) {
    i1518.push( request.d('UnityEngine.InputSystem.InputActionMap', i1519[i + 0]) );
  }
  i1516.m_ActionMaps = i1518
  var i1521 = i1517[1]
  var i1520 = []
  for(var i = 0; i < i1521.length; i += 1) {
    i1520.push( request.d('UnityEngine.InputSystem.InputControlScheme', i1521[i + 0]) );
  }
  i1516.m_ControlSchemes = i1520
  i1516.m_IsProjectWide = !!i1517[2]
  return i1516
}

Deserializers["UnityEngine.InputSystem.InputActionMap"] = function (request, data, root) {
  var i1524 = root || request.c( 'UnityEngine.InputSystem.InputActionMap' )
  var i1525 = data
  i1524.m_Name = i1525[0]
  i1524.m_Id = i1525[1]
  request.r(i1525[2], i1525[3], 0, i1524, 'm_Asset')
  var i1527 = i1525[4]
  var i1526 = []
  for(var i = 0; i < i1527.length; i += 1) {
    i1526.push( request.d('UnityEngine.InputSystem.InputAction', i1527[i + 0]) );
  }
  i1524.m_Actions = i1526
  var i1529 = i1525[5]
  var i1528 = []
  for(var i = 0; i < i1529.length; i += 1) {
    i1528.push( request.d('UnityEngine.InputSystem.InputBinding', i1529[i + 0]) );
  }
  i1524.m_Bindings = i1528
  return i1524
}

Deserializers["UnityEngine.InputSystem.InputAction"] = function (request, data, root) {
  var i1532 = root || request.c( 'UnityEngine.InputSystem.InputAction' )
  var i1533 = data
  i1532.m_Name = i1533[0]
  i1532.m_Type = i1533[1]
  i1532.m_ExpectedControlType = i1533[2]
  i1532.m_Id = i1533[3]
  i1532.m_Processors = i1533[4]
  i1532.m_Interactions = i1533[5]
  var i1535 = i1533[6]
  var i1534 = []
  for(var i = 0; i < i1535.length; i += 1) {
    i1534.push( request.d('UnityEngine.InputSystem.InputBinding', i1535[i + 0]) );
  }
  i1532.m_SingletonActionBindings = i1534
  i1532.m_Flags = i1533[7]
  return i1532
}

Deserializers["UnityEngine.InputSystem.InputBinding"] = function (request, data, root) {
  var i1538 = root || request.c( 'UnityEngine.InputSystem.InputBinding' )
  var i1539 = data
  i1538.m_Name = i1539[0]
  i1538.m_Id = i1539[1]
  i1538.m_Path = i1539[2]
  i1538.m_Interactions = i1539[3]
  i1538.m_Processors = i1539[4]
  i1538.m_Groups = i1539[5]
  i1538.m_Action = i1539[6]
  i1538.m_Flags = i1539[7]
  return i1538
}

Deserializers["UnityEngine.InputSystem.InputControlScheme"] = function (request, data, root) {
  var i1542 = root || request.c( 'UnityEngine.InputSystem.InputControlScheme' )
  var i1543 = data
  i1542.m_Name = i1543[0]
  i1542.m_BindingGroup = i1543[1]
  var i1545 = i1543[2]
  var i1544 = []
  for(var i = 0; i < i1545.length; i += 1) {
    i1544.push( request.d('UnityEngine.InputSystem.InputControlScheme+DeviceRequirement', i1545[i + 0]) );
  }
  i1542.m_DeviceRequirements = i1544
  return i1542
}

Deserializers["UnityEngine.InputSystem.InputControlScheme+DeviceRequirement"] = function (request, data, root) {
  var i1548 = root || request.c( 'UnityEngine.InputSystem.InputControlScheme+DeviceRequirement' )
  var i1549 = data
  i1548.m_ControlPath = i1549[0]
  i1548.m_Flags = i1549[1]
  return i1548
}

Deserializers["UnityEngine.InputSystem.InputActionReference"] = function (request, data, root) {
  var i1550 = root || request.c( 'UnityEngine.InputSystem.InputActionReference' )
  var i1551 = data
  request.r(i1551[0], i1551[1], 0, i1550, 'm_Asset')
  i1550.m_ActionId = i1551[2]
  return i1550
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1552 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1553 = data
  i1552.useSafeMode = !!i1553[0]
  i1552.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1553[1], i1552.safeModeOptions)
  i1552.timeScale = i1553[2]
  i1552.unscaledTimeScale = i1553[3]
  i1552.useSmoothDeltaTime = !!i1553[4]
  i1552.maxSmoothUnscaledTime = i1553[5]
  i1552.rewindCallbackMode = i1553[6]
  i1552.showUnityEditorReport = !!i1553[7]
  i1552.logBehaviour = i1553[8]
  i1552.drawGizmos = !!i1553[9]
  i1552.defaultRecyclable = !!i1553[10]
  i1552.defaultAutoPlay = i1553[11]
  i1552.defaultUpdateType = i1553[12]
  i1552.defaultTimeScaleIndependent = !!i1553[13]
  i1552.defaultEaseType = i1553[14]
  i1552.defaultEaseOvershootOrAmplitude = i1553[15]
  i1552.defaultEasePeriod = i1553[16]
  i1552.defaultAutoKill = !!i1553[17]
  i1552.defaultLoopType = i1553[18]
  i1552.debugMode = !!i1553[19]
  i1552.debugStoreTargetId = !!i1553[20]
  i1552.showPreviewPanel = !!i1553[21]
  i1552.storeSettingsLocation = i1553[22]
  i1552.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1553[23], i1552.modules)
  i1552.createASMDEF = !!i1553[24]
  i1552.showPlayingTweens = !!i1553[25]
  i1552.showPausedTweens = !!i1553[26]
  return i1552
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1554 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1555 = data
  i1554.logBehaviour = i1555[0]
  i1554.nestedTweenFailureBehaviour = i1555[1]
  return i1554
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1556 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1557 = data
  i1556.showPanel = !!i1557[0]
  i1556.audioEnabled = !!i1557[1]
  i1556.physicsEnabled = !!i1557[2]
  i1556.physics2DEnabled = !!i1557[3]
  i1556.spriteEnabled = !!i1557[4]
  i1556.uiEnabled = !!i1557[5]
  i1556.textMeshProEnabled = !!i1557[6]
  i1556.tk2DEnabled = !!i1557[7]
  i1556.deAudioEnabled = !!i1557[8]
  i1556.deUnityExtendedEnabled = !!i1557[9]
  i1556.epoOutlineEnabled = !!i1557[10]
  return i1556
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1558 = root || request.c( 'TMPro.TMP_Settings' )
  var i1559 = data
  i1558.m_enableWordWrapping = !!i1559[0]
  i1558.m_enableKerning = !!i1559[1]
  i1558.m_enableExtraPadding = !!i1559[2]
  i1558.m_enableTintAllSprites = !!i1559[3]
  i1558.m_enableParseEscapeCharacters = !!i1559[4]
  i1558.m_EnableRaycastTarget = !!i1559[5]
  i1558.m_GetFontFeaturesAtRuntime = !!i1559[6]
  i1558.m_missingGlyphCharacter = i1559[7]
  i1558.m_warningsDisabled = !!i1559[8]
  request.r(i1559[9], i1559[10], 0, i1558, 'm_defaultFontAsset')
  i1558.m_defaultFontAssetPath = i1559[11]
  i1558.m_defaultFontSize = i1559[12]
  i1558.m_defaultAutoSizeMinRatio = i1559[13]
  i1558.m_defaultAutoSizeMaxRatio = i1559[14]
  i1558.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1559[15], i1559[16] )
  i1558.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1559[17], i1559[18] )
  i1558.m_autoSizeTextContainer = !!i1559[19]
  i1558.m_IsTextObjectScaleStatic = !!i1559[20]
  var i1561 = i1559[21]
  var i1560 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1561.length; i += 2) {
  request.r(i1561[i + 0], i1561[i + 1], 1, i1560, '')
  }
  i1558.m_fallbackFontAssets = i1560
  i1558.m_matchMaterialPreset = !!i1559[22]
  request.r(i1559[23], i1559[24], 0, i1558, 'm_defaultSpriteAsset')
  i1558.m_defaultSpriteAssetPath = i1559[25]
  i1558.m_enableEmojiSupport = !!i1559[26]
  i1558.m_MissingCharacterSpriteUnicode = i1559[27]
  i1558.m_defaultColorGradientPresetsPath = i1559[28]
  request.r(i1559[29], i1559[30], 0, i1558, 'm_defaultStyleSheet')
  i1558.m_StyleSheetsResourcePath = i1559[31]
  request.r(i1559[32], i1559[33], 0, i1558, 'm_leadingCharacters')
  request.r(i1559[34], i1559[35], 0, i1558, 'm_followingCharacters')
  i1558.m_UseModernHangulLineBreakingRules = !!i1559[36]
  return i1558
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1562 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1563 = data
  request.r(i1563[0], i1563[1], 0, i1562, 'spriteSheet')
  var i1565 = i1563[2]
  var i1564 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1565.length; i += 1) {
    i1564.add(request.d('TMPro.TMP_Sprite', i1565[i + 0]));
  }
  i1562.spriteInfoList = i1564
  var i1567 = i1563[3]
  var i1566 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1567.length; i += 2) {
  request.r(i1567[i + 0], i1567[i + 1], 1, i1566, '')
  }
  i1562.fallbackSpriteAssets = i1566
  i1562.hashCode = i1563[4]
  request.r(i1563[5], i1563[6], 0, i1562, 'material')
  i1562.materialHashCode = i1563[7]
  i1562.m_Version = i1563[8]
  i1562.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1563[9], i1562.m_FaceInfo)
  var i1569 = i1563[10]
  var i1568 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1569.length; i += 1) {
    i1568.add(request.d('TMPro.TMP_SpriteCharacter', i1569[i + 0]));
  }
  i1562.m_SpriteCharacterTable = i1568
  var i1571 = i1563[11]
  var i1570 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1571.length; i += 1) {
    i1570.add(request.d('TMPro.TMP_SpriteGlyph', i1571[i + 0]));
  }
  i1562.m_SpriteGlyphTable = i1570
  return i1562
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1574 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1575 = data
  i1574.name = i1575[0]
  i1574.hashCode = i1575[1]
  i1574.unicode = i1575[2]
  i1574.pivot = new pc.Vec2( i1575[3], i1575[4] )
  request.r(i1575[5], i1575[6], 0, i1574, 'sprite')
  i1574.id = i1575[7]
  i1574.x = i1575[8]
  i1574.y = i1575[9]
  i1574.width = i1575[10]
  i1574.height = i1575[11]
  i1574.xOffset = i1575[12]
  i1574.yOffset = i1575[13]
  i1574.xAdvance = i1575[14]
  i1574.scale = i1575[15]
  return i1574
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1580 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1581 = data
  i1580.m_Name = i1581[0]
  i1580.m_HashCode = i1581[1]
  i1580.m_ElementType = i1581[2]
  i1580.m_Unicode = i1581[3]
  i1580.m_GlyphIndex = i1581[4]
  i1580.m_Scale = i1581[5]
  return i1580
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1584 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1585 = data
  request.r(i1585[0], i1585[1], 0, i1584, 'sprite')
  i1584.m_Index = i1585[2]
  i1584.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1585[3], i1584.m_Metrics)
  i1584.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1585[4], i1584.m_GlyphRect)
  i1584.m_Scale = i1585[5]
  i1584.m_AtlasIndex = i1585[6]
  i1584.m_ClassDefinitionType = i1585[7]
  return i1584
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1586 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1587 = data
  var i1589 = i1587[0]
  var i1588 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1589.length; i += 1) {
    i1588.add(request.d('TMPro.TMP_Style', i1589[i + 0]));
  }
  i1586.m_StyleList = i1588
  return i1586
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1592 = root || request.c( 'TMPro.TMP_Style' )
  var i1593 = data
  i1592.m_Name = i1593[0]
  i1592.m_HashCode = i1593[1]
  i1592.m_OpeningDefinition = i1593[2]
  i1592.m_ClosingDefinition = i1593[3]
  i1592.m_OpeningTagArray = i1593[4]
  i1592.m_ClosingTagArray = i1593[5]
  i1592.m_OpeningTagUnicodeArray = i1593[6]
  i1592.m_ClosingTagUnicodeArray = i1593[7]
  return i1592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1595 = data
  var i1597 = i1595[0]
  var i1596 = []
  for(var i = 0; i < i1597.length; i += 1) {
    i1596.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1597[i + 0]) );
  }
  i1594.files = i1596
  i1594.componentToPrefabIds = i1595[1]
  return i1594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1601 = data
  i1600.path = i1601[0]
  request.r(i1601[1], i1601[2], 0, i1600, 'unityObject')
  return i1600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1603 = data
  var i1605 = i1603[0]
  var i1604 = []
  for(var i = 0; i < i1605.length; i += 1) {
    i1604.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1605[i + 0]) );
  }
  i1602.scriptsExecutionOrder = i1604
  var i1607 = i1603[1]
  var i1606 = []
  for(var i = 0; i < i1607.length; i += 1) {
    i1606.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1607[i + 0]) );
  }
  i1602.sortingLayers = i1606
  var i1609 = i1603[2]
  var i1608 = []
  for(var i = 0; i < i1609.length; i += 1) {
    i1608.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1609[i + 0]) );
  }
  i1602.cullingLayers = i1608
  i1602.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1603[3], i1602.timeSettings)
  i1602.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1603[4], i1602.physicsSettings)
  i1602.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1603[5], i1602.physics2DSettings)
  i1602.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1603[6], i1602.qualitySettings)
  i1602.enableRealtimeShadows = !!i1603[7]
  i1602.enableAutoInstancing = !!i1603[8]
  i1602.enableStaticBatching = !!i1603[9]
  i1602.enableDynamicBatching = !!i1603[10]
  i1602.lightmapEncodingQuality = i1603[11]
  i1602.desiredColorSpace = i1603[12]
  var i1611 = i1603[13]
  var i1610 = []
  for(var i = 0; i < i1611.length; i += 1) {
    i1610.push( i1611[i + 0] );
  }
  i1602.allTags = i1610
  return i1602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1615 = data
  i1614.name = i1615[0]
  i1614.value = i1615[1]
  return i1614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1619 = data
  i1618.id = i1619[0]
  i1618.name = i1619[1]
  i1618.value = i1619[2]
  return i1618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1623 = data
  i1622.id = i1623[0]
  i1622.name = i1623[1]
  return i1622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1625 = data
  i1624.fixedDeltaTime = i1625[0]
  i1624.maximumDeltaTime = i1625[1]
  i1624.timeScale = i1625[2]
  i1624.maximumParticleTimestep = i1625[3]
  return i1624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1627 = data
  i1626.gravity = new pc.Vec3( i1627[0], i1627[1], i1627[2] )
  i1626.defaultSolverIterations = i1627[3]
  i1626.bounceThreshold = i1627[4]
  i1626.autoSyncTransforms = !!i1627[5]
  i1626.autoSimulation = !!i1627[6]
  var i1629 = i1627[7]
  var i1628 = []
  for(var i = 0; i < i1629.length; i += 1) {
    i1628.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1629[i + 0]) );
  }
  i1626.collisionMatrix = i1628
  return i1626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1633 = data
  i1632.enabled = !!i1633[0]
  i1632.layerId = i1633[1]
  i1632.otherLayerId = i1633[2]
  return i1632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1634 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1635 = data
  request.r(i1635[0], i1635[1], 0, i1634, 'material')
  i1634.gravity = new pc.Vec2( i1635[2], i1635[3] )
  i1634.positionIterations = i1635[4]
  i1634.velocityIterations = i1635[5]
  i1634.velocityThreshold = i1635[6]
  i1634.maxLinearCorrection = i1635[7]
  i1634.maxAngularCorrection = i1635[8]
  i1634.maxTranslationSpeed = i1635[9]
  i1634.maxRotationSpeed = i1635[10]
  i1634.baumgarteScale = i1635[11]
  i1634.baumgarteTOIScale = i1635[12]
  i1634.timeToSleep = i1635[13]
  i1634.linearSleepTolerance = i1635[14]
  i1634.angularSleepTolerance = i1635[15]
  i1634.defaultContactOffset = i1635[16]
  i1634.autoSimulation = !!i1635[17]
  i1634.queriesHitTriggers = !!i1635[18]
  i1634.queriesStartInColliders = !!i1635[19]
  i1634.callbacksOnDisable = !!i1635[20]
  i1634.reuseCollisionCallbacks = !!i1635[21]
  i1634.autoSyncTransforms = !!i1635[22]
  var i1637 = i1635[23]
  var i1636 = []
  for(var i = 0; i < i1637.length; i += 1) {
    i1636.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1637[i + 0]) );
  }
  i1634.collisionMatrix = i1636
  return i1634
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1641 = data
  i1640.enabled = !!i1641[0]
  i1640.layerId = i1641[1]
  i1640.otherLayerId = i1641[2]
  return i1640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1643 = data
  var i1645 = i1643[0]
  var i1644 = []
  for(var i = 0; i < i1645.length; i += 1) {
    i1644.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1645[i + 0]) );
  }
  i1642.qualityLevels = i1644
  var i1647 = i1643[1]
  var i1646 = []
  for(var i = 0; i < i1647.length; i += 1) {
    i1646.push( i1647[i + 0] );
  }
  i1642.names = i1646
  i1642.shadows = i1643[2]
  i1642.anisotropicFiltering = i1643[3]
  i1642.antiAliasing = i1643[4]
  i1642.lodBias = i1643[5]
  i1642.shadowCascades = i1643[6]
  i1642.shadowDistance = i1643[7]
  i1642.shadowmaskMode = i1643[8]
  i1642.shadowProjection = i1643[9]
  i1642.shadowResolution = i1643[10]
  i1642.softParticles = !!i1643[11]
  i1642.softVegetation = !!i1643[12]
  i1642.activeColorSpace = i1643[13]
  i1642.desiredColorSpace = i1643[14]
  i1642.masterTextureLimit = i1643[15]
  i1642.maxQueuedFrames = i1643[16]
  i1642.particleRaycastBudget = i1643[17]
  i1642.pixelLightCount = i1643[18]
  i1642.realtimeReflectionProbes = !!i1643[19]
  i1642.shadowCascade2Split = i1643[20]
  i1642.shadowCascade4Split = new pc.Vec3( i1643[21], i1643[22], i1643[23] )
  i1642.streamingMipmapsActive = !!i1643[24]
  i1642.vSyncCount = i1643[25]
  i1642.asyncUploadBufferSize = i1643[26]
  i1642.asyncUploadTimeSlice = i1643[27]
  i1642.billboardsFaceCameraPosition = !!i1643[28]
  i1642.shadowNearPlaneOffset = i1643[29]
  i1642.streamingMipmapsMemoryBudget = i1643[30]
  i1642.maximumLODLevel = i1643[31]
  i1642.streamingMipmapsAddAllCameras = !!i1643[32]
  i1642.streamingMipmapsMaxLevelReduction = i1643[33]
  i1642.streamingMipmapsRenderersPerFrame = i1643[34]
  i1642.resolutionScalingFixedDPIFactor = i1643[35]
  i1642.streamingMipmapsMaxFileIORequests = i1643[36]
  i1642.currentQualityLevel = i1643[37]
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1652 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1653 = data
  i1652.weight = i1653[0]
  i1652.vertices = i1653[1]
  i1652.normals = i1653[2]
  i1652.tangents = i1653[3]
  return i1652
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1656 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1657 = data
  i1656.mode = i1657[0]
  i1656.parameter = i1657[1]
  i1656.threshold = i1657[2]
  return i1656
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1658 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1659 = data
  i1658.xPlacement = i1659[0]
  i1658.yPlacement = i1659[1]
  i1658.xAdvance = i1659[2]
  i1658.yAdvance = i1659[3]
  return i1658
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useUInt32IndexFormat":2,"vertexCount":3,"aabb":4,"streams":5,"vertices":6,"subMeshes":7,"bindposes":8,"blendShapes":9},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"enabled":19},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"isCreatedByShaderGraph":10,"disableBatching":11,"compiled":12},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"108":[109],"110":[109],"111":[109],"112":[109],"113":[109],"114":[109],"115":[116],"117":[44],"118":[119],"120":[119],"121":[119],"122":[119],"123":[119],"124":[119],"125":[119],"126":[127],"128":[127],"129":[127],"130":[127],"131":[127],"132":[127],"133":[127],"134":[127],"135":[127],"136":[127],"137":[127],"138":[127],"139":[127],"140":[44],"141":[16],"142":[143],"144":[143],"20":[2],"55":[15,16],"145":[3],"146":[3],"147":[3],"148":[3],"149":[3],"150":[3],"151":[3],"152":[3],"153":[3],"154":[3],"155":[3],"64":[11],"156":[3],"157":[3],"158":[3],"159":[3],"160":[3],"161":[3],"162":[3],"41":[3],"163":[3],"22":[3],"164":[3],"165":[3],"166":[3],"167":[3],"33":[3],"168":[3],"169":[3],"170":[26],"171":[3],"28":[26],"172":[3],"173":[3],"174":[3],"175":[3],"176":[3],"177":[3],"178":[3],"179":[3],"180":[3],"181":[3],"182":[3],"183":[3],"184":[3],"185":[3],"186":[7],"187":[3],"188":[7],"63":[11],"189":[3],"190":[2],"191":[192],"193":[88],"194":[2],"195":[196],"197":[95],"198":[2],"199":[4,2],"200":[16],"192":[4,2],"201":[38,16],"202":[16],"203":[16,15],"204":[119],"205":[127],"206":[207],"208":[209],"36":[2,4],"210":[2],"211":[16,2],"8":[2,4],"212":[2],"213":[4,2],"214":[16],"215":[4,2],"216":[2],"217":[11],"218":[44],"46":[44],"49":[48],"219":[220],"221":[202],"222":[16,15],"223":[192],"224":[202],"225":[226],"227":[202],"228":[202],"229":[209],"230":[209],"231":[202],"232":[196],"233":[2],"234":[2],"60":[20],"7":[4,2],"235":[2],"59":[20],"31":[2],"236":[2],"24":[2],"237":[2],"73":[2],"238":[2],"30":[2],"6":[2],"239":[2],"240":[4,2],"241":[2],"242":[2],"243":[2],"244":[2],"245":[4,2],"26":[2],"246":[95],"247":[95],"248":[95],"249":[95],"250":[44],"251":[44],"96":[95],"252":[20],"253":[44],"254":[196]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasGroup","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Mask","UnityEngine.UI.Image","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.UI.Button","UnityEngine.Transform","UnityEngine.MonoBehaviour","BlockVisual","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","UnityEngine.Mesh","UnityEngine.MeshCollider","LimitLineController","UnityEngine.Canvas","UnityEngine.Sprite","PopupSettings","SonatFramework.Scripts.UIModule.TweenConfigSO","UnityEngine.UI.HorizontalLayoutGroup","SonatFramework.Systems.SettingsManagement.SettingsElement","UnityEngine.UI.Toggle","ButtonScale","UIToggleExtension","UnityEngine.GameObject","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","CheatButton","PopupWin","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","Coffee.UIExtensions.UIParticle","EmojiSlot","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","Smiles.ParentFitter","PopupLose","UnityEngine.BoxCollider","DualDirectionEffect","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","CameraResponsive","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","TowerHeightController","TowerController","BlockSpawner","TowerRotator","ActiveBlockController","GhostBlockController","BlockShapeSO","CellMeshLibrary","BlockPaletteSO","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","SonatFramework.Scripts.UIModule.SafeArea","GameHUD","SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut","ButtonRestart","NextBlockUI","FloodProgressUI","TimerUI","BtnNoAds","RotateButtonHandler","RotateLoadingIndicator","GameHistorySystem","UIBoosterUndo","UnityEngine.UI.LayoutElement","SonatFramework.Scripts.UIModule.PanelManager","TextScale","GameManager","LevelDataSO","GameConfig","CheatManager","GridManager","ScoreManager","InputManager","Booster.HammerInputHandler","TimeManager","ObjectPoolManager","BlockFactory","AudioManager","UnityEngine.AudioSource","UnityEngine.AudioClip","Difficulty.DifficultyManager","Difficulty.DifficultyConfig","Difficulty.ShapePoolSO","TutorialManager","ResponsiveManager","UnityEngine.EventSystems.EventSystem","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.InputActionAsset","UnityEngine.InputSystem.InputActionReference","UnityEngine.Cubemap","UnityEngine.Font","SonatFramework.Systems.AudioManagement.SonatAudioService","SonatFramework.Systems.LoadObject.SonatLoadResourcesAsync","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.ConstantForce","UnityEngine.Rigidbody","UnityEngine.Joint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.FixedJoint","UnityEngine.CharacterJoint","UnityEngine.ConfigurableJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","CheatPanel","PopupAdsBreak","PopupBoosterTutorial","PopupUseBlock","PopupUseFreeze","PopupUseHammer","PopupUseUndo","TutDragPanel","TutorialPanelBase","TutRotatePanel","TutUndoPanel","HomePanel","ConfirmPanel","LosePanel","NotifyPanel","PopupBuyBooster","PopupContinue","PopupLives","PopupNoInternet","PopupTimerWarning","PopupWaitAdsBreak","PopupWaiting","PopupWaitingIap","ShopPanel","WinPanel","ToggleSwitchVisual","PopupLoadingIap","TestPanel","ConfirmPanelBase","LosePanelBase","NotifyPanelBase","PopupAdsBreakBase","PopupContinueBase","PopupNoInternetBase","PopupSettingsBase","PopupToast","PopupWaitingBase","WinPanelBase","SonatFramework.Templates.UI.ScriptBase.PopupBuyBoosterBase","SonatFramework.Templates.UI.ScriptBase.PopupLivesBase","SonatFramework.Templates.UI.ScriptBase.PopupWaitAdsBreakBase","SonatFramework.Scripts.UIModule.DarkTransition","SonatFramework.Scripts.UIModule.Panel","SonatFramework.Scripts.UIModule.UIElements.FixedImageRatio","SonatFramework.Scripts.Feature.Shop.UI.ShopPanelBase","SonatFramework.Scripts.Feature.ChestRewardProgress.ChestDisplayUIController","SonatFramework.Scripts.Feature.ChestRewardProgress.ChestSpineUIAnimationHandler","Spine.Unity.SkeletonGraphic","SonatFramework.Systems.AudioManagement.AudioUnit","UnityEngine.Rendering.UI.UIFoldout","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.Variables","AppLovinMax.Scripts.MaxEventSystemChecker","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","Spine.Unity.SkeletonAnimation","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.ISkeletonAnimation","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.Purchasing.IAPButton","UnityEngine.Experimental.Rendering.Universal.PixelPerfectCamera","Spine.Unity.Examples.BasicPlatformerController","UnityEngine.CharacterController","Spine.Unity.Examples.SkeletonGhost","Spine.Unity.Examples.RenderExistingMesh","Spine.Unity.Examples.SkeletonGraphicRenderTexture","Spine.Unity.Examples.SkeletonRenderTexture","Spine.Unity.Examples.SkeletonRenderTextureFadeout","Spine.Unity.Examples.SkeletonRenderTextureBase","Spine.Unity.Examples.SkeletonRagdoll","Spine.Unity.Examples.SkeletonRagdoll2D","Spine.Unity.Examples.SkeletonUtilityEyeConstraint","Spine.Unity.Examples.SkeletonUtilityGroundConstraint","Spine.Unity.Examples.SpineGauge","Unity.VisualScripting.SceneVariables","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","ToonyColorsPro.Runtime.TCP2_CameraDepth","Unity.VisualScripting.StateMachine"]

Deserializers.unityVersion = "2022.3.62f3";

Deserializers.productName = "Block Merge 360";

Deserializers.lunaInitializationTime = "02/25/2026 07:54:33";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "6.4.0";

Deserializers.lunaSHA = "6639120529aa36186c6141b5c3fb20246c28bff0";

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

Deserializers.buildID = "0a7c66e9-dc3c-4198-8fa2-800c59393280";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Purchasing","CodelessIAPStoreListener","InitializeCodelessPurchasingOnLoad"],["MaxSdkUnityEditor","InitializeMaxSdkUnityEditorOnLoad"],["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Coffee","UIParticleInternal","UIExtraCallbacks","InitializeOnLoad"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["UnityEngine","Purchasing","StoreManagerFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","Registration","IapCoreInitializeCallback","Register"],["UnityEngine","Purchasing","ProductServiceDependencyFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","PurchaseServiceDependencyFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","StoreServiceDependencyFactoryInjector","SetStoreManagerFactory"],["SonatFramework","Systems","EventBus","EventBusUtil","Initialize"],["I2","Loc","LocalizeTarget_UnityStandard_VideoPlayer","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_TextMesh","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_AudioSource","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_Prefab","AutoRegister"],["I2","Loc","LocalizeTarget_TextMeshPro_Label","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_RawImage","AutoRegister"],["I2","Loc","LocalizeTarget_TextMeshPro_UGUI","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_Child","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_Text","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_SpriteRenderer","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_Image","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_MeshRenderer","AutoRegister"]],[["Cysharp","Threading","Tasks","PlayerLoopHelper","Init"],["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"],["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["UnityEngine","InputSystem","UI","InputSystemUIInputModule","ResetDefaultActions"],["Uniject","UnityThreadUtils","CaptureUnityThreadInfo"],["Coffee","UIParticleInternal","MaterialRepository","Clear"],["Coffee","UIParticleInternal","FrameCache","Clear"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"],["MaxSdkCallbacks","ResetOnDomainReload"],["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","ResourceManagement","ResourceProviders","AssetBundleProvider","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

