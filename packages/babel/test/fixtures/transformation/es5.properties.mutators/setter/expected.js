"use strict";

var obj = Object.defineProperties({}, {
  foo: {
    set: function set(value) {
      this._foo = value;
    },
    configurable: true,
    enumerable: true
  }
});