const _value = value,
  {} = _value,
  _key = babelHelpers.toPropertyKey(key()),
  _value$_key = _value[_key],
  a = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_value$_key), _value$_key)), []),
  rest = babelHelpers.objectWithoutProperties(_value, [_key]);
