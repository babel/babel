"use strict";

var obj = (function (_obj) {
  Object.defineProperties(_obj, { foo: { get: function () {
    return 5 + 5;
  } } });

  return _obj;
})({});