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

  function notIIFE() {
    return _notIIFE.apply(this, arguments);
  }

  return notIIFE;
})();

/*#__PURE__*/
babelHelpers.asyncToGenerator(function* () {
  yield 'not iife';
});
