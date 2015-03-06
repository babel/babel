"use strict";

var Test = (function () {
  var _Test = function Test() {
    babelHelpers.classCallCheck(this, _Test);
  };

  babelHelpers.createClass(_Test, {
    test: {
      get: function () {
        return 5 + 5;
      },
      set: function (val) {
        this._test = val;
      }
    }
  });
  return _Test;
})();