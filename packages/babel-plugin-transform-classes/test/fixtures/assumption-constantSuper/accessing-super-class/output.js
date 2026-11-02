var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  function Test() {
    var _Foo$prototype$test;
    var _this;
    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = babelHelpers.callSuper(this, Test);
    _Foo.prototype.test.call(_this);
    _this = babelHelpers.callSuper(this, Test, arguments);
    _this = babelHelpers.callSuper(this, Test, ["test"].concat(Array.prototype.slice.call(arguments)));
    _Foo.prototype.test.apply(_this, arguments);
    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, [_this, "test"].concat(Array.prototype.slice.call(arguments)));
    return _this;
  }
  babelHelpers.inherits(Test, _Foo);
  return babelHelpers.createClass(Test);
}(Foo);
