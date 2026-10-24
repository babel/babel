var _a$b = {
    a: "b",
    b: 1
  },
  a = _a$b.a,
  _babelHelpers$toPrope = babelHelpers.toPropertyKey(String(a)),
  b = _a$b[_babelHelpers$toPrope],
  rest = babelHelpers.objectWithoutProperties(_a$b, ["a", _babelHelpers$toPrope]);
