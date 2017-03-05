#version 300 es
 
precision mediump float;

in vec4 v_color;

// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  outColor = v_color;
}