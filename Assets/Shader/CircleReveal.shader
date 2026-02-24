Shader "UI/CircleReveal"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Color ("Color", Color) = (0,0,0,1)
        _Progress ("Progress", Range(0,1)) = 0
        _Smoothness ("Edge Smoothness", Range(0,0.5)) = 0.05
        _CenterX ("Center X", Range(0,1)) = 0.5
        _CenterY ("Center Y", Range(0,1)) = 0.5
    }
    
    SubShader
    {
        Tags 
        { 
            "Queue"="Overlay" 
            "RenderType"="Transparent" 
            "IgnoreProjector"="True"
        }
        
        Blend SrcAlpha OneMinusSrcAlpha
        ZWrite Off
        Cull Off
        
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            
            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };
            
            struct v2f
            {
                float4 vertex : SV_POSITION;
                float2 uv : TEXCOORD0;
            };
            
            sampler2D _MainTex;
            fixed4 _Color;
            float _Progress;
            float _Smoothness;
            float _CenterX;
            float _CenterY;
            
            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }
            
            fixed4 frag (v2f i) : SV_Target
            {
                float2 center = float2(_CenterX, _CenterY);
                float2 uv = i.uv - center;
                
                uv.x *= _ScreenParams.x / _ScreenParams.y;
                
                float dist = length(uv);
                float radius = _Progress * 1.5;
                
                float alpha = smoothstep(radius, radius - _Smoothness, dist);
                
                return fixed4(_Color.rgb, _Color.a * alpha);
            }
            ENDCG
        }
    }
}
