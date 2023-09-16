var _f;
babelHelpers.asyncToGenerator(function* () {
  let items = [1, 2, 3, 4];
  for (const item of items) {
    var _ref2;
    yield f(function (_x) {
      return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* (x) {
        console.log(item);
      })).apply(this, arguments);
    });
  }
})();
function f(_x2) {
  return (_f = _f || babelHelpers.asyncToGenerator(function* (lambda) {
    yield lambda();
  })).apply(this, arguments);
}
