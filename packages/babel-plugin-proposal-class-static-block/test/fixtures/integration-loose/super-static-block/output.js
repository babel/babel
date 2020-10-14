var _class, _2, _temp;

var _ = babelHelpers.classPrivateFieldLooseKey("_");

class Foo extends (_temp = (_2 = babelHelpers.classPrivateFieldLooseKey("_"), _class = class {}), Object.defineProperty(_class, _2, {
  writable: true,
  value: (() => {
    _class.bar = 42;
  })()
}), _temp) {}

Foo.bar = 21;
Object.defineProperty(Foo, _, {
  writable: true,
  value: (() => {
    var _class2, _3, _temp2;

    Foo.foo = (_temp2 = (_3 = babelHelpers.classPrivateFieldLooseKey("_"), _class2 = class {}), Object.defineProperty(_class2, _3, {
      writable: true,
      value: (() => {
        _class2.bar = 42;
      })()
    }), _temp2).bar;
  })()
});
expect(Foo.foo).toBe(42);
