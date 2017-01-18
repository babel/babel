const _foo = foo();

const { s } = _foo;

const t = babelHelpers.objectWithoutProperties(_foo, ["s"]);

const _bar = bar();

const { s: { q1 } } = _bar;

const q2 = babelHelpers.objectWithoutProperties(_bar.s, ["q1"]);
const q3 = babelHelpers.objectWithoutProperties(_bar, ["s"]);
const { a } = foo((_ref) => {
  let { b } = _ref;
  let c = babelHelpers.objectWithoutProperties(_ref, ["b"]);

  console.log(b, c);
});
