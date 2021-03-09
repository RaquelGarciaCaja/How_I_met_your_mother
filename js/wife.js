//enemigo barney
var wife = function (x, y) {
  this.x = 7;
  this.y = 5;

  this.dibuja = function () {
    ctx.drawImage(wife, this.x * anchoF, this.y * altoF, anchoF, altoF);
  };

  protagonista.winWife(this.x, this.y);
};
