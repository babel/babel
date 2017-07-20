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
        a: _ref
      }
    }
  }
} = test,
      {
  x
} = _ref,
      other = babelHelpers.objectWithoutProperties(_ref, ["x"]);
const _ref3 = test,
      {
  foo: _ref2
} = _ref3,
      bar = babelHelpers.objectWithoutProperties(_ref2, []),
      {
  after
} = _ref3;
const _ref5 = test,
      {
  foo: {
    bar: _ref4
  }
} = _ref5,
      baz = babelHelpers.objectWithoutProperties(_ref4, []),
      {
  afterOther
} = _ref5;
const _ref7 = test,
      {
  foo: {
    bar: _ref6 = {}
  }
} = _ref7,
      qux = babelHelpers.objectWithoutProperties(_ref6, []),
      {
  another
} = _ref7;
const _ref10 = test,
      {
  bar: _ref8
} = _ref9,
      {
  foo: _ref9
} = _ref10,
      pop = babelHelpers.objectWithoutProperties(_ref8, []),
      {
  poop
} = _ref9,
      {
  pooop
} = _ref10;