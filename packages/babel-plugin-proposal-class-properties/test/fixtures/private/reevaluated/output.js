function classFactory() {
  var Foo, _foo, _temp, _bar;

  return _temp = (_foo = new WeakMap(), Foo = class Foo {
    constructor() {
      _foo.set(this, {
        writable: true,
        value: "foo"
      });
    }

    instance() {
      return babelHelpers.classPrivateFieldGet(this, _foo);
    }

    static() {
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _bar);
    }

    static instance(inst) {
      return babelHelpers.classPrivateFieldGet(inst, _foo);
    }

    static static() {
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _bar);
    }

  }), _bar = {
    writable: true,
    value: "bar"
  }, _temp;
}
