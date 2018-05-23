function* f() {
  yield 1;
}

var f2 = f;

f = 42;

var g = f2();

expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: undefined, done: true});

expect(g).toBeInstanceOf(f2);
