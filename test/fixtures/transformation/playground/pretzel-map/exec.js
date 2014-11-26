assert.deepEqual(["foo", "bar"].map(:toUpperCase), ["FOO", "BAR"]);
assert.deepEqual([1.1234, 23.53245, 3].map(:toFixed(2)), ["1.12", "23.53", "3.00"]);

var get = function () {
  return 2;
}
assert.deepEqual([1.1234, 23.53245, 3].map(:toFixed(get())), ["1.12", "23.53", "3.00"]);
