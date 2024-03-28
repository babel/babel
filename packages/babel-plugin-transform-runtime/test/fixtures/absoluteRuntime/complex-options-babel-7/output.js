var _ref, _ref2;
function _callAsync(fn, self, args) { return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } var gen = fn.apply(self, args), _next = step.bind(this, "next"), _throw = step.bind(this, "throw"); _next(); }); }
function test() {
  return _callAsync(_ref = _ref || /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('test');
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }), this, arguments);
}
function main() {
  return _callAsync(_ref2 = _ref2 || /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = console;
          _context2.next = 3;
          return test();
        case 3:
          _context2.t1 = _context2.sent;
          _context2.t0.log.call(_context2.t0, _context2.t1);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }), this, arguments);
}
main();
