"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = exports.foo = void 0;
let foo;
exports.bar = exports.foo = foo;

for (let _foo of []) {
  exports.bar = exports.foo = foo = _foo
}

for (let _foo2 of []) {
  exports.bar = exports.foo = _foo2
  let foo = 3;
}

for (let _foo3 of []) {
  exports.bar = exports.foo = foo = _foo3
  exports.bar = exports.foo = foo = 3;
}

for (let _foo4 in {}) {
  exports.bar = exports.foo = foo = _foo4
}

let _foo5;

for ({
  foo: _foo5
} of {}) {
  exports.bar = exports.foo = foo = _foo5
}

let _foo6;

for ({
  foo: _foo6,
  bar
} of {}) {
  exports.bar = exports.foo = foo = _foo6
  let bar = 3;
}

{
  let foo = 3;

  for (foo of []) {}
}
let qux;

let _foo7;

for ([_foo7] of []) {
  exports.bar = exports.foo = foo = _foo7
}

let _foo8;

for ([_foo8, qux, [..._foo8]] of []) {
  exports.bar = exports.foo = foo = _foo8
}
