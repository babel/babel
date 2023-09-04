var _ref;
function fn() {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
    yield yield 1;
  })).apply(this, arguments);
}
