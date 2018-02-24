function test(x) {
  class F {
    [x] = 1;
    constructor() {}
  }

  x = 'deadbeef';
  assert.strictEqual(new F().foo, 1);
  x = 'wrong';
  assert.strictEqual(new F().foo, 1);
}

test('foo');
