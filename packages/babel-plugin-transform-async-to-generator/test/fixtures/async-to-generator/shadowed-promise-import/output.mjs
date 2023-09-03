import Promise from 'somewhere';
function foo() {
  return (foo = babelHelpers.asyncToGenerator(function* () {
    yield Promise.resolve();
  })).apply(this, arguments);
}
