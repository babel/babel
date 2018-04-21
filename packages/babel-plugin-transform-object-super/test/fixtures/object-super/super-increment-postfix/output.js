var _obj;

var Base = {
  test: '1'
};
var obj = _obj = {
  bar: function () {
    var _super$test;

    return babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "test", (_super$test = +babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "test", this)) + 1, this, false), _super$test;
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.bar()).toBe(1);
expect(Base.test).toBe('1');
expect(obj.test).toBe(2);
