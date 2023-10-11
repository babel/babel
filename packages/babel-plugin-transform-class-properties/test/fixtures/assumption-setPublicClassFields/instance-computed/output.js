function test(x) {
  let _x;
  _x = x;
  class F {
    constructor() {
      this[_x] = 1;
    }
  }
  x = 'deadbeef';
  expect(new F().foo).toBe(1);
  x = 'wrong';
  expect(new F().foo).toBe(1);
}
test('foo');
