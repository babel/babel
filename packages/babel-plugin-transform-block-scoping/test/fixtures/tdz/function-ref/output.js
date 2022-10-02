var x = babelHelpers.temporalUndefined;
function f() {
  babelHelpers.temporalRef(x, "x");
}
maybeCall(f);
x = void 0;
void 0;
