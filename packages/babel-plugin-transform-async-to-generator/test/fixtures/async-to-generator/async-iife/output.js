var _notIIFE;
babelHelpers.asyncToGenerator(function* () {
  yield 'ok';
})();
babelHelpers.asyncToGenerator(function* () {
  yield 'ok';
})();
(function notIIFE() {
  return (_notIIFE = _notIIFE || babelHelpers.asyncToGenerator(function* () {
    yield 'ok';
  })).apply(this, arguments);
});
/*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
  yield 'not iife';
});
