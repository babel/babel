const _excluded = ["b"];
const _foo = foo(),
  {
    s
  } = _foo,
  t = babelHelpers.objectWithoutProperties(_foo, ["s"]);
const _bar = bar(),
  _bar$s = _bar.s,
  {
    q1
  } = _bar$s,
  q2 = babelHelpers.objectWithoutProperties(_bar$s, ["q1"]),
  q3 = babelHelpers.objectWithoutProperties(_bar, ["s"]);
const {
  a
} = foo(_ref => {
  var {
      b
    } = _ref,
    c = babelHelpers.objectWithoutProperties(_ref, _excluded);
  console.log(b, c);
});
