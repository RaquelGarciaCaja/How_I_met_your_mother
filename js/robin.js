//enemigo robin
var robin = function (x, y) {
  this.x = 9;
  this.y = 8;

  this.direccion = Math.floor(Math.random() * 4);
  this.retraso = 10;
  this.fotograma = 0;

  this.dibuja = function () {
    ctx.drawImage(robin, this.x * anchoF, this.y * altoF, anchoF, altoF);
  };

  this.compruebaColision = function (x, y) {
    var colisiona = false;

    if (escenario[y][x] == 0) {
      colisiona = true;
    }
    return colisiona;
  };

  this.mueve = function () {
    protagonista.colisionRobin(this.x, this.y);

    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;

      //ARRIBA
      if (this.direccion == 0) {
        if (this.compruebaColision(this.x, this.y - 1) == false) {
          this.y--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }

      //ABAJO
      if (this.direccion == 1) {
        if (this.compruebaColision(this.x, this.y + 1) == false) {
          this.y++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }

      //IZQUIERDA
      if (this.direccion == 2) {
        if (this.compruebaColision(this.x - 1, this.y) == false) {
          this.x--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }

      //IZQUIERDA
      if (this.direccion == 3) {
        if (this.compruebaColision(this.x + 1, this.y) == false) {
          this.x++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
    }
  };
};
