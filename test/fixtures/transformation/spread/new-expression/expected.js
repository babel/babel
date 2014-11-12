"use strict";

var _applyConstructor = function (Constructor, args) {
  var bindArgs = [null].concat(args);

  var Factory = Constructor.bind.apply(Constructor, bindArgs);

  return new Factory();
};

_applyConstructor(Numbers, Array.from(nums));
_applyConstructor(Numbers, [1].concat(Array.from(nums)));
