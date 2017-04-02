#version 300 es
precision mediump float;

in vec3 Color;
in vec2 Texcoord;

uniform sampler2D texKitten;
uniform sampler2D texPuppy;

out vec4 outColor;

vec2 result;

uniform sampler2D tex;

uniform float u_wave;
uniform float u_mix;

void main()
{
  if (Texcoord.y < 0.5) {
    result = vec2(sin((Texcoord.y - 0.5) * u_wave) / u_wave + Texcoord.x, Texcoord.y);
  } else {
    result = Texcoord;
  }
  vec4 colKitten = texture(texKitten, result);
  vec4 colPuppy = texture(texPuppy, result);
  outColor = mix(colKitten, colPuppy, u_mix) * vec4(Color, 1);
}