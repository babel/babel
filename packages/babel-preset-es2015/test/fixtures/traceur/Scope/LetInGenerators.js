function h(t) {
  return t();
}

function* f() {
  for (let i = 0; i < 3; ++i) {
    yield h(() => i);
  }
}

var g = f();
expect(g.next()).toEqual({value: 0, done: false});
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});

