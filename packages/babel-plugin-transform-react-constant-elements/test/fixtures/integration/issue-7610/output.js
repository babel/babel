"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Parent = babelHelpers.interopRequireDefault(require("./Parent"));

var _Child2 = babelHelpers.interopRequireDefault(require("./Child"));

var _jsxRuntime = require("react/jsx-runtime");

function MyComponent(_ref) {
  var _Child;

  let {
    closeFn
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Parent.default, {
    render: () => _Child || (_Child = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Child2.default, {
      closeFn: closeFn
    }))
  });
}

var _default = _Parent.default;
exports.default = _default;
