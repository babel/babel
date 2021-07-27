var _foo = babelHelpers.temporalUndefined;

class Base {
  static getThis() {
    return babelHelpers.classCheckPrivateStaticAccess(this, Base, _foo);
  }

  static updateThis(val) {
    return babelHelpers.classCheckPrivateStaticAccess(this, Base, _foo), _foo = val;
  }

  static getClass() {
    return babelHelpers.classCheckPrivateStaticAccess(Base, Base, _foo);
  }

  static updateClass(val) {
    return babelHelpers.classCheckPrivateStaticAccess(Base, Base, _foo), _foo = val;
  }

}

_foo = 1;
var _foo2 = babelHelpers.temporalUndefined;

class Sub1 extends Base {
  static update(val) {
    return babelHelpers.classCheckPrivateStaticAccess(this, Sub1, _foo2), _foo2 = val;
  }

}

_foo2 = 2;

class Sub2 extends Base {}
