function fn() {
  return _fn.apply(this, arguments);
}
function _fn() {
  _fn = babelHelpers.asyncToGenerator(function* () {
    yield yield 1;
  });
  return _fn.apply(this, arguments);
}
