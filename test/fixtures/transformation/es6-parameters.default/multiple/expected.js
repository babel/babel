"use strict";

var t = function t() {
  var e = arguments[0] === undefined ? "foo" : arguments[0];
  var f = arguments[1] === undefined ? 5 : arguments[1];

  return e + " bar " + f;
};

var a = function a(e) {
  var f = arguments[1] === undefined ? 5 : arguments[1];

  return e + " bar " + f;
};
