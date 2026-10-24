var _a;
let _obj = obj,
  {
    [_a = babelHelpers.toPropertyKey(a)]: b
  } = _obj,
  c = babelHelpers.objectWithoutPropertiesLoose(_obj, [_a]);
