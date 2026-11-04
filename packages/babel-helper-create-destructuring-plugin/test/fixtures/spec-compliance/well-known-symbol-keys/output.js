const _obj = obj,
  iterator = _obj[Symbol.iterator],
  _Symbol$foo = babelHelpers.toPropertyKey(Symbol.foo),
  foo = _obj[_Symbol$foo],
  rest = babelHelpers.objectWithoutProperties(_obj, [Symbol.iterator, _Symbol$foo]);
