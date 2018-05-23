function* f(x, y) {
  yield x, yield y;
  return x + y;
}

var g = f(1, 2);
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next(1)).toEqual({value: 2, done: false});
expect(g.next(2)).toEqual({value: 3, done: true});
