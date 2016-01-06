/* globals Osmos */

(function() {
  if(typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  Osmos.SPEED = .8;

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
      // otherObject.relocate();

      // Larger object absorbs other
      if (otherObject.radius >= this.radius){
        if (this.radius > .5){
          otherObject.radius += .4;
          this.radius -= .5;
        } else if (this.radius <= .5) {
          this.game.remove(this);
        }
      }

      // if (otherObject.radius * 2 <= this.radius &&
      //       (otherObject.pos[0] < this.pos[0] + this.radius ||
      //       otherObject.pos[0] > this.pos[0] - this.radius) &&
      //       (otherObject.pos[1] < this.pos[1] + this.radius ||
      //       otherObject.pos[1] > this.pos[1] - this.radius)){
      //   this.radius += otherObject.radius;
      //   this.game.remove(otherObject);
      // }
    // } else if (otherObject instanceof Osmos.Player) {

    }
  };

}());
