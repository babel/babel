function* f() {
  var x;
  try {
    x = yield 1;
  } catch (ex) {
    yield ex;
  }
  return 2;
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: true});

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.throw(3)).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 2, done: true});
