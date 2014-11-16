function *gen() {
  var a$0 = 0, a$1 = 1;

  let a = 3;

  {
    let a = 1;
    yield a + a$0;
  }

  {
    let a = 2;
    yield a - 1 + a$1;
  }

  yield a;
}

var g = gen();

assert.deepEqual(g.next(), { value: 1, done: false });
assert.deepEqual(g.next(), { value: 2, done: false });
assert.deepEqual(g.next(), { value: 3, done: false });
assert.deepEqual(g.next(), { value: void 0, done: true });
