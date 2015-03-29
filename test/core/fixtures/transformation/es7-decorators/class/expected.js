"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  Foo = foo(Foo) || Foo;
  return Foo;
})();

var Bar = (function () {
  function Bar() {
    babelHelpers.classCallCheck(this, Bar);
  }

  Bar = foo(Bar) || Bar;
  Bar = bar(Bar) || Bar;
  return Bar;
})();

var Foo2 = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  Foo = bar(Foo) || Foo;
  return Foo;
})();

var Bar2 = (function () {
  function Bar() {
    babelHelpers.classCallCheck(this, Bar);
  }

  Bar = foo(Bar) || Bar;
  Bar = bar(Bar) || Bar;
  return Bar;
})();