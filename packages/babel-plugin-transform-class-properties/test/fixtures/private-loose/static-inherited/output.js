var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
class Base {
  static getThis() {
    return babelHelpers.assertClassBrandLoose(this, _foo, 1);
  }
  static updateThis(val) {
    return babelHelpers.assertClassBrandLoose(this, _foo)[_foo] = val;
  }
  static getClass() {
    return babelHelpers.assertClassBrandLoose(Base, _foo, 1);
  }
  static updateClass(val) {
    return babelHelpers.assertClassBrandLoose(Base, _foo)[_foo] = val;
  }
}
Object.defineProperty(Base, _foo, {
  writable: true,
  value: 1
});
var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
class Sub1 extends Base {
  static update(val) {
    return babelHelpers.assertClassBrandLoose(this, _foo2)[_foo2] = val;
  }
}
Object.defineProperty(Sub1, _foo2, {
  writable: true,
  value: 2
});
class Sub2 extends Base {}
