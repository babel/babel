"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Test = (function () {
  function Test() {
    _classCallCheck(this, Test);
  }

  _prototypeProperties(Test, null, {
    test: {
      get: function () {
        return 5 + 5;
      },
      set: function (val) {
        this._test = val;
      },
      configurable: true
    }
  });

  return Test;
})();