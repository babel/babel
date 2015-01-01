"use strict";

var obj = Object.defineProperties({}, {
  foo: {
    set: function (value) {
      this._foo = value;
    },
    enumerable: true
  }
});
