Shader "Custom/URP/Ghost3DShader_NoOverlap"
{
    Properties
    {
        [Header(Main Settings)]
        _BaseColor ("Ghost Color", Color) = (0.5, 1, 1, 0.5) // URP dùng _BaseColor
        
        [Header(Lighting and Glow)]
        _TopBrightness ("Top Brightness", Range(0.5, 2)) = 1.3
        _SideBrightness ("Side Brightness", Range(0.3, 1.5)) = 0.9
        _CenterFade ("Center Fade", Range(0, 1)) = 0.4
        _FresnelPower ("Fresnel Power", Range(0.5, 5)) = 2.0
    }

    SubShader
    {
        Tags 
        { 
            "RenderPipeline" = "UniversalPipeline" 
            "Queue"="Transparent+100" 
            "RenderType"="Transparent" 
        }

        // [PASS 1] DEPTH MASK (Ghi độ sâu trước để chống vẽ chồng lên nhau)
        Pass
        {
            Name "DepthMask"
            Tags { "LightMode" = "SRPDefaultUnlit" } // Tag để URP nhận diện
            ZWrite On
            ColorMask 0
            ZTest LEqual
        }

        // [PASS 2] VISUAL (Vẽ màu)
        Pass
        {
            Name "VisualPass"
            Tags { "LightMode" = "UniversalForward" }
            
            ZWrite Off
            ZTest LEqual
            Cull Back
            Blend SrcAlpha OneMinusSrcAlpha
            Offset -1, -1

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            struct Attributes
            {
                float4 positionOS : POSITION;
                float3 normalOS   : NORMAL;
            };

            struct Varyings
            {
                float4 positionCS   : SV_POSITION;
                float3 normalWS     : TEXCOORD0;
                float3 viewDirWS    : TEXCOORD1;
            };

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                float _TopBrightness;
                float _SideBrightness;
                float _CenterFade;
                float _FresnelPower;
            CBUFFER_END

            Varyings vert (Attributes input)
            {
                Varyings output;
                
                // Tính vị trí Clip Space
                output.positionCS = TransformObjectToHClip(input.positionOS.xyz);
                
                // Tính Normal World Space
                output.normalWS = TransformObjectToWorldNormal(input.normalOS);
                
                // Tính View Direction (Hướng nhìn từ cam vào vật)
                float3 positionWS = TransformObjectToWorld(input.positionOS.xyz);
                output.viewDirWS = GetWorldSpaceViewDir(positionWS);
                
                return output;
            }

            half4 frag (Varyings input) : SV_Target
            {
                float3 normal = normalize(input.normalWS);
                float3 viewDir = normalize(input.viewDirWS);

                // 1. Lighting (Giả lập ánh sáng dựa trên hướng y)
                float top = saturate(normal.y);
                float side = 1.0 - abs(normal.y);

                float brightness = 1.0;
                brightness = lerp(brightness, _TopBrightness, top);
                brightness = lerp(brightness, _SideBrightness, side);

                // 2. Fresnel (Hiệu ứng viền sáng)
                float fresnel = 1.0 - saturate(dot(normal, viewDir));
                fresnel = pow(fresnel, _FresnelPower);

                // 3. Alpha Fade (Mờ dần ở giữa)
                float alphaFactor = lerp(1.0 - _CenterFade, 1.0, fresnel);

                half4 col = _BaseColor;
                col.rgb *= brightness;
                // Cộng thêm màu fresnel vào (giữ nguyên sắc độ của BaseColor)
                col.rgb += fresnel * 0.15 * _BaseColor.rgb;
                col.a *= alphaFactor;

                return col;
            }
            ENDHLSL
        }
    }
}