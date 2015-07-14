function* foo(...items) {
  return items;
}

assert.deepEqual(foo(1, 2, 3).next().value, [1, 2, 3]);
