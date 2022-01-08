/*#__PURE__*/
babelHelpers.asyncToGenerator(function* (x = 1) {
  return 1;
});
babelHelpers.asyncToGenerator(function* (x = 2) {
  return 2;
})();
foo( /*#__PURE__*/babelHelpers.asyncToGenerator(function* (...x) {}));
foo( /*#__PURE__*/babelHelpers.asyncToGenerator(function* (...[...y]) {}));
