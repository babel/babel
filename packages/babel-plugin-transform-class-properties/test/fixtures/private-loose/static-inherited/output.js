var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
class Base {
  static getThis() {
    return babelHelpers.classPrivateFieldGetLoose(this, _foo);
  }
  static updateThis(val) {
    return babelHelpers.classPrivateFieldGetLoose(this, _foo, 1)[_foo] = val;
  }
  static getClass() {
    return babelHelpers.classPrivateFieldGetLoose(Base, _foo);
  }
  static updateClass(val) {
    return babelHelpers.classPrivateFieldGetLoose(Base, _foo, 1)[_foo] = val;
  }
}
Object.defineProperty(Base, _foo, {
  writable: true,
  value: 1
});
var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
class Sub1 extends Base {
  static update(val) {
    return babelHelpers.classPrivateFieldGetLoose(this, _foo2, 1)[_foo2] = val;
  }
}
Object.defineProperty(Sub1, _foo2, {
  writable: true,
  value: 2
});
class Sub2 extends Base {}
