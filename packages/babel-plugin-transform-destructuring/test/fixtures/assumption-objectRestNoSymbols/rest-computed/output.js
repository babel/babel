let _obj = obj;
babelHelpers.objectDestructuringEmpty(_obj);
let _a = babelHelpers.toPropertyKey(a),
  b = _obj[_a],
  c = babelHelpers.objectWithoutPropertiesLoose(_obj, [_a]);
