const _x$y = a,
      {
  x
} = _x$y,
      y = babelHelpers.objectWithoutProperties(_x$y, ["x"]),
      z = foo(y);
const _s = r,
      s = babelHelpers.objectWithoutProperties(_s, []),
      t = foo(s); // ordering is preserved

var l = foo(),
    _m = bar(),
    {
  m: _n$o
} = _m,
    {
  n
} = _n$o,
    o = babelHelpers.objectWithoutProperties(_n$o, ["n"]),
    _p = _m,
    p = babelHelpers.objectWithoutProperties(_p, []),
    q = baz();