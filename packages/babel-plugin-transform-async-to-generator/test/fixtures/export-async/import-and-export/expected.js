"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;

var _bar = babelHelpers.interopRequireDefault(require("bar"));

let foo =
/*#__PURE__*/
(() => {
  var _ref = babelHelpers.asyncToGenerator(function* () {});

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

exports.foo = foo;
