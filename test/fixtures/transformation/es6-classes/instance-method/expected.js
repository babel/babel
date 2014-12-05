"use strict";

var Test = (function () {
  var Test = function Test() {};

  Test.prototype.test = function () {
    return 5 + 5;
  };

  return Test;
})();
