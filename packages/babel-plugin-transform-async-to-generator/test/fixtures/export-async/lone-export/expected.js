"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

let foo = exports.foo = function () {
  var ref = babelHelpers.asyncToGenerator(function* () {});
  return function foo() {
    return ref.apply(this, arguments);
  };
}();
