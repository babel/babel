"use strict";

function test(fn) {
    var _this = this;

    return function _callee() {
        var _args = arguments;
        return regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt("return", fn.apply(undefined, _args));

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, null, _this);
    };
}