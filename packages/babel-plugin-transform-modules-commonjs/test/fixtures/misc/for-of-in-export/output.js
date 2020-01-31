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

for (let _temp2 of []) {
  exports.bar = exports.foo = foo = _temp2;

  let _foo;
}

for (let _temp3 of []) {
  ({
    foo
  } = _temp3);
  exports.bar = exports.foo = foo;
}

for (let _temp4 of []) {
  ({
    test: {
      foo
    }
  } = _temp4);
  exports.bar = exports.foo = foo;

  let _foo2;
}

for (let _temp5 of []) {
  ({
    foo: bar
  } = _temp5);
}

let qux;

for (let _temp6 of []) {
  [foo, [...foo], qux] = _temp6;
  exports.bar = exports.foo = foo;
}

{
  for (let _temp7 of []) {
    ({
      foo
    } = _temp7);
  }

  for (let _temp8 of []) {
    ({
      test: {
        foo
      },
      qux
    } = _temp8);
  }

  let foo;

  for (let _temp9 of []) {
    ({
      foo
    } = _temp9);
  }
}
