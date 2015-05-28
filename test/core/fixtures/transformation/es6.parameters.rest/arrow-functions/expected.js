"use strict";

var concat = function concat() {
  var x = arguments[0];
  var y = arguments[1];
};

var somefun = function somefun() {
  var _arguments = arguments;

  var get2ndArg = function get2ndArg(a, b) {
    for (var _len = arguments.length, args1 = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args1[_key - 2] = arguments[_key];
    }

    var _b = args1[0];
    var somef = function somef(x, y, z) {
      var _a = arguments[3];
    };
    var somefg = function somefg(c, d, e, f) {
      var _a = arguments[4];
    };
    var _c = _arguments[1];
    var _d = args1[1];
  };
  var get1stArg = function get1stArg() {
    return arguments[0];
  };
};

function demo1() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (i) {
    return args[i + 0];
  };
}
