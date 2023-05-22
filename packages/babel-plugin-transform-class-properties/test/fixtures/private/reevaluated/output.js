function classFactory() {
  var _class, _foo, _bar;
  return _foo = /*#__PURE__*/new WeakMap(), (_class = class Foo {
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
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, _class, _bar);
    }
    static instance(inst) {
      return babelHelpers.classPrivateFieldGet(inst, _foo);
    }
    static static() {
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, _class, _bar);
    }
  }, _bar = {
    writable: true,
    value: "bar"
  }, _class);
}
