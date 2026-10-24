const b = 1,
  k = "x";
try {
  throw {
    x: 2
  };
} catch (_ref) {
  let _ref$a = _ref.a,
    a = _ref$a === void 0 ? b : _ref$a,
    _babelHelpers$toPrope = babelHelpers.toPropertyKey(k),
    c = _ref[_babelHelpers$toPrope],
    rest = babelHelpers.objectWithoutProperties(_ref, ["a", _babelHelpers$toPrope]);
  {
    let b = 3;
    const k = "y";
  }
}
