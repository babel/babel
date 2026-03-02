var foo = "bar";
var _bar = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateFieldInitSpec(this, _bar, foo);
  var _foo = "foo";
});
