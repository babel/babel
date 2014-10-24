"use strict";

var Test = function() {
  var Test = function Test() {};

  Object.defineProperties(Test.prototype, {
    test: {
      writable: true,

      value: function() {
        return 5 + 5;
      }
    }
  });

  return Test;
}();