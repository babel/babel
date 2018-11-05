function classFactory() {
  var _class, _temp, _foo, _bar;

  return _temp = _class = class Foo {
    constructor() {
      Object.defineProperty(this, _foo, {
        writable: true,
        value: "foo"
      });
    }

    instance() {
      return babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
    }

    static() {
      return babelHelpers.classPrivateFieldLooseBase(Foo, _bar)[_bar];
    }

    static instance(inst) {
      return babelHelpers.classPrivateFieldLooseBase(inst, _foo)[_foo];
    }

    static static() {
      return babelHelpers.classPrivateFieldLooseBase(Foo, _bar)[_bar];
    }

  }, _foo = babelHelpers.classPrivateFieldLooseKey("foo"), _bar = babelHelpers.classPrivateFieldLooseKey("bar"), Object.defineProperty(_class, _bar, {
    writable: true,
    value: "bar"
  }), _temp;
}

var Foo1 = classFactory();
var Foo2 = classFactory();
var f1 = new Foo1();
var f2 = new Foo2();
expect(f1.instance()).toBe("foo");
expect(f1.static()).toBe("bar");
expect(f2.instance()).toBe("foo");
expect(f2.static()).toBe("bar");
expect(Foo1.instance(f1)).toBe("foo");
expect(Foo1.static()).toBe("bar");
expect(Foo2.instance(f2)).toBe("foo");
expect(Foo2.static()).toBe("bar");
assert.throws(() => f1.instance.call(f2));
assert.throws(() => f2.instance.call(f1));
assert.throws(() => Foo1.instance(f2));
assert.throws(() => Foo2.instance(f1));
