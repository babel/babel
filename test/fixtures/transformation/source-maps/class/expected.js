"use strict";
var Test = (function () {
  var Test = function Test() {};
  Object.defineProperties(Test.prototype, { bar: { get: function () {
    throw new Error("wow");
  } } });
  return Test;
})();
var test = new Test;
test.bar;
