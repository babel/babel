import { jsx as _jsx } from "react/jsx-runtime";

var foo = function () {
  var _this = this;

  return function () {
    return /*#__PURE__*/_jsx(_this, {});
  };
};

var bar = function () {
  var _this2 = this;

  return function () {
    return /*#__PURE__*/_jsx(_this2.foo, {});
  };
};
