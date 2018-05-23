function assertClosed(g) {
  expect(g.next()).toEqual({value: undefined, done: true});
}

function* f() {
  yield 1;
  try {
    yield 2;
    try {
      yield 3;
    } catch (ex) {
      yield 4 + ex;
    }
    yield 5;
  } catch (ex) {
    yield 6 + ex;
  }
  yield 7;
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 5, done: false});
expect(g.next()).toEqual({value: 7, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.throw('ex')).toEqual({value: '6ex', done: false});
expect(g.next()).toEqual({value: 7, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.throw('ex')).toEqual({value: '4ex', done: false});
expect(g.next()).toEqual({value: 5, done: false});
expect(g.next()).toEqual({value: 7, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.throw('ex')).toEqual({value: '4ex', done: false});
expect(g.throw('b')).toEqual({value: '6b', done: false});
expect(g.next()).toEqual({value: 7, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 5, done: false});
expect(g.throw('ex')).toEqual({value: '6ex', done: false});
expect(g.next()).toEqual({value: 7, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 5, done: false});
expect(g.next()).toEqual({value: 7, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);
