var _obj;

var Base = {
  test: '1'
};
var obj = _obj = {
  bar: function () {
    var _ref;

    return _ref = Number(babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "test", this)), babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "test", _ref + 1, this, false), _ref;
  }
};
Object.setPrototypeOf(obj, Base);
assert.strictEqual(obj.bar(), 1);
assert.strictEqual(Base.test, '1');
assert.strictEqual(obj.test, 2);
