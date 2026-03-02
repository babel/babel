var x = babelHelpers.temporalUndefined;
function f() {
  babelHelpers.temporalRef(x, "x");
}
Math.random() === 2 && f();
var x = void 0;
f();
