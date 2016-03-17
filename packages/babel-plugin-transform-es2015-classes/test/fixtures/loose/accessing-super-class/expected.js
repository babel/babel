var Test = function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    var _Foo$prototype$test, _Foo$prototype$test2;

    babelHelpers.classCallCheck(this, Test);

    woops.super.test();

    var _this = babelHelpers.possibleConstructorReturn(this, _Foo.call(this));

    _Foo.prototype.test.call(_this);

    var _this = babelHelpers.possibleConstructorReturn(this, _Foo.apply(this, arguments));

    var _this = babelHelpers.possibleConstructorReturn(this, _Foo.call.apply(_Foo, [this, "test"].concat(Array.prototype.slice.call(arguments))));

    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, [_this].concat(Array.prototype.slice.call(arguments)));
    (_Foo$prototype$test2 = _Foo.prototype.test).call.apply(_Foo$prototype$test2, [_this, "test"].concat(Array.prototype.slice.call(arguments)));
    return _this;
  }

  return Test;
}(Foo);
