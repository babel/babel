"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Parent = babelHelpers.interopRequireDefault(require("./Parent"));
var _Child2 = babelHelpers.interopRequireDefault(require("./Child"));
function MyComponent(_ref) {
  var _Child;
  var closeFn = _ref.closeFn;
  return /*#__PURE__*/React.createElement(_Parent["default"], {
    render: function render() {
      return _Child || (_Child = /*#__PURE__*/React.createElement(_Child2["default"], {
        closeFn: closeFn
      }));
    }
  });
}
var _default = _Parent["default"];
exports["default"] = _default;
