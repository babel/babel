"use strict";

var obj = (function (_obj) {
  Object.defineProperties(_obj, {
    foo: {
      get: function () {
        return 5 + 5;
      },
      enumerable: true
    }
  });

  return _obj;
})({});
