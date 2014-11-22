"use strict";

var _applyConstructor = function (Constructor, args) {
  var instance = Object.create(Constructor.prototype);

  Constructor.apply(instance, args);

  return instance;
};

_applyConstructor(Numbers, Array.from(nums));
_applyConstructor(Numbers, [1].concat(Array.from(nums)));
