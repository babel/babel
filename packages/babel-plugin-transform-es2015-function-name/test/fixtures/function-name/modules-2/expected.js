"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _last2 = require("lodash/last");

var _last3 = babelHelpers.interopRequireDefault(_last2);

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

      return (0, _last3.default)(this.tokens.get(key));
    }
  }]);
  return Container;
}();

exports.default = Container;
