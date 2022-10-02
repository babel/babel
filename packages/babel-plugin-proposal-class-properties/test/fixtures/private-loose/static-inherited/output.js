var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
class Base {
  static getThis() {
    return babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
  }
  static updateThis(val) {
    return babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo] = val;
  }
  static getClass() {
    return babelHelpers.classPrivateFieldLooseBase(Base, _foo)[_foo];
  }
  static updateClass(val) {
    return babelHelpers.classPrivateFieldLooseBase(Base, _foo)[_foo] = val;
  }
}
Object.defineProperty(Base, _foo, {
  writable: true,
  value: 1
});
var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
class Sub1 extends Base {
  static update(val) {
    return babelHelpers.classPrivateFieldLooseBase(this, _foo2)[_foo2] = val;
  }
}
Object.defineProperty(Sub1, _foo2, {
  writable: true,
  value: 2
});
class Sub2 extends Base {}
