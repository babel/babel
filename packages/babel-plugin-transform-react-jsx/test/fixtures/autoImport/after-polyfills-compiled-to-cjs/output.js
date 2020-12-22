"use strict";

require("react-app-polyfill/ie11");

require("react-app-polyfill/stable");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/babel/babel/issues/12522
_reactDom.default.render( /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
  children: "Hello, World!"
}), document.getElementById('root'));
