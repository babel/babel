var x = babelHelpers.temporalUndefined;
maybeCallLater(function f() {
  babelHelpers.temporalRef(x, "x")
  x++;
  babelHelpers.temporalRef(x, "x")
  ++x;
  babelHelpers.temporalRef(x, "x").p++;
  ++babelHelpers.temporalRef(x, "x").p;
});
babelHelpers.tdz("x");
babelHelpers.tdz("x");
babelHelpers.tdz("x").p++;
++babelHelpers.tdz("x").p;
var x = void 0;
