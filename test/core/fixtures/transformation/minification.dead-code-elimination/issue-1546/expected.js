"use strict";

exports = Object.create(null, {
  __esModule: {
    value: true
  }
});

var X = (function () {
  function X() {
    babelHelpers.classCallCheck(this, X);
  }

  babelHelpers.createClass(X, [{
    key: "Y",
    value: function Y() {
      return new X();
    }
  }]);
  return X;
})();

exports.X = X;

