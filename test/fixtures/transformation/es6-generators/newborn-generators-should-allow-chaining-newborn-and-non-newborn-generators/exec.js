function *range(n) {
  for (var i = 0; i < n; ++i) {
    yield i;
  }
}

function *chain(a, b) {
  yield* a;
  yield* b;
}

genHelpers.check(chain(range(3), range(5)), [0, 1, 2, 0, 1, 2, 3, 4]);

function *y3(x) {
  return yield yield yield x;
}

function *y5(x) {
  return yield yield yield yield yield x;
}

genHelpers.check(
  chain(y3("foo"), y5("bar")),
  ["foo", 1, 2, "bar", 4, 5, 6, 7]
);

var g3 = y3("three");
assert.deepEqual(g3.next(), {
  value: "three",
  done: false
});

var g5 = y5("five");
assert.deepEqual(g5.next(), {
  value: "five",
  done: false
});

var undef; // A little easier to read than void 0.
genHelpers.check(chain(g3, g5), [undef, 1, undef, 3, 4, 5]);
