"use strict";

var obj = Object.defineProperties({}, {
  foo: {
    get: function () {
      return 5 + 5;
    },
    enumerable: true
  }
});
