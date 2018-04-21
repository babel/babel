var Test =
/*#__PURE__*/
function (_Foo) {
  "use strict";

  function Test() {
    return _Foo.apply(this, arguments) || this;
  }

  babelHelpers.inheritsLoose(Test, _Foo);
  return Test;
}(Foo);
