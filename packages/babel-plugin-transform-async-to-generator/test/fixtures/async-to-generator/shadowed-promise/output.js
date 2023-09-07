var _foo;
let Promise;
function foo() {
  return (_foo = _foo || babelHelpers.asyncToGenerator(function* () {
    yield new Promise(resolve => {
      resolve();
    });
  })).apply(this, arguments);
}
