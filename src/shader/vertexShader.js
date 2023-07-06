const refractVertexShader = `
    uniform float u_time;

    varying vec3 worldNormal;
    varying vec3 eyeVector;

    void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        worldPos.z *= 0.4;
        vec4 mvPosition = viewMatrix * worldPos;

        gl_Position = projectionMatrix * mvPosition;
        
        worldNormal = normalize(normalMatrix * normal);
        eyeVector = normalize(worldPos.xyz - cameraPosition);
    }
`
export default refractVertexShader;