/* globals Osmos */

(function() {
  if(typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  Osmos.SPEED = 1;

  var Cell = Osmos.Cell = function(options) {
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Math.random() * 30;
    options.vel = options.vel || Osmos.Util.randomVec(Osmos.SPEED);
    options.image = new Image();
    options.image.src = 'assets/silver.png';

    Osmos.MovingObject.call(this, options);
  };

  Osmos.Util.inherits(Cell, Osmos.MovingObject);

  Cell.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Osmos.Cell) {
      // Larger object absorbs other
      if (otherObject.radius >= this.radius){
        if (this.radius > .5){
          otherObject.radius += .3;
          this.radius -= .5;
        } else if (this.radius <= .5) {
          this.game.remove(this);
        }
      } else if (otherObject.radius < this.radius){
        if (otherObject.radius > .5) {
          this.radius += .3;
          otherObject.radius -= .5;
        } else if (otherObject.radius <= .5) {
          this.game.remove(otherObject);
        }
      }
    }
  };

}());
