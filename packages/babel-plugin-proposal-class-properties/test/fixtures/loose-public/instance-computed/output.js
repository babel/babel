function test(x) {
  var _x = x;

  var F = function F() {
    babelHelpers.classCallCheck(this, F);
    this[_x] = 1;
  };

  x = 'deadbeef';
  assert.strictEqual(new F().foo, 1);
  x = 'wrong';
  assert.strictEqual(new F().foo, 1);
}

test('foo');
