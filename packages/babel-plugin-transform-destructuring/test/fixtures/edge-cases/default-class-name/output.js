var _ref = {},
  _ref$a = _ref.a,
  a = _ref$a === void 0 ? {
    a: class {}
  }.a : _ref$a,
  _ref$b = _ref.b,
  b = _ref$b === void 0 ? class B {} : _ref$b,
  _ref$c = _ref.c,
  c = _ref$c === void 0 ? {
    c: class {
      static name = "own";
    }
  }.c : _ref$c,
  _ref$d = _ref.d,
  d = _ref$d === void 0 ? {
    d: class {
      static ["name"] = "computed";
    }
  }.d : _ref$d,
  _ref$e = _ref.e,
  e = _ref$e === void 0 ? {
    e: class {
      static [`name`] = "template";
    }
  }.e : _ref$e,
  _ref$f = _ref.f,
  f = _ref$f === void 0 ? {
    f: class {
      static [key] = "dynamic";
    }
  }.f : _ref$f,
  _ref$g = _ref.g,
  g = _ref$g === void 0 ? {
    g: class {
      static [0] = "zero";
    }
  }.g : _ref$g,
  _ref$h = _ref.h,
  h = _ref$h === void 0 ? {
    h: class {
      static "name" = "string";
    }
  }.h : _ref$h,
  _ref$i = _ref.i,
  i = _ref$i === void 0 ? {
    i: class {
      static [`na${"me"}`] = "template expression";
    }
  }.i : _ref$i,
  _ref$j = _ref.j,
  j = _ref$j === void 0 ? {
    j: class {
      static name() {}
    }
  }.j : _ref$j;
