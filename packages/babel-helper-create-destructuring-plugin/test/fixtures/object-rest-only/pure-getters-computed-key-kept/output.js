function omit(obj, spec) {
  const {} = obj,
    _spec$key = babelHelpers.toPropertyKey(spec.key),
    rest = babelHelpers.objectWithoutProperties(obj, [_spec$key, "unused"]);
  return rest;
}
