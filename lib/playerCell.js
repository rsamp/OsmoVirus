/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined") {
    window.Osmos = {};
  }

  var PlayerCell = Osmos.PlayerCell = function(options){
    options.radius = 5;
    options.color = "#aaaaaa";
    options.vel = options.vel || [0, 0];
    // this.pos = game.randomPosition;
    // this.game = game;
    Osmos.MovingObject.call(this, options);
  };

  Osmos.Util.inherits(PlayerCell, Osmos.Cell);
})();
