/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  var MovingObject = Osmos.MovingObject = function(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = 'transparent';
    this.game = options.game;
    this.image = options.image;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.drawImage(this.image, this.pos[0] - this.radius,
                  this.pos[1] - this.radius, this.radius * 2,
                  this.radius * 2);
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
