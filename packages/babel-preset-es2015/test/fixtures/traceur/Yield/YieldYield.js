function* f(x) {
  yield (yield x);
}

var g = f(1);
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next(2)).toEqual({value: 2, done: false});
expect(g.next(3)).toEqual({value: undefined, done: true});

function* f2(x) {
  yield* (yield x);
}

g = f(1);
var g2 = f2(1);
expect(g2.next()).toEqual({value: 1, done: false});
expect(g2.next(g)).toEqual({value: 1, done: false});
expect(g2.next(2)).toEqual({value: 2, done: false});
expect(g2.next(3)).toEqual({value: undefined, done: true});
