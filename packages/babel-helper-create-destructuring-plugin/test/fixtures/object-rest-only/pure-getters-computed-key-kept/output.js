function omit(obj, spec) {
  const {} = obj,
    _spec$key = spec.key,
    rest = babelHelpers.objectWithoutProperties(obj, [_spec$key, "unused"].map(babelHelpers.toPropertyKey));
  return rest;
}
