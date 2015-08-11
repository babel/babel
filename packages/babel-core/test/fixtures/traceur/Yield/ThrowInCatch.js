function* f() {
  try {
    yield 1;
    throw 'caught';
  } catch (e) {
    throw 'ex';
  } finally {
    f.x = 2;
  }
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.throws(() => g.next(), 'ex');
assert.equal(f.x, 2);
