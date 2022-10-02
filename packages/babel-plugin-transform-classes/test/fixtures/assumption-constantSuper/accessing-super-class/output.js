var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);
  var _super = babelHelpers.createSuper(Test);
  function Test() {
    var _Foo$prototype$test;
    var _this;
    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = _super.call(this);
    _Foo.prototype.test.call(babelHelpers.assertThisInitialized(_this));
    _this = _super.apply(this, arguments);
    _this = _super.call.apply(_super, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    _Foo.prototype.test.apply(babelHelpers.assertThisInitialized(_this), arguments);
    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, [babelHelpers.assertThisInitialized(_this), "test"].concat(Array.prototype.slice.call(arguments)));
    return _this;
  }
  return babelHelpers.createClass(Test);
}(Foo);
