function* f() {
  var x = 0;
  for (yield 'init'; x < 3; x++) {
    yield x;
  }
}

var g = f();
expect(g.next()).toEqual({value: 'init', done: false});
expect(g.next()).toEqual({value: 0, done: false});
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: undefined, done: true});

function* f2() {
  for (var x = 0; yield 'test'; x++) {
    yield x;
  }
}

var g2 = f2();
expect(g2.next()).toEqual({value: 'test', done: false});
expect(g2.next(true)).toEqual({value: 0, done: false});
expect(g2.next()).toEqual({value: 'test', done: false});
expect(g2.next(true)).toEqual({value: 1, done: false});
expect(g2.next()).toEqual({value: 'test', done: false});
expect(g2.next(true)).toEqual({value: 2, done: false});
expect(g2.next()).toEqual({value: 'test', done: false});
expect(g2.next(false)).toEqual({value: undefined, done: true});

function* f3() {
  for (var x = 0; x < 5; x = yield 'inc') {
    yield x;
  }
}

var g3 = f3();
expect(g3.next()).toEqual({value: 0, done: false});
expect(g3.next()).toEqual({value: 'inc', done: false});
expect(g3.next(2)).toEqual({value: 2, done: false});
expect(g3.next()).toEqual({value: 'inc', done: false});
expect(g3.next(4)).toEqual({value: 4, done: false});
expect(g3.next()).toEqual({value: 'inc', done: false});
expect(g3.next(1)).toEqual({value: 1, done: false});
expect(g3.next()).toEqual({value: 'inc', done: false});
expect(g3.next(5)).toEqual({value: undefined, done: true});
