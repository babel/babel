"use strict";

var A = new WeakMap();
var B = new WeakMap(),
    C = new WeakMap();
var D = (function () {
  var F = new WeakMap(),
      G = new WeakMap();
  var E = new WeakMap();
  function D() {}

  return D;
})();

var H = (function () {
  var J = new WeakMap(),
      K = new WeakMap();
  var I = new WeakMap();
  function H() {}

  return H;
})();
