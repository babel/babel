function test(x) {
  var _x = x;

  var F = function F() {
    babelHelpers.classCallCheck(this, F);
    Object.defineProperty(this, _x, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1
    });
  };

  x = 'deadbeef';
  expect(new F().foo).toBe(1);
  x = 'wrong';
  expect(new F().foo).toBe(1);
}

test('foo');
