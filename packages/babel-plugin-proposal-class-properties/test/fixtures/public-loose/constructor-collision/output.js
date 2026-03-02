var foo = "bar";
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  this.bar = foo;
  var _foo = "foo";
  var baz = "baz";
});
Foo.bar = baz;
