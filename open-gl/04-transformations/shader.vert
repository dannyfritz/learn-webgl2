#version 300 es

in vec2 position;
in vec2 texcoord;
in vec3 color;

out vec3 Color;
out vec2 Texcoord;

uniform mat4 u_trans;

void main()
{
  Texcoord = texcoord;
  Color = color;
  gl_Position = u_trans * vec4(position, 0.0, 1.0);
}