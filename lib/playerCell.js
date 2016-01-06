/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined") {
    window.Osmos = {};
  }

  var PlayerCell = Osmos.PlayerCell = function(options){
    options.radius = 20;
    options.vel = options.vel || [0, 0];
    options.pos = [850, 300];
    options.image = new Image();
    options.image.src = 'assets/player.png';

    Osmos.MovingObject.call(this, options);
  };

  Osmos.Util.inherits(PlayerCell, Osmos.Cell);

  PlayerCell.prototype.power = function (impulse) {
    if ((this.vel[0] < 1.5 && impulse[0] > 0) ||
        (this.vel[0] > -1.5 && impulse[0] < 0)){
      this.vel[0] += impulse[0];
    }

    if ((this.vel[1] < 1.5 && impulse[1] > 0) ||
        (this.vel[1] > -1.5 && impulse[1] < 0)){
      this.vel[1] += impulse[1];
    }
  };
})();
