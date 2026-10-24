const _obj = obj,
  _obj$a = _obj.a,
  bar = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_obj$a), _obj$a)),
  _obj$b = _obj.b,
  baz = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_obj$b), _obj$b)),
  foo = babelHelpers.objectWithoutProperties(_obj, ["a", "b"]);
