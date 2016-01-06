/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined") {
    window.Osmos = {};
  }

  var Virus = Osmos.Virus = function(options){
    options.radius = 60;
    options.vel = options.vel || [0, 0];
    options.pos = [150, 300];
    options.image = new Image();
    options.image.src = 'assets/virus.png';

    Osmos.MovingObject.call(this, options);
  };

  Osmos.Util.inherits(Virus, Osmos.Cell);

  var NORMAL_FRAME_TIME_DELTA = 1000/60;
  Virus.prototype.move = function (timeDelta) {
    var player = this.game.player;

    var xDir = player.pos[0] - this.pos[0];
    var yDir = player.pos[1] - this.pos[1];
    var vector = [];

    vector[0] = (xDir / Math.sqrt(2));
    vector[1] = (yDir / Math.sqrt(2));

    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = vector[0] * velocityScale / 250,
        offsetY = vector[1] * velocityScale / 250;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }
  };


})();
