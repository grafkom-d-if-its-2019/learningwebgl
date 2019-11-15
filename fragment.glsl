precision mediump float;

varying vec3 fColor;
varying vec3 fNormal;
varying vec3 fPosition;

uniform vec3 diffuseColor;
uniform vec3 diffusePosition; // Titik sumber cahaya
uniform vec3 ambientColor;

void main() {
  
  // Arah cahaya = lokasi titik verteks - lokasi titik sumber cahaya
  vec3 diffuseDirection = normalize(diffusePosition - fPosition);
  // Nilai intensitas cahaya = 
  //  nilai COS sudut antara arah datang cahaya dengan arah vektor normal =
  //  dot product dari vektor arah datang cahaya • arah vektor normal
  float normalDotLight = max(dot(fNormal, diffuseDirection), 0.0);
  vec3 diffuse = diffuseColor * fColor * normalDotLight;
  vec3 ambient = ambientColor * fColor;

  gl_FragColor = vec4(diffuse + ambient, 1.0);
}
