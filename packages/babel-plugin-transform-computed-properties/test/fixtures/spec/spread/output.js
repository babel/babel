var before = babelHelpers.defineProperty({
  ...a,
  b
}, c, d);
var after = babelHelpers.objectSpread2(babelHelpers.defineProperty({}, a, b), c);
var both = babelHelpers.defineProperty(babelHelpers.objectSpread2(babelHelpers.defineProperty(babelHelpers.objectSpread2(babelHelpers.defineProperty({
  ...a,
  b
}, c, d), e), "f", f), g), h, i);
var accessor = babelHelpers.objectSpread2(babelHelpers.defineAccessor("get", {}, a, function () {}), b);
