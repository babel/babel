function f() {
  const _obj = obj,
    {} = _obj,
    _babelHelpers$toPrope = babelHelpers.toPropertyKey(k),
    _babelHelpers$toPrope2 = babelHelpers.toPropertyKey(key()),
    rest = babelHelpers.objectWithoutProperties(_obj, ["a", _babelHelpers$toPrope, "1", _babelHelpers$toPrope2]);
  return rest;
}
