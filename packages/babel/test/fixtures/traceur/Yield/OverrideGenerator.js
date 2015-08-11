function* f() {
  yield 1;
}

var f2 = f;

f = 42;

var g = f2();

assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});

assert.instanceOf(g, f2);
