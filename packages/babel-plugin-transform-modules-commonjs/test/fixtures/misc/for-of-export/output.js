"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;
let foo;
exports.foo = foo;

for (let _foo of []) {
  exports.foo = foo = _foo
}

for (let _foo2 of []) {
  exports.foo = _foo2
  let foo = 3;
}

{
  let foo = 3;

  for (foo of []) {}
}
