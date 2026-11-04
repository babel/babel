const b = 1,
  k = "x";
try {
  throw {
    x: 2
  };
} catch (_ref) {
  let _ref$a = _ref.a,
    a = _ref$a === void 0 ? b : _ref$a,
    _k = babelHelpers.toPropertyKey(k),
    c = _ref[_k],
    rest = babelHelpers.objectWithoutProperties(_ref, ["a", _k]);
  {
    let b = 3;
    const k = "y";
  }
}
