var _this = this;

function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'ok';

        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _wrapped.apply(this, arguments);
}

(function () {
  return _wrapped.apply(this, arguments);
})();

function _wrapped2() {
  _wrapped2 = babelHelpers.asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          babelHelpers.newArrowCheck(this, _this);
          _context2.next = 3;
          return 'ok';

        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _wrapped2.apply(this, arguments);
}

(function () {
  return _wrapped2.apply(this, arguments);
}).bind(this)();

function _notIIFE() {
  _notIIFE = babelHelpers.asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function notIIFE() {
    return regeneratorRuntime.wrap(function notIIFE$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return 'ok';

        case 2:
        case "end":
          return _context3.stop();
      }
    }, notIIFE, this);
  }));
  return _notIIFE.apply(this, arguments);
}

(function notIIFE() {
  return _notIIFE.apply(this, arguments);
});

function _wrapped3() {
  _wrapped3 = babelHelpers.asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          babelHelpers.newArrowCheck(this, _this);
          _context4.next = 3;
          return 'not iife';

        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee3, this);
  }));
  return _wrapped3.apply(this, arguments);
}

(function () {
  return _wrapped3.apply(this, arguments);
}).bind(this);
