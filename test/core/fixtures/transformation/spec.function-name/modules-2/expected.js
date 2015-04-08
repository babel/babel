"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _last2 = require("lodash/array/last");

var _last3 = babelHelpers.interopRequireWildcard(_last2);

var Container = (function () {
  function Container() {
    babelHelpers.classCallCheck(this, Container);
  }

  babelHelpers.createClass(Container, [{
    key: "last",
    value: (function (_last) {
      function last(_x) {
        return _last.apply(this, arguments);
      }

      last.toString = function () {
        return _last.toString();
      };

      return last;
    })(function (key) {
      if (!this.has(key)) return;
      return _last3["default"](this.tokens.get(key));
    })
  }]);
  return Container;
})();

exports["default"] = Container;
module.exports = exports["default"];
