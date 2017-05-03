"use strict";

var foo = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var a = _ref2.a,
        _ref2$b = _ref2.b,
        b = _ref2$b === undefined ? mandatory("b") : _ref2$b;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", Promise.resolve(b));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function foo(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var _this = this, _arguments = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(_this, _arguments); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function mandatory(paramName) {
  throw new Error("Missing parameter: " + paramName);
}
