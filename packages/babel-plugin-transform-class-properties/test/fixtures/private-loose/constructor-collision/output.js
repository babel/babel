var foo = "bar";
var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _bar, {
    writable: true,
    value: foo
  });
  var _foo = "foo";
});
