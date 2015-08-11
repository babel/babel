"use strict";

var concat = function concat() {
  var x = arguments[0];
  var y = arguments[1];
};

var somefun = function somefun() {
  var get2ndArg = function get2ndArg(a, b) {
    var _b = arguments[2];
    var somef = function somef(x, y, z) {
      var _a = arguments[3];
    };
    var somefg = function somefg(c, d, e, f) {
      var _a = arguments[4];
    };
    var _d = arguments[3];
  };
  var get1stArg = function get1stArg() {
    return arguments[0];
  };
};

function demo1() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (i) {
    return args[i + 0];
  };
}
