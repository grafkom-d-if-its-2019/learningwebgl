precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;

varying vec3 fColor;
varying vec3 fNormal;
varying vec3 fPosition;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;  // Berperan sebagai modelMatrix-nya vektor normal

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);

  // Transfer warna ke fragment shader
  fColor = vColor;

  // Transfer vektor normal (yang telah ditransformasi) ke fragment shader
  fNormal = normalize(normalMatrix * vNormal);

  // Transfer posisi verteks
  fPosition = vec3(modelMatrix * vec4(vPosition, 1.0));
}
