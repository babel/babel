"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _last2 = babelHelpers.interopRequireDefault(require("lodash/last"));

let Container = function () {
  function Container() {
    babelHelpers.classCallCheck(this, Container);
  }

  babelHelpers.createClass(Container, [{
    key: "last",
    value: function last(key) {
      if (!this.has(key)) {
        return;
      }

      return (0, _last2.default)(this.tokens.get(key));
    }
  }]);
  return Container;
}();

exports.default = Container;