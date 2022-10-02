let _a = a,
  {
    [_a]: b
  } = obj,
  c = babelHelpers.objectWithoutPropertiesLoose(obj, [_a].map(babelHelpers.toPropertyKey));
