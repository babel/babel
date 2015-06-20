"use strict";

var x = "y";
var valueSet;
var obj = Object.defineProperties({}, babelHelpers.defineProperty({}, x, {
  get: function get() {
    return 1;
  },
  set: function set(value) {
    valueSet = value;
  },
  configurable: true,
  enumerable: true
}));
obj.y = "foo";
obj.y === 1 && valueSet === "foo";