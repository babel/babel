class Base {
  static getThis() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Base, _BaseStatics, "foo");
  }

  static updateThis(val) {
    return babelHelpers.classStaticPrivateFieldSpecSet(this, Base, _BaseStatics, "foo", val);
  }

  static getClass() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Base, Base, _BaseStatics, "foo");
  }

  static updateClass(val) {
    return babelHelpers.classStaticPrivateFieldSpecSet(Base, Base, _BaseStatics, "foo", val);
  }

}

var _BaseStatics = Object.create(null);

babelHelpers.defineProperty(_BaseStatics, "foo", 1);

class Sub1 extends Base {
  static update(val) {
    return babelHelpers.classStaticPrivateFieldSpecSet(this, Sub1, _Sub1Statics, "foo", val);
  }

}

var _Sub1Statics = Object.create(null);

babelHelpers.defineProperty(_Sub1Statics, "foo", 2);

class Sub2 extends Base {}
