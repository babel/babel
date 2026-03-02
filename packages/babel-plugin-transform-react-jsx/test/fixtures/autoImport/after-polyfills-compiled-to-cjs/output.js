"use strict";

require("react-app-polyfill/ie11");
require("react-app-polyfill/stable");
var _reactDom = babelHelpers.interopRequireDefault(require("react-dom"));
var _jsxRuntime = require("react/jsx-runtime");
// https://github.com/babel/babel/issues/12522

_reactDom.default.render(/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
  children: "Hello, World!"
}), document.getElementById('root'));
