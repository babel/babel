// Options: --block-binding

{
  function* f() {
    yield 1;
  }

  let g = f();
  assert.deepEqual(g.next(), {value: 1, done: false});
  assert.deepEqual(g.next(), {value: undefined, done: true});
}

{
  function* f() {
    yield 1;
  }

  let g = f();
  assert.deepEqual(g.next(), {value: 1, done: false});
  assert.deepEqual(g.next(), {value: undefined, done: true});
}
