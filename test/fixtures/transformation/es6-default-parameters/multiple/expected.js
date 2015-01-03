"use strict";

var t = function () {
  var t = arguments[0] === undefined ? "foo" : arguments[0];
  var f = arguments[1] === undefined ? 5 : arguments[1];
  return t + " bar " + f;
};

var a = function (t) {
  var f = arguments[1] === undefined ? 5 : arguments[1];
  return t + " bar " + f;
};
