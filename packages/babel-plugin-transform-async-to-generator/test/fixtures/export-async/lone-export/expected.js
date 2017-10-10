"use strict";
"use exports { foo }";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;

let foo = (() => {
  var _ref = babelHelpers.asyncToGenerator(function* () {});

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

exports.foo = foo;
