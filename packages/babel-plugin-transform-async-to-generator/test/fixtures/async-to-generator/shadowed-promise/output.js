var _ref;
let Promise;
function foo() {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
    yield new Promise(resolve => {
      resolve();
    });
  })).apply(this, arguments);
}
