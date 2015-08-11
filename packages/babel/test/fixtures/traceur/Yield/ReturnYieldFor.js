function* f() {
  return yield* h();
}

function* h() {
  yield 111;
  yield 222;
  return 333;
}

var g = f();

assert.deepEqual({value: 111, done: false}, g.next());
assert.deepEqual({value: 222, done: false}, g.next());
assert.deepEqual({value: 333, done: true}, g.next());
