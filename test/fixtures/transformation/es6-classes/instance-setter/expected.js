"use strict";

var Test = (function () {
  var _Test = function Test() {
    babelHelpers.classCallCheck(this, _Test);
  };

  babelHelpers.createClass(_Test, {
    test: {
      set: function (val) {
        this._test = val;
      }
    }
  });
  return _Test;
})();