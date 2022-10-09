var x = babelHelpers.temporalUndefined;
function f() {
  babelHelpers.temporalRef(x, "x");
}
Math.random() && f();
x = void 0;
void 0;
