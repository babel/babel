var Test =
/*#__PURE__*/
function (_Foo) {
  babelHelpers.inheritsLoose(Test, _Foo);

  function Test() {
    var _this;

    _this = _Foo.call(this) || this;
    babelHelpers.set(_Foo.prototype, "test", 1, _this);
    babelHelpers.get(_Foo.prototype, "test", _this).whatever = 2;
    babelHelpers.get(_Foo.prototype, "boo", _this).more *= 2;
    return _this;
  }

  return Test;
}(Foo);
