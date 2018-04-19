var _obj;

var Base = {
  test: '1'
};
var obj = _obj = {
  bar: function () {
    var _super$test;

    return _super$test = Number(babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "test", this)), babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "test", _super$test + 1, this, false);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.bar()).toBe(2);
expect(Base.test).toBe('1');
expect(obj.test).toBe(2);
