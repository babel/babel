"use strict";

var x = "y";
var valueSet;
var obj = Object.defineProperties({}, babelHelpers.defineProperty({}, x, {
  get: function () {
    return 1;
  },
  set: function (value) {
    valueSet = value;
  },
  configurable: true,
  enumerable: true
}));
obj.y = "foo";
obj.y === 1 && valueSet === "foo";
