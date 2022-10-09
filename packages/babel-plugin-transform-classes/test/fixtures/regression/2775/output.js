"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = babelHelpers.interopRequireWildcard(require("react"));
var RandomComponent = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(RandomComponent, _Component);
  var _super = babelHelpers.createSuper(RandomComponent);
  function RandomComponent() {
    babelHelpers.classCallCheck(this, RandomComponent);
    return _super.call(this);
  }
  babelHelpers.createClass(RandomComponent, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "sui-RandomComponent"
      }, /*#__PURE__*/_react["default"].createElement("h2", null, "Hi there!"));
    }
  }]);
  return RandomComponent;
}(_react.Component);
exports["default"] = RandomComponent;
