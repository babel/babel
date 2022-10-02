var _x = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakMap();
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateFieldInitSpec(this, _x, {
    writable: true,
    value: 0
  });
  babelHelpers.classPrivateFieldInitSpec(this, _y, {
    writable: true,
    value: babelHelpers.classPrivateFieldGet(this, _x)
  });
});
