let notIIFE =
/*#__PURE__*/
(() => {
  var _ref3 = babelHelpers.asyncToGenerator(function* () {
    yield 'ok';
  });

  return function notIIFE() {
    return _ref3.apply(this, arguments);
  };
})();

babelHelpers.asyncToGenerator(function* () {
  yield 'ok';
})();
babelHelpers.asyncToGenerator(function* () {
  yield 'ok';
})();
notIIFE();
