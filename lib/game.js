/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  var Game = Osmos.Game = function(ctx){
    this.cells = [];
    this.ctx = ctx;
    this.virus = this.addVirus();
    this.player = this.addPlayer();

    this.addCells();
    this.gameOver = false;
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = document.body.clientWidth;
  Game.DIM_Y = document.body.clientHeight;
  Game.FPS = 32;
  Game.NUM_CELLS = 35;

  Game.prototype.allObjects = function () {
    return [].concat(this.cells, this.virus, this.player);
  };

  Game.prototype.addCells = function(){
    for (var i = 0; i < Game.NUM_CELLS; i++) {
      this.cells.push(new Osmos.Cell({ game: this }));
    }
  };

  Game.prototype.addPlayer = function () {
    var player = new Osmos.PlayerCell({
      pos: this.randomPosition(),
      game: this
    });

    this.player = player;

    return player;
  };

  Game.prototype.addVirus = function () {
    var virus = new Osmos.Virus({
      pos: this.randomPosition(),
      game: this
    });

    this.virus = virus;

    return virus;
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.draw = function (ctx) {
    if (!this.gameOver) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
    }
  };

  Game.prototype.moveObjects = function (delta) {
    this.allObjects().forEach(function (object) {
      object.move(delta);
    });
  };

  Game.prototype.step = function (delta) {
    if (!this.gameOver) {
      this.moveObjects(delta);
      this.checkCollisions();
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap(coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 === obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Osmos.PlayerCell) {
      this.gameOver = true;
      this.player = null;
      this.virus = null;
      this.endGameMessage("lost");
    } else if (object instanceof Osmos.Virus) {
      this.gameOver = true;
      this.virus = null;
      this.player = null;
      this.endGameMessage("won");
    } else if (object instanceof Osmos.Cell) {
      this.cells.splice(this.cells.indexOf(object), 1);
    }
  };

  Game.prototype.endGameMessage = function(state){
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, document.body.clientWidth,
                      document.body.clientHeight);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.textBaseline="center";
    this.ctx.textAlign="center";
    var message = state === "won" ? "You won! Press 'Space' to play again!" :
                                    "You lost. Press 'Space' to try again!";
    this.ctx.fillText(message,
                      document.body.clientWidth / 2,
                      document.body.clientHeight / 2);
  };
}());
