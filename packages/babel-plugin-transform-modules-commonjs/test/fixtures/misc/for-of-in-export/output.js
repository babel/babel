"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = exports.foo = void 0;
let foo;
exports.foo = foo;
let bar;
exports.bar = bar;

for (let _foo of []) {
  exports.foo = foo = _foo
}

for (let _foo2 in {}) {
  exports.foo = foo = _foo2
}

for (let {
  foo: _foo3
} of {}) {
  exports.foo = foo = _foo3
}

for (let {
  foo: _foo4
} of {}) {
  exports.foo = _foo4
  let foo = 3;
}

for (let {
  foo: _foo5,
  bar: _bar
} of {}) {
  exports.foo = foo = _foo5
  exports.bar = bar = _bar
}

for (let {
  foo: _foo6,
  bar: _bar2
} of {}) {
  exports.foo = foo = _foo6
  exports.bar = _bar2
  let bar = 3;
}

for (let _foo7 of []) {
  exports.foo = _foo7
  let foo = 3;
}

{
  let foo = 3;

  for (foo of []) {}
}
