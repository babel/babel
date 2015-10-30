function h(t) {
  return t();
}

function* f() {
  for (let i = 0; i < 3; ++i) {
    yield h(() => i);
  }
}

var g = f();
assert.deepEqual(g.next(), {value: 0, done: false});
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});

