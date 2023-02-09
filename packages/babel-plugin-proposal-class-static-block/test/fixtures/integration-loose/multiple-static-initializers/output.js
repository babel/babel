var _bar = /*#__PURE__*/Symbol("bar");
class Foo {}
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: 21
});
(() => {
  Foo.foo = babelHelpers.classPrivateFieldLooseBase(Foo, _bar)[_bar];
  Foo.qux1 = Foo.qux;
})();
Foo.qux = 21;
Foo.qux2 = Foo.qux;
