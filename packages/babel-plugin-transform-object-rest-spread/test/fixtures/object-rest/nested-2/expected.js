const test = {
  foo: {
    bar: {
      baz: {
        a: {
          x: 1,
          y: 2,
          z: 3
        }
      }
    }
  }
};
const {
  foo: {
    bar: {
      baz: {
        a: _x$other
      }
    }
  }
} = test,
      {
  x
} = _x$other,
      other = babelHelpers.objectWithoutProperties(_x$other, ["x"]);
const _foo = test,
      {
  foo: _bar
} = _foo,
      bar = babelHelpers.objectWithoutProperties(_bar, []),
      {
  after
} = _foo;
const _foo2 = test,
      {
  foo: {
    bar: _baz
  }
} = _foo2,
      baz = babelHelpers.objectWithoutProperties(_baz, []),
      {
  afterOther
} = _foo2;
const _foo3 = test,
      {
  foo: {
    bar: _qux = {}
  }
} = _foo3,
      qux = babelHelpers.objectWithoutProperties(_qux, []),
      {
  another
} = _foo3;
const _foo4 = test,
      {
  foo: _bar2
} = _foo4,
      {
  bar: _pop
} = _bar2,
      pop = babelHelpers.objectWithoutProperties(_pop, []),
      {
  poop
} = _bar2,
      {
  pooop
} = _foo4;
