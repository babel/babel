var Test =
/*#__PURE__*/
function (_Foo) {
  "use strict";

  babelHelpers.inheritsLoose(Test, _Foo);

  function Test() {
    var _this;

    _this = _Foo.call(this) || this;
    _Foo.prototype.test;
    _Foo.prototype.test.whatever;
    return _this;
  }

  return Test;
}(Foo);
