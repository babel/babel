// Options: --block-binding

{
  function* f() {
    yield 1;
  }

  let g = f();
  expect(g.next()).toEqual({value: 1, done: false});
  expect(g.next()).toEqual({value: undefined, done: true});
}

{
  function* f() {
    yield 1;
  }

  let g = f();
  expect(g.next()).toEqual({value: 1, done: false});
  expect(g.next()).toEqual({value: undefined, done: true});
}
