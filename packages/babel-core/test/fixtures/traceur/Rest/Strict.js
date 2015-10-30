function f(...xs) {
  'use strict';
  return this;
}

assert.isUndefined(f());