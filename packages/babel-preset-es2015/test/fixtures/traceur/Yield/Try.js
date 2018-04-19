function assertClosed(g) {
  expect({value: undefined, done: true}).toEqual(g.next());
}

function* f() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } catch (ex) {
    yield ex;
  }
  yield 4;
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.throw('ex')).toEqual({value: 'ex', done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.throw('ex')).toEqual({value: 'ex', done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);
