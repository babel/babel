function sum(x, y) {
  return x + y;
}

function* f() {
  yield;
  yield sum((yield), (yield));
  return yield;
}

var g = f(42);

expect(g.next()).toEqual({value: undefined, done: false});
expect(g.next()).toEqual({value: undefined, done: false});
expect(g.next(3)).toEqual({value: undefined, done: false});
expect(g.next(39)).toEqual({value: 42, done: false});
expect(g.next()).toEqual({value: undefined, done: false});
expect(g.next('abc')).toEqual({value: 'abc', done: true});
expect(g.next()).toEqual({value: undefined, done: true});
