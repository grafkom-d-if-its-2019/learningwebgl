(function() {

  glUtils.SL.init({ callback: function() { main(); }});
  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Mendefinisikan verteks-verteks
    var vertices = [];
    var cubePoints = [
      [ -0.5, -0.5,  0.5 ],
      [ -0.5,  0.5,  0.5 ],
      [  0.5,  0.5,  0.5 ],
      [  0.5, -0.5,  0.5 ],
      [ -0.5, -0.5, -0.5 ],
      [ -0.5,  0.5, -0.5 ],
      [  0.5,  0.5, -0.5 ],
      [  0.5, -0.5, -0.5 ]
    ];
    var cubeColors = [
      [],
      [1.0, 0.0, 0.0], // merah
      [0.0, 1.0, 0.0], // hijau
      [0.0, 0.0, 1.0], // biru
      [1.0, 1.0, 1.0], // putih
      [1.0, 0.5, 0.0], // oranye
      [1.0, 1.0, 0.0], // kuning
      []
    ];
    function quad(a, b, c, d) {
      var indices = [a, b, c, a, c, d];
      for (var i=0; i < indices.length; i++) {
        for (var j=0; j < 3; j++) {
          vertices.push(cubePoints[indices[i]][j]);
        }
        for (var j=0; j < 3; j++) {
          vertices.push(cubeColors[a][j]);
        }
      }
    }
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
    quad(6, 5, 1, 2);

    console.log(vertices.length);
    console.log(vertices);

    // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Membuat sambungan untuk attribute
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,    // variabel yang memegang posisi attribute di shader
      3,            // jumlah elemen per atribut
      gl.FLOAT,     // tipe data atribut
      gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    // Membuat sambungan untuk uniform
    var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0;

    function render() {
      theta += 0.01;
      gl.uniform1f(thetaUniformLocation, theta);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 36);

      requestAnimationFrame(render);
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    render();
  }
})();