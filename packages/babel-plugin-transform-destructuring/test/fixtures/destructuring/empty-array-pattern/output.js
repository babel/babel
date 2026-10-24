babelHelpers.slicedToArray(null, 0);
babelHelpers.slicedToArray(42, 0);
babelHelpers.slicedToArray({}, 0);
babelHelpers.slicedToArray({
  [Symbol.iterator]: () => {}
}, 0);
babelHelpers.slicedToArray("foo", 0);
babelHelpers.slicedToArray(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        throw new Error("Should not throw");
      case 1:
        return _context.a(2);
    }
  }, _callee);
})(), 0);
babelHelpers.slicedToArray({
  [Symbol.iterator]: () => ({})
}, 0);
babelHelpers.slicedToArray({
  [Symbol.iterator]: () => () => {}
}, 0);
babelHelpers.slicedToArray({
  [Symbol.iterator]: /*#__PURE__*/babelHelpers.regenerator().m(function _callee2() {
    return babelHelpers.regeneratorAsyncGen(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          return _context2.a(2);
      }
    }, _callee2, null, null, Promise);
  })
}, 0);

// iterator.return should be called
var returnCalled = false;
babelHelpers.slicedToArray({
  [Symbol.iterator]: () => {
    return {
      return: () => {
        returnCalled = true;
        return {};
      }
    };
  }
}, 0);

// #15154
babelHelpers.slicedToArray({
  [Symbol.iterator]: () => []
}, 0);

// #15168
babelHelpers.slicedToArray({
  [Symbol.iterator]: () => /*#__PURE__*/babelHelpers.regenerator().m(function _callee3() {
    return babelHelpers.regeneratorAsyncGen(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          return _context3.a(2);
      }
    }, _callee3, null, null, Promise);
  })
}, 0);
