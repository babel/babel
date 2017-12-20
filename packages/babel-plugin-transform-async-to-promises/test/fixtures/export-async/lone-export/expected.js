"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

function foo() {
  return new Promise(function ($return, $error) {
    return $return();
  });
}
