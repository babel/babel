'use strict';

function f(...args) {
  return this;
}

assert.equal(undefined, f `a`);
