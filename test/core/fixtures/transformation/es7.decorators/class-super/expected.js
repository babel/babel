"use strict";

var Foo = (function (_Bar) {
  function Foo() {
    babelHelpers.classCallCheck(this, _Foo);

    babelHelpers.get(Object.getPrototypeOf(_Foo.prototype), "constructor", this).call(this);
  }

  babelHelpers.inherits(Foo, _Bar);
  var _Foo = Foo;
  Foo = bar(Foo) || Foo;
  return Foo;
})(Bar);

var Foo2 = (function (_Bar2) {
  var _class = function Foo2() {
    babelHelpers.classCallCheck(this, _class2);

    babelHelpers.get(Object.getPrototypeOf(_class2.prototype), "constructor", this).call(this);
  };

  babelHelpers.inherits(_class, _Bar2);
  var _class2 = _class;
  _class = bar(_class) || _class;
  return _class;
})(Bar);
