let _obj = obj,
  _a = a,
  b = _obj[_a],
  c = babelHelpers.objectWithoutPropertiesLoose(_obj, [_a].map(babelHelpers.toPropertyKey));
