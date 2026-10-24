var _a;
let _obj = obj,
  {
    [_a = a]: b
  } = _obj,
  c = babelHelpers.objectWithoutPropertiesLoose(_obj, [_a].map(babelHelpers.toPropertyKey));
