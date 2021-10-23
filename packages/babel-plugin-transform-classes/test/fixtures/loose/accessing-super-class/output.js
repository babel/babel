var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inheritsLoose(Test, _Foo);

  function Test() {
    var _args, _args2, _Foo$prototype$test;

    var _this;

    woops.super.test();
    _this = _Foo.call(this) || this;

    _Foo.prototype.test.call(babelHelpers.assertThisInitialized(_this));

    _this = _Foo.apply(this, arguments) || this;
    _this = _Foo.call.apply(_Foo, [this, "test"].concat(((_args = []).push.apply(_args, arguments), _args))) || this;

    _Foo.prototype.test.apply(babelHelpers.assertThisInitialized(_this), arguments);

    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, [babelHelpers.assertThisInitialized(_this), "test"].concat(((_args2 = []).push.apply(_args2, arguments), _args2)));

    return _this;
  }

  return Test;
}(Foo);
