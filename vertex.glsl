precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;

varying vec3 fColor;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform vec3 diffuseColor;
uniform vec3 diffusePosition; // Titik sumber cahaya
uniform mat3 normalMatrix;  // Berperan sebagai modelMatrix-nya vektor normal
uniform vec3 ambientColor;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
  
  vec3 normal = normalize(normalMatrix * vNormal);
  // Arah cahaya = lokasi titik verteks - lokasi titik sumber cahaya
  vec3 diffuseDirection = normalize(diffusePosition - vec3(modelMatrix * vec4(vPosition, 1.0)));
  // Nilai intensitas cahaya = 
  //  nilai COS sudut antara arah datang cahaya dengan arah vektor normal =
  //  dot product dari vektor arah datang cahaya • arah vektor normal
  float normalDotLight = max(dot(normal, diffuseDirection), 0.0);
  vec3 diffuse = diffuseColor * vColor * normalDotLight;
  vec3 ambient = ambientColor * vColor;
  fColor = diffuse + ambient;
}
