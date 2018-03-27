function assertClosed(g) {
  expect(g.next()).toEqual({value: undefined, done: true});
}

var x;

function* f() {
  x = 0;
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    x = 4;
  }
  yield x;
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);
expect(x).toBe(4);


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
expect(x).toBe(4);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);
expect(x).toBe(4);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);
expect(x).toBe(4);
