var _Foo;
class Foo {}
_Foo = Foo;
var _bar = {
  _: 21
};
(() => {
  _Foo.foo = babelHelpers.assertClassBrand(_Foo, _Foo, _bar)._;
  _Foo.qux1 = _Foo.qux;
})();
babelHelpers.defineProperty(Foo, "qux", 21);
_Foo.qux2 = _Foo.qux;
