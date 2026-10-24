function omit(obj, spec) {
  const {} = obj,
    _babelHelpers$toPrope = babelHelpers.toPropertyKey(spec.key),
    rest = babelHelpers.objectWithoutProperties(obj, [_babelHelpers$toPrope, "unused"]);
  return rest;
}
