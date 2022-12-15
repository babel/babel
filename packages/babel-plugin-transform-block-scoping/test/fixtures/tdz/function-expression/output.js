var a = babelHelpers.temporalUndefined;
f(() => babelHelpers.temporalRef(a, "a"));
a = void 0;
var b;
f(() => b);
