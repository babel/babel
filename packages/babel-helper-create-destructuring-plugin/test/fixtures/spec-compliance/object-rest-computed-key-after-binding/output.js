var _a$b = {
    a: "b",
    b: 1
  },
  a = _a$b.a,
  _String = String(a),
  b = _a$b[_String],
  rest = babelHelpers.objectWithoutProperties(_a$b, ["a", _String].map(babelHelpers.toPropertyKey));
