function* f() {
  yield 1;
  yield 2;
  yield 3;
}

function* f1() {
  try {
    yield* [4, 5, 6];
  } catch (ex) {
    if (ex instanceof TypeError) {
      yield 10;
    }
  }
}

var g1 = f1();
expect(g1.next()).toEqual({value: 4, done: false});
expect(g1.throw(42)).toEqual({value: 10, done: false});
expect(g1.next()).toEqual({value: undefined, done: true});

function* f2() {
  try {
    yield* f();
  } catch (ex) {
    yield ex;
  }
}

var g2 = f2();
expect(g2.next()).toEqual({value: 1, done: false});
expect(g2.throw(42)).toEqual({value: 42, done: false});
expect(g2.next()).toEqual({value: undefined, done: true});

