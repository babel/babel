var _class, _2, _temp, _class2, _3, _temp2;

var _ = babelHelpers.classPrivateFieldLooseKey("_");

class Foo extends (_temp = (_2 = babelHelpers.classPrivateFieldLooseKey("_"), _class = class extends (_temp2 = (_3 = babelHelpers.classPrivateFieldLooseKey("_"), _class2 = class Base {}), Object.defineProperty(_class2, _3, {
  writable: true,
  value: (() => {
    _class2.qux = 21;
  })()
}), _temp2) {}), Object.defineProperty(_class, _2, {
  writable: true,
  value: (() => {
    _class.bar = 21;
  })()
}), _temp) {}

Object.defineProperty(Foo, _, {
  writable: true,
  value: (() => {
    Foo.foo = Foo.bar + Foo.qux;
  })()
});
expect(Foo.foo).toBe(42);
