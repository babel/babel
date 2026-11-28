const testA = () => {
  return babelHelpers.regeneratorAsync(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        return _context2.a(2, () => {
          var resData, config;
          return babelHelpers.regeneratorAsync(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                ({
                  resData,
                  config
                } = {});
                console.log('a', resData);
              case 1:
                return _context.a(2);
            }
          }, null, null, null, Promise);
        });
    }
  }, null, null, null, Promise);
};
const testB = () => {
  return babelHelpers.regeneratorAsync(function (_context3) {
    while (1) switch (_context3.n) {
      case 0:
        _context3.n = 1;
        return babelHelpers.awaitAsyncGenerator(testA());
      case 1:
        return _context3.a(2);
    }
  }, null, null, null, Promise);
};
console.log(testB);
