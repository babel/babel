const _a = a,
  {
    x
  } = _a,
  y = babelHelpers.objectWithoutProperties(_a, ["x"]),
  z = foo(y);
const _r = r,
  s = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_r), _r)),
  t = foo(s);

// ordering is preserved
var l = foo(),
  _bar = bar(),
  _bar$m = _bar.m,
  {
    n
  } = _bar$m,
  o = babelHelpers.objectWithoutProperties(_bar$m, ["n"]),
  p = babelHelpers.objectWithoutProperties(_bar, ["m"]),
  q = baz();
