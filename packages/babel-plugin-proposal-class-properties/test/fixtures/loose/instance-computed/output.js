function test(x) {
  var _x = x;

  var F = function F() {
    babelHelpers.classCallCheck(this, F);
    this[_x] = 1;
  };

  x = 'deadbeef';
  expect(new F().foo).toBe(1);
  x = 'wrong';
  expect(new F().foo).toBe(1);
}

test('foo');
