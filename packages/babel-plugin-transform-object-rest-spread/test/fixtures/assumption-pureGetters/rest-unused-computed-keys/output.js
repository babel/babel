function f() {
  const _obj = obj,
    {} = _obj,
    _k = k,
    _key = key(),
    rest = babelHelpers.objectWithoutProperties(_obj, ["a", _k, "1", _key].map(babelHelpers.toPropertyKey));
  return rest;
}
