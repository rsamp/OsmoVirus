/* globals Osmos */

(function() {
  if(typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  Osmos.COLOR = "red";
  // Osmos.RADIUS = Math.random() * 30;
  Osmos.SPEED = .4;

  var Cell = Osmos.Cell = function(options) {
    // options.color = Osmos.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    // options.radius = Osmos.RADIUS;
    options.radius = Math.random() * 20;
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
        if (this.radius > .2){
          otherObject.radius += .14;
          this.radius -= .2;
        } else if (this.radius <= .2) {
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
