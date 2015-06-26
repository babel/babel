"use strict";

function foo(x) {
  for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    types[_key - 1] = arguments[_key];
  }

  return {
    types: types,
    x: x
  };
}
