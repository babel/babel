class Base {
  static getThis() {
    return babelHelpers.assertClassBrand(this, Base, _foo)._;
  }
  static updateThis(val) {
    return _foo._ = babelHelpers.assertClassBrand(this, Base, val);
  }
  static getClass() {
    return _foo._;
  }
  static updateClass(val) {
    return _foo._ = val;
  }
}
var _foo = {
  _: 1
};
class Sub1 extends Base {
  static update(val) {
    return _foo2._ = babelHelpers.assertClassBrand(this, Sub1, val);
  }
}
var _foo2 = {
  _: 2
};
class Sub2 extends Base {}
