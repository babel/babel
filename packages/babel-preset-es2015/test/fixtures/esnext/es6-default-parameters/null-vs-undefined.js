function foo(x=5, y=6) {
  return [x, y];
}

assert.deepEqual(foo(undefined, null), [5, null]);
