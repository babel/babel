"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _last2 = babelHelpers.interopRequireDefault(require("lo-dash/last"));
let Container = exports.default = /*#__PURE__*/function () {
  function Container() {
    babelHelpers.classCallCheck(this, Container);
  }
  return babelHelpers.createClass(Container, [{
    key: "last",
    value: function last(key) {
      if (!this.has(key)) {
        return;
      }
      return (0, _last2.default)(this.tokens.get(key));
    }
  }]);
}();
