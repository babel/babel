function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {});
  return _wrapped.apply(this, arguments);
}

foo(function () {
  return _wrapped.apply(this, arguments);
});
