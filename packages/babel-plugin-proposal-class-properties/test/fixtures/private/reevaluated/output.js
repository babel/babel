function classFactory() {
  var _class, _temp, _foo, _bar;

  return _temp = _class = class Foo {
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
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, _class, _bar);
    }

    static instance(inst) {
      return babelHelpers.classPrivateFieldGet(inst, _foo);
    }

    static static() {
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, _class, _bar);
    }

  }, _foo = new WeakMap(), _bar = {
    writable: true,
    value: "bar"
  }, _temp;
}
