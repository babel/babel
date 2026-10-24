var _ref = {},
  _ref$a = _ref.a,
  a = _ref$a === void 0 ? babelHelpers.setFunctionName(class {}, "a") : _ref$a,
  _ref$b = _ref.b,
  b = _ref$b === void 0 ? class B {} : _ref$b,
  _ref$c = _ref.c,
  c = _ref$c === void 0 ? class {
    static name = "own";
  } : _ref$c,
  _ref$d = _ref.d,
  d = _ref$d === void 0 ? class {
    static ["name"] = "computed";
  } : _ref$d,
  _ref$e = _ref.e,
  e = _ref$e === void 0 ? class {
    static [`name`] = "template";
  } : _ref$e,
  _ref$f = _ref.f,
  f = _ref$f === void 0 ? class {
    static [key] = "dynamic";
  } : _ref$f,
  _ref$g = _ref.g,
  g = _ref$g === void 0 ? babelHelpers.setFunctionName(class {
    static [0] = "zero";
  }, "g") : _ref$g,
  _ref$h = _ref.h,
  h = _ref$h === void 0 ? class {
    static "name" = "string";
  } : _ref$h,
  _ref$i = _ref.i,
  i = _ref$i === void 0 ? class {
    static [`na${"me"}`] = "template expression";
  } : _ref$i,
  _ref$j = _ref.j,
  j = _ref$j === void 0 ? class {
    static name() {}
  } : _ref$j;
