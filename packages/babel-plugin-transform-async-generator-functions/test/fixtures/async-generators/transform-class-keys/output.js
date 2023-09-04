var _ref;
function fn() {
  return (_ref = _ref || babelHelpers.wrapAsyncGenerator(function* () {
    class A {
      [yield 1]() {}
    }
    class B extends A {
      [yield babelHelpers.awaitAsyncGenerator(1)]() {}
    }
  })).apply(this, arguments);
}
