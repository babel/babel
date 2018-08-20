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

Base._foo = 1;

class Sub1 extends Base {
  static update(val) {
    return babelHelpers.classStaticPrivateFieldLooseBase(this, Sub1)._foo2 = val;
  }

}

Sub1._foo2 = 2;

class Sub2 extends Base {}
