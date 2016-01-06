/* globals Osmos, key */

(function() {
  if(typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  var GameView = Osmos.GameView = function(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.player = this.game.addPlayer();
    this.virus = this.game.addVirus();
  };

  GameView.MOVES = {
    "w": [ 0, -.5],
    "a": [-.5,  0],
    "s": [ 0,  .5],
    "d": [ .5,  0],
    up: [ 0, -.5],
    left: [-.5,  0],
    down: [ 0,  .5],
    right: [ .5,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var player = this.player;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { player.power(move); });
    });
  };

  GameView.prototype.start = function(){
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function(time){
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };
}());
