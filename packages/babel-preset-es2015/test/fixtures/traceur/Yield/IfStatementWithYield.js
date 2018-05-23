function* f(x) {
  if (yield x) {
    return 2;
  }
  return 3;
}

var g = f(1);
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next(true)).toEqual({value: 2, done: true});

g = f(4);
expect(g.next()).toEqual({value: 4, done: false});
expect(g.next(false)).toEqual({value: 3, done: true});
