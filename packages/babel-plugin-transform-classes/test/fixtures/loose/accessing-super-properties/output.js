var Test =
/*#__PURE__*/
function (_Foo) {
  "use strict";

  function Test() {
    var _this;

    _this = _Foo.call(this) || this;
    _Foo.prototype.test;
    _Foo.prototype.test.whatever;
    return _this;
  }

  babelHelpers.inheritsLoose(Test, _Foo);
  return Test;
}(Foo);
