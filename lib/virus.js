/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined") {
    window.Osmos = {};
  }

  var Virus = Osmos.Virus = function(options){
    options.radius = 100;
    options.vel = options.vel || [0, 0];
    options.pos[0] = 150;
    options.pos[1] = Osmos.Game.DIM_Y / 2;
    options.image = new Image();
    options.image.src = 'assets/virus.png';

    Osmos.MovingObject.call(this, options);
  };

  Osmos.Util.inherits(Virus, Osmos.Cell);

  var NORMAL_FRAME_TIME_DELTA = 1000/60;
  Virus.prototype.move = function (timeDelta) {
    var player = this.game.player;

    var xDir = 0;
    var yDir = 0;
    var vector = [];

    if (this.radius >= player.radius){
      xDir = player.pos[0] - this.pos[0];
      yDir = player.pos[1] - this.pos[1];
    } else {
      if (this.game.cells[0]) {
        var targetCell = this.game.cells[0];
        xDir = targetCell.pos[0] - this.pos[0];
        yDir = targetCell.pos[1] - this.pos[1];
      }
    }
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
