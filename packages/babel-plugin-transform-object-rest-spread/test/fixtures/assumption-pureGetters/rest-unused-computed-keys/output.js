function f() {
  const _obj = obj,
    {} = _obj,
    _k = babelHelpers.toPropertyKey(k),
    _key = babelHelpers.toPropertyKey(key()),
    rest = babelHelpers.objectWithoutProperties(_obj, ["a", _k, "1", _key]);
  return rest;
}
