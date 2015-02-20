"use strict";

var t = function t() {
  var t = arguments[0] === undefined ? "foo" : arguments[0];
  var f = arguments[1] === undefined ? 5 : arguments[1];

  return t + " bar " + f;
};

var a = function a(t) {
  var f = arguments[1] === undefined ? 5 : arguments[1];

  return t + " bar " + f;
};
