async function main () {
  // requestAnimationFrame(main)
  const canvas = document.getElementById("canvas")
  const gl = canvas.getContext("webgl2")

  const shaders = await getShaders()
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, shaders[0])
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaders[1])
  const program = createProgram(gl, vertexShader, fragmentShader)
  gl.useProgram(program)
  
  
  const textures = [gl.createTexture(), gl.createTexture()]
  
  gl.activeTexture(gl.TEXTURE0 + 0)
  gl.bindTexture(gl.TEXTURE_2D, textures[0])
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  const image = await getImage("./sample.png")
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
  gl.uniform1i(gl.getUniformLocation(program, "texKitten"), 0);
  
  gl.activeTexture(gl.TEXTURE0 + 1)
  gl.bindTexture(gl.TEXTURE_2D, textures[1])
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  const image2 = await getImage("./sample2.png")
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image2)
  gl.uniform1i(gl.getUniformLocation(program, "texPuppy"), 1);

  const vertices = [
    -0.5, -0.5,    1, 0, 0,     0, 0,
     0.5, -0.5,    1, 1, 1,     1, 0,
     0.5,  0.5,    1, 0, 0,     1, 1,
    -0.5,  0.5,    1, 1, 1,     0, 1,
  ]
  const vbo = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
  const elements = [
    0, 1, 3,
    1, 2, 3,
  ]
  const ebo = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(elements), gl.STATIC_DRAW)
  
  const posAttrib = gl.getAttribLocation(program, "position")
  gl.enableVertexAttribArray(posAttrib)
  gl.vertexAttribPointer(
    posAttrib, 2, gl.FLOAT, false, 7 * SIZEOF.FLOAT, 0
  )
  
  const texAttrib = gl.getAttribLocation(program, "texcoord")
  gl.enableVertexAttribArray(texAttrib)
  gl.vertexAttribPointer(
    texAttrib, 2, gl.FLOAT, false, 7 * SIZEOF.FLOAT, 5 * SIZEOF.FLOAT
  )
  
  const colorAttrib = gl.getAttribLocation(program, "color")
  gl.enableVertexAttribArray(colorAttrib)
  gl.vertexAttribPointer(
    colorAttrib, 3, gl.FLOAT, false, 7 * SIZEOF.FLOAT, 2 * SIZEOF.FLOAT
  )
  
  const mixUniform = gl.getUniformLocation(program, "u_mix")
  gl.uniform1f(mixUniform, 0.5)
  
  const waveUniform = gl.getUniformLocation(program, "u_wave")
  gl.uniform1f(waveUniform, 20)
  
  render()
  
  canvas.addEventListener("mousemove", function (event) {
    gl.uniform1f(mixUniform, event.offsetX / canvas.width)
    gl.uniform1f(waveUniform, event.offsetY)
    render()
  })
  
  function render () {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawElements(gl.TRIANGLES, elements.length, gl.UNSIGNED_BYTE, 0)
  }
  
}

main()