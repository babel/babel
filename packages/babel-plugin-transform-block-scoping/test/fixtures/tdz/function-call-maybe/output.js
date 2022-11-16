var x = babelHelpers.temporalUndefined;
function f() {
  babelHelpers.temporalRef(x, "x");
}
Math.random() && f();
var x = void 0;
