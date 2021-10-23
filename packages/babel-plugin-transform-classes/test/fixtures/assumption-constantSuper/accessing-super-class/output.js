var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);

  var _super = babelHelpers.createSuper(Test);

  function Test() {
    var _args, _args2, _Foo$prototype$test;

    var _this;

    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = _super.call(this);

    _Foo.prototype.test.call(babelHelpers.assertThisInitialized(_this));

    _this = _super.apply(this, arguments);
    _this = _super.call.apply(_super, [this, "test"].concat(((_args = []).push.apply(_args, arguments), _args)));

    _Foo.prototype.test.apply(babelHelpers.assertThisInitialized(_this), arguments);

    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, [babelHelpers.assertThisInitialized(_this), "test"].concat(((_args2 = []).push.apply(_args2, arguments), _args2)));

    return _this;
  }

  return Test;
}(Foo);
