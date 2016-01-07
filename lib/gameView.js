/* globals Osmos, key */

(function() {
  if(typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  var GameView = Osmos.GameView = function(ctx){
    this.ctx = ctx;
  };

  GameView.MOVES = {
    "w": [ 0, -.6],
    "a": [-.6,  0],
    "s": [ 0,  .6],
    "d": [ .6,  0],
    up: [ 0, -.6],
    left: [-.6,  0],
    down: [ 0,  .6],
    right: [ .6,  0],
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
        this.game = null;
        this.start();
      }
    }.bind(this), false);

    this.printWelcomeMessage();
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
    var virusImage = new Image();
    virusImage.src = 'assets/virus.png';
    var playerImage = new Image();
    playerImage.src = 'assets/player.png';
    virusImage.onload = function(){
      this.ctx.drawImage(virusImage, width / 2 - 375, height / 2, 200, 200);
      this.ctx.fillText("Virus", width / 2 - 275, height / 2 + 105);
    }.bind(this);
    playerImage.onload = function(){
      this.ctx.drawImage(playerImage, width / 2 + 200, height / 2, 100, 100);
      this.ctx.fillText("You", width / 2 + 250, height / 2 + 55);
    }.bind(this);
    this.ctx.fillText("Welcome to OsmoVirus", width / 2, height / 2 - 80);
    this.ctx.font="16px Arial";
    this.ctx.fillText("Your objective is to swallow helpful Silver Cells " +
                      "until you are large enough to take on the Virus.",
                      width / 2, height / 2 - 50);
    this.ctx.fillText("Look out! The Virus will follow you " +
                      "around and will gobble up the Silver Cells as well.",
                      width / 2, height / 2 - 30);
    this.ctx.fillText("Use W-A-S-D or Arrow Keys to navigate",
                      width / 2, height / 2);
    this.ctx.fillText("Press 'Space' to start or at any time to start over",
                      width / 2, height / 2 + 30);
  };
}());
