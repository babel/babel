var _Foo;
class Foo {}
_Foo = Foo;
function _tag() {
  babelHelpers.assertClassBrand(_Foo, this, _tag).bind(this)``;
}
new Foo();
