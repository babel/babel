function *inner() {
  return [yield 1, yield 2];
}

function *outer(delegate) {
  return yield* delegate;
}

var n = inner();

assert.deepEqual(n.next(), {
  value: 1,
  done: false
});

var g = outer(n);

// I would really like to be able to pass 3 to g.next here, but V8
// ignores values sent to newborn generators, and SpiderMonkey throws
// a TypeError.
assert.deepEqual(g.next(), {
  value: 2,
  done: false
});

assert.deepEqual(g.next(4), {
  value: [void 0, 4],
  done: true
});
