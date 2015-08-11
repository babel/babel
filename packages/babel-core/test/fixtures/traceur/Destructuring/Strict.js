function f({x}) {
  'use strict';
  return this;
}

assert.isUndefined(f({x: 42}));