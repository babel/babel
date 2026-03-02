var _Foo;
var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
class Foo {}
_Foo = Foo;
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: 21
});
(() => {
  _Foo.foo = babelHelpers.classPrivateFieldLooseBase(_Foo, _bar)[_bar];
  _Foo.qux1 = _Foo.qux;
})();
Foo.qux = 21;
_Foo.qux2 = _Foo.qux;
