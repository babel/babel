"use strict";

var A = function() {
  var A = function A() {};

  Object.defineProperties(A, {
    a: {
      writable: true,
      value: function() {}
    },

    b: {
      get: function() {},
      set: function(b) {}
    }
  });

  return A;
}();