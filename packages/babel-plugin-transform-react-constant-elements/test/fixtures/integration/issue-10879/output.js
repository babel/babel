"use strict";

var _react = babelHelpers.interopRequireDefault(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

var namespace = {
  MyComponent: function MyComponent(props) {
    return props.name;
  }
};

var buildTest = function buildTest(name) {
  var _MyComponent;

  var MyComponent = namespace.MyComponent;
  return function () {
    return _MyComponent || (_MyComponent = /*#__PURE__*/(0, _jsxRuntime.jsx)(MyComponent, {
      name: name
    }));
  };
};
