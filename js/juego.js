var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var muro = "#044f14";
var puerta = "#3a1700";
var tierra = "#c6892f";
var llave = "#c6bc00";
var pared;
var barney;
var wife;
var robin;
var protagonista;

var escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
  [0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function dibujaEscenario() {
  var color;

  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {
      if (escenario[y][x] == 0) color = pared;

      if (escenario[y][x] == 2) color = tierra;

      if (escenario[y][x] == 3) color = llave;

      // ctx.fillStyle = color;
      // ctx.fillRect(x * anchoF, y * altoF, anchoF, altoF);
      // var tile = escenario[y][x];

      // ctx.drawImage(muro, tile * 50, 50, this.x * anchoF, this.y * altoF, anchoF, altoF);

      this.dibuja = function () {
        ctx.drawImage(muro, this.x * anchoF, this.y * altoF, anchoF, altoF);
      };
    }
  }
}

//OBJETO JUGADOR
var jugador = function () {
  this.x = 1;
  this.y = 1;
  this.color = "#820c01";
  this.llave = false;

  this.dibuja = function () {
    ctx.drawImage(ted, this.x * anchoF, this.y * altoF, anchoF, altoF);
  };

  // this.colisionEnemigo = function (x, y) {
  //   if (this.x == x && this.y == y) {
  //     this.muerte();
  //   }
  // };

  this.margenes = function (x, y) {
    var colision = false;

    if (escenario[y][x] == 0) {
      colision = true;
    }

    return colision;
  };

  this.arriba = function () {
    if (this.margenes(this.x, this.y - 1) == false) {
      this.y--;
      this.logicaObjetos();
    }
  };

  this.abajo = function () {
    if (this.margenes(this.x, this.y + 1) == false) {
      this.y++;
      this.logicaObjetos();
    }
  };

  this.izquierda = function () {
    if (this.margenes(this.x - 1, this.y) == false) {
      this.x--;
      this.logicaObjetos();
    }
  };

  this.derecha = function () {
    if (this.margenes(this.x + 1, this.y) == false) {
      this.x++;
      this.logicaObjetos();
    }
  };

  this.victoria = function () {
    console.log("Has ganado!");

    this.x = 1;
    this.y = 1;

    this.llave = false; //el jugador ya no tiene la llave
    escenario[8][3] = 3; //volvemos a poner la llave en su sitio
  };

  this.logicaObjetos = function () {
    var objeto = escenario[this.y][this.x];

    //OBTIENE llave
    if (objeto == 3) {
      this.llave = true;
      escenario[this.y][this.x] = 2;
      console.log("Has obtenido la llave!!");
    }

    //ABRIMOS LA PUERTA
    if (objeto == 1) {
      if (this.llave == true) this.victoria();
      else {
        console.log("No tienes la llave, no puedes pasar!");
      }
    }
  };
};

function inicializa() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //creamos la pared
  pared = new Image();
  pared.src = "images/muro.png";

  //creamos al protagonista
  protagonista = new jugador();
  ted = new Image();
  ted.src = "images/ted.jpg";

  //creamos al segundo protagonista, su mujer
  protagonistaWife = new wife();
  wife = new Image();
  wife.src = "images/wife.png";

  //creamos a los enemigos
  enemigoBarney = new barney();
  barney = new Image();
  barney.src = "images/barney2.jpg";
  //
  enemigoRobin = new robin();
  robin = new Image();
  robin.src = "images/robin.jpg";

  //LECTURA DEL TECLADO
  document.addEventListener("keydown", function (tecla) {
    if (tecla.keyCode == 38) {
      protagonista.arriba();
    }

    if (tecla.keyCode == 40) {
      protagonista.abajo();
    }

    if (tecla.keyCode == 37) {
      protagonista.izquierda();
    }

    if (tecla.keyCode == 39) {
      protagonista.derecha();
    }
  });

  setInterval(function () {
    principal();
  }, 1000 / FPS);
}

function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}

function principal() {
  borraCanvas();
  dibujaEscenario();

  //protagosnista wife
  protagonistaWife.dibuja();

  //protagosnista
  protagonista.dibuja();

  //enemigos
  enemigoBarney.dibuja();
  enemigoBarney.mueve();
  enemigoRobin.dibuja();
  enemigoRobin.mueve();
}
