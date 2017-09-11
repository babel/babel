"use strict";

let a = 1;

(do {
  let a = 2;
  assert.equal(a, 2);
});
assert.equal(a, 1);

