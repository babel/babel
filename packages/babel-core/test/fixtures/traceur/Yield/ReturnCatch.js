function* f () {
  try {
    yield 1;
  } catch (e) {
    f.x = 2;
  } finally {
    f.y = 3;
  }
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.return(3), {value: 3, done: true});
assert.equal(f.x, undefined);
assert.equal(f.y, 3);

