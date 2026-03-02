babelHelpers.asyncToGenerator(function* () {
  let items = [1, 2, 3, 4];
  for (const item of items) {
    yield f(/*#__PURE__*/function () {
      var _ref2 = babelHelpers.asyncToGenerator(function* (x) {
        console.log(item);
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
})();
function f(_x2) {
  return _f.apply(this, arguments);
}
function _f() {
  _f = babelHelpers.asyncToGenerator(function* (lambda) {
    yield lambda();
  });
  return _f.apply(this, arguments);
}
