var x = babelHelpers.temporalUndefined;
function f() {
  return function () {
    babelHelpers.temporalRef(x, "x");
  };
}
f();
var x = void 0;
