"use strict";

var _arrow;

function _newArrowCheck(instance, arrowFn) { if (instance instanceof arrowFn) { throw new TypeError("Cannot instantiate an arrow function"); } }

arr.map((_arrow = function (x) {
  _newArrowCheck(this, _arrow);

  return x * x;
}).bind(this));
var f = (function f(x, y) {
  _newArrowCheck(this, f);

  return x * y;
}).bind(this);
(function () {
  var _arrow2;

  return (_arrow2 = function () {
    _newArrowCheck(this, _arrow2);

    return this;
  }).bind(this);
})();
