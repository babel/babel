var foo = "bar";

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  this.bar = foo;
  var _foo = "foo";
  var baz = "baz";
};

Foo.bar = baz;
