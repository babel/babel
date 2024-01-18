var _Foo;
class Foo {}
_Foo = Foo;
var _bar = {
  writable: true,
  value: 21
};
(() => {
  _Foo.foo = babelHelpers.classStaticPrivateFieldSpecGet(_Foo, _Foo, _bar);
  _Foo.qux1 = _Foo.qux;
})();
babelHelpers.defineProperty(Foo, "qux", 21);
_Foo.qux2 = _Foo.qux;
