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

for (let _foo2 in []) {
  exports.bar = exports.foo = foo = _foo2
}

for (let _foo3 of []) {
  exports.bar = exports.foo = _foo3
  let foo = 42;
}

let _foo4;

for ({
  foo: _foo4
} of []) {
  exports.bar = exports.foo = foo = _foo4
}

let qux;

let _foo5;

for ({
  foo: _foo5,
  bar,
  qux
} of []) {
  exports.bar = exports.foo = foo = _foo5
}

{
  let foo;

  for (foo of []) {}

  for ([foo] of []) {}
}

let _foo6;

for ([_foo6, qux, [_foo6, ..._foo6]] of []) {
  exports.bar = exports.foo = foo = _foo6
}

let _foo7;

for ([_foo7, qux, [_foo7, ..._foo7]] of []) {
  exports.bar = exports.foo = _foo7
  let foo = 42;
}
