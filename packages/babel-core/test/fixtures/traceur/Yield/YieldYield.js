function* f(x) {
  yield (yield x);
}

var g = f(1);
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(2), {value: 2, done: false});
assert.deepEqual(g.next(3), {value: undefined, done: true});

function* f2(x) {
  yield* (yield x);
}

g = f(1);
var g2 = f2(1);
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.deepEqual(g2.next(g), {value: 1, done: false});
assert.deepEqual(g2.next(2), {value: 2, done: false});
assert.deepEqual(g2.next(3), {value: undefined, done: true});
