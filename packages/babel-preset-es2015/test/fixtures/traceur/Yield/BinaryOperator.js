function* f(x) {
  var a = (yield x) + (yield x + 1);
  return a;
}

var g = f(1);
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next(1)).toEqual({value: 2, done: false});
expect(g.next(2)).toEqual({value: 3, done: true});
