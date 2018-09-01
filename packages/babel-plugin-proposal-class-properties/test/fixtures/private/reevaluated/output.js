function classFactory() {
  var _class, _temp;

  return function () {
    _temp = _class = class Foo {
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
        return babelHelpers.classStaticPrivateFieldSpecGet(Foo, _class, _classStatics, "bar");
      }

      static instance(inst) {
        return babelHelpers.classPrivateFieldGet(inst, _foo);
      }

      static static() {
        return babelHelpers.classStaticPrivateFieldSpecGet(Foo, _class, _classStatics, "bar");
      }

    };

    var _foo = new WeakMap();

    var _classStatics = Object.create(null);

    babelHelpers.defineProperty(_classStatics, "bar", "bar");
    return _temp;
  }();
}
