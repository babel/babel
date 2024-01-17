function classFactory() {
  var _Foo, _foo, _bar;
  return _foo = /*#__PURE__*/new WeakMap(), (_Foo = class Foo {
    constructor() {
      babelHelpers.classPrivateFieldInitSpec(this, _foo, {
        writable: true,
        value: "foo"
      });
    }
    instance() {
      return babelHelpers.classPrivateFieldGet(this, _foo);
    }
    static() {
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, _Foo, _bar);
    }
    static instance(inst) {
      return babelHelpers.classPrivateFieldGet(inst, _foo);
    }
    static static() {
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, _Foo, _bar);
    }
  }, _bar = {
    writable: true,
    value: "bar"
  }, _Foo);
}
