var x = babelHelpers.temporalUndefined;
function f() {
  babelHelpers.temporalRef(x, "x");
}
maybeCall(f);
var x = void 0;
