"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;
let foo = 42;
exports.foo = foo;

for (let _foo of [1, 2, 3]) {
  exports.foo = foo = _foo
}

for (let _foo2 of [1, 2, 3]) {
  foo = _foo2
  // This loop body is transformed incorrectly
  // correct output should be
  // exports.foo = _foo2
  let foo = 3;
}
