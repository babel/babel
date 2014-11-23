function *gen(start, step) {
  step = step || 1;
  while (true) {
    yield start;
    start += step;
  }
}

function *limit(g, stop) {
  while (true) {
    var info = g.next();
    if (info.done) {
      return;
    } else if (info.value < stop) {
      yield info.value;
    } else {
      return;
    }
  }
}

// should generate a lot of plausible values
var g = gen(10, 2);

assert.deepEqual(g.next(), { value: 10, done: false });
assert.deepEqual(g.next(), { value: 12, done: false });
assert.deepEqual(g.next(), { value: 14, done: false });
assert.deepEqual(g.next(), { value: 16, done: false });

var sum = 10 + 12 + 14 + 16;

for (var n = 0; n < 1000; ++n) {
  var info = g.next();
  sum += info.value;
  assert.strictEqual(info.done, false);
}

assert.strictEqual(sum, 1017052);

// should allow limiting
genHelpers.check(limit(gen(10, 3), 20), [10, 13, 16, 19]);
