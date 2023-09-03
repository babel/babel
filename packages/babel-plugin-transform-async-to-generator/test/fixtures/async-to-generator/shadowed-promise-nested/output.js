let Promise;
function foo() {
  return (foo = babelHelpers.asyncToGenerator(function* () {
    let Promise;
    yield bar();
    function bar() {
      return (bar = babelHelpers.asyncToGenerator(function* () {
        return Promise.resolve();
      })).apply(this, arguments);
    }
  })).apply(this, arguments);
}
