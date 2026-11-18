var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  function Test() {
    var _Foo$prototype$foo, _Foo$prototype$foo2;
    var _this;
    (_Foo$prototype$foo = _Foo.prototype.foo) == null || _Foo$prototype$foo.bar;
    (_Foo$prototype$foo2 = _Foo.prototype.foo) == null || _Foo$prototype$foo2.call(babelHelpers.assertThisInitialized(_this));
    return babelHelpers.assertThisInitialized(_this);
  }
  babelHelpers.inheritsLoose(Test, _Foo);
  return Test;
}(Foo);
