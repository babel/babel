function* f() {
  var x = 0;
  while (yield 'test') {
    yield x++;
  }
}

var g = f();
expect(g.next()).toEqual({value: 'test', done: false});
expect(g.next(true)).toEqual({value: 0, done: false});
expect(g.next()).toEqual({value: 'test', done: false});
expect(g.next(true)).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 'test', done: false});
expect(g.next(true)).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 'test', done: false});
expect(g.next(false)).toEqual({value: undefined, done: true});

function* f2() {
  var x = 0;
  while ((yield 'a') || (yield 'b')) {
    yield x++;
  }
}

var g2 = f2();
expect(g2.next()).toEqual({value: 'a', done: false});
expect(g2.next(true)).toEqual({value: 0, done: false});
expect(g2.next()).toEqual({value: 'a', done: false});
expect(g2.next(false)).toEqual({value: 'b', done: false});
expect(g2.next(true)).toEqual({value: 1, done: false});
expect(g2.next()).toEqual({value: 'a', done: false});
expect(g2.next(false)).toEqual({value: 'b', done: false});
expect(g2.next(false)).toEqual({value: undefined, done: true});
