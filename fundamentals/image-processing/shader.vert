#version 300 es
 
in vec2 a_position;
in vec2 a_texCoord;

uniform vec2 u_resolution;

out vec2 v_texCoord;

uniform mat3 u_matrix;
 
void main() {
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
  v_texCoord = a_texCoord;
}