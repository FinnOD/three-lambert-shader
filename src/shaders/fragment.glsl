varying vec3 vPos;
varying vec3 vNormal;

struct PointLight {
    vec3 position;
    vec3 color;
};

uniform PointLight pointLights[NUM_POINT_LIGHTS];
uniform vec3 ambientLightColor;
uniform vec3 color;

void main() {
    vec4 addedLights = vec4(ambientLightColor.x, ambientLightColor.y, ambientLightColor.z, 1.0);

    for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
        vec3 adjustedLight = pointLights[l].position - vPos;
        vec3 lightDirection = normalize(adjustedLight);

        float dotNL = dot(vNormal, lightDirection);
        float lambertTerm = max(dotNL, 0.0);

        vec3 lightColor = pointLights[l].color;
        addedLights.rgb += lightColor * lambertTerm;
    }

    vec3 col = color * addedLights.rgb;
    col = ACESFilmicToneMapping(col);
    gl_FragColor = vec4(col, 1.0);
}