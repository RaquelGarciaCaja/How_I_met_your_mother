const barneySection = document.querySelector(".js-barney");
const robinSection = document.querySelector(".js-robin");
const wifeSection = document.querySelector(".js-wife");
const liliSection = document.querySelector(".js-lili");
const marshalSection = document.querySelector(".js-marshal");
const introConainter = document.querySelector(".js-containerIntro");
var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var pared;
var barney;
var wife;
var robin;
var lili;
var marshal;
var protagonista;
var time;

//funcion inicial
function inicializa() {
  const canvas = document.querySelector(".js-canvas");
  const buttonIntro = document.querySelector(".js-buttonIntro");
  buttonIntro.addEventListener("click", () => {
    introConainter.style.display = "none";
    canvas.style.display = "flex";
    game();
  });
}

// escenario
var escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0],
  [0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

//funcion dibuja el esceario
function dibujaEscenario() {
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {
      //7
      var tile = escenario[y][x];
      ctx.drawImage(pared, tile * 45, 80, 30, 30, anchoF * x, altoF * y, anchoF, altoF);
    }
  }
}

//OBJETO JUGADOR
var jugador = function () {
  this.x = 1;
  this.y = 1;

  this.dibuja = function () {
    ctx.drawImage(ted, this.x * anchoF, this.y * altoF, anchoF, altoF);
  };

  this.colisionBarney = function (x, y) {
    if (this.x == x && this.y == y) {
      this.noMovimiento();
      barneySection.style.display = "flex";
    }
  };

  this.colisionRobin = function (x, y) {
    if (this.x == x && this.y == y) {
      this.noMovimiento();
      robinSection.style.display = "flex";
    }
  };
  this.colisionLili = function (x, y) {
    if (this.x == x && this.y == y) {
      this.noMovimiento();
      liliSection.style.display = "flex";
    }
  };
  this.colisionMarshal = function (x, y) {
    if (this.x == x && this.y == y) {
      this.noMovimiento();
      marshalSection.style.display = "flex";
    }
  };
  this.winWife = function (x, y) {
    if (this.x == x && this.y == y) {
      this.noMovimiento();
      wifeSection.style.display = "flex";
    }
  };

  this.noMovimiento = function (x, y) {
    clearInterval(time);
  };

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
    }
  };

  this.abajo = function () {
    if (this.margenes(this.x, this.y + 1) == false) {
      this.y++;
    }
  };

  this.izquierda = function () {
    if (this.margenes(this.x - 1, this.y) == false) {
      this.x--;
    }
  };

  this.derecha = function () {
    if (this.margenes(this.x + 1, this.y) == false) {
      this.x++;
    }
  };
};

//funcion del juego
function game() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //creamos la pared
  pared = new Image();
  pared.src = "images/tilemap2.png";

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
  robin.src = "images/robin.png";
  //
  enemigoLili = new lili();
  lili = new Image();
  lili.src = "images/lili.png";
  //
  enemigoMarshal = new marshal();
  marshal = new Image();
  marshal.src = "images/marshal.png";

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

  time = setInterval(function () {
    principal();
  }, 1000 / FPS);
}

function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}

//////////////// close enemy /////////////
function close() {
  barneySection.style.display = "none";
  robinSection.style.display = "none";
  wifeSection.style.display = "none";
  liliSection.style.display = "none";
  marshalSection.style.display = "none";
  location.reload();
}

function closeButtons() {
  const closeBtns = document.querySelectorAll(".js-buttons");
  for (const closeBtn of closeBtns) {
    closeBtn.addEventListener("click", close);
  }
}

closeButtons();

function principal() {
  borraCanvas();
  dibujaEscenario();

  //protagosnista wife
  protagonistaWife.dibuja();
  protagonistaWife.mueve();

  //protagosnista
  protagonista.dibuja();

  //enemigos
  enemigoBarney.dibuja();
  enemigoBarney.mueve();
  enemigoRobin.dibuja();
  enemigoRobin.mueve();
  enemigoLili.dibuja();
  enemigoLili.mueve();
  enemigoMarshal.dibuja();
  enemigoMarshal.mueve();
}
