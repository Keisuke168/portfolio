const refractFragmentShader = `
    uniform vec2 winResolution;
    uniform sampler2D uTexture;
    uniform vec3 uLight;

    varying vec3 worldNormal;
    varying vec3 eyeVector;

    const int LOOP = 16;
    const float uChromaticAberration = 0.1;
    const float intensity = 1.0;
    const float uShininess = 60.0;
    const float uDiffuseness = 0.20;

    vec3 sat(vec3 rgb, float intensity) {
        vec3 L = vec3(0.2125, 0.7154, 0.0721);
        vec3 grayscale = vec3(dot(rgb, L));
        return mix(grayscale, rgb, intensity);
    }

    float specular(vec3 light, float shininess, float diffuseness) {
        vec3 normal = worldNormal;
        vec3 lightVector = normalize(-light);
        vec3 halfVector = normalize(eyeVector + lightVector);
      
        float NdotL = dot(normal, lightVector);
        float NdotH =  dot(normal, halfVector);
        float kDiffuse = max(0.0, NdotL);
        float NdotH2 = NdotH * NdotH;
      
        float kSpecular = pow(NdotH2, shininess);
        return  kSpecular + kDiffuse * diffuseness;
      }

    void main(){
        // 各色の屈折率
        float iorRatioRed = 1.0/1.15;
        float iorRatioGreen = 1.0/1.18;
        float iorRatioBlue = 1.0/1.22;

        // 処理中のピクセルのuv座標
        vec2 uv = gl_FragCoord.xy / winResolution.xy;
        vec3 normal = worldNormal;


        //屈折後のベクトルを計算
        vec3 color = vec3(0.0);
        for (int i = 0; i < LOOP; i++) {
            float slide = float(i) / float(LOOP) * 0.1;
            
            vec3 refractVectorRed = refract(eyeVector, normal, iorRatioRed);
            vec3 refractVectorGreen = refract(eyeVector, normal, iorRatioGreen);
            vec3 refractVectorBlue = refract(eyeVector, normal, iorRatioBlue);

            color.r += texture2D(uTexture, uv + refractVectorRed.xy * slide * 1.0 * uChromaticAberration).r;
            color.g += texture2D(uTexture, uv + refractVectorGreen.xy * slide * 2.0 * uChromaticAberration).g;
            color.b += texture2D(uTexture, uv + refractVectorBlue.xy * slide * 3.0 * uChromaticAberration).b;

            color = sat(color, intensity);
        }
        color /= float(LOOP);

        // 鏡面反射
        float specularLight = specular(uLight, uShininess, uDiffuseness);
        color += specularLight;

        gl_FragColor = vec4(color, 1.0);
    }
`

export default refractFragmentShader;