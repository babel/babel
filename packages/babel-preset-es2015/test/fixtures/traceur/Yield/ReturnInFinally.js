function* f() {
  try {
  yield 1;
  } finally {
    return 2;
  }
  yield 3;
  return 4;
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: true});

function* f2() {
  try {
    yield 1
  } catch (ex) {
    yield ex;
  } finally {
    return 2;
  }
  yield 3;
}

var g2 = f2();
expect(g2.next()).toEqual({value: 1, done: false});
expect(g2.next()).toEqual({value: 2, done: true});

g2 = f2();
expect(g2.next()).toEqual({value: 1, done: false});
expect(g2.throw(42)).toEqual({value: 42, done: false});
expect(g2.next()).toEqual({value: 2, done: true});
