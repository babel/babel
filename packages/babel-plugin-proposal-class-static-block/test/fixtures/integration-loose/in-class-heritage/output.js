var _class, _2, _temp, Base, _3, _temp2;

var _ = babelHelpers.classPrivateFieldLooseKey("_");

class Foo extends (_temp = (_2 = babelHelpers.classPrivateFieldLooseKey("_"), _class = class extends (_temp2 = (_3 = babelHelpers.classPrivateFieldLooseKey("_"), Base = class Base {}), Object.defineProperty(Base, _3, {
  writable: true,
  value: (() => {
    Base.qux = 21;
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
