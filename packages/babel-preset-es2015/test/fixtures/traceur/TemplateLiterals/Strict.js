'use strict';

function f(...args) {
  return this;
}

expect(f `a`).toBeUndefined();
