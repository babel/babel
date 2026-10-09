import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const namespace = {
  MyComponent: props => props.name
};
const buildTest = name => {
  var _MyComponent;
  const {
    MyComponent
  } = namespace;
  return () => _MyComponent || (_MyComponent = /*#__PURE__*/_jsx(MyComponent, {
    name: name
  }));
};
