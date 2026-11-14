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
const _test$foo$bar$baz$a = test.foo.bar.baz.a,
  {
    x
  } = _test$foo$bar$baz$a,
  other = babelHelpers.objectWithoutProperties(_test$foo$bar$baz$a, ["x"]);
