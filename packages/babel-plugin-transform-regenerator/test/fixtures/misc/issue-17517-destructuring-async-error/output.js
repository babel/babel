function testA() {
  var resData, foo, y;
  return babelHelpers.regeneratorAsync(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return babelHelpers.awaitAsyncGenerator(Promise.resolve({
          key: "value"
        }));
      case 1:
        ({
          resData,
          other: {
            otherData: foo
          }
        } = config);
        for ({
          x: {
            y
          }
        } of []) {
          y;
        }
        return _context.a(2, resData);
    }
  }, null, null, null, Promise);
}
function testB() {
  return babelHelpers.regeneratorAsync(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        _context2.n = 1;
        return babelHelpers.awaitAsyncGenerator(testA());
      case 1:
        return _context2.a(2);
    }
  }, null, null, null, Promise);
}
