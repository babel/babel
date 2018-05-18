var foo = "bar";

var Foo = function Foo(_foo) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.defineProperty(this, "bar", this);
  babelHelpers.defineProperty(this, "baz", foo);
};
