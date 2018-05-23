function* f(x) {
  switch (yield x) {
    case 1:
      return 1;
    case 2:
      return 2;
    default:
      return 3;
  }
  throw new Error('Unreachable');
}

var g = f(1);
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next(2)).toEqual({value: 2, done: true});

g = f(3);
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next(1)).toEqual({value: 1, done: true});

var g = f(4);
expect(g.next()).toEqual({value: 4, done: false});
expect(g.next(55)).toEqual({value: 3, done: true});
