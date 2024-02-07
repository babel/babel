function classFactory() {
  var _Foo, _foo, _bar;
  return _foo = /*#__PURE__*/new WeakMap(), (_Foo = class Foo {
    constructor() {
      babelHelpers.classPrivateFieldInitSpec(this, _foo, "foo");
    }
    instance() {
      return babelHelpers.classPrivateFieldGet2(this, _foo);
    }
    static() {
      return babelHelpers.assertClassBrand(Foo, _Foo, _bar)._;
    }
    static instance(inst) {
      return babelHelpers.classPrivateFieldGet2(inst, _foo);
    }
    static static() {
      return babelHelpers.assertClassBrand(Foo, _Foo, _bar)._;
    }
  }, _bar = {
    _: "bar"
  }, _Foo);
}
