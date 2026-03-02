var a = 5;
var b = 0;
a + b++, babelHelpers.readOnlyError("a");
a >>> b++, babelHelpers.readOnlyError("a");
a || (b++, babelHelpers.readOnlyError("a"));
a && (b++, babelHelpers.readOnlyError("a"));
a ?? (b++, babelHelpers.readOnlyError("a"));
