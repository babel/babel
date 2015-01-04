var x = 0;

function* f() {
  x++;
}

var g = f();
assert.equal(x, 0);
assert.deepEqual(g.next(), {done: true, value: undefined});
assert.equal(x, 1);
