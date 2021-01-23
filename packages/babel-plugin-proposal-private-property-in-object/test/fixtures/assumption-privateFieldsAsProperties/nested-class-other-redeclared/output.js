var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

var _bar = babelHelpers.classPrivateFieldLooseKey("bar");

class Foo {
  constructor() {
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
    Object.defineProperty(this, _bar, {
      writable: true,
      value: 1
    });
  }

  test() {
    var _bar2 = babelHelpers.classPrivateFieldLooseKey("bar");

    class Nested {
      constructor() {
        Object.defineProperty(this, _bar2, {
          writable: true,
          value: 2
        });
      }

      test() {
        Object.prototype.hasOwnProperty.call(this, _foo);
        Object.prototype.hasOwnProperty.call(this, _bar2);
      }

    }

    Object.prototype.hasOwnProperty.call(this, _foo);
    Object.prototype.hasOwnProperty.call(this, _bar);
  }

}
