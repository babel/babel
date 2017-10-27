function test(x) {
  var F = function F() {
    babelHelpers.classCallCheck(this, F);
    Object.defineProperty(this, _x, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1
    });
  };

  var _x = x;
  x = 'deadbeef';
  assert.strictEqual(new F().foo, 1);
  x = 'wrong';
  assert.strictEqual(new F().foo, 1);
}

test('foo');
