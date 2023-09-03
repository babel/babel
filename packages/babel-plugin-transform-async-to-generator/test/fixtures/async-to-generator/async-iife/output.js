babelHelpers.asyncToGenerator(function* () {
  yield 'ok';
})();
babelHelpers.asyncToGenerator(function* () {
  yield 'ok';
})();
( /*#__PURE__*/function notIIFE() {
  return (notIIFE = babelHelpers.asyncToGenerator(function* () {
    yield 'ok';
  })).apply(this, arguments);
});
/*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
  yield 'not iife';
});
