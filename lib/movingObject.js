/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  var MovingObject = Osmos.MovingObject = function(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  var mo = new Osmos.MovingObject(
    { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
  );

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Osmos.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.isWrappable = true;

  var NORMAL_FRAME_TIME_DELTA = 1000/60;
  MovingObject.prototype.move = function (timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }
  };

}());
