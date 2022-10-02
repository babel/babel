var x = babelHelpers.temporalUndefined;
function f() {
  return function () {
    babelHelpers.temporalRef(x, "x");
  };
}
f();
x = void 0;
void 0;
