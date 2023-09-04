var _foo;
import Promise from 'somewhere';
function foo() {
  return (_foo = _foo || babelHelpers.asyncToGenerator(function* () {
    yield Promise.resolve();
  })).apply(this, arguments);
}
