function* f() {
  var x;
  try {
    x = yield 1;
  } catch (ex) {
    yield ex;
  }
  return 2;
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: true});

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.throw(3), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 2, done: true});
