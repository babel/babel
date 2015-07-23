"use strict";

var IdenticalName = (function () {
  return function IdenticalName(x) {
    return x;
  };
})();

(function () {
  return function foo() {};
})();
