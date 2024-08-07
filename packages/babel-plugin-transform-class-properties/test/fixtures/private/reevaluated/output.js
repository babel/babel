function classFactory() {
  var _Foo, _foo, _bar;
  return _foo = /*#__PURE__*/new WeakMap(), _Foo = class Foo {
    constructor() {
      babelHelpers.classPrivateFieldInitSpec(this, _foo, "foo");
    }
    instance() {
      return babelHelpers.classPrivateFieldGet2(_foo, this);
    }
    static() {
      return babelHelpers.assertClassBrand(_Foo, Foo, _bar)._;
    }
    static instance(inst) {
      return babelHelpers.classPrivateFieldGet2(_foo, inst);
    }
    static static() {
      return babelHelpers.assertClassBrand(_Foo, Foo, _bar)._;
    }
  }, _bar = {
    _: "bar"
  }, _Foo;
}
