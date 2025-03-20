function f() {
  return _f.apply(this, arguments);
}
function _f() {
  _f = babelHelpers.asyncToGenerator(function* () {});
  return _f.apply(this, arguments);
}
