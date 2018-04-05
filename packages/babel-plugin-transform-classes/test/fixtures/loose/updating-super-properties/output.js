var Test =
/*#__PURE__*/
function (_Foo) {
  babelHelpers.inheritsLoose(Test, _Foo);

  function Test() {
    var _this;

    _this = _Foo.call(this) || this;
    var _ref = _Foo.prototype.test;
    babelHelpers.set(_Foo.prototype, "test", _ref + 1, _this);
    _ref;
    babelHelpers.get(_Foo.prototype, "hey", _this).whatever--;
    return _this;
  }

  return Test;
}(Foo);
