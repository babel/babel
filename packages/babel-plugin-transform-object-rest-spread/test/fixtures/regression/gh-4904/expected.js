const _s$t = foo(),
      {
  s
} = _s$t,
      t = babelHelpers.objectWithoutProperties(_s$t, ["s"]);

const _s = bar(),
      {
  s: _q1$q
} = _s,
      {
  q1
} = _q1$q,
      q2 = babelHelpers.objectWithoutProperties(_q1$q, ["q1"]),
      _q = _s,
      q3 = babelHelpers.objectWithoutProperties(_q, []);

const {
  a
} = foo((_b$c) => {
  var {
    b
  } = _b$c,
      c = babelHelpers.objectWithoutProperties(_b$c, ["b"]);
  console.log(b, c);
});