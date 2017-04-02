async function main () {
  //requestAnimationFrame(main)
  const canvas = document.getElementById("canvas")
  const gl = canvas.getContext("webgl2")

  const shaders = await getShaders()
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, shaders[0])
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaders[1])
  const program = createProgram(gl, vertexShader, fragmentShader)

  gl.useProgram(program)

  const vbo = gl.createBuffer()
  const ebo = gl.createBuffer()

  const vertices = [
       0,  -0.5,    1, 0, 0,
     0.5, 0.5,    0, 1, 0,
    -0.5, 0.5,    0, 0, 1,
  ]
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
  const elements = [
    0, 1, 2
  ]
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(elements), gl.STATIC_DRAW)
  
  const posAttrib = gl.getAttribLocation(program, "position")
  gl.enableVertexAttribArray(posAttrib)
  gl.vertexAttribPointer(
    posAttrib, 2, gl.FLOAT, false, 5 * SIZEOF.FLOAT, 0
  )
  
  const colorAttrib = gl.getAttribLocation(program, "inColor")
  gl.enableVertexAttribArray(colorAttrib)
  gl.vertexAttribPointer(
    colorAttrib, 3, gl.FLOAT, false, 5 * SIZEOF.FLOAT, 2 * SIZEOF.FLOAT
  )
  
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawElements(gl.TRIANGLES, elements.length, gl.UNSIGNED_BYTE, 0)
}

main()