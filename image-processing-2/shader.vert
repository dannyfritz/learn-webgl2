#version 300 es
 
in vec2 a_position;
in vec2 a_texCoord;

uniform vec2 u_resolution;
uniform float u_flipY;

out vec2 v_texCoord;

// uniform mat3 u_matrix;
 
void main() {
  // gl_Position = vec4((u_matrix * vec3(a_position, u_flipY)).xy, 0, 1);
  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, u_flipY), 0, 1);
  v_texCoord = a_texCoord;
}