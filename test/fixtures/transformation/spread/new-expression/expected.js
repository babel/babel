"use strict";

var _applyConstructor = function (Constructor, args) {
  var instance = Object.create(Constructor.prototype);

  var result = Constructor.apply(instance, args);

  return result != null && (typeof result == "object" || typeof result == "function") ? result : instance;
};

_applyConstructor(Numbers, Array.from(nums));
_applyConstructor(Numbers, [1].concat(Array.from(nums)));
