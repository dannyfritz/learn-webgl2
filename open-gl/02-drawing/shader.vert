#version 300 es

in vec2 position;
in vec3 inColor;

out vec3 color;

void main()
{
  color = inColor;
  gl_Position = vec4(position, 0.0, 1.0);
}