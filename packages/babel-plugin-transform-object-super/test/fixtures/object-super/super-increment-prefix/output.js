var _obj;
var Base = {
  test: '1'
};
var obj = _obj = {
  bar: function () {
    var _super$test;
    return babelHelpers.superPropSet(_obj, "test", (_super$test = babelHelpers.superPropGet(_obj, "test", this), ++_super$test), this, 0);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.bar()).toBe(2);
expect(Base.test).toBe('1');
expect(obj.test).toBe(2);
