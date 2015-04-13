"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, _Foo);
  }

  var _Foo = Foo;
  Foo = foo(Foo) || Foo;
  return Foo;
})();

var Bar = (function () {
  function Bar() {
    babelHelpers.classCallCheck(this, _Bar);
  }

  var _Bar = Bar;
  Bar = bar(Bar) || Bar;
  Bar = foo(Bar) || Bar;
  return Bar;
})();

var Foo2 = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, _Foo2);
  }

  var _Foo2 = Foo;
  Foo = bar(Foo) || Foo;
  return Foo;
})();

var Bar2 = (function () {
  function Bar() {
    babelHelpers.classCallCheck(this, _Bar2);
  }

  var _Bar2 = Bar;
  Bar = bar(Bar) || Bar;
  Bar = foo(Bar) || Bar;
  return Bar;
})();

var Baz = (function () {
  function Baz(baz) {
    babelHelpers.classCallCheck(this, _Baz);

    this.baz = baz;
  }

  var _Baz = Baz;
  Baz = foo(Baz) || Baz;
  return Baz;
})();
