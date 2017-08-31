"use strict";

function test(fn) {
  return function _callee() {
    var _args = arguments;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", fn.apply(void 0, _args));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  };
}
