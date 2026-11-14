var _before, _after, _both, _accessor;
var before = (_before = {
  ...a,
  b
}, _before[c] = d, _before);
var after = (_after = {}, _after[a] = b, babelHelpers.objectSpread2(_after, c), _after);
var both = (_both = {
  ...a,
  b
}, _both[c] = d, babelHelpers.objectSpread2(_both, e), _both.f = f, babelHelpers.objectSpread2(_both, g), _both[h] = i, _both);
var accessor = (_accessor = {}, babelHelpers.defineAccessor("get", _accessor, a, function () {}), babelHelpers.objectSpread2(_accessor, b), _accessor);
