/* globals Osmos */

(function() {
  if(typeof Osmos === "undefined"){
    window.Osmos = {};
  }

  var Util = Osmos.Util = {};

  var inherits = Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate(){}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  // Find distance between two points.
  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  Util.randomVec = function(length) {
    var vector = [];
    var posOrNeg = Math.random() >= 0.5 ? 1 : -1;
    var posOrNeg2 = Math.random() >= 0.5 ? 1 : -1;
    vector[0] = (length / Math.sqrt(2)) * Math.random() * posOrNeg;
    vector[1] = (length / Math.sqrt(2)) * Math.random() * posOrNeg2;
    return vector;
  };
}());
