const _obj = obj,
  _obj$a = _obj.a,
  bar = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_obj$a), _obj$a)), []),
  _obj$b = _obj.b,
  baz = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_obj$b), _obj$b)), []),
  foo = babelHelpers.objectWithoutProperties(_obj, ["a", "b"]);
