var _class;
class Foo {}
_class = Foo;
var _bar = {
  writable: true,
  value: 21
};
(() => {
  _class.foo = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _bar);
  _class.qux1 = _class.qux;
})();
babelHelpers.defineProperty(Foo, "qux", 21);
_class.qux2 = _class.qux;
