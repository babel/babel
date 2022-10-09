"use strict";

var _react = babelHelpers.interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
const namespace = {
  MyComponent: props => props.name
};
const buildTest = name => {
  var _MyComponent;
  const {
    MyComponent
  } = namespace;
  return () => _MyComponent || (_MyComponent = /*#__PURE__*/(0, _jsxRuntime.jsx)(MyComponent, {
    name: name
  }));
};
