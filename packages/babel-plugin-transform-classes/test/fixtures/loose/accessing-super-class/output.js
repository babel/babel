var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inheritsLoose(Test, _Foo);

  function Test() {
    var _sprd, _sprd2, _Foo$prototype$test;

    var _this;

    woops.super.test();
    _this = _Foo.call(this) || this;

    _Foo.prototype.test.call(babelHelpers.assertThisInitialized(_this));

    _this = _Foo.apply(this, arguments) || this;
    _this = _Foo.call.apply(_Foo, ((_sprd = [this, "test"]).push.apply(_sprd, arguments), _sprd)) || this;

    _Foo.prototype.test.apply(babelHelpers.assertThisInitialized(_this), arguments);

    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, ((_sprd2 = [babelHelpers.assertThisInitialized(_this), "test"]).push.apply(_sprd2, arguments), _sprd2));

    return _this;
  }

  return Test;
}(Foo);
