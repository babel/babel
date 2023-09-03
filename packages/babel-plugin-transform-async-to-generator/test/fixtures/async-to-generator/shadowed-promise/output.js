let Promise;
function foo() {
  return (foo = babelHelpers.asyncToGenerator(function* () {
    yield new Promise(resolve => {
      resolve();
    });
  })).apply(this, arguments);
}
