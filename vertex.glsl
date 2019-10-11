precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;

void main() {
  fColor = vColor;
  mat4 rotationMatrix = mat4(
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = rotationMatrix * vec4(vPosition, 1.0);
}
