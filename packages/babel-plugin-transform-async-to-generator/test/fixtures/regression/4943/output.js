"use strict";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}

function foo(_x) {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = _asyncToGenerator(function* (_ref) {
    let a = _ref.a,
        _ref$b = _ref.b,
        b = _ref$b === void 0 ? mandatory("b") : _ref$b;
    return Promise.resolve(b);
  });
  return _foo.apply(this, arguments);
}
