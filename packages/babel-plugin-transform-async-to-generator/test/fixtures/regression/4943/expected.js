"use strict";

let foo = (() => {
  var _ref = _asyncToGenerator(function* (_ref2) {
    let a = _ref2.a,
        _ref2$b = _ref2.b,
        b = _ref2$b === void 0 ? mandatory("b") : _ref2$b;
    return Promise.resolve(b);
  });

  return function foo(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) { args[_key] = arguments[_key]; } return new Promise((resolve, reject) => { const gen = fn.apply(this, args); function step(key, arg) { let info; try { info = gen[key](arg); } catch (error) { reject(error); return; } if (info.done) { resolve(info.value); } else { Promise.resolve(info.value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}
