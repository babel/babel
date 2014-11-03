"use strict";

var obj = (function (_obj) {
  Object.defineProperties(_obj, { foo: {
    get: function () {
      return 5 + 5;
    },
    set: function (value) {
      this._foo = value;
    }
  } });

  return _obj;
})({});