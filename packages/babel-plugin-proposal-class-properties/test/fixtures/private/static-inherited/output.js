class Base {
  static getThis() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Base, _foo);
  }

  static updateThis(val) {
    return babelHelpers.classStaticPrivateFieldSpecSet(this, Base, _foo, val);
  }

  static getClass() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Base, Base, _foo);
  }

  static updateClass(val) {
    return babelHelpers.classStaticPrivateFieldSpecSet(Base, Base, _foo, val);
  }

}

var _foo = {
  writable: true,
  value: 1
};

class Sub1 extends Base {
  static update(val) {
    return babelHelpers.classStaticPrivateFieldSpecSet(this, Sub1, _foo2, val);
  }

}

var _foo2 = {
  writable: true,
  value: 2
};

class Sub2 extends Base {}
