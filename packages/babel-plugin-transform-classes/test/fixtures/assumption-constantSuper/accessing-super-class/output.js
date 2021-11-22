var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);

  var _super = babelHelpers.createSuper(Test);

  function Test() {
    var _sprd, _sprd2, _Foo$prototype$test;

    var _this;

    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = _super.call(this);

    _Foo.prototype.test.call(babelHelpers.assertThisInitialized(_this));

    _this = _super.apply(this, arguments);
    _this = _super.call.apply(_super, ((_sprd = [this, "test"]).push.apply(_sprd, arguments), _sprd));

    _Foo.prototype.test.apply(babelHelpers.assertThisInitialized(_this), arguments);

    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, ((_sprd2 = [babelHelpers.assertThisInitialized(_this), "test"]).push.apply(_sprd2, arguments), _sprd2));

    return _this;
  }

  return Test;
}(Foo);
