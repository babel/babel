let _obj = obj,
  a = _obj.a,
  _obj$nested = _obj.nested,
  b = _obj$nested.b,
  c = _obj$nested.c,
  d = babelHelpers.objectWithoutPropertiesLoose(_obj$nested, ["b", "c"]),
  e = _obj.e;
