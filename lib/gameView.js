/* globals Osmos, key */

(function() {
  if(typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  var GameView = Osmos.GameView = function(game, ctx){
    this.ctx = ctx;
    this.game = game;
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
    var player = this.game.player;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { player.power(move); });
    });
  };

  GameView.prototype.welcome = function() {
    window.addEventListener('keydown', function(e){
      if(e.keyCode === 32){
        this.start();
      }
    }.bind(this), false);

    this.printWelcomeMessage();
  };

  GameView.prototype.gameOver = function(){
    // debugger;
    this.game = null;
    // this.ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    // this.gameOver = true;
    // this.game = null;
    // this.game = new Osmos.Game(this.ctx);
    // this.printGameOverMessage(state);
  };

  GameView.prototype.start = function(){
    this.game = new Osmos.Game(this.ctx);
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function(time){
    if (!this.game.gameOver) {
      var timeDelta = time - this.lastTime;

      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;

      //every call to animate requests causes another call to animate
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.gameOver();
    }
  };

  GameView.prototype.printWelcomeMessage = function(){
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.textBaseline="center";
    this.ctx.textAlign="center";
    this.ctx.fillText("Welcome to Cell Swallow", width / 2, height / 2 - 80);
    this.ctx.font="16px Arial";
    this.ctx.fillText("Your objective is to swallow helpful grower-cells" +
                      "until you are large enough to take on the Virus.",
                      width / 2, height / 2 - 50);
    this.ctx.fillText("Look out for that pesky Virus. It will follow you " +
                      "around and may eat the grower-cells as well.",
                      width / 2, height / 2 - 30);
    this.ctx.fillText("Use W-A-S-D or Arrow Keys to navigate",
                      width / 2, height / 2);
    this.ctx.fillText("Press 'Space' to start", width / 2, height / 2 + 30);
  };
}());
