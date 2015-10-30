function* f(x) {
  var a = (yield x) + (yield x + 1);
  return a;
}

var g = f(1);
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(1), {value: 2, done: false});
assert.deepEqual(g.next(2), {value: 3, done: true});
