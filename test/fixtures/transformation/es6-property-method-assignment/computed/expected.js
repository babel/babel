"use strict";

var _defineProperty = function (obj, key, value) {
  return Object.defineProperty(obj, key, {
    value: value,
    enumerable: true,
    configurable: true,
    writable: true
  });
};

var x = "y";
var valueSet;
var obj = Object.defineProperties({}, _defineProperty({}, x, {
  get: function () {
    return 1;
  },
  set: function (value) {
    valueSet = value;
  },
  enumerable: true
}));
obj.y = "foo";
obj.y === 1 && valueSet === "foo";
