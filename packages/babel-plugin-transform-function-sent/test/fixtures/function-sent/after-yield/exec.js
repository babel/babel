let a, b;

function* gen() {
  a = yield;
  b = function.sent;
}

const it = gen();

it.next(1);
assert.equal(a, undefined);
assert.equal(b, undefined);

it.next(2);
assert.equal(a, 2);
assert.equal(b, 1);
