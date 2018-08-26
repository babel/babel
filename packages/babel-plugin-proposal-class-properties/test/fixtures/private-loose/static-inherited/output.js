class Base {
  static getThis() {
    return babelHelpers.classStaticPrivateFieldLooseBase(this, Base)._foo;
  }

  static updateThis(val) {
    return babelHelpers.classStaticPrivateFieldLooseBase(this, Base)._foo = val;
  }

  static getClass() {
    return babelHelpers.classStaticPrivateFieldLooseBase(Base, Base)._foo;
  }

  static updateClass(val) {
    return babelHelpers.classStaticPrivateFieldLooseBase(Base, Base)._foo = val;
  }

}

Object.defineProperty(Base, "_foo", {
  value: 1,
  enumerable: false,
  configurable: false,
  writable: true
});

class Sub1 extends Base {
  static update(val) {
    return babelHelpers.classStaticPrivateFieldLooseBase(this, Sub1)._foo2 = val;
  }

}

Object.defineProperty(Sub1, "_foo2", {
  value: 2,
  enumerable: false,
  configurable: false,
  writable: true
});

class Sub2 extends Base {}
