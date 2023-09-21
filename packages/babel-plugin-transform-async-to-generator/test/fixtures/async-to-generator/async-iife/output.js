babelHelpers.asyncToGenerator2(function* () {
  yield 'ok';
})();
babelHelpers.asyncToGenerator2(function* () {
  yield 'ok';
})();
(function notIIFE() {
  return babelHelpers.callAsync(function* () {
    yield 'ok';
  }, this, arguments);
});
/*#__PURE__*/babelHelpers.asyncToGenerator2(function* () {
  yield 'not iife';
});
