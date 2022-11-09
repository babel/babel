var x = babelHelpers.temporalUndefined;
maybeCallLater(function () {
  babelHelpers.temporalRef(x, "x");
  2, babelHelpers.readOnlyError("x");
});
x = 0;
1, babelHelpers.readOnlyError("x");
