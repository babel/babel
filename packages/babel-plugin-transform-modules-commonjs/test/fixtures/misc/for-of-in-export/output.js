"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = exports.foo = void 0;
let foo;
exports.bar = exports.foo = foo;

for (let _temp of []) {
  exports.bar = exports.foo = foo = _temp;
}

for (let _temp2 in []) {
  exports.bar = exports.foo = foo = _temp2;
}

for (let _temp3 of []) {
  exports.bar = exports.foo = foo = _temp3;

  let _foo;
}

for (let _temp4 of []) {
  ({
    foo
  } = _temp4);
  exports.bar = exports.foo = foo;
}

for (let _temp5 of []) {
  ({
    foo
  } = _temp5);
  exports.bar = exports.foo = foo;

  let _foo2;
}

for (let _temp6 of []) {
  ({
    test: {
      foo
    }
  } = _temp6);
  exports.bar = exports.foo = foo;
}

for (let _temp7 of []) {
  [foo, [...foo]] = _temp7;
  exports.bar = exports.foo = foo;
}

for (let _temp8 of []) {
  [foo, [...foo]] = _temp8;
  exports.bar = exports.foo = foo;

  let _foo3;
}

{
  let foo;

  for (foo of []) {}
}
