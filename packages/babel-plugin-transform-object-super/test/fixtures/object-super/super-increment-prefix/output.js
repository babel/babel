var _obj;
var Base = {
  test: '1'
};
var obj = _obj = {
  bar: function () {
    var _super$test;
    return babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "test", (_super$test = babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "test", this), ++_super$test), this, false);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.bar()).toBe(2);
expect(Base.test).toBe('1');
expect(obj.test).toBe(2);
