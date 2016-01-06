/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined") {
    window.Osmos = {};
  }

  var PlayerCell = Osmos.PlayerCell = function(options){
    options.radius = 50;
    options.vel = options.vel || [0, 0];
    options.pos[0] = Osmos.Game.DIM_X - 150;
    options.pos[1] = Osmos.Game.DIM_Y / 2;
    options.image = new Image();
    options.image.src = 'assets/player.png';

    Osmos.MovingObject.call(this, options);
  };

  Osmos.Util.inherits(PlayerCell, Osmos.Cell);

  PlayerCell.prototype.power = function (impulse) {
    if ((this.vel[0] < 2 && impulse[0] > 0) ||
        (this.vel[0] > -2 && impulse[0] < 0)){
      this.vel[0] += impulse[0];
    }

    if ((this.vel[1] < 2 && impulse[1] > 0) ||
        (this.vel[1] > -2 && impulse[1] < 0)){
      this.vel[1] += impulse[1];
    }
  };
})();
