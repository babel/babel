var _obj;

var Base = {
  test: '1'
};
var obj = _obj = {
  bar: function () {
    var _thisSuper, _thisSuper2;

    return babelHelpers.set((_thisSuper2 = this, babelHelpers.getPrototypeOf(_obj)), "test", +babelHelpers.get((_thisSuper = this, babelHelpers.getPrototypeOf(_obj)), "test", _thisSuper) + 1, _thisSuper2, false);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.bar()).toBe(2);
expect(Base.test).toBe('1');
expect(obj.test).toBe(2);
