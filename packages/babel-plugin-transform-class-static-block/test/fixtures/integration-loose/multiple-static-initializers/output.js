var _class;
var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
class Foo {}
_class = Foo;
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: 21
});
(() => {
  _class.foo = babelHelpers.classPrivateFieldLooseBase(_class, _bar)[_bar];
  _class.qux1 = _class.qux;
})();
Foo.qux = 21;
_class.qux2 = _class.qux;
