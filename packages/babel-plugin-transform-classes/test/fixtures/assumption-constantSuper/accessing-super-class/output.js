var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);
  function Test() {
    var _Foo$prototype$test;
    var _this;
    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = babelHelpers.callSuper(this, Test);
    _Foo.prototype.test.call(babelHelpers.assertThisInitialized(_this));
    _this = babelHelpers.callSuper(this, Test, arguments);
    _this = babelHelpers.callSuper(this, Test, ["test"].concat(Array.prototype.slice.call(arguments)));
    _Foo.prototype.test.apply(babelHelpers.assertThisInitialized(_this), arguments);
    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, [babelHelpers.assertThisInitialized(_this), "test"].concat(Array.prototype.slice.call(arguments)));
    return _this;
  }
  return babelHelpers.createClass(Test);
}(Foo);
