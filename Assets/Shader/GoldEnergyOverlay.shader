Shader "Custom/URP/VFX/ThinShellOverlayV3"
{
    Properties
    {
        _ShellColor ("Shell Color", Color) = (1, 0.92, 0.7, 0.2)
        _ShellThickness ("Thickness (XZ)", Range(1.0, 1.15)) = 1.03
        _TopExpand ("Top Expand (Y)", Range(0, 0.1)) = 0.03
    }
    
    SubShader
    {
        Tags 
        { 
            "RenderPipeline" = "UniversalPipeline" // [QUAN TRỌNG] Khai báo URP
            "Queue" = "Transparent"
            "RenderType" = "Transparent"
        }
        
        Pass
        {
            Name "UniversalForward"
            Tags { "LightMode" = "UniversalForward" }

            ZTest LEqual
            ZWrite Off
            Offset -1, -1
            Blend SrcAlpha OneMinusSrcAlpha
            Cull Off
            
            HLSLPROGRAM // Dùng HLSL thay vì CG
            #pragma vertex vert
            #pragma fragment frag
            
            // Thư viện cốt lõi của URP
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            
            struct Attributes
            {
                float4 positionOS : POSITION;
                float3 normalOS   : NORMAL;
            };
            
            struct Varyings
            {
                float4 positionCS : SV_POSITION;
            };
            
            CBUFFER_START(UnityPerMaterial)
                float4 _ShellColor;
                float _ShellThickness;
                float _TopExpand;
            CBUFFER_END
            
            Varyings vert (Attributes input)
            {
                Varyings output;
                
                float3 newPos = input.positionOS.xyz;
                
                // --- LOGIC LÀM PHỒNG (GIỮ NGUYÊN) ---
                
                // 1. Phồng chiều ngang
                newPos.x *= _ShellThickness;
                newPos.z *= _ShellThickness;
                
                // 2. Phồng chiều dọc thông minh
                if (input.normalOS.y > 0.5)
                {
                    newPos.y += _TopExpand; // Đẩy lên
                }
                else if (input.normalOS.y < -0.5)
                {
                    newPos.y += 0.005; // Nhích đáy lên xíu
                }
                else
                {
                    newPos.y *= _ShellThickness; // Phồng cạnh bên
                }
                
                // Chuyển sang Clip Space (Chuẩn URP)
                output.positionCS = TransformObjectToHClip(newPos);
                return output;
            }
            
            half4 frag (Varyings input) : SV_Target
            {
                return _ShellColor;
            }
            ENDHLSL
        }
    }
}