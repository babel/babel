let _obj = obj,
  {
    a
  } = _obj,
  _obj$nested = _obj.nested,
  {
    b,
    c
  } = _obj$nested,
  d = babelHelpers.objectWithoutPropertiesLoose(_obj$nested, ["b", "c"]),
  {
    e
  } = _obj;
