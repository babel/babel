function fn() {
  return _fn.apply(this, arguments);
}
function _fn() {
  _fn = babelHelpers.wrapAsyncGenerator(function* () {
    class A {
      [yield 1]() {}
    }
    class B extends A {
      [yield babelHelpers.awaitAsyncGenerator(1)]() {}
    }
  });
  return _fn.apply(this, arguments);
}
