"use strict";

var obj = Object.defineProperties({}, {
  foo: {
    get: function get() {
      return 5 + 5;
    },
    configurable: true,
    enumerable: true
  }
});