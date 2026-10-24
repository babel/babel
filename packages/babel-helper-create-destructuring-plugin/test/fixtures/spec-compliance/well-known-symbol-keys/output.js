const _obj = obj,
  iterator = _obj[Symbol.iterator],
  _babelHelpers$toPrope = babelHelpers.toPropertyKey(Symbol.foo),
  foo = _obj[_babelHelpers$toPrope],
  rest = babelHelpers.objectWithoutProperties(_obj, [Symbol.iterator, _babelHelpers$toPrope]);
