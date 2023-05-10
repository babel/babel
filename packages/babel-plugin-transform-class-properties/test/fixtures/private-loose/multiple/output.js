var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _y = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("y");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _x, {
    writable: true,
    value: 0
  });
  Object.defineProperty(this, _y, {
    writable: true,
    value: babelHelpers.classPrivateFieldLooseBase(this, _x)[_x]
  });
});
