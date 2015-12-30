/* globals Osmos */

(function() {
  if(typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  Osmos.COLOR = "#ffffff";
  // Osmos.RADIUS = Math.random() * 30;
  Osmos.SPEED = .3;

  var Cell = Osmos.Cell = function(options) {
    options.color = Osmos.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    // options.radius = Osmos.RADIUS;
    options.radius = Math.random() * 20;
    options.vel = options.vel || Osmos.Util.randomVec(Osmos.SPEED);

    Osmos.MovingObject.call(this, options);
  };

  Osmos.Util.inherits(Cell, Osmos.MovingObject);

  Cell.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Osmos.Cell) {
      // otherObject.relocate();
      if (otherObject.radius >= this.radius){
        if (this.radius > .01){
          otherObject.radius += .005;
          this.radius -= .01;
        }
      } else {
        if (otherObject.radius > .1){
          otherObject.radius -= .1;
          this.radius += .05;
        }
      }
    // } else if (otherObject instanceof Osmos.Player) {

    }
  };

}());
