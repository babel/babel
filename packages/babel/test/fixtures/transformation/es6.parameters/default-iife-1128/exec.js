const bar = true;

function foo(a = bar, ...b) {
  const bar = false;
  assert.equal(b[0], 2);
  assert.equal(b[1], 3);
}

foo(1, 2, 3);
