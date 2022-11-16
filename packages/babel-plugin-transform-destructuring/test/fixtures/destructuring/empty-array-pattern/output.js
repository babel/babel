var _ref = null,
  _ref2 = babelHelpers.slicedToArray(_ref, 0);
var _ = 42,
  _ref3 = babelHelpers.slicedToArray(_, 0);
var _ref4 = {},
  _ref5 = babelHelpers.slicedToArray(_ref4, 0);
var _Symbol$iterator = {
    [Symbol.iterator]: () => {}
  },
  _Symbol$iterator2 = babelHelpers.slicedToArray(_Symbol$iterator, 0);
var _ref6 = [0, 1, 2];
var _foo = "foo",
  _foo2 = babelHelpers.slicedToArray(_foo, 0);
var _ref7 = /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee() {
    return babelHelpers.regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          throw new Error("Should not throw");
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })(),
  _ref8 = babelHelpers.slicedToArray(_ref7, 0);
var _Symbol$iterator3 = {
    [Symbol.iterator]: () => ({})
  },
  _Symbol$iterator4 = babelHelpers.slicedToArray(_Symbol$iterator3, 0);
var _Symbol$iterator5 = {
    [Symbol.iterator]: () => () => {}
  },
  _Symbol$iterator6 = babelHelpers.slicedToArray(_Symbol$iterator5, 0);
var _Symbol$iterator7 = {
    [Symbol.iterator]: /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee2() {
      return babelHelpers.regeneratorRuntime().async(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, null, Promise);
    })
  },
  _Symbol$iterator8 = babelHelpers.slicedToArray(_Symbol$iterator7, 0);

// iterator.return should be called
var returnCalled = false;
var _Symbol$iterator9 = {
    [Symbol.iterator]: () => {
      return {
        return: () => {
          returnCalled = true;
          return {};
        }
      };
    }
  },
  _Symbol$iterator10 = babelHelpers.slicedToArray(_Symbol$iterator9, 0);

// #15154
var _Symbol$iterator11 = {
    [Symbol.iterator]: () => []
  },
  _Symbol$iterator12 = babelHelpers.slicedToArray(_Symbol$iterator11, 0);

// #15168
var _Symbol$iterator13 = {
    [Symbol.iterator]: () => /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee3() {
      return babelHelpers.regeneratorRuntime().async(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, null, Promise);
    })
  },
  _Symbol$iterator14 = babelHelpers.slicedToArray(_Symbol$iterator13, 0);
