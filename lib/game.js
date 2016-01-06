/* globals Osmos */

(function() {
  if (typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  var Game = Osmos.Game = function(){
    this.cells = [];
    this.virus = null;
    this.player = null;

    this.addCells();
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_CELLS = 25;
  Game.TOTAL_CELLS = 100;

  Game.prototype.add = function (object) {
    if (object instanceof Osmos.Cell) {
      this.cells.push(object);
    // } else if (object instanceof Osmos.Virus) {
    //   this.viruses.push(object);
    // } else if (object instanceof Osmos.PlayerCell) {
    //   this.player.push(object);
    }
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.cells, this.virus, this.player);
  };

  Game.prototype.addCells = function(){
    for (var i = 0; i < Game.NUM_CELLS; i++) {
      this.add(new Osmos.Cell({ game: this }));
    }
  };

  Game.prototype.addPlayer = function () {
    var player = new Osmos.PlayerCell({
      pos: this.randomPosition(),
      game: this
    });

    // this.add(player);
    this.player = player;

    return player;
  };

  Game.prototype.addVirus = function () {
    var virus = new Osmos.Virus({
      pos: this.randomPosition(),
      game: this
    });

    // this.add(virus);
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
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function (delta) {
    this.allObjects().forEach(function (object) {
      object.move(delta);
    });
  };

  Game.prototype.step = function (delta) {
    this.moveObjects(delta);
    this.checkCollisions();
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
    if (object instanceof Osmos.Cell) {
      var idx = this.cells.indexOf(object);
      if (Osmos.NUM_CELLS < Osmos.TOTAL_CELLS) {
        this.cells[idx] = new Osmos.Cell({ game: this });
        Osmos.NUM_CELLS++;
      }
    } else if (object instanceof Osmos.Player) {
      this.player.splice(this.player.indexOf(object), 1);
    } else if (object instanceof Osmos.Virus) {
      this.player.splice(this.viruses.indexOf(object), 1);
    }
  };

}());
