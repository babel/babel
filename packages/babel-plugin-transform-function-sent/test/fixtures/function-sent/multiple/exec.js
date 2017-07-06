let a, b;
let val = {};

function* gen() {
  a = function.sent;
  b = function.sent;
}

const it = gen();
it.next(val);

assert.equal(a, b);
assert.equal(a, val);
