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

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

Object.defineProperty(Base, _foo, {
  writable: true,
  value: 1
});

class Sub1 extends Base {
  static update(val) {
    return babelHelpers.classPrivateFieldLooseBase(this, _foo2)[_foo2] = val;
  }

}

var _foo2 = babelHelpers.classPrivateFieldLooseKey("foo");

Object.defineProperty(Sub1, _foo2, {
  writable: true,
  value: 2
});

class Sub2 extends Base {}
