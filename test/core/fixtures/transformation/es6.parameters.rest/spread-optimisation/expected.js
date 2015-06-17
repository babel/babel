// optimisation

"use strict";

function foo() {
  foo.apply(undefined, arguments);
}

// deoptimisation

function foo(a) {
  for (var _len = arguments.length, b = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    b[_key - 1] = arguments[_key];
  }

  foo.apply(undefined, b);
}

function foo() {
  for (var _len2 = arguments.length, b = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    b[_key2] = arguments[_key2];
  }

  foo.apply(undefined, [1].concat(b));
}
