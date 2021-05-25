var _x = /*#__PURE__*/new WeakMap();

var _y = /*#__PURE__*/new WeakMap();

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _x.set(this, {
    writable: true,
    value: 0
  });

  _y.set(this, {
    writable: true,
    value: babelHelpers.classPrivateFieldGet(this, _x)
  });
};
