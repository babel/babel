function assertClosed(g) {
  expect(g.next()).toEqual({value: undefined, done: true});
}

var x;

function* f() {
  x = 0;
  yield 1;
  try {
    yield 2;
    try {
      yield 3;
    } catch (ex) {
      yield 4 + ex
    }
    yield 5;
  } finally {
    x = 6;
  }
  yield x;
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 5, done: false});
expect(g.next()).toEqual({value: 6, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);
expect(x).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);
expect(x).toBe(0);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);
expect(x).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.throw('ex')).toEqual({value: '4ex', done: false});
expect(g.next()).toEqual({value: 5, done: false});
expect(g.next()).toEqual({value: 6, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);
expect(x).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.throw('ex')).toEqual({value: '4ex', done: false});
expect(() => g.throw('b')).toThrow();
assertClosed(g);
expect(x).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 5, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);
expect(x).toBe(6);
