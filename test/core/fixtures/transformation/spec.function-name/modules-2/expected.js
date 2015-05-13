"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashArrayLast = require("lodash/array/last");

var _lodashArrayLast2 = babelHelpers.interopRequireDefault(_lodashArrayLast);

var Container = (function () {
  function Container() {
    babelHelpers.classCallCheck(this, Container);
  }

  babelHelpers.createClass(Container, [{
    key: "last",
    value: function last(key) {
      if (!this.has(key)) {
        return;
      }

      return (0, _lodashArrayLast2["default"])(this.tokens.get(key));
    }
  }]);
  return Container;
})();

exports["default"] = Container;
module.exports = exports["default"];
