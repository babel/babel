var _fn;
function fn() {
  return (_fn = _fn || babelHelpers.wrapAsyncGenerator(function* () {
    class A {
      [yield 1]() {}
    }
    class B extends A {
      [yield babelHelpers.awaitAsyncGenerator(1)]() {}
    }
  })).apply(this, arguments);
}
