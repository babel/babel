class Base {
  static getThis() {
    return babelHelpers.assertClassBrand(Base, this, _foo)._;
  }
  static updateThis(val) {
    return _foo._ = babelHelpers.assertClassBrand(Base, this, val);
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
    return _foo2._ = babelHelpers.assertClassBrand(Sub1, this, val);
  }
}
var _foo2 = {
  _: 2
};
class Sub2 extends Base {}
