"use strict";

var obj = Object.defineProperties({}, {
  foo: {
    get: function get() {
      return 5 + 5;
    },
    set: function set(value) {
      this._foo = value;
    },
    configurable: true,
    enumerable: true
  }
});