var _a;
let {
    [_a = a]: b
  } = obj,
  c = babelHelpers.objectWithoutPropertiesLoose(obj, [_a].map(babelHelpers.toPropertyKey));
