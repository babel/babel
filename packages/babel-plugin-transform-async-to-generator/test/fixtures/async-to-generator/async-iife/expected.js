babelHelpers.asyncToGenerator(function* () {
  yield 'ok';
})();
babelHelpers.asyncToGenerator(function* () {
  yield 'ok';
})();

/*#__PURE__*/
(function () {
  var _notIIFE = babelHelpers.asyncToGenerator(function* () {
    yield 'ok';
  });

  return function notIIFE() {
    return _notIIFE.apply(this, arguments);
  };
})();

/*#__PURE__*/
babelHelpers.asyncToGenerator(function* () {
  yield 'not iife';
});
