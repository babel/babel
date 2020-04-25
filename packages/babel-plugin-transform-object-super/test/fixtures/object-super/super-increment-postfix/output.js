var _obj;

var Base = {
  test: '1'
};
var obj = _obj = {
  bar: function () {
    var _thisSuper, _super$test, _thisSuper2;

    return babelHelpers.set((_thisSuper2 = this, babelHelpers.getPrototypeOf(_obj)), "test", (_super$test = +babelHelpers.get((_thisSuper = this, babelHelpers.getPrototypeOf(_obj)), "test", _thisSuper)) + 1, _thisSuper2, false), _super$test;
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.bar()).toBe(1);
expect(Base.test).toBe('1');
expect(obj.test).toBe(2);
