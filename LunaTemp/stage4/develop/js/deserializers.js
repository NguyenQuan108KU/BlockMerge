var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i2134 = root || request.c( 'UnityEngine.JointSpring' )
  var i2135 = data
  i2134.spring = i2135[0]
  i2134.damper = i2135[1]
  i2134.targetPosition = i2135[2]
  return i2134
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i2136 = root || request.c( 'UnityEngine.JointMotor' )
  var i2137 = data
  i2136.m_TargetVelocity = i2137[0]
  i2136.m_Force = i2137[1]
  i2136.m_FreeSpin = i2137[2]
  return i2136
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i2138 = root || request.c( 'UnityEngine.JointLimits' )
  var i2139 = data
  i2138.m_Min = i2139[0]
  i2138.m_Max = i2139[1]
  i2138.m_Bounciness = i2139[2]
  i2138.m_BounceMinVelocity = i2139[3]
  i2138.m_ContactDistance = i2139[4]
  i2138.minBounce = i2139[5]
  i2138.maxBounce = i2139[6]
  return i2138
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i2140 = root || request.c( 'UnityEngine.JointDrive' )
  var i2141 = data
  i2140.m_PositionSpring = i2141[0]
  i2140.m_PositionDamper = i2141[1]
  i2140.m_MaximumForce = i2141[2]
  i2140.m_UseAcceleration = i2141[3]
  return i2140
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i2142 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i2143 = data
  i2142.m_Spring = i2143[0]
  i2142.m_Damper = i2143[1]
  return i2142
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i2144 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i2145 = data
  i2144.m_Limit = i2145[0]
  i2144.m_Bounciness = i2145[1]
  i2144.m_ContactDistance = i2145[2]
  return i2144
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i2146 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i2147 = data
  i2146.m_ExtremumSlip = i2147[0]
  i2146.m_ExtremumValue = i2147[1]
  i2146.m_AsymptoteSlip = i2147[2]
  i2146.m_AsymptoteValue = i2147[3]
  i2146.m_Stiffness = i2147[4]
  return i2146
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i2148 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i2149 = data
  i2148.m_LowerAngle = i2149[0]
  i2148.m_UpperAngle = i2149[1]
  return i2148
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i2150 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i2151 = data
  i2150.m_MotorSpeed = i2151[0]
  i2150.m_MaximumMotorTorque = i2151[1]
  return i2150
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i2152 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i2153 = data
  i2152.m_DampingRatio = i2153[0]
  i2152.m_Frequency = i2153[1]
  i2152.m_Angle = i2153[2]
  return i2152
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i2154 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i2155 = data
  i2154.m_LowerTranslation = i2155[0]
  i2154.m_UpperTranslation = i2155[1]
  return i2154
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2156 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2157 = data
  i2156.name = i2157[0]
  i2156.width = i2157[1]
  i2156.height = i2157[2]
  i2156.mipmapCount = i2157[3]
  i2156.anisoLevel = i2157[4]
  i2156.filterMode = i2157[5]
  i2156.hdr = !!i2157[6]
  i2156.format = i2157[7]
  i2156.wrapMode = i2157[8]
  i2156.alphaIsTransparency = !!i2157[9]
  i2156.alphaSource = i2157[10]
  i2156.graphicsFormat = i2157[11]
  i2156.sRGBTexture = !!i2157[12]
  i2156.desiredColorSpace = i2157[13]
  i2156.wrapU = i2157[14]
  i2156.wrapV = i2157[15]
  return i2156
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i2158 = root || new pc.UnityMaterial()
  var i2159 = data
  i2158.name = i2159[0]
  request.r(i2159[1], i2159[2], 0, i2158, 'shader')
  i2158.renderQueue = i2159[3]
  i2158.enableInstancing = !!i2159[4]
  var i2161 = i2159[5]
  var i2160 = []
  for(var i = 0; i < i2161.length; i += 1) {
    i2160.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i2161[i + 0]) );
  }
  i2158.floatParameters = i2160
  var i2163 = i2159[6]
  var i2162 = []
  for(var i = 0; i < i2163.length; i += 1) {
    i2162.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i2163[i + 0]) );
  }
  i2158.colorParameters = i2162
  var i2165 = i2159[7]
  var i2164 = []
  for(var i = 0; i < i2165.length; i += 1) {
    i2164.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i2165[i + 0]) );
  }
  i2158.vectorParameters = i2164
  var i2167 = i2159[8]
  var i2166 = []
  for(var i = 0; i < i2167.length; i += 1) {
    i2166.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i2167[i + 0]) );
  }
  i2158.textureParameters = i2166
  var i2169 = i2159[9]
  var i2168 = []
  for(var i = 0; i < i2169.length; i += 1) {
    i2168.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i2169[i + 0]) );
  }
  i2158.materialFlags = i2168
  return i2158
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i2172 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i2173 = data
  i2172.name = i2173[0]
  i2172.value = i2173[1]
  return i2172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i2176 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i2177 = data
  i2176.name = i2177[0]
  i2176.value = new pc.Color(i2177[1], i2177[2], i2177[3], i2177[4])
  return i2176
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i2180 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i2181 = data
  i2180.name = i2181[0]
  i2180.value = new pc.Vec4( i2181[1], i2181[2], i2181[3], i2181[4] )
  return i2180
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i2184 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i2185 = data
  i2184.name = i2185[0]
  request.r(i2185[1], i2185[2], 0, i2184, 'value')
  return i2184
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2188 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2189 = data
  i2188.name = i2189[0]
  i2188.enabled = !!i2189[1]
  return i2188
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2190 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2191 = data
  i2190.pivot = new pc.Vec2( i2191[0], i2191[1] )
  i2190.anchorMin = new pc.Vec2( i2191[2], i2191[3] )
  i2190.anchorMax = new pc.Vec2( i2191[4], i2191[5] )
  i2190.sizeDelta = new pc.Vec2( i2191[6], i2191[7] )
  i2190.anchoredPosition3D = new pc.Vec3( i2191[8], i2191[9], i2191[10] )
  i2190.rotation = new pc.Quat(i2191[11], i2191[12], i2191[13], i2191[14])
  i2190.scale = new pc.Vec3( i2191[15], i2191[16], i2191[17] )
  return i2190
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i2192 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i2193 = data
  i2192.m_Alpha = i2193[0]
  i2192.m_Interactable = !!i2193[1]
  i2192.m_BlocksRaycasts = !!i2193[2]
  i2192.m_IgnoreParentGroups = !!i2193[3]
  i2192.enabled = !!i2193[4]
  return i2192
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i2194 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i2195 = data
  i2194.cullTransparentMesh = !!i2195[0]
  return i2194
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i2196 = root || request.c( 'UnityEngine.UI.Mask' )
  var i2197 = data
  i2196.m_ShowMaskGraphic = !!i2197[0]
  return i2196
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2198 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2199 = data
  i2198.name = i2199[0]
  i2198.tagId = i2199[1]
  i2198.enabled = !!i2199[2]
  i2198.isStatic = !!i2199[3]
  i2198.layer = i2199[4]
  return i2198
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i2200 = root || request.c( 'UnityEngine.UI.Image' )
  var i2201 = data
  request.r(i2201[0], i2201[1], 0, i2200, 'm_Sprite')
  i2200.m_Type = i2201[2]
  i2200.m_PreserveAspect = !!i2201[3]
  i2200.m_FillCenter = !!i2201[4]
  i2200.m_FillMethod = i2201[5]
  i2200.m_FillAmount = i2201[6]
  i2200.m_FillClockwise = !!i2201[7]
  i2200.m_FillOrigin = i2201[8]
  i2200.m_UseSpriteMesh = !!i2201[9]
  i2200.m_PixelsPerUnitMultiplier = i2201[10]
  request.r(i2201[11], i2201[12], 0, i2200, 'm_Material')
  i2200.m_Maskable = !!i2201[13]
  i2200.m_Color = new pc.Color(i2201[14], i2201[15], i2201[16], i2201[17])
  i2200.m_RaycastTarget = !!i2201[18]
  i2200.m_RaycastPadding = new pc.Vec4( i2201[19], i2201[20], i2201[21], i2201[22] )
  return i2200
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i2202 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i2203 = data
  i2202.m_hasFontAssetChanged = !!i2203[0]
  request.r(i2203[1], i2203[2], 0, i2202, 'm_baseMaterial')
  i2202.m_maskOffset = new pc.Vec4( i2203[3], i2203[4], i2203[5], i2203[6] )
  i2202.m_text = i2203[7]
  i2202.m_isRightToLeft = !!i2203[8]
  request.r(i2203[9], i2203[10], 0, i2202, 'm_fontAsset')
  request.r(i2203[11], i2203[12], 0, i2202, 'm_sharedMaterial')
  var i2205 = i2203[13]
  var i2204 = []
  for(var i = 0; i < i2205.length; i += 2) {
  request.r(i2205[i + 0], i2205[i + 1], 2, i2204, '')
  }
  i2202.m_fontSharedMaterials = i2204
  request.r(i2203[14], i2203[15], 0, i2202, 'm_fontMaterial')
  var i2207 = i2203[16]
  var i2206 = []
  for(var i = 0; i < i2207.length; i += 2) {
  request.r(i2207[i + 0], i2207[i + 1], 2, i2206, '')
  }
  i2202.m_fontMaterials = i2206
  i2202.m_fontColor32 = UnityEngine.Color32.ConstructColor(i2203[17], i2203[18], i2203[19], i2203[20])
  i2202.m_fontColor = new pc.Color(i2203[21], i2203[22], i2203[23], i2203[24])
  i2202.m_enableVertexGradient = !!i2203[25]
  i2202.m_colorMode = i2203[26]
  i2202.m_fontColorGradient = request.d('TMPro.VertexGradient', i2203[27], i2202.m_fontColorGradient)
  request.r(i2203[28], i2203[29], 0, i2202, 'm_fontColorGradientPreset')
  request.r(i2203[30], i2203[31], 0, i2202, 'm_spriteAsset')
  i2202.m_tintAllSprites = !!i2203[32]
  request.r(i2203[33], i2203[34], 0, i2202, 'm_StyleSheet')
  i2202.m_TextStyleHashCode = i2203[35]
  i2202.m_overrideHtmlColors = !!i2203[36]
  i2202.m_faceColor = UnityEngine.Color32.ConstructColor(i2203[37], i2203[38], i2203[39], i2203[40])
  i2202.m_fontSize = i2203[41]
  i2202.m_fontSizeBase = i2203[42]
  i2202.m_fontWeight = i2203[43]
  i2202.m_enableAutoSizing = !!i2203[44]
  i2202.m_fontSizeMin = i2203[45]
  i2202.m_fontSizeMax = i2203[46]
  i2202.m_fontStyle = i2203[47]
  i2202.m_HorizontalAlignment = i2203[48]
  i2202.m_VerticalAlignment = i2203[49]
  i2202.m_textAlignment = i2203[50]
  i2202.m_characterSpacing = i2203[51]
  i2202.m_wordSpacing = i2203[52]
  i2202.m_lineSpacing = i2203[53]
  i2202.m_lineSpacingMax = i2203[54]
  i2202.m_paragraphSpacing = i2203[55]
  i2202.m_charWidthMaxAdj = i2203[56]
  i2202.m_enableWordWrapping = !!i2203[57]
  i2202.m_wordWrappingRatios = i2203[58]
  i2202.m_overflowMode = i2203[59]
  request.r(i2203[60], i2203[61], 0, i2202, 'm_linkedTextComponent')
  request.r(i2203[62], i2203[63], 0, i2202, 'parentLinkedComponent')
  i2202.m_enableKerning = !!i2203[64]
  i2202.m_enableExtraPadding = !!i2203[65]
  i2202.checkPaddingRequired = !!i2203[66]
  i2202.m_isRichText = !!i2203[67]
  i2202.m_parseCtrlCharacters = !!i2203[68]
  i2202.m_isOrthographic = !!i2203[69]
  i2202.m_isCullingEnabled = !!i2203[70]
  i2202.m_horizontalMapping = i2203[71]
  i2202.m_verticalMapping = i2203[72]
  i2202.m_uvLineOffset = i2203[73]
  i2202.m_geometrySortingOrder = i2203[74]
  i2202.m_IsTextObjectScaleStatic = !!i2203[75]
  i2202.m_VertexBufferAutoSizeReduction = !!i2203[76]
  i2202.m_useMaxVisibleDescender = !!i2203[77]
  i2202.m_pageToDisplay = i2203[78]
  i2202.m_margin = new pc.Vec4( i2203[79], i2203[80], i2203[81], i2203[82] )
  i2202.m_isUsingLegacyAnimationComponent = !!i2203[83]
  i2202.m_isVolumetricText = !!i2203[84]
  request.r(i2203[85], i2203[86], 0, i2202, 'm_Material')
  i2202.m_Maskable = !!i2203[87]
  i2202.m_Color = new pc.Color(i2203[88], i2203[89], i2203[90], i2203[91])
  i2202.m_RaycastTarget = !!i2203[92]
  i2202.m_RaycastPadding = new pc.Vec4( i2203[93], i2203[94], i2203[95], i2203[96] )
  return i2202
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i2210 = root || request.c( 'TMPro.VertexGradient' )
  var i2211 = data
  i2210.topLeft = new pc.Color(i2211[0], i2211[1], i2211[2], i2211[3])
  i2210.topRight = new pc.Color(i2211[4], i2211[5], i2211[6], i2211[7])
  i2210.bottomLeft = new pc.Color(i2211[8], i2211[9], i2211[10], i2211[11])
  i2210.bottomRight = new pc.Color(i2211[12], i2211[13], i2211[14], i2211[15])
  return i2210
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i2212 = root || request.c( 'UnityEngine.UI.Button' )
  var i2213 = data
  i2212.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i2213[0], i2212.m_OnClick)
  i2212.m_Navigation = request.d('UnityEngine.UI.Navigation', i2213[1], i2212.m_Navigation)
  i2212.m_Transition = i2213[2]
  i2212.m_Colors = request.d('UnityEngine.UI.ColorBlock', i2213[3], i2212.m_Colors)
  i2212.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i2213[4], i2212.m_SpriteState)
  i2212.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i2213[5], i2212.m_AnimationTriggers)
  i2212.m_Interactable = !!i2213[6]
  request.r(i2213[7], i2213[8], 0, i2212, 'm_TargetGraphic')
  return i2212
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i2214 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i2215 = data
  i2214.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2215[0], i2214.m_PersistentCalls)
  return i2214
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i2216 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i2217 = data
  var i2219 = i2217[0]
  var i2218 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i2219.length; i += 1) {
    i2218.add(request.d('UnityEngine.Events.PersistentCall', i2219[i + 0]));
  }
  i2216.m_Calls = i2218
  return i2216
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i2222 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i2223 = data
  request.r(i2223[0], i2223[1], 0, i2222, 'm_Target')
  i2222.m_TargetAssemblyTypeName = i2223[2]
  i2222.m_MethodName = i2223[3]
  i2222.m_Mode = i2223[4]
  i2222.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i2223[5], i2222.m_Arguments)
  i2222.m_CallState = i2223[6]
  return i2222
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i2224 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i2225 = data
  i2224.m_Mode = i2225[0]
  i2224.m_WrapAround = !!i2225[1]
  request.r(i2225[2], i2225[3], 0, i2224, 'm_SelectOnUp')
  request.r(i2225[4], i2225[5], 0, i2224, 'm_SelectOnDown')
  request.r(i2225[6], i2225[7], 0, i2224, 'm_SelectOnLeft')
  request.r(i2225[8], i2225[9], 0, i2224, 'm_SelectOnRight')
  return i2224
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i2226 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i2227 = data
  i2226.m_NormalColor = new pc.Color(i2227[0], i2227[1], i2227[2], i2227[3])
  i2226.m_HighlightedColor = new pc.Color(i2227[4], i2227[5], i2227[6], i2227[7])
  i2226.m_PressedColor = new pc.Color(i2227[8], i2227[9], i2227[10], i2227[11])
  i2226.m_SelectedColor = new pc.Color(i2227[12], i2227[13], i2227[14], i2227[15])
  i2226.m_DisabledColor = new pc.Color(i2227[16], i2227[17], i2227[18], i2227[19])
  i2226.m_ColorMultiplier = i2227[20]
  i2226.m_FadeDuration = i2227[21]
  return i2226
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i2228 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i2229 = data
  request.r(i2229[0], i2229[1], 0, i2228, 'm_HighlightedSprite')
  request.r(i2229[2], i2229[3], 0, i2228, 'm_PressedSprite')
  request.r(i2229[4], i2229[5], 0, i2228, 'm_SelectedSprite')
  request.r(i2229[6], i2229[7], 0, i2228, 'm_DisabledSprite')
  return i2228
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i2230 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i2231 = data
  i2230.m_NormalTrigger = i2231[0]
  i2230.m_HighlightedTrigger = i2231[1]
  i2230.m_PressedTrigger = i2231[2]
  i2230.m_SelectedTrigger = i2231[3]
  i2230.m_DisabledTrigger = i2231[4]
  return i2230
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.UICurrency"] = function (request, data, root) {
  var i2232 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.UICurrency' )
  var i2233 = data
  i2232.resource = i2233[0]
  request.r(i2233[1], i2233[2], 0, i2232, 'icon')
  request.r(i2233[3], i2233[4], 0, i2232, 'txtValue')
  i2232.counterDuration = i2233[5]
  i2232.scaleSpeed = i2233[6]
  i2232.scaleMax = i2233[7]
  request.r(i2233[8], i2233[9], 0, i2232, 'plusObj')
  i2232.blockClick = !!i2233[10]
  request.r(i2233[11], i2233[12], 0, i2232, 'blastEffect')
  i2232.openPanelName = i2233[13]
  i2232.receiveSound = i2233[14]
  return i2232
}

Deserializers["SonatFramework.Scripts.Feature.Shop.UI.UIShopPackContent"] = function (request, data, root) {
  var i2234 = root || request.c( 'SonatFramework.Scripts.Feature.Shop.UI.UIShopPackContent' )
  var i2235 = data
  i2234.onExpand = request.d('UnityEngine.Events.UnityEvent`1[[System.Boolean, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]', i2235[0], i2234.onExpand)
  request.r(i2235[1], i2235[2], 0, i2234, 'content')
  request.r(i2235[3], i2235[4], 0, i2234, 'expandBtn')
  request.r(i2235[5], i2235[6], 0, i2234, 'txtExpand')
  i2234.bottomPadding = i2235[7]
  i2234.maxElementsShow = i2235[8]
  i2234.showFull = !!i2235[9]
  return i2234
}

Deserializers["UnityEngine.Events.UnityEvent`1[[System.Boolean, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]"] = function (request, data, root) {
  var i2236 = root || new (UnityEngine.Events.UnityEvent$1( Bridge.ns( 'System.Boolean' ) ))
  var i2237 = data
  i2236.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2237[0], i2236.m_PersistentCalls)
  return i2236
}

Deserializers["UnityEngine.UI.ScrollRect"] = function (request, data, root) {
  var i2238 = root || request.c( 'UnityEngine.UI.ScrollRect' )
  var i2239 = data
  request.r(i2239[0], i2239[1], 0, i2238, 'm_Content')
  i2238.m_Horizontal = !!i2239[2]
  i2238.m_Vertical = !!i2239[3]
  i2238.m_MovementType = i2239[4]
  i2238.m_Elasticity = i2239[5]
  i2238.m_Inertia = !!i2239[6]
  i2238.m_DecelerationRate = i2239[7]
  i2238.m_ScrollSensitivity = i2239[8]
  request.r(i2239[9], i2239[10], 0, i2238, 'm_Viewport')
  request.r(i2239[11], i2239[12], 0, i2238, 'm_HorizontalScrollbar')
  request.r(i2239[13], i2239[14], 0, i2238, 'm_VerticalScrollbar')
  i2238.m_HorizontalScrollbarVisibility = i2239[15]
  i2238.m_VerticalScrollbarVisibility = i2239[16]
  i2238.m_HorizontalScrollbarSpacing = i2239[17]
  i2238.m_VerticalScrollbarSpacing = i2239[18]
  i2238.m_OnValueChanged = request.d('UnityEngine.UI.ScrollRect+ScrollRectEvent', i2239[19], i2238.m_OnValueChanged)
  return i2238
}

Deserializers["UnityEngine.UI.ScrollRect+ScrollRectEvent"] = function (request, data, root) {
  var i2240 = root || request.c( 'UnityEngine.UI.ScrollRect+ScrollRectEvent' )
  var i2241 = data
  i2240.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2241[0], i2240.m_PersistentCalls)
  return i2240
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i2242 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i2243 = data
  i2242.m_Spacing = i2243[0]
  i2242.m_ChildForceExpandWidth = !!i2243[1]
  i2242.m_ChildForceExpandHeight = !!i2243[2]
  i2242.m_ChildControlWidth = !!i2243[3]
  i2242.m_ChildControlHeight = !!i2243[4]
  i2242.m_ChildScaleWidth = !!i2243[5]
  i2242.m_ChildScaleHeight = !!i2243[6]
  i2242.m_ReverseArrangement = !!i2243[7]
  i2242.m_Padding = UnityEngine.RectOffset.FromPaddings(i2243[8], i2243[9], i2243[10], i2243[11])
  i2242.m_ChildAlignment = i2243[12]
  return i2242
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i2244 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i2245 = data
  i2244.m_HorizontalFit = i2245[0]
  i2244.m_VerticalFit = i2245[1]
  return i2244
}

Deserializers["SonatFramework.Scripts.Feature.Shop.UI.UIShopPackBase"] = function (request, data, root) {
  var i2246 = root || request.c( 'SonatFramework.Scripts.Feature.Shop.UI.UIShopPackBase' )
  var i2247 = data
  i2246.key = i2247[0]
  i2246.fallbackKey = i2247[1]
  request.r(i2247[2], i2247[3], 0, i2246, 'txtTitle')
  request.r(i2247[4], i2247[5], 0, i2246, 'textPrice')
  request.r(i2247[6], i2247[7], 0, i2246, 'buyButton')
  request.r(i2247[8], i2247[9], 0, i2246, 'uiRewardGroup')
  i2246.onBuySuccess = request.d('UnityEngine.Events.UnityEvent`1[[Sonat.Enums.ShopItemKey, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]]', i2247[10], i2246.onBuySuccess)
  return i2246
}

Deserializers["UnityEngine.Events.UnityEvent`1[[Sonat.Enums.ShopItemKey, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]]"] = function (request, data, root) {
  var i2248 = root || new (UnityEngine.Events.UnityEvent$1( Bridge.ns( 'Sonat.Enums.ShopItemKey' ) ))
  var i2249 = data
  i2248.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2249[0], i2248.m_PersistentCalls)
  return i2248
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.UIRewardGroup"] = function (request, data, root) {
  var i2250 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.UIRewardGroup' )
  var i2251 = data
  return i2250
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.UIItemGroup"] = function (request, data, root) {
  var i2252 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.UIItemGroup' )
  var i2253 = data
  i2252.maxSlot = i2253[0]
  i2252.order = i2253[1]
  request.r(i2253[2], i2253[3], 0, i2252, 'container')
  var i2255 = i2253[4]
  var i2254 = new (System.Collections.Generic.List$1(Bridge.ns('Sonat.Enums.GameResource')))
  for(var i = 0; i < i2255.length; i += 1) {
    i2254.add(i2255[i + 0]);
  }
  i2252.resources = i2254
  return i2252
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i2258 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i2259 = data
  i2258.m_StartCorner = i2259[0]
  i2258.m_StartAxis = i2259[1]
  i2258.m_CellSize = new pc.Vec2( i2259[2], i2259[3] )
  i2258.m_Spacing = new pc.Vec2( i2259[4], i2259[5] )
  i2258.m_Constraint = i2259[6]
  i2258.m_ConstraintCount = i2259[7]
  i2258.m_Padding = UnityEngine.RectOffset.FromPaddings(i2259[8], i2259[9], i2259[10], i2259[11])
  i2258.m_ChildAlignment = i2259[12]
  return i2258
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.UIRewardItem"] = function (request, data, root) {
  var i2260 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.UIRewardItem' )
  var i2261 = data
  request.r(i2261[0], i2261[1], 0, i2260, 'icon')
  request.r(i2261[2], i2261[3], 0, i2260, 'txtValue')
  i2260.customIcon = !!i2261[4]
  i2260.quantityFormat = i2261[5]
  i2260.timeFormat = i2261[6]
  i2260.iconNameFormat = i2261[7]
  return i2260
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.FixedImageRatio"] = function (request, data, root) {
  var i2262 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.FixedImageRatio' )
  var i2263 = data
  i2262.type = i2263[0]
  request.r(i2263[1], i2263[2], 0, i2262, 'image')
  return i2262
}

Deserializers["SonatFramework.Scripts.Feature.Lives.UI.UILives"] = function (request, data, root) {
  var i2264 = root || request.c( 'SonatFramework.Scripts.Feature.Lives.UI.UILives' )
  var i2265 = data
  i2264.resource = i2265[0]
  request.r(i2265[1], i2265[2], 0, i2264, 'icon')
  request.r(i2265[3], i2265[4], 0, i2264, 'txtValue')
  i2264.counterDuration = i2265[5]
  i2264.scaleSpeed = i2265[6]
  i2264.scaleMax = i2265[7]
  request.r(i2265[8], i2265[9], 0, i2264, 'plusObj')
  request.r(i2265[10], i2265[11], 0, i2264, 'timeCounter')
  request.r(i2265[12], i2265[13], 0, i2264, 'timeCounterRefill')
  request.r(i2265[14], i2265[15], 0, i2264, 'txtFullLives')
  request.r(i2265[16], i2265[17], 0, i2264, 'normalLives')
  request.r(i2265[18], i2265[19], 0, i2264, 'unlimitedLives')
  i2264.blockClick = !!i2265[20]
  request.r(i2265[21], i2265[22], 0, i2264, 'blastEffect')
  i2264.openPanelName = i2265[23]
  i2264.receiveSound = i2265[24]
  return i2264
}

Deserializers["SonatFramework.Scripts.UIModule.UIElements.UITimeCounter"] = function (request, data, root) {
  var i2266 = root || request.c( 'SonatFramework.Scripts.UIModule.UIElements.UITimeCounter' )
  var i2267 = data
  request.r(i2267[0], i2267[1], 0, i2266, 'txtTime')
  i2266.timeFomat = i2267[2]
  request.r(i2267[3], i2267[4], 0, i2266, 'go')
  return i2266
}

Deserializers["LevelButton"] = function (request, data, root) {
  var i2268 = root || request.c( 'LevelButton' )
  var i2269 = data
  request.r(i2269[0], i2269[1], 0, i2268, 'btnImage')
  request.r(i2269[2], i2269[3], 0, i2268, 'btnComp')
  request.r(i2269[4], i2269[5], 0, i2268, 'txtLevel')
  return i2268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i2270 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i2271 = data
  i2270.name = i2271[0]
  i2270.atlasId = i2271[1]
  i2270.mipmapCount = i2271[2]
  i2270.hdr = !!i2271[3]
  i2270.size = i2271[4]
  i2270.anisoLevel = i2271[5]
  i2270.filterMode = i2271[6]
  var i2273 = i2271[7]
  var i2272 = []
  for(var i = 0; i < i2273.length; i += 4) {
    i2272.push( UnityEngine.Rect.MinMaxRect(i2273[i + 0], i2273[i + 1], i2273[i + 2], i2273[i + 3]) );
  }
  i2270.rects = i2272
  i2270.wrapU = i2271[8]
  i2270.wrapV = i2271[9]
  return i2270
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2277 = data
  i2276.name = i2277[0]
  i2276.index = i2277[1]
  i2276.startup = !!i2277[2]
  return i2276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2279 = data
  i2278.aspect = i2279[0]
  i2278.orthographic = !!i2279[1]
  i2278.orthographicSize = i2279[2]
  i2278.backgroundColor = new pc.Color(i2279[3], i2279[4], i2279[5], i2279[6])
  i2278.nearClipPlane = i2279[7]
  i2278.farClipPlane = i2279[8]
  i2278.fieldOfView = i2279[9]
  i2278.depth = i2279[10]
  i2278.clearFlags = i2279[11]
  i2278.cullingMask = i2279[12]
  i2278.rect = i2279[13]
  request.r(i2279[14], i2279[15], 0, i2278, 'targetTexture')
  i2278.usePhysicalProperties = !!i2279[16]
  i2278.focalLength = i2279[17]
  i2278.sensorSize = new pc.Vec2( i2279[18], i2279[19] )
  i2278.lensShift = new pc.Vec2( i2279[20], i2279[21] )
  i2278.gateFit = i2279[22]
  i2278.commandBufferCount = i2279[23]
  i2278.cameraType = i2279[24]
  i2278.enabled = !!i2279[25]
  return i2278
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalCameraData"] = function (request, data, root) {
  var i2280 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalCameraData' )
  var i2281 = data
  i2280.m_RenderShadows = !!i2281[0]
  i2280.m_RequiresDepthTextureOption = i2281[1]
  i2280.m_RequiresOpaqueTextureOption = i2281[2]
  i2280.m_CameraType = i2281[3]
  var i2283 = i2281[4]
  var i2282 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Camera')))
  for(var i = 0; i < i2283.length; i += 2) {
  request.r(i2283[i + 0], i2283[i + 1], 1, i2282, '')
  }
  i2280.m_Cameras = i2282
  i2280.m_RendererIndex = i2281[5]
  i2280.m_VolumeLayerMask = UnityEngine.LayerMask.FromIntegerValue( i2281[6] )
  request.r(i2281[7], i2281[8], 0, i2280, 'm_VolumeTrigger')
  i2280.m_VolumeFrameworkUpdateModeOption = i2281[9]
  i2280.m_RenderPostProcessing = !!i2281[10]
  i2280.m_Antialiasing = i2281[11]
  i2280.m_AntialiasingQuality = i2281[12]
  i2280.m_StopNaN = !!i2281[13]
  i2280.m_Dithering = !!i2281[14]
  i2280.m_ClearDepth = !!i2281[15]
  i2280.m_AllowXRRendering = !!i2281[16]
  i2280.m_AllowHDROutput = !!i2281[17]
  i2280.m_UseScreenCoordOverride = !!i2281[18]
  i2280.m_ScreenSizeOverride = new pc.Vec4( i2281[19], i2281[20], i2281[21], i2281[22] )
  i2280.m_ScreenCoordScaleBias = new pc.Vec4( i2281[23], i2281[24], i2281[25], i2281[26] )
  i2280.m_RequiresDepthTexture = !!i2281[27]
  i2280.m_RequiresColorTexture = !!i2281[28]
  i2280.m_Version = i2281[29]
  i2280.m_TaaSettings = request.d('UnityEngine.Rendering.Universal.TemporalAA+Settings', i2281[30], i2280.m_TaaSettings)
  return i2280
}

Deserializers["UnityEngine.Rendering.Universal.TemporalAA+Settings"] = function (request, data, root) {
  var i2286 = root || request.c( 'UnityEngine.Rendering.Universal.TemporalAA+Settings' )
  var i2287 = data
  i2286.m_Quality = i2287[0]
  i2286.m_FrameInfluence = i2287[1]
  i2286.m_JitterScale = i2287[2]
  i2286.m_MipBias = i2287[3]
  i2286.m_VarianceClampScale = i2287[4]
  i2286.m_ContrastAdaptiveSharpening = i2287[5]
  return i2286
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i2288 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i2289 = data
  i2288.type = i2289[0]
  i2288.color = new pc.Color(i2289[1], i2289[2], i2289[3], i2289[4])
  i2288.cullingMask = i2289[5]
  i2288.intensity = i2289[6]
  i2288.range = i2289[7]
  i2288.spotAngle = i2289[8]
  i2288.shadows = i2289[9]
  i2288.shadowNormalBias = i2289[10]
  i2288.shadowBias = i2289[11]
  i2288.shadowStrength = i2289[12]
  i2288.shadowResolution = i2289[13]
  i2288.lightmapBakeType = i2289[14]
  i2288.renderMode = i2289[15]
  request.r(i2289[16], i2289[17], 0, i2288, 'cookie')
  i2288.cookieSize = i2289[18]
  i2288.shadowNearPlane = i2289[19]
  i2288.enabled = !!i2289[20]
  return i2288
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i2290 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i2291 = data
  i2290.m_Version = i2291[0]
  i2290.m_UsePipelineSettings = !!i2291[1]
  i2290.m_AdditionalLightsShadowResolutionTier = i2291[2]
  i2290.m_LightLayerMask = i2291[3]
  i2290.m_RenderingLayers = i2291[4]
  i2290.m_CustomShadowLayers = !!i2291[5]
  i2290.m_ShadowLayerMask = i2291[6]
  i2290.m_ShadowRenderingLayers = i2291[7]
  i2290.m_LightCookieSize = new pc.Vec2( i2291[8], i2291[9] )
  i2290.m_LightCookieOffset = new pc.Vec2( i2291[10], i2291[11] )
  i2290.m_SoftShadowQuality = i2291[12]
  return i2290
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i2292 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i2293 = data
  i2292.planeDistance = i2293[0]
  i2292.referencePixelsPerUnit = i2293[1]
  i2292.isFallbackOverlay = !!i2293[2]
  i2292.renderMode = i2293[3]
  i2292.renderOrder = i2293[4]
  i2292.sortingLayerName = i2293[5]
  i2292.sortingOrder = i2293[6]
  i2292.scaleFactor = i2293[7]
  request.r(i2293[8], i2293[9], 0, i2292, 'worldCamera')
  i2292.overrideSorting = !!i2293[10]
  i2292.pixelPerfect = !!i2293[11]
  i2292.targetDisplay = i2293[12]
  i2292.overridePixelPerfect = !!i2293[13]
  i2292.enabled = !!i2293[14]
  return i2292
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i2294 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i2295 = data
  i2294.m_UiScaleMode = i2295[0]
  i2294.m_ReferencePixelsPerUnit = i2295[1]
  i2294.m_ScaleFactor = i2295[2]
  i2294.m_ReferenceResolution = new pc.Vec2( i2295[3], i2295[4] )
  i2294.m_ScreenMatchMode = i2295[5]
  i2294.m_MatchWidthOrHeight = i2295[6]
  i2294.m_PhysicalUnit = i2295[7]
  i2294.m_FallbackScreenDPI = i2295[8]
  i2294.m_DefaultSpriteDPI = i2295[9]
  i2294.m_DynamicPixelsPerUnit = i2295[10]
  i2294.m_PresetInfoIsWorld = !!i2295[11]
  return i2294
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i2296 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i2297 = data
  i2296.m_IgnoreReversedGraphics = !!i2297[0]
  i2296.m_BlockingObjects = i2297[1]
  i2296.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i2297[2] )
  return i2296
}

Deserializers["UITabBase"] = function (request, data, root) {
  var i2298 = root || request.c( 'UITabBase' )
  var i2299 = data
  i2298.type = i2299[0]
  i2298.screenName = i2299[1]
  i2298.fitSize = !!i2299[2]
  request.r(i2299[3], i2299[4], 0, i2298, 'canvasGroup')
  i2298.fadeInDuration = i2299[5]
  i2298.fadeOutDuration = i2299[6]
  i2298.placement = i2299[7]
  return i2298
}

Deserializers["UnityEngine.UI.LayoutElement"] = function (request, data, root) {
  var i2300 = root || request.c( 'UnityEngine.UI.LayoutElement' )
  var i2301 = data
  i2300.m_IgnoreLayout = !!i2301[0]
  i2300.m_MinWidth = i2301[1]
  i2300.m_MinHeight = i2301[2]
  i2300.m_PreferredWidth = i2301[3]
  i2300.m_PreferredHeight = i2301[4]
  i2300.m_FlexibleWidth = i2301[5]
  i2300.m_FlexibleHeight = i2301[6]
  i2300.m_LayoutPriority = i2301[7]
  return i2300
}

Deserializers["HomePanel"] = function (request, data, root) {
  var i2302 = root || request.c( 'HomePanel' )
  var i2303 = data
  var i2305 = i2303[0]
  var i2304 = []
  for(var i = 0; i < i2305.length; i += 1) {
    i2304.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i2305[i + 0]) );
  }
  i2302.openTween = i2304
  var i2307 = i2303[1]
  var i2306 = []
  for(var i = 0; i < i2307.length; i += 1) {
    i2306.push( request.d('SonatFramework.Scripts.UIModule.TweenData', i2307[i + 0]) );
  }
  i2302.closeTween = i2306
  i2302.keepCached = !!i2303[2]
  i2302.pauseGame = !!i2303[3]
  i2302.ignoreTracking = !!i2303[4]
  request.r(i2303[5], i2303[6], 0, i2302, 'mapContent')
  request.r(i2303[7], i2303[8], 0, i2302, 'levelBtnPrefab')
  request.r(i2303[9], i2303[10], 0, i2302, 'gameConfig')
  i2302.trackingName = i2303[11]
  return i2302
}

Deserializers["SonatFramework.Scripts.UIModule.TweenData"] = function (request, data, root) {
  var i2310 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenData' )
  var i2311 = data
  request.r(i2311[0], i2311[1], 0, i2310, 'target')
  request.r(i2311[2], i2311[3], 0, i2310, 'configSO')
  i2310.custom = !!i2311[4]
  i2310.config = request.d('SonatFramework.Scripts.UIModule.TweenConfig', i2311[5], i2310.config)
  i2310.OnCompleted = request.d('System.Action', i2311[6], i2310.OnCompleted)
  return i2310
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i2312 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i2313 = data
  request.r(i2313[0], i2313[1], 0, i2312, 'm_ObjectArgument')
  i2312.m_ObjectArgumentAssemblyTypeName = i2313[2]
  i2312.m_IntArgument = i2313[3]
  i2312.m_FloatArgument = i2313[4]
  i2312.m_StringArgument = i2313[5]
  i2312.m_BoolArgument = !!i2313[6]
  return i2312
}

Deserializers["UINavigateSwapBar"] = function (request, data, root) {
  var i2314 = root || request.c( 'UINavigateSwapBar' )
  var i2315 = data
  request.r(i2315[0], i2315[1], 0, i2314, 'container')
  request.r(i2315[2], i2315[3], 0, i2314, 'highlight')
  i2314.tabStart = i2315[4]
  request.r(i2315[5], i2315[6], 0, i2314, 'tabContainer')
  return i2314
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i2316 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i2317 = data
  i2316.m_Spacing = i2317[0]
  i2316.m_ChildForceExpandWidth = !!i2317[1]
  i2316.m_ChildForceExpandHeight = !!i2317[2]
  i2316.m_ChildControlWidth = !!i2317[3]
  i2316.m_ChildControlHeight = !!i2317[4]
  i2316.m_ChildScaleWidth = !!i2317[5]
  i2316.m_ChildScaleHeight = !!i2317[6]
  i2316.m_ReverseArrangement = !!i2317[7]
  i2316.m_Padding = UnityEngine.RectOffset.FromPaddings(i2317[8], i2317[9], i2317[10], i2317[11])
  i2316.m_ChildAlignment = i2317[12]
  return i2316
}

Deserializers["UINavigationItem"] = function (request, data, root) {
  var i2318 = root || request.c( 'UINavigationItem' )
  var i2319 = data
  i2318.type = i2319[0]
  request.r(i2319[1], i2319[2], 0, i2318, 'icon')
  request.r(i2319[3], i2319[4], 0, i2318, 'txtName')
  request.r(i2319[5], i2319[6], 0, i2318, 'layoutElement')
  i2318.selectFlexibleWidth = i2319[7]
  i2318.scaleSelected = i2319[8]
  return i2318
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i2320 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i2321 = data
  request.r(i2321[0], i2321[1], 0, i2320, 'm_FirstSelected')
  i2320.m_sendNavigationEvents = !!i2321[2]
  i2320.m_DragThreshold = i2321[3]
  return i2320
}

Deserializers["UnityEngine.InputSystem.UI.InputSystemUIInputModule"] = function (request, data, root) {
  var i2322 = root || request.c( 'UnityEngine.InputSystem.UI.InputSystemUIInputModule' )
  var i2323 = data
  i2322.m_MoveRepeatDelay = i2323[0]
  i2322.m_MoveRepeatRate = i2323[1]
  request.r(i2323[2], i2323[3], 0, i2322, 'm_XRTrackingOrigin')
  request.r(i2323[4], i2323[5], 0, i2322, 'm_ActionsAsset')
  request.r(i2323[6], i2323[7], 0, i2322, 'm_PointAction')
  request.r(i2323[8], i2323[9], 0, i2322, 'm_MoveAction')
  request.r(i2323[10], i2323[11], 0, i2322, 'm_SubmitAction')
  request.r(i2323[12], i2323[13], 0, i2322, 'm_CancelAction')
  request.r(i2323[14], i2323[15], 0, i2322, 'm_LeftClickAction')
  request.r(i2323[16], i2323[17], 0, i2322, 'm_MiddleClickAction')
  request.r(i2323[18], i2323[19], 0, i2322, 'm_RightClickAction')
  request.r(i2323[20], i2323[21], 0, i2322, 'm_ScrollWheelAction')
  request.r(i2323[22], i2323[23], 0, i2322, 'm_TrackedDevicePositionAction')
  request.r(i2323[24], i2323[25], 0, i2322, 'm_TrackedDeviceOrientationAction')
  i2322.m_DeselectOnBackgroundClick = !!i2323[26]
  i2322.m_PointerBehavior = i2323[27]
  i2322.m_CursorLockBehavior = i2323[28]
  i2322.m_ScrollDeltaPerTick = i2323[29]
  i2322.m_SendPointerHoverToParent = !!i2323[30]
  return i2322
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i2324 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i2325 = data
  i2324.ambientIntensity = i2325[0]
  i2324.reflectionIntensity = i2325[1]
  i2324.ambientMode = i2325[2]
  i2324.ambientLight = new pc.Color(i2325[3], i2325[4], i2325[5], i2325[6])
  i2324.ambientSkyColor = new pc.Color(i2325[7], i2325[8], i2325[9], i2325[10])
  i2324.ambientGroundColor = new pc.Color(i2325[11], i2325[12], i2325[13], i2325[14])
  i2324.ambientEquatorColor = new pc.Color(i2325[15], i2325[16], i2325[17], i2325[18])
  i2324.fogColor = new pc.Color(i2325[19], i2325[20], i2325[21], i2325[22])
  i2324.fogEndDistance = i2325[23]
  i2324.fogStartDistance = i2325[24]
  i2324.fogDensity = i2325[25]
  i2324.fog = !!i2325[26]
  request.r(i2325[27], i2325[28], 0, i2324, 'skybox')
  i2324.fogMode = i2325[29]
  var i2327 = i2325[30]
  var i2326 = []
  for(var i = 0; i < i2327.length; i += 1) {
    i2326.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i2327[i + 0]) );
  }
  i2324.lightmaps = i2326
  i2324.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i2325[31], i2324.lightProbes)
  i2324.lightmapsMode = i2325[32]
  i2324.mixedBakeMode = i2325[33]
  i2324.environmentLightingMode = i2325[34]
  i2324.ambientProbe = new pc.SphericalHarmonicsL2(i2325[35])
  i2324.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i2325[36])
  i2324.useReferenceAmbientProbe = !!i2325[37]
  request.r(i2325[38], i2325[39], 0, i2324, 'customReflection')
  request.r(i2325[40], i2325[41], 0, i2324, 'defaultReflection')
  i2324.defaultReflectionMode = i2325[42]
  i2324.defaultReflectionResolution = i2325[43]
  i2324.sunLightObjectId = i2325[44]
  i2324.pixelLightCount = i2325[45]
  i2324.defaultReflectionHDR = !!i2325[46]
  i2324.hasLightDataAsset = !!i2325[47]
  i2324.hasManualGenerate = !!i2325[48]
  return i2324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i2330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i2331 = data
  request.r(i2331[0], i2331[1], 0, i2330, 'lightmapColor')
  request.r(i2331[2], i2331[3], 0, i2330, 'lightmapDirection')
  return i2330
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i2332 = root || new UnityEngine.LightProbes()
  var i2333 = data
  return i2332
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i2340 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i2341 = data
  var i2343 = i2341[0]
  var i2342 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i2343.length; i += 1) {
    i2342.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i2343[i + 0]));
  }
  i2340.ShaderCompilationErrors = i2342
  i2340.name = i2341[1]
  i2340.guid = i2341[2]
  var i2345 = i2341[3]
  var i2344 = []
  for(var i = 0; i < i2345.length; i += 1) {
    i2344.push( i2345[i + 0] );
  }
  i2340.shaderDefinedKeywords = i2344
  var i2347 = i2341[4]
  var i2346 = []
  for(var i = 0; i < i2347.length; i += 1) {
    i2346.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i2347[i + 0]) );
  }
  i2340.passes = i2346
  var i2349 = i2341[5]
  var i2348 = []
  for(var i = 0; i < i2349.length; i += 1) {
    i2348.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2349[i + 0]) );
  }
  i2340.usePasses = i2348
  var i2351 = i2341[6]
  var i2350 = []
  for(var i = 0; i < i2351.length; i += 1) {
    i2350.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2351[i + 0]) );
  }
  i2340.defaultParameterValues = i2350
  request.r(i2341[7], i2341[8], 0, i2340, 'unityFallbackShader')
  i2340.readDepth = !!i2341[9]
  i2340.hasDepthOnlyPass = !!i2341[10]
  i2340.isCreatedByShaderGraph = !!i2341[11]
  i2340.disableBatching = !!i2341[12]
  i2340.compiled = !!i2341[13]
  return i2340
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2354 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2355 = data
  i2354.shaderName = i2355[0]
  i2354.errorMessage = i2355[1]
  return i2354
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2360 = root || new pc.UnityShaderPass()
  var i2361 = data
  i2360.id = i2361[0]
  i2360.subShaderIndex = i2361[1]
  i2360.name = i2361[2]
  i2360.passType = i2361[3]
  i2360.grabPassTextureName = i2361[4]
  i2360.usePass = !!i2361[5]
  i2360.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[6], i2360.zTest)
  i2360.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[7], i2360.zWrite)
  i2360.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[8], i2360.culling)
  i2360.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2361[9], i2360.blending)
  i2360.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2361[10], i2360.alphaBlending)
  i2360.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[11], i2360.colorWriteMask)
  i2360.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[12], i2360.offsetUnits)
  i2360.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[13], i2360.offsetFactor)
  i2360.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[14], i2360.stencilRef)
  i2360.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[15], i2360.stencilReadMask)
  i2360.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2361[16], i2360.stencilWriteMask)
  i2360.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2361[17], i2360.stencilOp)
  i2360.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2361[18], i2360.stencilOpFront)
  i2360.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2361[19], i2360.stencilOpBack)
  var i2363 = i2361[20]
  var i2362 = []
  for(var i = 0; i < i2363.length; i += 1) {
    i2362.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2363[i + 0]) );
  }
  i2360.tags = i2362
  var i2365 = i2361[21]
  var i2364 = []
  for(var i = 0; i < i2365.length; i += 1) {
    i2364.push( i2365[i + 0] );
  }
  i2360.passDefinedKeywords = i2364
  var i2367 = i2361[22]
  var i2366 = []
  for(var i = 0; i < i2367.length; i += 1) {
    i2366.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2367[i + 0]) );
  }
  i2360.passDefinedKeywordGroups = i2366
  var i2369 = i2361[23]
  var i2368 = []
  for(var i = 0; i < i2369.length; i += 1) {
    i2368.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2369[i + 0]) );
  }
  i2360.variants = i2368
  var i2371 = i2361[24]
  var i2370 = []
  for(var i = 0; i < i2371.length; i += 1) {
    i2370.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2371[i + 0]) );
  }
  i2360.excludedVariants = i2370
  i2360.hasDepthReader = !!i2361[25]
  return i2360
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2372 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2373 = data
  i2372.val = i2373[0]
  i2372.name = i2373[1]
  return i2372
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2374 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2375 = data
  i2374.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2375[0], i2374.src)
  i2374.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2375[1], i2374.dst)
  i2374.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2375[2], i2374.op)
  return i2374
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2376 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2377 = data
  i2376.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2377[0], i2376.pass)
  i2376.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2377[1], i2376.fail)
  i2376.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2377[2], i2376.zFail)
  i2376.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2377[3], i2376.comp)
  return i2376
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2380 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2381 = data
  i2380.name = i2381[0]
  i2380.value = i2381[1]
  return i2380
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i2384 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i2385 = data
  var i2387 = i2385[0]
  var i2386 = []
  for(var i = 0; i < i2387.length; i += 1) {
    i2386.push( i2387[i + 0] );
  }
  i2384.keywords = i2386
  i2384.hasDiscard = !!i2385[1]
  return i2384
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i2390 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i2391 = data
  i2390.passId = i2391[0]
  i2390.subShaderIndex = i2391[1]
  var i2393 = i2391[2]
  var i2392 = []
  for(var i = 0; i < i2393.length; i += 1) {
    i2392.push( i2393[i + 0] );
  }
  i2390.keywords = i2392
  i2390.vertexProgram = i2391[3]
  i2390.fragmentProgram = i2391[4]
  i2390.exportedForWebGl2 = !!i2391[5]
  i2390.readDepth = !!i2391[6]
  return i2390
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i2396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i2397 = data
  request.r(i2397[0], i2397[1], 0, i2396, 'shader')
  i2396.pass = i2397[2]
  return i2396
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i2400 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i2401 = data
  i2400.name = i2401[0]
  i2400.type = i2401[1]
  i2400.value = new pc.Vec4( i2401[2], i2401[3], i2401[4], i2401[5] )
  i2400.textureValue = i2401[6]
  i2400.shaderPropertyFlag = i2401[7]
  return i2400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i2402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i2403 = data
  i2402.name = i2403[0]
  request.r(i2403[1], i2403[2], 0, i2402, 'texture')
  i2402.aabb = i2403[3]
  i2402.vertices = i2403[4]
  i2402.triangles = i2403[5]
  i2402.textureRect = UnityEngine.Rect.MinMaxRect(i2403[6], i2403[7], i2403[8], i2403[9])
  i2402.packedRect = UnityEngine.Rect.MinMaxRect(i2403[10], i2403[11], i2403[12], i2403[13])
  i2402.border = new pc.Vec4( i2403[14], i2403[15], i2403[16], i2403[17] )
  i2402.transparency = i2403[18]
  i2402.bounds = i2403[19]
  i2402.pixelsPerUnit = i2403[20]
  i2402.textureWidth = i2403[21]
  i2402.textureHeight = i2403[22]
  i2402.nativeSize = new pc.Vec2( i2403[23], i2403[24] )
  i2402.pivot = new pc.Vec2( i2403[25], i2403[26] )
  i2402.textureRectOffset = new pc.Vec2( i2403[27], i2403[28] )
  return i2402
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i2404 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i2405 = data
  i2404.name = i2405[0]
  i2404.ascent = i2405[1]
  i2404.originalLineHeight = i2405[2]
  i2404.fontSize = i2405[3]
  var i2407 = i2405[4]
  var i2406 = []
  for(var i = 0; i < i2407.length; i += 1) {
    i2406.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i2407[i + 0]) );
  }
  i2404.characterInfo = i2406
  request.r(i2405[5], i2405[6], 0, i2404, 'texture')
  i2404.originalFontSize = i2405[7]
  return i2404
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i2410 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i2411 = data
  i2410.index = i2411[0]
  i2410.advance = i2411[1]
  i2410.bearing = i2411[2]
  i2410.glyphWidth = i2411[3]
  i2410.glyphHeight = i2411[4]
  i2410.minX = i2411[5]
  i2410.maxX = i2411[6]
  i2410.minY = i2411[7]
  i2410.maxY = i2411[8]
  i2410.uvBottomLeftX = i2411[9]
  i2410.uvBottomLeftY = i2411[10]
  i2410.uvBottomRightX = i2411[11]
  i2410.uvBottomRightY = i2411[12]
  i2410.uvTopLeftX = i2411[13]
  i2410.uvTopLeftY = i2411[14]
  i2410.uvTopRightX = i2411[15]
  i2410.uvTopRightY = i2411[16]
  return i2410
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i2412 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i2413 = data
  i2412.name = i2413[0]
  i2412.bytes64 = i2413[1]
  i2412.data = i2413[2]
  return i2412
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i2414 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i2415 = data
  request.r(i2415[0], i2415[1], 0, i2414, 'atlas')
  i2414.normalStyle = i2415[2]
  i2414.normalSpacingOffset = i2415[3]
  i2414.boldStyle = i2415[4]
  i2414.boldSpacing = i2415[5]
  i2414.italicStyle = i2415[6]
  i2414.tabSize = i2415[7]
  i2414.hashCode = i2415[8]
  request.r(i2415[9], i2415[10], 0, i2414, 'material')
  i2414.materialHashCode = i2415[11]
  i2414.m_Version = i2415[12]
  i2414.m_SourceFontFileGUID = i2415[13]
  request.r(i2415[14], i2415[15], 0, i2414, 'm_SourceFontFile_EditorRef')
  request.r(i2415[16], i2415[17], 0, i2414, 'm_SourceFontFile')
  i2414.m_AtlasPopulationMode = i2415[18]
  i2414.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2415[19], i2414.m_FaceInfo)
  var i2417 = i2415[20]
  var i2416 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i2417.length; i += 1) {
    i2416.add(request.d('UnityEngine.TextCore.Glyph', i2417[i + 0]));
  }
  i2414.m_GlyphTable = i2416
  var i2419 = i2415[21]
  var i2418 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i2419.length; i += 1) {
    i2418.add(request.d('TMPro.TMP_Character', i2419[i + 0]));
  }
  i2414.m_CharacterTable = i2418
  var i2421 = i2415[22]
  var i2420 = []
  for(var i = 0; i < i2421.length; i += 2) {
  request.r(i2421[i + 0], i2421[i + 1], 2, i2420, '')
  }
  i2414.m_AtlasTextures = i2420
  i2414.m_AtlasTextureIndex = i2415[23]
  i2414.m_IsMultiAtlasTexturesEnabled = !!i2415[24]
  i2414.m_ClearDynamicDataOnBuild = !!i2415[25]
  var i2423 = i2415[26]
  var i2422 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2423.length; i += 1) {
    i2422.add(request.d('UnityEngine.TextCore.GlyphRect', i2423[i + 0]));
  }
  i2414.m_UsedGlyphRects = i2422
  var i2425 = i2415[27]
  var i2424 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2425.length; i += 1) {
    i2424.add(request.d('UnityEngine.TextCore.GlyphRect', i2425[i + 0]));
  }
  i2414.m_FreeGlyphRects = i2424
  i2414.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i2415[28], i2414.m_fontInfo)
  i2414.m_AtlasWidth = i2415[29]
  i2414.m_AtlasHeight = i2415[30]
  i2414.m_AtlasPadding = i2415[31]
  i2414.m_AtlasRenderMode = i2415[32]
  var i2427 = i2415[33]
  var i2426 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i2427.length; i += 1) {
    i2426.add(request.d('TMPro.TMP_Glyph', i2427[i + 0]));
  }
  i2414.m_glyphInfoList = i2426
  i2414.m_KerningTable = request.d('TMPro.KerningTable', i2415[34], i2414.m_KerningTable)
  i2414.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i2415[35], i2414.m_FontFeatureTable)
  var i2429 = i2415[36]
  var i2428 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2429.length; i += 2) {
  request.r(i2429[i + 0], i2429[i + 1], 1, i2428, '')
  }
  i2414.fallbackFontAssets = i2428
  var i2431 = i2415[37]
  var i2430 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2431.length; i += 2) {
  request.r(i2431[i + 0], i2431[i + 1], 1, i2430, '')
  }
  i2414.m_FallbackFontAssetTable = i2430
  i2414.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i2415[38], i2414.m_CreationSettings)
  var i2433 = i2415[39]
  var i2432 = []
  for(var i = 0; i < i2433.length; i += 1) {
    i2432.push( request.d('TMPro.TMP_FontWeightPair', i2433[i + 0]) );
  }
  i2414.m_FontWeightTable = i2432
  var i2435 = i2415[40]
  var i2434 = []
  for(var i = 0; i < i2435.length; i += 1) {
    i2434.push( request.d('TMPro.TMP_FontWeightPair', i2435[i + 0]) );
  }
  i2414.fontWeights = i2434
  return i2414
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i2436 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i2437 = data
  i2436.m_FaceIndex = i2437[0]
  i2436.m_FamilyName = i2437[1]
  i2436.m_StyleName = i2437[2]
  i2436.m_PointSize = i2437[3]
  i2436.m_Scale = i2437[4]
  i2436.m_UnitsPerEM = i2437[5]
  i2436.m_LineHeight = i2437[6]
  i2436.m_AscentLine = i2437[7]
  i2436.m_CapLine = i2437[8]
  i2436.m_MeanLine = i2437[9]
  i2436.m_Baseline = i2437[10]
  i2436.m_DescentLine = i2437[11]
  i2436.m_SuperscriptOffset = i2437[12]
  i2436.m_SuperscriptSize = i2437[13]
  i2436.m_SubscriptOffset = i2437[14]
  i2436.m_SubscriptSize = i2437[15]
  i2436.m_UnderlineOffset = i2437[16]
  i2436.m_UnderlineThickness = i2437[17]
  i2436.m_StrikethroughOffset = i2437[18]
  i2436.m_StrikethroughThickness = i2437[19]
  i2436.m_TabWidth = i2437[20]
  return i2436
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i2440 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i2441 = data
  i2440.m_Index = i2441[0]
  i2440.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2441[1], i2440.m_Metrics)
  i2440.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2441[2], i2440.m_GlyphRect)
  i2440.m_Scale = i2441[3]
  i2440.m_AtlasIndex = i2441[4]
  i2440.m_ClassDefinitionType = i2441[5]
  return i2440
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i2444 = root || request.c( 'TMPro.TMP_Character' )
  var i2445 = data
  i2444.m_ElementType = i2445[0]
  i2444.m_Unicode = i2445[1]
  i2444.m_GlyphIndex = i2445[2]
  i2444.m_Scale = i2445[3]
  return i2444
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i2450 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i2451 = data
  i2450.m_X = i2451[0]
  i2450.m_Y = i2451[1]
  i2450.m_Width = i2451[2]
  i2450.m_Height = i2451[3]
  return i2450
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i2452 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i2453 = data
  i2452.Name = i2453[0]
  i2452.PointSize = i2453[1]
  i2452.Scale = i2453[2]
  i2452.CharacterCount = i2453[3]
  i2452.LineHeight = i2453[4]
  i2452.Baseline = i2453[5]
  i2452.Ascender = i2453[6]
  i2452.CapHeight = i2453[7]
  i2452.Descender = i2453[8]
  i2452.CenterLine = i2453[9]
  i2452.SuperscriptOffset = i2453[10]
  i2452.SubscriptOffset = i2453[11]
  i2452.SubSize = i2453[12]
  i2452.Underline = i2453[13]
  i2452.UnderlineThickness = i2453[14]
  i2452.strikethrough = i2453[15]
  i2452.strikethroughThickness = i2453[16]
  i2452.TabWidth = i2453[17]
  i2452.Padding = i2453[18]
  i2452.AtlasWidth = i2453[19]
  i2452.AtlasHeight = i2453[20]
  return i2452
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i2456 = root || request.c( 'TMPro.TMP_Glyph' )
  var i2457 = data
  i2456.id = i2457[0]
  i2456.x = i2457[1]
  i2456.y = i2457[2]
  i2456.width = i2457[3]
  i2456.height = i2457[4]
  i2456.xOffset = i2457[5]
  i2456.yOffset = i2457[6]
  i2456.xAdvance = i2457[7]
  i2456.scale = i2457[8]
  return i2456
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i2458 = root || request.c( 'TMPro.KerningTable' )
  var i2459 = data
  var i2461 = i2459[0]
  var i2460 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i2461.length; i += 1) {
    i2460.add(request.d('TMPro.KerningPair', i2461[i + 0]));
  }
  i2458.kerningPairs = i2460
  return i2458
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i2464 = root || request.c( 'TMPro.KerningPair' )
  var i2465 = data
  i2464.xOffset = i2465[0]
  i2464.m_FirstGlyph = i2465[1]
  i2464.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2465[2], i2464.m_FirstGlyphAdjustments)
  i2464.m_SecondGlyph = i2465[3]
  i2464.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2465[4], i2464.m_SecondGlyphAdjustments)
  i2464.m_IgnoreSpacingAdjustments = !!i2465[5]
  return i2464
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i2466 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i2467 = data
  var i2469 = i2467[0]
  var i2468 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i2469.length; i += 1) {
    i2468.add(request.d('TMPro.TMP_GlyphPairAdjustmentRecord', i2469[i + 0]));
  }
  i2466.m_GlyphPairAdjustmentRecords = i2468
  return i2466
}

Deserializers["TMPro.TMP_GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i2472 = root || request.c( 'TMPro.TMP_GlyphPairAdjustmentRecord' )
  var i2473 = data
  i2472.m_FirstAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i2473[0], i2472.m_FirstAdjustmentRecord)
  i2472.m_SecondAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i2473[1], i2472.m_SecondAdjustmentRecord)
  i2472.m_FeatureLookupFlags = i2473[2]
  return i2472
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i2476 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i2477 = data
  i2476.sourceFontFileName = i2477[0]
  i2476.sourceFontFileGUID = i2477[1]
  i2476.pointSizeSamplingMode = i2477[2]
  i2476.pointSize = i2477[3]
  i2476.padding = i2477[4]
  i2476.packingMode = i2477[5]
  i2476.atlasWidth = i2477[6]
  i2476.atlasHeight = i2477[7]
  i2476.characterSetSelectionMode = i2477[8]
  i2476.characterSequence = i2477[9]
  i2476.referencedFontAssetGUID = i2477[10]
  i2476.referencedTextAssetGUID = i2477[11]
  i2476.fontStyle = i2477[12]
  i2476.fontStyleModifier = i2477[13]
  i2476.renderMode = i2477[14]
  i2476.includeFontFeatures = !!i2477[15]
  return i2476
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i2480 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i2481 = data
  request.r(i2481[0], i2481[1], 0, i2480, 'regularTypeface')
  request.r(i2481[2], i2481[3], 0, i2480, 'italicTypeface')
  return i2480
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i2482 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i2483 = data
  i2482.m_Width = i2483[0]
  i2482.m_Height = i2483[1]
  i2482.m_HorizontalBearingX = i2483[2]
  i2482.m_HorizontalBearingY = i2483[3]
  i2482.m_HorizontalAdvance = i2483[4]
  return i2482
}

Deserializers["TMPro.TMP_GlyphAdjustmentRecord"] = function (request, data, root) {
  var i2484 = root || request.c( 'TMPro.TMP_GlyphAdjustmentRecord' )
  var i2485 = data
  i2484.m_GlyphIndex = i2485[0]
  i2484.m_GlyphValueRecord = request.d('TMPro.TMP_GlyphValueRecord', i2485[1], i2484.m_GlyphValueRecord)
  return i2484
}

Deserializers["TMPro.TMP_GlyphValueRecord"] = function (request, data, root) {
  var i2486 = root || request.c( 'TMPro.TMP_GlyphValueRecord' )
  var i2487 = data
  i2486.m_XPlacement = i2487[0]
  i2486.m_YPlacement = i2487[1]
  i2486.m_XAdvance = i2487[2]
  i2486.m_YAdvance = i2487[3]
  return i2486
}

Deserializers["GameConfig"] = function (request, data, root) {
  var i2488 = root || request.c( 'GameConfig' )
  var i2489 = data
  i2488.towerHeightThreshold = i2489[0]
  i2488.towerHeightRatio = i2489[1]
  i2488.towerDropAdjustDuration = i2489[2]
  i2488.towerHeightSmoothDuration = i2489[3]
  i2488.towerHeightEase = i2489[4]
  i2488.edgeRotateDelay = i2489[5]
  i2488.dragHoldTime = i2489[6]
  i2488.blockDragSensitivity = i2489[7]
  i2488.useAbsolutePositioning = !!i2489[8]
  i2488.absolutePositionSmoothing = i2489[9]
  i2488.edgeScrollThreshold = i2489[10]
  i2488.edgeScrollSpeed = i2489[11]
  i2488.baseSmoothTime = i2489[12]
  i2488.fastSmoothTime = i2489[13]
  i2488.deadzoneAngle = i2489[14]
  i2488.buttonRotateDuration = i2489[15]
  i2488.buttonRotateEase = i2489[16]
  i2488.towerSnapDuration = i2489[17]
  i2488.towerSnapEase = i2489[18]
  i2488.dropDuration = i2489[19]
  i2488.dropEase = i2489[20]
  request.r(i2489[21], i2489[22], 0, i2488, 'blockPalette')
  i2488.ghostAlpha = i2489[23]
  i2488.faceWidth = i2489[24]
  i2488.height = i2489[25]
  i2488.tileSize = i2489[26]
  i2488.spawnY = i2489[27]
  i2488.score1Line = i2489[28]
  i2488.score2Lines = i2489[29]
  i2488.score3Lines = i2489[30]
  i2488.score4Lines = i2489[31]
  i2488.pointsPerRow = i2489[32]
  i2488.useMultiLineBonus = !!i2489[33]
  i2488.multiLineMultiplier = i2489[34]
  i2488.maxHeight = i2489[35]
  i2488.warningThreshold = i2489[36]
  i2488.totalLevelCount = i2489[37]
  i2488.warningColor = new pc.Color(i2489[38], i2489[39], i2489[40], i2489[41])
  i2488.gameOverColor = new pc.Color(i2489[42], i2489[43], i2489[44], i2489[45])
  i2488.pulseDuration = i2489[46]
  i2488.winReward = request.d('SonatFramework.Systems.InventoryManagement.GameResources.ResourceData', i2489[47], i2488.winReward)
  i2488.playOnPrice = request.d('SonatFramework.Systems.InventoryManagement.GameResources.ResourceData', i2489[48], i2488.playOnPrice)
  return i2488
}

Deserializers["SonatFramework.Systems.InventoryManagement.GameResources.ResourceData"] = function (request, data, root) {
  var i2490 = root || request.c( 'SonatFramework.Systems.InventoryManagement.GameResources.ResourceData' )
  var i2491 = data
  i2490.gameResource = i2491[0]
  i2490.id = i2491[1]
  i2490.quantity = i2491[2]
  i2490.seconds = System.Int64(i2491[3])
  i2490.timestamp = System.Int64(i2491[4])
  i2490.onUpdate = request.d('System.Action', i2491[5], i2490.onUpdate)
  return i2490
}

Deserializers["System.Action"] = function (request, data, root) {
  var i2492 = root || request.c( 'System.Action' )
  var i2493 = data
  return i2492
}

Deserializers["BlockPaletteSO"] = function (request, data, root) {
  var i2494 = root || request.c( 'BlockPaletteSO' )
  var i2495 = data
  var i2497 = i2495[0]
  var i2496 = []
  for(var i = 0; i < i2497.length; i += 2) {
  request.r(i2497[i + 0], i2497[i + 1], 2, i2496, '')
  }
  i2494.blockMaterials = i2496
  request.r(i2495[1], i2495[2], 0, i2494, 'ghostMaterial')
  request.r(i2495[3], i2495[4], 0, i2494, 'floodMaterial')
  request.r(i2495[5], i2495[6], 0, i2494, 'previewOverlayMaterial')
  return i2494
}

Deserializers["UnityEngine.InputSystem.InputActionAsset"] = function (request, data, root) {
  var i2498 = root || request.c( 'UnityEngine.InputSystem.InputActionAsset' )
  var i2499 = data
  var i2501 = i2499[0]
  var i2500 = []
  for(var i = 0; i < i2501.length; i += 1) {
    i2500.push( request.d('UnityEngine.InputSystem.InputActionMap', i2501[i + 0]) );
  }
  i2498.m_ActionMaps = i2500
  var i2503 = i2499[1]
  var i2502 = []
  for(var i = 0; i < i2503.length; i += 1) {
    i2502.push( request.d('UnityEngine.InputSystem.InputControlScheme', i2503[i + 0]) );
  }
  i2498.m_ControlSchemes = i2502
  i2498.m_IsProjectWide = !!i2499[2]
  return i2498
}

Deserializers["UnityEngine.InputSystem.InputActionMap"] = function (request, data, root) {
  var i2506 = root || request.c( 'UnityEngine.InputSystem.InputActionMap' )
  var i2507 = data
  i2506.m_Name = i2507[0]
  i2506.m_Id = i2507[1]
  request.r(i2507[2], i2507[3], 0, i2506, 'm_Asset')
  var i2509 = i2507[4]
  var i2508 = []
  for(var i = 0; i < i2509.length; i += 1) {
    i2508.push( request.d('UnityEngine.InputSystem.InputAction', i2509[i + 0]) );
  }
  i2506.m_Actions = i2508
  var i2511 = i2507[5]
  var i2510 = []
  for(var i = 0; i < i2511.length; i += 1) {
    i2510.push( request.d('UnityEngine.InputSystem.InputBinding', i2511[i + 0]) );
  }
  i2506.m_Bindings = i2510
  return i2506
}

Deserializers["UnityEngine.InputSystem.InputAction"] = function (request, data, root) {
  var i2514 = root || request.c( 'UnityEngine.InputSystem.InputAction' )
  var i2515 = data
  i2514.m_Name = i2515[0]
  i2514.m_Type = i2515[1]
  i2514.m_ExpectedControlType = i2515[2]
  i2514.m_Id = i2515[3]
  i2514.m_Processors = i2515[4]
  i2514.m_Interactions = i2515[5]
  var i2517 = i2515[6]
  var i2516 = []
  for(var i = 0; i < i2517.length; i += 1) {
    i2516.push( request.d('UnityEngine.InputSystem.InputBinding', i2517[i + 0]) );
  }
  i2514.m_SingletonActionBindings = i2516
  i2514.m_Flags = i2515[7]
  return i2514
}

Deserializers["UnityEngine.InputSystem.InputBinding"] = function (request, data, root) {
  var i2520 = root || request.c( 'UnityEngine.InputSystem.InputBinding' )
  var i2521 = data
  i2520.m_Name = i2521[0]
  i2520.m_Id = i2521[1]
  i2520.m_Path = i2521[2]
  i2520.m_Interactions = i2521[3]
  i2520.m_Processors = i2521[4]
  i2520.m_Groups = i2521[5]
  i2520.m_Action = i2521[6]
  i2520.m_Flags = i2521[7]
  return i2520
}

Deserializers["UnityEngine.InputSystem.InputControlScheme"] = function (request, data, root) {
  var i2524 = root || request.c( 'UnityEngine.InputSystem.InputControlScheme' )
  var i2525 = data
  i2524.m_Name = i2525[0]
  i2524.m_BindingGroup = i2525[1]
  var i2527 = i2525[2]
  var i2526 = []
  for(var i = 0; i < i2527.length; i += 1) {
    i2526.push( request.d('UnityEngine.InputSystem.InputControlScheme+DeviceRequirement', i2527[i + 0]) );
  }
  i2524.m_DeviceRequirements = i2526
  return i2524
}

Deserializers["UnityEngine.InputSystem.InputControlScheme+DeviceRequirement"] = function (request, data, root) {
  var i2530 = root || request.c( 'UnityEngine.InputSystem.InputControlScheme+DeviceRequirement' )
  var i2531 = data
  i2530.m_ControlPath = i2531[0]
  i2530.m_Flags = i2531[1]
  return i2530
}

Deserializers["UnityEngine.InputSystem.InputActionReference"] = function (request, data, root) {
  var i2532 = root || request.c( 'UnityEngine.InputSystem.InputActionReference' )
  var i2533 = data
  request.r(i2533[0], i2533[1], 0, i2532, 'm_Asset')
  i2532.m_ActionId = i2533[2]
  return i2532
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i2534 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i2535 = data
  i2534.useSafeMode = !!i2535[0]
  i2534.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i2535[1], i2534.safeModeOptions)
  i2534.timeScale = i2535[2]
  i2534.unscaledTimeScale = i2535[3]
  i2534.useSmoothDeltaTime = !!i2535[4]
  i2534.maxSmoothUnscaledTime = i2535[5]
  i2534.rewindCallbackMode = i2535[6]
  i2534.showUnityEditorReport = !!i2535[7]
  i2534.logBehaviour = i2535[8]
  i2534.drawGizmos = !!i2535[9]
  i2534.defaultRecyclable = !!i2535[10]
  i2534.defaultAutoPlay = i2535[11]
  i2534.defaultUpdateType = i2535[12]
  i2534.defaultTimeScaleIndependent = !!i2535[13]
  i2534.defaultEaseType = i2535[14]
  i2534.defaultEaseOvershootOrAmplitude = i2535[15]
  i2534.defaultEasePeriod = i2535[16]
  i2534.defaultAutoKill = !!i2535[17]
  i2534.defaultLoopType = i2535[18]
  i2534.debugMode = !!i2535[19]
  i2534.debugStoreTargetId = !!i2535[20]
  i2534.showPreviewPanel = !!i2535[21]
  i2534.storeSettingsLocation = i2535[22]
  i2534.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i2535[23], i2534.modules)
  i2534.createASMDEF = !!i2535[24]
  i2534.showPlayingTweens = !!i2535[25]
  i2534.showPausedTweens = !!i2535[26]
  return i2534
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i2536 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i2537 = data
  i2536.logBehaviour = i2537[0]
  i2536.nestedTweenFailureBehaviour = i2537[1]
  return i2536
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i2538 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i2539 = data
  i2538.showPanel = !!i2539[0]
  i2538.audioEnabled = !!i2539[1]
  i2538.physicsEnabled = !!i2539[2]
  i2538.physics2DEnabled = !!i2539[3]
  i2538.spriteEnabled = !!i2539[4]
  i2538.uiEnabled = !!i2539[5]
  i2538.textMeshProEnabled = !!i2539[6]
  i2538.tk2DEnabled = !!i2539[7]
  i2538.deAudioEnabled = !!i2539[8]
  i2538.deUnityExtendedEnabled = !!i2539[9]
  i2538.epoOutlineEnabled = !!i2539[10]
  return i2538
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i2540 = root || request.c( 'TMPro.TMP_Settings' )
  var i2541 = data
  i2540.m_enableWordWrapping = !!i2541[0]
  i2540.m_enableKerning = !!i2541[1]
  i2540.m_enableExtraPadding = !!i2541[2]
  i2540.m_enableTintAllSprites = !!i2541[3]
  i2540.m_enableParseEscapeCharacters = !!i2541[4]
  i2540.m_EnableRaycastTarget = !!i2541[5]
  i2540.m_GetFontFeaturesAtRuntime = !!i2541[6]
  i2540.m_missingGlyphCharacter = i2541[7]
  i2540.m_warningsDisabled = !!i2541[8]
  request.r(i2541[9], i2541[10], 0, i2540, 'm_defaultFontAsset')
  i2540.m_defaultFontAssetPath = i2541[11]
  i2540.m_defaultFontSize = i2541[12]
  i2540.m_defaultAutoSizeMinRatio = i2541[13]
  i2540.m_defaultAutoSizeMaxRatio = i2541[14]
  i2540.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i2541[15], i2541[16] )
  i2540.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i2541[17], i2541[18] )
  i2540.m_autoSizeTextContainer = !!i2541[19]
  i2540.m_IsTextObjectScaleStatic = !!i2541[20]
  var i2543 = i2541[21]
  var i2542 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2543.length; i += 2) {
  request.r(i2543[i + 0], i2543[i + 1], 1, i2542, '')
  }
  i2540.m_fallbackFontAssets = i2542
  i2540.m_matchMaterialPreset = !!i2541[22]
  request.r(i2541[23], i2541[24], 0, i2540, 'm_defaultSpriteAsset')
  i2540.m_defaultSpriteAssetPath = i2541[25]
  i2540.m_enableEmojiSupport = !!i2541[26]
  i2540.m_MissingCharacterSpriteUnicode = i2541[27]
  i2540.m_defaultColorGradientPresetsPath = i2541[28]
  request.r(i2541[29], i2541[30], 0, i2540, 'm_defaultStyleSheet')
  i2540.m_StyleSheetsResourcePath = i2541[31]
  request.r(i2541[32], i2541[33], 0, i2540, 'm_leadingCharacters')
  request.r(i2541[34], i2541[35], 0, i2540, 'm_followingCharacters')
  i2540.m_UseModernHangulLineBreakingRules = !!i2541[36]
  return i2540
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i2544 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i2545 = data
  request.r(i2545[0], i2545[1], 0, i2544, 'spriteSheet')
  var i2547 = i2545[2]
  var i2546 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i2547.length; i += 1) {
    i2546.add(request.d('TMPro.TMP_Sprite', i2547[i + 0]));
  }
  i2544.spriteInfoList = i2546
  var i2549 = i2545[3]
  var i2548 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i2549.length; i += 2) {
  request.r(i2549[i + 0], i2549[i + 1], 1, i2548, '')
  }
  i2544.fallbackSpriteAssets = i2548
  i2544.hashCode = i2545[4]
  request.r(i2545[5], i2545[6], 0, i2544, 'material')
  i2544.materialHashCode = i2545[7]
  i2544.m_Version = i2545[8]
  i2544.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2545[9], i2544.m_FaceInfo)
  var i2551 = i2545[10]
  var i2550 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i2551.length; i += 1) {
    i2550.add(request.d('TMPro.TMP_SpriteCharacter', i2551[i + 0]));
  }
  i2544.m_SpriteCharacterTable = i2550
  var i2553 = i2545[11]
  var i2552 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i2553.length; i += 1) {
    i2552.add(request.d('TMPro.TMP_SpriteGlyph', i2553[i + 0]));
  }
  i2544.m_SpriteGlyphTable = i2552
  return i2544
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i2556 = root || request.c( 'TMPro.TMP_Sprite' )
  var i2557 = data
  i2556.name = i2557[0]
  i2556.hashCode = i2557[1]
  i2556.unicode = i2557[2]
  i2556.pivot = new pc.Vec2( i2557[3], i2557[4] )
  request.r(i2557[5], i2557[6], 0, i2556, 'sprite')
  i2556.id = i2557[7]
  i2556.x = i2557[8]
  i2556.y = i2557[9]
  i2556.width = i2557[10]
  i2556.height = i2557[11]
  i2556.xOffset = i2557[12]
  i2556.yOffset = i2557[13]
  i2556.xAdvance = i2557[14]
  i2556.scale = i2557[15]
  return i2556
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i2562 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i2563 = data
  i2562.m_Name = i2563[0]
  i2562.m_HashCode = i2563[1]
  i2562.m_ElementType = i2563[2]
  i2562.m_Unicode = i2563[3]
  i2562.m_GlyphIndex = i2563[4]
  i2562.m_Scale = i2563[5]
  return i2562
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i2566 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i2567 = data
  request.r(i2567[0], i2567[1], 0, i2566, 'sprite')
  i2566.m_Index = i2567[2]
  i2566.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2567[3], i2566.m_Metrics)
  i2566.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2567[4], i2566.m_GlyphRect)
  i2566.m_Scale = i2567[5]
  i2566.m_AtlasIndex = i2567[6]
  i2566.m_ClassDefinitionType = i2567[7]
  return i2566
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i2568 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i2569 = data
  var i2571 = i2569[0]
  var i2570 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i2571.length; i += 1) {
    i2570.add(request.d('TMPro.TMP_Style', i2571[i + 0]));
  }
  i2568.m_StyleList = i2570
  return i2568
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i2574 = root || request.c( 'TMPro.TMP_Style' )
  var i2575 = data
  i2574.m_Name = i2575[0]
  i2574.m_HashCode = i2575[1]
  i2574.m_OpeningDefinition = i2575[2]
  i2574.m_ClosingDefinition = i2575[3]
  i2574.m_OpeningTagArray = i2575[4]
  i2574.m_ClosingTagArray = i2575[5]
  i2574.m_OpeningTagUnicodeArray = i2575[6]
  i2574.m_ClosingTagUnicodeArray = i2575[7]
  return i2574
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i2576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i2577 = data
  var i2579 = i2577[0]
  var i2578 = []
  for(var i = 0; i < i2579.length; i += 1) {
    i2578.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i2579[i + 0]) );
  }
  i2576.files = i2578
  i2576.componentToPrefabIds = i2577[1]
  return i2576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i2582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i2583 = data
  i2582.path = i2583[0]
  request.r(i2583[1], i2583[2], 0, i2582, 'unityObject')
  return i2582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i2584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i2585 = data
  var i2587 = i2585[0]
  var i2586 = []
  for(var i = 0; i < i2587.length; i += 1) {
    i2586.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i2587[i + 0]) );
  }
  i2584.scriptsExecutionOrder = i2586
  var i2589 = i2585[1]
  var i2588 = []
  for(var i = 0; i < i2589.length; i += 1) {
    i2588.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i2589[i + 0]) );
  }
  i2584.sortingLayers = i2588
  var i2591 = i2585[2]
  var i2590 = []
  for(var i = 0; i < i2591.length; i += 1) {
    i2590.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i2591[i + 0]) );
  }
  i2584.cullingLayers = i2590
  i2584.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i2585[3], i2584.timeSettings)
  i2584.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i2585[4], i2584.physicsSettings)
  i2584.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i2585[5], i2584.physics2DSettings)
  i2584.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2585[6], i2584.qualitySettings)
  i2584.enableRealtimeShadows = !!i2585[7]
  i2584.enableAutoInstancing = !!i2585[8]
  i2584.enableStaticBatching = !!i2585[9]
  i2584.enableDynamicBatching = !!i2585[10]
  i2584.lightmapEncodingQuality = i2585[11]
  i2584.desiredColorSpace = i2585[12]
  var i2593 = i2585[13]
  var i2592 = []
  for(var i = 0; i < i2593.length; i += 1) {
    i2592.push( i2593[i + 0] );
  }
  i2584.allTags = i2592
  return i2584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i2596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i2597 = data
  i2596.name = i2597[0]
  i2596.value = i2597[1]
  return i2596
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i2600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i2601 = data
  i2600.id = i2601[0]
  i2600.name = i2601[1]
  i2600.value = i2601[2]
  return i2600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i2604 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i2605 = data
  i2604.id = i2605[0]
  i2604.name = i2605[1]
  return i2604
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i2606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i2607 = data
  i2606.fixedDeltaTime = i2607[0]
  i2606.maximumDeltaTime = i2607[1]
  i2606.timeScale = i2607[2]
  i2606.maximumParticleTimestep = i2607[3]
  return i2606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i2608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i2609 = data
  i2608.gravity = new pc.Vec3( i2609[0], i2609[1], i2609[2] )
  i2608.defaultSolverIterations = i2609[3]
  i2608.bounceThreshold = i2609[4]
  i2608.autoSyncTransforms = !!i2609[5]
  i2608.autoSimulation = !!i2609[6]
  var i2611 = i2609[7]
  var i2610 = []
  for(var i = 0; i < i2611.length; i += 1) {
    i2610.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i2611[i + 0]) );
  }
  i2608.collisionMatrix = i2610
  return i2608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i2614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i2615 = data
  i2614.enabled = !!i2615[0]
  i2614.layerId = i2615[1]
  i2614.otherLayerId = i2615[2]
  return i2614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i2616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i2617 = data
  request.r(i2617[0], i2617[1], 0, i2616, 'material')
  i2616.gravity = new pc.Vec2( i2617[2], i2617[3] )
  i2616.positionIterations = i2617[4]
  i2616.velocityIterations = i2617[5]
  i2616.velocityThreshold = i2617[6]
  i2616.maxLinearCorrection = i2617[7]
  i2616.maxAngularCorrection = i2617[8]
  i2616.maxTranslationSpeed = i2617[9]
  i2616.maxRotationSpeed = i2617[10]
  i2616.baumgarteScale = i2617[11]
  i2616.baumgarteTOIScale = i2617[12]
  i2616.timeToSleep = i2617[13]
  i2616.linearSleepTolerance = i2617[14]
  i2616.angularSleepTolerance = i2617[15]
  i2616.defaultContactOffset = i2617[16]
  i2616.autoSimulation = !!i2617[17]
  i2616.queriesHitTriggers = !!i2617[18]
  i2616.queriesStartInColliders = !!i2617[19]
  i2616.callbacksOnDisable = !!i2617[20]
  i2616.reuseCollisionCallbacks = !!i2617[21]
  i2616.autoSyncTransforms = !!i2617[22]
  var i2619 = i2617[23]
  var i2618 = []
  for(var i = 0; i < i2619.length; i += 1) {
    i2618.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i2619[i + 0]) );
  }
  i2616.collisionMatrix = i2618
  return i2616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i2622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i2623 = data
  i2622.enabled = !!i2623[0]
  i2622.layerId = i2623[1]
  i2622.otherLayerId = i2623[2]
  return i2622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i2624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i2625 = data
  var i2627 = i2625[0]
  var i2626 = []
  for(var i = 0; i < i2627.length; i += 1) {
    i2626.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2627[i + 0]) );
  }
  i2624.qualityLevels = i2626
  var i2629 = i2625[1]
  var i2628 = []
  for(var i = 0; i < i2629.length; i += 1) {
    i2628.push( i2629[i + 0] );
  }
  i2624.names = i2628
  i2624.shadows = i2625[2]
  i2624.anisotropicFiltering = i2625[3]
  i2624.antiAliasing = i2625[4]
  i2624.lodBias = i2625[5]
  i2624.shadowCascades = i2625[6]
  i2624.shadowDistance = i2625[7]
  i2624.shadowmaskMode = i2625[8]
  i2624.shadowProjection = i2625[9]
  i2624.shadowResolution = i2625[10]
  i2624.softParticles = !!i2625[11]
  i2624.softVegetation = !!i2625[12]
  i2624.activeColorSpace = i2625[13]
  i2624.desiredColorSpace = i2625[14]
  i2624.masterTextureLimit = i2625[15]
  i2624.maxQueuedFrames = i2625[16]
  i2624.particleRaycastBudget = i2625[17]
  i2624.pixelLightCount = i2625[18]
  i2624.realtimeReflectionProbes = !!i2625[19]
  i2624.shadowCascade2Split = i2625[20]
  i2624.shadowCascade4Split = new pc.Vec3( i2625[21], i2625[22], i2625[23] )
  i2624.streamingMipmapsActive = !!i2625[24]
  i2624.vSyncCount = i2625[25]
  i2624.asyncUploadBufferSize = i2625[26]
  i2624.asyncUploadTimeSlice = i2625[27]
  i2624.billboardsFaceCameraPosition = !!i2625[28]
  i2624.shadowNearPlaneOffset = i2625[29]
  i2624.streamingMipmapsMemoryBudget = i2625[30]
  i2624.maximumLODLevel = i2625[31]
  i2624.streamingMipmapsAddAllCameras = !!i2625[32]
  i2624.streamingMipmapsMaxLevelReduction = i2625[33]
  i2624.streamingMipmapsRenderersPerFrame = i2625[34]
  i2624.resolutionScalingFixedDPIFactor = i2625[35]
  i2624.streamingMipmapsMaxFileIORequests = i2625[36]
  i2624.currentQualityLevel = i2625[37]
  return i2624
}

Deserializers["SonatFramework.Scripts.UIModule.TweenConfig"] = function (request, data, root) {
  var i2632 = root || request.c( 'SonatFramework.Scripts.UIModule.TweenConfig' )
  var i2633 = data
  i2632.tweenType = i2633[0]
  i2632.from = i2633[1]
  i2632.to = i2633[2]
  i2632.mFrom = new pc.Vec3( i2633[3], i2633[4], i2633[5] )
  i2632.mTo = new pc.Vec3( i2633[6], i2633[7], i2633[8] )
  i2632.duration = i2633[9]
  i2632.delay = i2633[10]
  i2632.curve = new pc.AnimationCurve( { keys_flow: i2633[11] } )
  return i2632
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i2634 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i2635 = data
  i2634.xPlacement = i2635[0]
  i2634.yPlacement = i2635[1]
  i2634.xAdvance = i2635[2]
  i2634.yAdvance = i2635[3]
  return i2634
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"enabled":20},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"56":[57],"58":[57],"59":[57],"60":[57],"61":[57],"62":[57],"63":[64],"65":[29],"66":[67],"68":[67],"69":[67],"70":[67],"71":[67],"72":[67],"73":[67],"74":[75],"76":[75],"77":[75],"78":[75],"79":[75],"80":[75],"81":[75],"82":[75],"83":[75],"84":[75],"85":[75],"86":[75],"87":[75],"88":[29],"89":[90],"91":[92],"93":[92],"34":[2],"94":[95,90],"96":[3],"97":[3],"98":[3],"99":[3],"100":[3],"101":[3],"102":[3],"103":[3],"104":[3],"105":[3],"106":[3],"107":[11],"39":[3],"108":[3],"109":[3],"110":[3],"111":[3],"112":[3],"113":[3],"114":[3],"115":[3],"116":[3],"117":[3],"118":[3],"119":[3],"120":[3],"121":[3],"122":[3],"123":[124],"125":[3],"126":[124],"127":[3],"128":[3],"129":[3],"130":[3],"131":[3],"132":[3],"133":[3],"134":[3],"135":[3],"136":[3],"137":[3],"138":[3],"139":[3],"140":[3],"141":[7],"142":[3],"25":[7],"143":[11],"144":[3],"145":[2],"146":[147],"148":[149],"150":[2],"151":[152],"153":[44],"154":[2],"155":[4,2],"156":[90],"147":[4,2],"157":[158,90],"159":[90],"160":[90,95],"161":[67],"162":[75],"163":[164],"165":[166],"167":[2,4],"168":[2],"169":[90,2],"8":[2,4],"170":[2],"171":[4,2],"172":[90],"173":[4,2],"174":[2],"175":[11],"176":[29],"31":[29],"33":[32],"177":[178],"179":[159],"180":[90,95],"181":[147],"182":[159],"183":[184],"185":[159],"186":[159],"187":[166],"188":[166],"189":[159],"190":[152],"191":[2],"192":[2],"36":[34],"7":[4,2],"193":[2],"35":[34],"19":[2],"23":[2],"42":[2],"194":[2],"38":[2],"195":[2],"18":[2],"6":[2],"196":[2],"197":[4,2],"198":[2],"199":[2],"17":[2],"200":[2],"201":[4,2],"124":[2],"202":[44],"203":[44],"204":[44],"205":[44],"206":[29],"207":[29],"45":[44],"208":[34],"209":[29],"210":[152]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasGroup","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Mask","UnityEngine.UI.Image","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.UI.Button","UnityEngine.MonoBehaviour","SonatFramework.Scripts.UIModule.UIElements.UICurrency","UnityEngine.GameObject","UnityEngine.Sprite","SonatFramework.Scripts.Feature.Shop.UI.UIShopPackContent","UnityEngine.UI.ScrollRect","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","SonatFramework.Scripts.Feature.Shop.UI.UIShopPackBase","SonatFramework.Scripts.UIModule.UIElements.UIRewardGroup","SonatFramework.Scripts.UIModule.UIElements.UIItemGroup","UnityEngine.UI.GridLayoutGroup","SonatFramework.Scripts.UIModule.UIElements.UIRewardItem","SonatFramework.Scripts.UIModule.UIElements.FixedImageRatio","SonatFramework.Scripts.Feature.Lives.UI.UILives","SonatFramework.Scripts.UIModule.UIElements.UITimeCounter","LevelButton","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UITabBase","UnityEngine.UI.LayoutElement","HomePanel","GameConfig","UINavigateSwapBar","UnityEngine.UI.HorizontalLayoutGroup","UINavigationItem","UnityEngine.EventSystems.EventSystem","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.InputActionAsset","UnityEngine.InputSystem.InputActionReference","UnityEngine.Cubemap","UnityEngine.Font","BlockPaletteSO","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.ConstantForce","UnityEngine.Rigidbody","UnityEngine.Joint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.FixedJoint","UnityEngine.CharacterJoint","UnityEngine.ConfigurableJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","GhostBlockController","UnityEngine.MeshFilter","CheatPanel","PopupAdsBreak","PopupBoosterTutorial","PopupUseBlock","PopupUseFreeze","PopupUseHammer","PopupUseUndo","TutDragPanel","TutorialPanelBase","TutRotatePanel","TutUndoPanel","ButtonRestart","ConfirmPanel","LosePanel","NotifyPanel","PopupBuyBooster","PopupContinue","PopupLives","PopupLose","PopupNoInternet","PopupSettings","PopupTimerWarning","PopupWaitAdsBreak","PopupWaiting","PopupWaitingIap","PopupWin","WinPanel","ToggleSwitchVisual","UnityEngine.UI.Toggle","PopupLoadingIap","UIToggleExtension","TestPanel","ConfirmPanelBase","LosePanelBase","NotifyPanelBase","PopupAdsBreakBase","PopupContinueBase","PopupNoInternetBase","PopupSettingsBase","PopupToast","PopupWaitingBase","WinPanelBase","SonatFramework.Templates.UI.ScriptBase.PopupBuyBoosterBase","SonatFramework.Templates.UI.ScriptBase.PopupLivesBase","SonatFramework.Templates.UI.ScriptBase.PopupWaitAdsBreakBase","SonatFramework.Scripts.UIModule.DarkTransition","SonatFramework.Scripts.UIModule.Panel","SonatFramework.Scripts.UIModule.UIElements.Shortcut.UIShortcut","SonatFramework.Scripts.Feature.Shop.UI.ShopPanelBase","SonatFramework.Scripts.Feature.ChestRewardProgress.ChestDisplayUIController","SonatFramework.Scripts.Feature.ChestRewardProgress.ChestSpineUIAnimationHandler","Spine.Unity.SkeletonGraphic","SonatFramework.Systems.AudioManagement.AudioUnit","UnityEngine.AudioSource","UnityEngine.Rendering.UI.UIFoldout","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.Variables","AppLovinMax.Scripts.MaxEventSystemChecker","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","Spine.Unity.SkeletonAnimation","Spine.Unity.SkeletonMecanim","UnityEngine.Animator","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.ISkeletonAnimation","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","Coffee.UIExtensions.UIParticle","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.Purchasing.IAPButton","UnityEngine.Experimental.Rendering.Universal.PixelPerfectCamera","Spine.Unity.Examples.BasicPlatformerController","UnityEngine.CharacterController","Spine.Unity.Examples.SkeletonGhost","Spine.Unity.Examples.RenderExistingMesh","Spine.Unity.Examples.SkeletonGraphicRenderTexture","Spine.Unity.Examples.SkeletonRenderTexture","Spine.Unity.Examples.SkeletonRenderTextureFadeout","Spine.Unity.Examples.SkeletonRenderTextureBase","Spine.Unity.Examples.SkeletonRagdoll","Spine.Unity.Examples.SkeletonRagdoll2D","Spine.Unity.Examples.SkeletonUtilityEyeConstraint","Spine.Unity.Examples.SkeletonUtilityGroundConstraint","Spine.Unity.Examples.SpineGauge","Unity.VisualScripting.SceneVariables","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","ToonyColorsPro.Runtime.TCP2_CameraDepth","Unity.VisualScripting.StateMachine"]

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

Deserializers.runtimeAnalysisExcludedClassesCount = "2598";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3985";

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

Deserializers.buildID = "ef61d81c-4f98-4819-95cb-6992aeb4271e";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Purchasing","CodelessIAPStoreListener","InitializeCodelessPurchasingOnLoad"],["MaxSdkUnityEditor","InitializeMaxSdkUnityEditorOnLoad"],["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Coffee","UIParticleInternal","UIExtraCallbacks","InitializeOnLoad"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["UnityEngine","Purchasing","StoreManagerFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","Registration","IapCoreInitializeCallback","Register"],["UnityEngine","Purchasing","ProductServiceDependencyFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","PurchaseServiceDependencyFactoryInjector","SetStoreManagerFactory"],["UnityEngine","Purchasing","StoreServiceDependencyFactoryInjector","SetStoreManagerFactory"],["I2","Loc","LocalizeTarget_UnityUI_Text","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_MeshRenderer","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_VideoPlayer","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_Prefab","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_SpriteRenderer","AutoRegister"],["SonatFramework","Systems","EventBus","EventBusUtil","Initialize"],["I2","Loc","LocalizeTarget_UnityStandard_AudioSource","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_TextMesh","AutoRegister"],["I2","Loc","LocalizeTarget_TextMeshPro_Label","AutoRegister"],["I2","Loc","LocalizeTarget_UnityStandard_Child","AutoRegister"],["I2","Loc","LocalizeTarget_TextMeshPro_UGUI","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_RawImage","AutoRegister"],["I2","Loc","LocalizeTarget_UnityUI_Image","AutoRegister"]],[["Cysharp","Threading","Tasks","PlayerLoopHelper","Init"],["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"],["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["UnityEngine","InputSystem","UI","InputSystemUIInputModule","ResetDefaultActions"],["Uniject","UnityThreadUtils","CaptureUnityThreadInfo"],["Coffee","UIParticleInternal","MaterialRepository","Clear"],["Coffee","UIParticleInternal","FrameCache","Clear"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"],["MaxSdkCallbacks","ResetOnDomainReload"],["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","ResourceManagement","ResourceProviders","AssetBundleProvider","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

