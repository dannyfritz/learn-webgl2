#version 300 es
precision mediump float;

in vec3 color;

out vec4 outColor;

void main()
{
  outColor = vec4(1.0 - color.r, 1.0 - color.g, 1.0 - color.b, 1.0);
}