function* f() {
  return yield* h();
}

function* h() {
  yield 111;
  yield 222;
  return 333;
}

var g = f();

expect(g.next()).toEqual({value: 111, done: false});
expect(g.next()).toEqual({value: 222, done: false});
expect(g.next()).toEqual({value: 333, done: true});
