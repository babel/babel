const _obj = obj;
babelHelpers.objectDestructuringEmpty(_obj);
const _Symbol$iterator = Symbol.iterator,
  iterator = _obj[_Symbol$iterator],
  _babelHelpers$toPrope = babelHelpers.toPropertyKey(Symbol.foo),
  foo = _obj[_babelHelpers$toPrope],
  rest = babelHelpers.objectWithoutProperties(_obj, [_Symbol$iterator, _babelHelpers$toPrope]);
